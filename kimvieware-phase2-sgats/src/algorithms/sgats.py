"""
SGATS: Similarity-Guided Automatic Test Selection
Implementation of Algorithm 3.1 from thesis (Updated with specific academic formulas)
"""
import numpy as np
from typing import List, Set, Tuple, Dict
from pathlib import Path
import sys

# Add shared to path
sys.path.insert(0, str(Path(__file__).parent.parent.parent.parent / 'kimvieware-shared' / 'src'))
from kimvieware_shared.models import Trajectory

class SGATS:
    """
    Similarity-Guided Automatic Test Selection
    
    Reduces trajectory set T to Tred while preserving coverage.
    
    Refined formulas (from latest research specifications):
    
    1. Priority function ρ(t):
       ρ(t) = wc·cov(t) - wk·cost(t) + wu·Uniqueness(t) - wf·FusionPenalty(t)
    
    2. Similarity function sim(ti, tj):
       sim(ti, tj) = αp · LCP(ti,tj)/min(|ti|,|tj|) + αh · (1 - Hamming(di,dj)/|di|)
       
       LCP: Longest Common Prefix of basic blocks
       Hamming: Distance on decision vectors (derived from branches)
    """
    
    def __init__(
        self,
        wc: float = 0.5,     # Coverage weight
        wk: float = 0.1,     # Cost weight (penalty)
        wu: float = 0.2,     # Uniqueness weight
        wf: float = 0.2,     # Fusion penalty weight
        alpha_p: float = 0.5, # Prefix similarity weight
        alpha_h: float = 0.5, # Hamming similarity weight
        theta: float = 0.8    # Similarity threshold
    ):
        self.wc = wc
        self.wk = wk
        self.wu = wu
        self.wf = wf
        self.alpha_p = alpha_p
        self.alpha_h = alpha_h
        self.theta = theta
    
    def reduce(self, trajectories: List[Trajectory]) -> Tuple[List[Trajectory], dict]:
        """Main SGATS reduction algorithm"""
        
        if not trajectories:
            return [], {}

        print(f"\n{'='*60}")
        print(f"🔬 SGATS: Advanced Similarity-Guided Selection")
        print(f"{'='*60}")
        print(f"Input: |T| = {len(trajectories)} trajectories")
        
        # Step 1: Pre-calculate branch frequencies for Uniqueness
        branch_freq = self._calculate_branch_frequencies(trajectories)
        
        # Step 2: Selection loop (Greedy)
        reduced_set = []
        covered_branches = set()
        all_possible_branches = set().union(*(t.branches_covered for t in trajectories))
        
        remaining = list(trajectories)
        
        while remaining and len(covered_branches) < len(all_possible_branches):
            # Recalculate priorities based on CURRENTly selected set (for FusionPenalty)
            priorities = []
            for t in remaining:
                p = self._calculate_priority(t, branch_freq, reduced_set)
                priorities.append(p)
            
            # Select best
            best_idx = np.argmax(priorities)
            best = remaining.pop(best_idx)
            
            # If it covers new branches, add to reduced set
            new_branches = best.branches_covered - covered_branches
            if new_branches:
                best.priority = float(priorities[best_idx]) # Store for report
                reduced_set.append(best)
                covered_branches.update(best.branches_covered)
                print(f"  [SEL] {best.path_id} | Priority: {priorities[best_idx]:.3f} | New: {len(new_branches)}")
                
                # FUSION: Eliminate similar trajectories
                to_remove = []
                for t in remaining:
                    sim = self._calculate_similarity(best, t)
                    if sim > self.theta:
                        to_remove.append(t)
                
                if to_remove:
                    print(f"    🔗 FUSION: {len(to_remove)} paths merged (sim > {self.theta})")
                    for t in to_remove:
                        remaining.remove(t)
            else:
                # Does not add new coverage, but might be kept if it's high priority?
                # Usually we want 100% coverage with minimum tests.
                pass

        # Statistics
        stats = {
            'initial_count': len(trajectories),
            'reduced_count': len(reduced_set),
            'reduction_rate': 1 - (len(reduced_set) / len(trajectories)) if trajectories else 0,
            'total_branches': len(all_possible_branches),
            'covered_branches': list(covered_branches),
            'coverage_rate': len(covered_branches) / len(all_possible_branches) if all_possible_branches else 1.0,
            'initial_cost': sum(t.cost for t in trajectories),
            'reduced_cost': sum(t.cost for t in reduced_set),
            'cost_reduction': 1 - (sum(t.cost for t in reduced_set) / sum(t.cost for t in trajectories)) if trajectories else 0
        }
        
        return reduced_set, stats

    def _calculate_branch_frequencies(self, trajectories: List[Trajectory]) -> Dict[Tuple[int, int], float]:
        """Calculate how often each branch appears across all paths"""
        freq = {}
        total = len(trajectories)
        for t in trajectories:
            for b in t.branches_covered:
                freq[b] = freq.get(b, 0) + 1
        return {b: count/total for b, count in freq.items()}

    def _calculate_priority(self, t: Trajectory, branch_freq: Dict, selected: List[Trajectory]) -> float:
        """
        ρ(t) = wc·cov(t) - wk·cost(t) + wu·Uniqueness(t) - wf·FusionPenalty(t)
        """
        # cov(t): normalize by number of branches
        cov = len(t.branches_covered)
        
        # cost(t): use raw cost (assumed small)
        cost = t.cost
        
        # Uniqueness(t): inverse of average frequency of its branches
        if not t.branches_covered:
            uniqueness = 0
        else:
            avg_freq = sum(branch_freq[b] for b in t.branches_covered) / len(t.branches_covered)
            uniqueness = 1.0 - avg_freq
            
        # FusionPenalty(t): max similarity to any already selected trajectory
        if not selected:
            fusion_penalty = 0
        else:
            fusion_penalty = max(self._calculate_similarity(t, s) for s in selected)
            
        return (self.wc * cov) - (self.wk * cost) + (self.wu * uniqueness) - (self.wf * fusion_penalty)

    def _calculate_similarity(self, ti: Trajectory, tj: Trajectory) -> float:
        """
        sim(ti, tj) = αp · LCP(ti,tj)/min(|ti|,|tj|) + αh · (1 - Hamming(di,dj)/|di|)
        """
        # 1. Longest Common Prefix (LCP)
        lcp_val = self._calculate_lcp(ti.basic_blocks, tj.basic_blocks)
        min_len = min(len(ti.basic_blocks), len(tj.basic_blocks))
        prefix_sim = lcp_val / min_len if min_len > 0 else 0
        
        # 2. Hamming distance on decision vectors
        # Decision vector = sequence of branch choices (True/False or 0/1)
        # Here we approximate with branches_covered intersection/symmetric difference
        hamming_sim = self._calculate_hamming_sim(ti, tj)
        
        return (self.alpha_p * prefix_sim) + (self.alpha_h * hamming_sim)

    def _calculate_lcp(self, list1: List[int], list2: List[int]) -> int:
        """Calculate length of longest common prefix"""
        lcp = 0
        for b1, b2 in zip(list1, list2):
            if b1 == b2:
                lcp += 1
            else:
                break
        return lcp

    def _calculate_hamming_sim(self, ti: Trajectory, tj: Trajectory) -> float:
        """
        Approximate (1 - Hamming(di, dj)/|di|)
        We use the Jaccard-like measure on branches as a proxy for decision vector similarity
        """
        b1 = ti.branches_covered
        b2 = tj.branches_covered
        
        if not b1 and not b2:
            return 1.0
        if not b1 or not b2:
            return 0.0
            
        # Hamming distance on sets can be seen as symmetric difference size
        # (1 - |b1 Δ b2| / |b1 ∪ b2|)
        union = b1 | b2
        intersection = b1 & b2
        
        return len(intersection) / len(union) if union else 1.0

    def _get_all_branches(self, trajectories: List[Trajectory]) -> Set:
        all_branches = set()
        for t in trajectories:
            all_branches.update(t.branches_covered)
        return all_branches
