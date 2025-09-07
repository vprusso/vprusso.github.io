+++
title = "A Tale of Two Measurements: How quantum nonlocality can appear and disappear"
date = "2025-07-01"
#dateFormat = "2006-01-02" # This value can be configured for per-post date formatting
author = "Vincent Russo"
authorTwitter = "captainhamptons" #do not include @
cover = ""
tags = ["quantum_information", "quantum_state_distinguishability"]
keywords = ["quantum_information", "quantum_state_distinguishability"]
description = ""
showFullContent = false
readingTime = true
hideComments = false
draft=false
+++
In the quantum world, things are often weird. One of the classic sources of weirdness is entanglement, the "spooky
action at a distance" that connects particles no matter how far apart they are. But there's a lesser-known, yet equally
fascinating, type of weirdness called **"quantum nonlocality without entanglement."**

This phenomenon occurs when you have a set of *unentangled* (product) quantum states that are, surprisingly, impossible
to tell apart perfectly if you're restricted to local operations. Imagine two physicists, Alice and Bob, in separate
labs. Someone prepares a quantum system in one of several possible product states—meaning Alice's part and Bob's part
are fundamentally independent—and sends one part to each of them. Even though there's no entanglement, they might find
that to have the best possible chance of identifying which state they were given, they need to bring their parts
together and perform a joint measurement. Acting alone in their labs and communicating over the phone (a process called
LOCC, for Local Operations and Classical Communication) just isn't good enough.

This leads to a natural question: is this "nonlocality" an inherent, fixed property of a given set of quantum states? If
a set of states is nonlocal, is it *always* nonlocal, no matter how you try to discriminate them?

It turns out the answer is **no**. In a [recent paper](https://arxiv.org/abs/2506.20560) I co-authored, we found that
this nonlocality isn't just a property of the states, but also depends crucially on the *rules of the game* you're
playing to tell them apart.

## The two games of state discrimination

When you're trying to identify an unknown quantum state from a known list, there are two main ways to approach the
problem:

1. **Minimum-Error Discrimination (The "Best Guess" Game):** In this game, you *must* make a guess every time. Your
goal is to maximize the probability of being correct. You accept that you'll sometimes be wrong, but you want to
minimize your average error rate. This is like a multiple-choice test where you're penalized for wrong answers, but you
have to answer every question.

2. **Unambiguous Discrimination (The "No Wrong Answers" Game):** This game is stricter. You are allowed to say, "I
don't know" (an inconclusive result). But if you *do* provide an answer, it **must** be correct. There is zero room for
error. Your goal is to maximize the probability of getting a conclusive, correct result.

One might assume that if a set of states is hard for Alice and Bob to distinguish in the "best guess" game (i.e., LOCC
is suboptimal), it would also be hard for them in the "no wrong answers" game. Our work shows this intuition is wrong.

## The main result

We constructed a special family of ensembles, each with six unentangled, linearly independent product states in a
\(\mathbb{C}^3 \otimes \mathbb{C}^3\) system. For this set of states, we discovered an interesting duality:

> The ensemble exhibits nonlocality without entanglement for minimum-error discrimination, but is perfectly local for
unambiguous discrimination.

In other words:

* **When playing the "Best Guess" game**, Alice and Bob using only LOCC *cannot* achieve the optimal success rate. A joint, global measurement is provably better. The states are nonlocal.
    $$p_{_{L}}^{me} < p_{_{G}}^{me}$$
* **When playing the "No Wrong Answers" game**, Alice and Bob using only LOCC *can* achieve the absolute maximum success rate. A fancy global measurement offers no advantage whatsoever. The states are not nonlocal in this context.
    $$p_{_{L}}^{ud} = p_{_{G}}^{ud}$$

## How is this possible?

The proof for the **minimum-error** case is quite subtle. We showed that finding the best possible measurement for our
product states is mathematically equivalent to being able to perfectly distinguish a *different* set of states—and this
new set of states is *entangled*. Since we know that LOCC cannot perfectly distinguish all sets of orthogonal entangled
states, it follows that LOCC cannot be optimal for our original problem.

The proof for the **unambiguous** case was more direct. We first calculated the absolute theoretical maximum success
probability for this task, a value no measurement (local or global) could ever beat. Then, we designed a simple,
step-by-step LOCC protocol that Alice and Bob could use. We showed that our local protocol achieves that exact
theoretical maximum. Since their local method is as good as any possible global method, it is, by definition, optimal.

## Python code and numerics

While the proofs in the paper are purely mathematical, we can use numerical optimization to find the optimal success
probabilities for these "games". The problem of finding the best quantum measurement can be elegantly framed as a
Semidefinite Program (SDP), a type of convex optimization problem that can be solved efficiently.

Let's walk through how to verify this with a Python script.

**Constructing the states:** 
First, we need to create the specific set of six product states from the paper. We'll start
*by defining three vectors in \(\mathbb{C}^3\) that have a pairwise inner product of \(s\). For example, we'll choose
*\(s = 0.5\).

```python
import numpy as np

# We define a set of 3 vectors in C^3 with pairwise inner product `s`.
s = 0.5

psi_1 = np.array([1, 0, 0], dtype=complex)
psi_2 = np.array([s, np.sqrt(1 - s**2), 0], dtype=complex)

# Construct the third vector to be symmetric with the first two.
x = s
y = (s - s**2) / np.sqrt(1 - s**2)
z = np.sqrt(1 - x**2 - y**2)
psi_3 = np.array([x, y, z], dtype=complex)

# The full ensemble lives in C^3 ⊗ C^3 and consists of 6 product states.
ensemble = [
    np.kron(psi_1, psi_2), np.kron(psi_1, psi_3),
    np.kron(psi_2, psi_1), np.kron(psi_2, psi_3),
    np.kron(psi_3, psi_1), np.kron(psi_3, psi_2),
]
```

**Defining the optimization problem**:

Next, we create a function that takes these states and formulates the SDP. This function uses the cvxpy library to
define the variables (the measurement operators), the objective (maximize success probability), and the physical
constraints (e.g., measurements must be valid, and for the unambiguous case, errors must be zero).

```python
import cvxpy

def to_density_matrix(psi: np.ndarray) -> np.ndarray:
    """Converts a state vector to a density matrix."""
    return np.outer(psi, psi.conj())

def get_optimal_prob(
    states: list[np.ndarray],
    strategy: str = "min_error",
    solver: str = "SCS",
) -> float:
    """Calculates the optimal success probability using an SDP."""
    dim = states[0].shape[0]
    n = len(states)
    probs = [1 / n] * n

    # For unambiguous discrimination, we add a "failure" outcome.
    num_measurements = n + 1 if strategy == "unambiguous" else n
    measurements = [cvxpy.Variable((dim, dim), hermitian=True) for _ in range(num_measurements)]

    # Objective: maximize the average probability of a correct guess.
    obj_func = sum(probs[i] * cvxpy.trace(to_density_matrix(states[i]) @ measurements[i]) for i in range(n))

    # Constraints for a valid measurement (POVM).
    constraints = [sum(measurements) == np.eye(dim)]
    constraints += [m >> 0 for m in measurements]

    # Additional zero-error constraints for the unambiguous game.
    if strategy == "unambiguous":
        for i in range(n):
            for j in range(n):
                if i != j:
                    constraints.append(cvxpy.trace(to_density_matrix(states[j]) @ measurements[i]) == 0)

    # Solve the SDP and return the optimal value.
    problem = cvxpy.Problem(cvxpy.Maximize(cvxpy.real(obj_func)), constraints)
    return problem.solve(solver=solver)
```

**Running the games and seeing the results**: 
Finally, we use our function to play both games and print the optimal success probabilities.


```python
# For the "Best Guess" (minimum-error) game.
p_G_me = get_optimal_prob(ensemble, strategy="min_error")

# For the "No Wrong Answers" (unambiguous) game.
p_G_ud = get_optimal_prob(ensemble, strategy="unambiguous")

print("--- Optimal Global Success Probabilities (p_G) ---")
print(f"Minimum-Error Discrimination: {p_G_me:.4f}")
print(f"Unambiguous Discrimination:   {p_G_ud:.4f}")

# The paper proves p_G_ud = (1-s)^2. Let's verify.
theoretical_ud_prob = (1 - s)**2
print(f"\nTheoretical Unambiguous Prob. (1-s)^2: {theoretical_ud_prob:.4f}")
```

This script produces the following output:

```
--- Optimal Global Success Probabilities (p_G) ---
Minimum-Error Discrimination: 0.8626
Unambiguous Discrimination:   0.2500

Theoretical Unambiguous Prob. (1-s)^2: 0.2500
```

This shows that the maximum achievable success rate depends heavily on which "game" is being played. As the paper
proves, the nonlocality of the ensemble appears for the minimum-error task but vanishes entirely for the unambiguous
one.

## The takeaway

The punchline is that "quantum nonlocality without entanglement" is not a fundamental attribute of a set of states
alone. It's a relational property that emerges from the interplay between the states and the specific question you're
asking about them. The very same set of states can be nonlocal under one set of rules but perfectly local under another.
The quantum weirdness can appear or disappear depending on how you choose to look.

For all the mathematical details and the nitty-gritty of the proofs, feel free to check out [the full paper](https://arxiv.org/abs/2506.20560).
