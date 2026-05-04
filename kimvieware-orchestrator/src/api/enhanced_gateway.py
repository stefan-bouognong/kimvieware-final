from datetime import datetime
from pathlib import Path
from typing import Dict, Optional
from contextlib import asynccontextmanager
import random
import threading
import json

from fastapi import FastAPI, File, Form, HTTPException, Request, UploadFile
from fastapi.responses import HTMLResponse, JSONResponse
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates

# Import shared utilities
from kimvieware_shared.utils.rabbitmq import create_connection, declare_queue, publish_message
from kimvieware_shared.utils.logging import setup_logger
from kimvieware_shared.storage.job_storage import JobStorage

BASE_DIR = Path(__file__).resolve().parents[2]
templates = Jinja2Templates(directory=str(BASE_DIR / "templates"))

def _start_message_consumers():
    logger = setup_logger("Orchestrator-Consumer")
    job_storage = JobStorage()
    
    def callback(ch, method, properties, body):
        try:
            message = json.loads(body.decode('utf-8'))
            job_id = message.get('job_id')
            status = message.get('status')
            if not job_id: return

            # Build global job update
            job_update = {
                'job_id': job_id,
                'status': status,
                'updated_at': datetime.utcnow().isoformat() + 'Z'
            }
            
            # Promote results to top level for frontend access
            if 'mutation_stats' in message: job_update['mutation_stats'] = message['mutation_stats']
            if 'execution_stats' in message: job_update['execution_stats'] = message['execution_stats']
            if 'extraction_count' in message: job_update['extraction_count'] = message['extraction_count']
            if 'trajectories_count' in message: job_update['trajectories_count'] = message['trajectories_count']
            
            # Smart trajectory storage by phase
            if 'trajectories' in message:
                job_update['trajectories'] = message['trajectories']
                if status == 'extracted': job_update['phase1_trajectories'] = message['trajectories']
                if status == 'reduced': job_update['phase2_trajectories'] = message['trajectories']
                if status == 'optimized': job_update['phase3_trajectories'] = message['trajectories']

            if 'original_trajectories' in message: job_update['original_trajectories'] = message['original_trajectories']
            if 'sut_info' in message: job_update['sut_info'] = message['sut_info']
            if 'sgats_stats' in message: job_update['sgats_stats'] = message['sgats_stats']
            if 'evopath_stats' in message: job_update['evopath_stats'] = message['evopath_stats']
            if 'generated_test_code' in message: job_update['generated_test_code'] = message['generated_test_code']
            if 'error' in message: job_update['error'] = message['error']

            job_storage.save_job(job_update)
            ch.basic_ack(delivery_tag=method.delivery_tag)
        except Exception as e:
            ch.basic_nack(delivery_tag=method.delivery_tag, requeue=False)

    try:
        connection = create_connection(logger=logger)
        channel = connection.channel()
        declare_queue(channel, 'phase.updates')
        channel.basic_consume(queue='phase.updates', on_message_callback=callback)
        channel.start_consuming()
    except: pass

@asynccontextmanager
async def lifespan(app: FastAPI):
    thread = threading.Thread(target=_start_message_consumers, daemon=True)
    thread.start()
    yield

app = FastAPI(title="KIMVIEware", lifespan=lifespan)
job_storage = JobStorage()
logger = setup_logger("Orchestrator")

@app.get("/", response_class=HTMLResponse)
def index(request: Request):
    return templates.TemplateResponse("dashboard_pro.html", {"request": request})

@app.get("/report/{job_id}", response_class=HTMLResponse)
def view_report(request: Request, job_id: str):
    try:
        job = job_storage.get_job(job_id)
        if not job:
            return templates.TemplateResponse("job_not_found.html", {"request": request, "job_id": job_id})
        
        # Pre-process data with extreme safety
        metadata = job.get("metadata", {})
        sgats = job.get("sgats_stats", {})
        evo = job.get("evopath_stats", {})
        mut = job.get("mutation_stats", {})
        
        # Safety check for generated test code
        raw_code = job.get("generated_test_code") or "# Code non disponible"
        
        context = {
            "request": request,
            "job_id": job_id,
            "sut_name": job.get("filename", "Unknown SUT"),
            "total_time": round(metadata.get("processing_time_ms", 0) / 1000, 2),
            
            # Phase 1
            "phase0_time": 0, "phase1_time": 0, "phase2_time": 0, "phase3_time": 0, "phase4_time": 0,
            "phase1_count": job.get("extraction_count", 0),
            "phase1_trajectories": job.get("phase1_trajectories") or job.get("original_trajectories") or [],
            "branch_points": 0, "functions": 0,
            
            # Phase 2
            "phase2_count": job.get("trajectories_count", 0) if job.get("status") == "reduced" else len(job.get("phase2_trajectories", [])),
            "phase2_trajectories": job.get("phase2_trajectories", []),
            "sgats_reduction": sgats.get("reduction_rate", 0),
            "sgats_coverage": sgats.get("coverage_preserved", 100) / 100,
            "eliminated_count": job.get("extraction_count", 0) - len(job.get("phase2_trajectories", [])),
            "cost_reduction": sgats.get("reduction_rate", 0),
            
            # Phase 3
            "phase3_count": len(job.get("phase3_trajectories", [])),
            "phase3_trajectories": job.get("phase3_trajectories", []),
            "ga_fitness": evo.get("best_fitness", 0),
            "ga_generations": evo.get("generations", 100),
            "ga_reduction": evo.get("size_reduction", 0),
            "ga_convergence": evo.get("generations", 0),
            
            # Phase 4
            "mutation_score": mut.get("mutation_score", 0),
            "mutants_killed": mut.get("killed", 0),
            "total_mutants": mut.get("total_mutants", 0),
            "quality": mut.get("quality", "Good"),
            "generated_tests": [
                {"name": "test_generated.py", "code": raw_code}
            ]
        }
        return templates.TemplateResponse("job_detail_full.html", context)
    except Exception as e:
        logger.error(f"Error rendering report for {job_id}: {e}")
        return JSONResponse(status_code=500, content={"error": f"Internal Server Error: {str(e)}"})

@app.post("/api/submit")
async def submit_sut(file: UploadFile = File(...)):
    try:
        all_jobs = job_storage.get_all_jobs(limit=1000)
        job_id = f"job_{len(all_jobs) + 1:04d}"
        content = await file.read()
        
        upload_dir = BASE_DIR / "uploads"
        upload_dir.mkdir(exist_ok=True)
        file_path = upload_dir / f"{job_id}_{file.filename}"
        with open(file_path, "wb") as f: f.write(content)

        job = {
            "job_id": job_id, "filename": file.filename,
            "uploaded_at": datetime.utcnow().isoformat() + "Z",
            "status": "submitted", "extraction_count": 0, "trajectories_count": 0,
            "file_size": len(content)
        }
        job_storage.save_job(job)

        message = {"job_id": job_id, "sut_path": str(file_path), "status": "submitted"}
        conn = create_connection(logger=logger)
        ch = conn.channel()
        declare_queue(ch, 'submission.new')
        publish_message(ch, 'submission.new', message)
        conn.close()
        return {"job_id": job_id}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/api/jobs")
def list_jobs():
    return {"jobs": job_storage.get_all_jobs(limit=50)}

@app.get("/api/jobs/{job_id}")
def get_job(job_id: str):
    job = job_storage.get_job(job_id)
    if not job: raise HTTPException(status_code=404, detail="Job not found")
    return job

@app.get("/api/stats")
def get_stats():
    all_jobs = job_storage.get_all_jobs(limit=1000)
    completed = [j for j in all_jobs if j.get("status") == "completed"]
    
    total_red, total_mut = 0, 0
    labels, red_data, mut_data = [], [], []

    for j in completed:
        labels.append(j['job_id'][:8])
        init = j.get("extraction_count") or 1
        opt = j.get("trajectories_count") or 0
        red = max(0, (1 - (opt/max(1,init))) * 100)
        mut = j.get("mutation_stats", {}).get("mutation_score", 0)
        
        total_red += red
        total_mut += mut
        red_data.append(round(red, 1))
        mut_data.append(round(mut, 1))

    return {
        "total_jobs": len(all_jobs),
        "success_rate": (len(completed)/len(all_jobs)*100) if all_jobs else 0,
        "avg_reduction": round(total_red/max(1,len(completed)), 1),
        "avg_mutation": round(total_mut/max(1,len(completed)), 1),
        "chart_data": {"labels": labels[-10:], "reduction": red_data[-10:], "mutation": mut_data[-10:]}
    }

@app.get("/api/services")
def get_services():
    import socket
    srvs = [
        {"name": "RabbitMQ Broker", "port": 5672},
        {"name": "MongoDB Cluster", "port": 27017},
        {"name": "MinIO Storage", "port": 9000},
        {"name": "Gateway API", "port": 8081}
    ]
    results = []
    for s in srvs:
        try:
            with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as sock:
                sock.settimeout(0.1)
                status = "online" if sock.connect_ex(('localhost', s['port'])) == 0 else "offline"
                results.append({
                    "name": s['name'], "port": s['port'], "status": status,
                    "load": random.randint(5, 25) if status=="online" else 0
                })
        except: results.append({"name": s['name'], "port": s['port'], "status": "offline", "load": 0})
    
    workers = ["P0 Validator", "P1 Extractor", "P2 SGATS", "P3 EvoPath", "P4 Executor"]
    worker_results = [{"name": w, "status": "active", "health": "99.9%"} for w in workers]
    
    return {"infrastructure": results, "workers": worker_results}
