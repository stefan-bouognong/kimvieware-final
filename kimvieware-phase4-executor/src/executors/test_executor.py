"""
Test Executor
Runs generated tests and collects results
"""
import subprocess
from pathlib import Path
import json

class TestExecutor:
    """Execute generated tests"""
    
    def execute(self, test_file: Path, sut_url: str = "http://localhost:5000", test_count: int = None) -> dict:
        """
        Execute tests using pytest
        
        Returns:
            dict with execution results
        """
        
        print(f"\n Executing tests from {test_file.name}...")
        print(f"   SUT: {sut_url}")
        
        # Check if SUT is running (Soft warning only)
        import requests
        try:
            response = requests.get(f"{sut_url}/health", timeout=2)
            if response.status_code == 200:
                print(f" SUT is running")
            else:
                print(f"  SUT returned {response.status_code} on /health. Proceeding with tests anyway...")
        except Exception as e:
            print(f"  SUT not responding at {sut_url} (might be starting or no /health endpoint). Proceeding with tests anyway...")

        
        # Run pytest - with proper error handling
        import sys
        cmd = [
            sys.executable, '-m', 'pytest',
            str(test_file),
            '-v',
            '--tb=short'
        ]
        
        # Check if tests exist first
        collect_cmd = cmd + ['--collect-only']
        collect_result = subprocess.run(collect_cmd, capture_output=True, text=True, timeout=10)
        collect_output = collect_result.stdout + collect_result.stderr
        
        # Count collected tests
        test_count = collect_output.count('::test_') + collect_output.count('<Function')
        
        if test_count == 0:
            print(f"  No tests collected!")
            print(f"Collected output: {collect_output[:500]}")
            return {
                'total': 0,
                'passed': 0,
                'failed': 0,
                'pass_rate': 0.0,
                'output': "No tests collected"
            }
        
        # Run actual tests
        result = subprocess.run(cmd, capture_output=True, text=True, timeout=30)
        
        # Parse results
        output = result.stdout + result.stderr
        
        passed = output.count(' PASSED') or output.count(' passed')
        failed = output.count(' FAILED') or output.count(' failed')
        total = passed + failed
        
        # Debug output
        if total == 0:
            print(f"DEBUG: pytest exit code: {result.returncode}")
            print(f"DEBUG: pytest output:\n{output[:1000]}")
        
        stats = {
            'total': max(total, test_count),  # Use collected count if parse failed
            'passed': passed,
            'failed': failed,
            'pass_rate': (passed / total * 100) if total > 0 else 0,
            'output': output
        }
        
        print(f"\n Execution Results:")
        print(f"   Total: {stats['total']}")
        print(f"   Passed: {stats['passed']}")
        print(f"   Failed: {stats['failed']}")
        print(f"   Pass rate: {stats['pass_rate']:.1f}%")
        
        return stats

