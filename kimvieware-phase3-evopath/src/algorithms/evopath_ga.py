"""
EvoPath-GA: Evolutionary Path Optimization using Genetic Algorithm
Implementation of Algorithm 3.2 from thesis (Updated with multi-objective fitness)
"""
import numpy as np
import random
from typing import List, Tuple, Set, Dict
from pathlib import Path
import sys
from deap import base, creator, tools, algorithms

# Add shared to path
sys.path.insert(0, str(Path(__file__).parent.parent.parent.parent / 'kimvieware-shared' / 'src'))
from kimvieware_shared.models import Trajectory

class EvoPathGA:
    """
    Evolutionary Path Optimization using Genetic Algorithm
    
    Refined Fitness Function F(C) (Equation 3.3):
    F(C) = w_cov·fcov(C) + w_div·fdiv(C) + w_mut·fmut(C) - w_cost·fcost(C)
    
    Where:
    - fcov: Branch coverage
    - fdiv: Population diversity (anti-cloning)
    - fmut: Mutation score (quality index)
    - fcost: Total execution cost
    """
    
    def __init__(
        self,
        w_cov: float = 0.4,
        w_div: float = 0.2,
        w_mut: float = 0.3,
        w_cost: float = 0.1,
        population_size: int = 50,
        generations: int = 100,
        crossover_prob: float = 0.8,
        mutation_prob: float = 0.1
    ):
        self.w_cov = w_cov
        self.w_div = w_div
        self.w_mut = w_mut
        self.w_cost = w_cost
        self.pop_size = population_size
        self.generations = generations
        self.cx_prob = crossover_prob
        self.mut_prob = mutation_prob
        
        # Dynamic mutation score feedback (simulated for now)
        self.current_mutation_score = 0.85
    
    def optimize(self, trajectories: List[Trajectory]) -> Tuple[List[Trajectory], dict]:
        """Optimize test suite using Genetic Algorithm"""
        
        if not trajectories:
            return [], {}

        print(f"\n{'='*60}")
        print(f"🧬 EvoPath-GA: Multi-Objective Optimization")
        print(f"{'='*60}")
        print(f"Input: {len(trajectories)} trajectories")
        
        # Handle small input size
        if len(trajectories) < 2:
            print(f"⚠️ Skipping GA optimization for {len(trajectories)} trajectory")
            stats = self._compute_stats(trajectories, trajectories, [1.0])
            return trajectories, stats

        # Setup
        self.trajectories = trajectories
        self.n = len(trajectories)
        self.all_branches = set().union(*(t.branches_covered for t in trajectories))
        self.max_cost = sum(t.cost for t in trajectories)
        
        # DEAP setup
        self._setup_deap()
        
        # 1. Heuristic Seeding: Include some individuals with high coverage
        population = self.toolbox.population(n=self.pop_size)
        self._apply_heuristic_seeding(population)
        
        # Evaluate initial population
        fitnesses = list(map(self.toolbox.evaluate, population))
        for ind, fit in zip(population, fitnesses):
            ind.fitness.values = fit
        
        print(f"\n🔬 Evolution with Anti-Cloning Mechanism:")
        
        best_fitness_history = []
        
        # Evolve
        for gen in range(self.generations):
            # Select
            offspring = self.toolbox.select(population, len(population))
            offspring = list(map(self.toolbox.clone, offspring))
            
            # Crossover
            for child1, child2 in zip(offspring[::2], offspring[1::2]):
                if random.random() < self.cx_prob:
                    self.toolbox.mate(child1, child2)
                    del child1.fitness.values
                    del child2.fitness.values
            
            # Mutation with Adaptive Rate
            for mutant in offspring:
                if random.random() < self.mut_prob:
                    self.toolbox.mutate(mutant)
                    del mutant.fitness.values
            
            # Anti-Cloning: Inject diversity if population stagnates
            self._apply_anti_cloning(offspring, gen)
            
            # Evaluate
            invalid_ind = [ind for ind in offspring if not ind.fitness.valid]
            # Pass population to fitness for diversity calculation
            for ind in invalid_ind:
                ind.fitness.values = self._fitness(ind, offspring)
            
            # Replace
            population[:] = offspring
            
            # Track best
            fits = [ind.fitness.values[0] for ind in population]
            best_fit = max(fits)
            best_ind = tools.selBest(population, 1)[0]
            best_fitness_history.append(best_fit)
            
            if gen % 10 == 0 or gen == self.generations - 1:
                description = self._describe_suite(best_ind)
                print(f"   Gen {gen:3d}: Best Fit = {best_fit:.4f} | {description}")
        
        # Get best solution
        best_ind = tools.selBest(population, 1)[0]
        best_fit_val = float(best_ind.fitness.values[0])
        optimized_indices = [i for i, bit in enumerate(best_ind) if bit == 1]
        optimized_set = [trajectories[i] for i in optimized_indices]
        
        # Attach fitness to trajectories for reporting
        for t in optimized_set:
            t.fitness = best_fit_val

        print(f"\n🏆 Final Optimized Suite:")
        for i, traj in enumerate(optimized_set[:10]): # Show first 10
            print(f"   [{i+1}] ID: {traj.path_id} | Cost: {traj.cost:.2f} | Branches: {len(traj.branches_covered)}")
        if len(optimized_set) > 10:
            print(f"   ... and {len(optimized_set) - 10} more trajectories")

        # Final Stats
        stats = self._compute_stats(trajectories, optimized_set, best_fitness_history)
        
        return optimized_set, stats

    def _describe_suite(self, individual: List[int]) -> str:
        """Helper to provide a human-readable description of a test suite"""
        selected_indices = [i for i, bit in enumerate(individual) if bit == 1]
        if not selected_indices:
            return "Empty Suite"
            
        selected = [self.trajectories[i] for i in selected_indices]
        covered = set().union(*(t.branches_covered for t in selected))
        total_cost = sum(t.cost for t in selected)
        
        # Heuristic scenario counting
        scenarios = {}
        for t in selected:
            cond = t.path_condition.lower()
            path_id = t.path_id.lower()
            cat = "other"
            
            # Expanded detection
            if any(k in cond or k in path_id for k in ["register", "create", "validation", "password"]): 
                cat = "reg"
            elif any(k in cond or k in path_id for k in ["login", "auth", "access_token"]): 
                cat = "auth"
            elif any(k in cond or k in path_id for k in ["verify", "token", "check"]): 
                cat = "verif"
                
            scenarios[cat] = scenarios.get(cat, 0) + 1
            
        types_str = ", ".join([f"{k}:{v}" for k, v in scenarios.items()])
        return f"Size: {len(selected)} | Cov: {len(covered)}/{len(self.all_branches)} | Cost: {total_cost:.1f} | Types: [{types_str}]"

    def _setup_deap(self):
        """Setup DEAP genetic algorithm"""
        if hasattr(creator, "FitnessMax"):
            del creator.FitnessMax
        if hasattr(creator, "Individual"):
            del creator.Individual
            
        creator.create("FitnessMax", base.Fitness, weights=(1.0,))
        creator.create("Individual", list, fitness=creator.FitnessMax)
        
        self.toolbox = base.Toolbox()
        self.toolbox.register("attr_bool", random.randint, 0, 1)
        self.toolbox.register("individual", tools.initRepeat, creator.Individual,
                             self.toolbox.attr_bool, n=self.n)
        self.toolbox.register("population", tools.initRepeat, list, self.toolbox.individual)
        
        self.toolbox.register("evaluate", self._fitness)
        self.toolbox.register("mate", tools.cxTwoPoint)
        self.toolbox.register("mutate", tools.mutFlipBit, indpb=0.05)
        self.toolbox.register("select", tools.selTournament, tournsize=3)

    def _fitness(self, individual: List[int], population: List[List[int]] = None) -> Tuple[float]:
        """
        F(C) = w_cov·fcov(C) + w_div·fdiv(C) + w_mut·fmut(C) - w_cost·fcost(C)
        """
        selected_indices = [i for i, bit in enumerate(individual) if bit == 1]
        if not selected_indices:
            return (0.0,)
        
        selected = [self.trajectories[i] for i in selected_indices]
        
        # 1. fcov (Coverage)
        covered = set().union(*(t.branches_covered for t in selected))
        fcov = len(covered) / len(self.all_branches) if self.all_branches else 0
        
        # 2. fdiv (Diversity)
        # Hamming distance to other individuals in population
        if population:
            fdiv = self._calculate_individual_diversity(individual, population)
        else:
            fdiv = 0.5
            
        # 3. fmut (Mutation Score)
        # In a real system, this would come from Phase 4 feedback.
        # Here we use the current_mutation_score which could be updated dynamically.
        fmut = self.current_mutation_score
        
        # 4. fcost (Cost)
        total_cost = sum(t.cost for t in selected)
        fcost = total_cost / self.max_cost if self.max_cost > 0 else 0
        
        # Weighted Score
        score = (self.w_cov * fcov) + (self.w_div * fdiv) + (self.w_mut * fmut) - (self.w_cost * fcost)
        
        return (max(0.0, score),)

    def _calculate_individual_diversity(self, ind: List[int], population: List[List[int]]) -> float:
        """Calculate average Hamming distance to the rest of the population"""
        if len(population) <= 1: return 1.0
        distances = []
        # Sample population for speed
        sample = random.sample(population, min(len(population), 10))
        for other in sample:
            if ind is other: continue
            # Hamming distance
            dist = sum(b1 != b2 for b1, b2 in zip(ind, other)) / len(ind)
            distances.append(dist)
        return sum(distances) / len(distances) if distances else 1.0

    def _calculate_pop_diversity(self, population: List[List[int]]) -> float:
        """Calculate total population diversity"""
        return sum(self._calculate_individual_diversity(ind, population) for ind in population) / len(population)

    def _apply_heuristic_seeding(self, population: List[List[int]]):
        """Seed population with high-quality individuals"""
        # Individual 1: All paths
        population[0][:] = [1] * self.n
        
        # Individual 2-5: Random high-density paths
        for i in range(1, 5):
            population[i][:] = [1 if random.random() < 0.3 else 0 for _ in range(self.n)]

    def _apply_anti_cloning(self, offspring: List[List[int]], gen: int):
        """Dynamic anti-cloning: mutate clones to maintain diversity"""
        seen = set()
        for ind in offspring:
            ind_tuple = tuple(ind)
            if ind_tuple in seen:
                # Clone found! Apply high-intensity mutation
                for i in range(len(ind)):
                    if random.random() < 0.2:
                        ind[i] = 1 - ind[i]
                del ind.fitness.values
            seen.add(ind_tuple)

    def _compute_stats(self, original: List[Trajectory], optimized: List[Trajectory],
                       history: List[float]) -> dict:
        orig_branches = set().union(*(t.branches_covered for t in original))
        opt_branches = set().union(*(t.branches_covered for t in optimized))
        
        return {
            'original_count': len(original),
            'optimized_count': len(optimized),
            'size_reduction': 1 - (len(optimized) / len(original)) if original else 0,
            'original_cost': sum(t.cost for t in original),
            'optimized_cost': sum(t.cost for t in optimized),
            'cost_reduction': 1 - (sum(t.cost for t in optimized) / sum(t.cost for t in original)) if original else 0,
            'total_branches': len(orig_branches),
            'covered_branches': len(opt_branches),
            'coverage_rate': len(opt_branches) / len(orig_branches) if orig_branches else 1.0,
            'best_fitness': max(history),
            'generations': len(history),
            'convergence_history': history
        }
