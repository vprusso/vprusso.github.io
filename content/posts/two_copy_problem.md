+++
title = "The two-copy problem for quantum states"
date = "2025-01-08"
author = "Vincent Russo"
authorTwitter = "captainhamptons" #do not include @
cover = ""
tags = ["quantum_information", "quantum_state_distinguishability"]
keywords = ["quantum_information", "quantum_state_distinguishability"]
description = ""
showFullContent = false
readingTime = true
hideComments = true
draft=false
+++

Let \(n\) be an integer, let \(\mathcal{X}\) be a complex Euclidean space, let \(\rho_i \in \text{D}(\mathcal{X})\) be a
pure quantum state represented as a density operator, and let

$$
\eta = \left\{\left(\frac{1}{n}, \rho_1\right), \ldots, \left(\frac{1}{n}, \rho_n\right)\right\} \subset \mathcal{X}
$$

be an ensemble of pure and mutually orthogonal quantum states. Define \(\eta^{\otimes 2}\) as the two-copy ensemble where

$$
\eta^{\otimes 2} = \left\{\left(\frac{1}{n}, \rho_1 \otimes \rho_1\right), \ldots, \left(\frac{1}{n}, \rho_n \otimes \rho_n\right)\right\} 
\subset \mathcal{X} \otimes \mathcal{X}.
$$

**Question**: Does there exist an ensemble \(\eta^{\otimes 2}\) such that the optimal LOCC, PPT, or SEP values is strictly less than \(1\)? 

Ghosh et al. [GKRS04](https://arxiv.org/abs/quant-ph/0205105) showed that orthogonal maximally entangled states can
always be perfectly discriminated via LOCC if two copies of each of the states are provided. However, the question above
is more general and asks whether two copies for any set of mutually orthogonal states are *always* sufficient for
perfectly distinguishing via LOCC, SEP, or PPT measurements. 

These classes of measurements abide by the following inclusion relationship:

$$
\text{LOCC} \subset \text{SEP} \subset \text{PPT} \subset \text{GLOBAL}
$$

The set of LOCC measurements has a seemingly complex mathematical structure and no tractable characterization of this
set is known. However, the set of PPT, SEP, and GLOBAL operators forms a closed convex cone and thus the problem of
state distinguishability can be phrased in terms of [semidefinite
programming](https://en.wikipedia.org/wiki/Semidefinite_programming) (SDP) optimization problems. 

The optimal value we obtain from these SDPs would be an upper bound on LOCC in the same way in which they are positioned
in the inclusion chain.  As the states are mutually orthogonal, the optimal GLOBAL values will always attain the trivial
upper bound of one. We therefore turn to the respective optimization problems for SEP and PPT measurements.

### Semidefinite program for PPT distinguishability

Let us first consider the primal problem for the PPT measurement SDP which was introduced in
[Cosentino12](https://arxiv.org/abs/1205.1031). Given a set of states \(\{\rho_1, \ldots, \rho_n\} \subset \mathcal{A}
\otimes \mathcal{B}\), we wish to find a corresponding set of PPT meaurement operators \(P_1, \ldots, P_n\) that
maximize the equation in the objective function.

$$
\begin{equation}
    \begin{aligned}
        \textbf{Primal:} \quad & \\
        \text{maximize:} \quad & \sum_{j=1}^k \langle P_j, \rho_j \rangle \\
        \text{subject to:} \quad & P_1 + \cdots + P_k = \mathbb{I}_{\mathcal{A}}
                                    \otimes \mathbb{I}_{\mathcal{B}}, \\
                                 & P_1, \ldots, P_k \in \text{PPT}(\mathcal{A} : \mathcal{B}).
    \end{aligned}
\end{equation}
$$

Note that we use \(\text{PPT}(\mathcal{A} : \mathcal{B})\) to represent the set of *PPT operators* over some complex
Euclidean spaces \(\mathcal{A}\) and \(\mathcal{B}\) where this is defined as the set of all positive semidefinite
operators \(P \in \text{Pos}(\mathcal{A} \otimes \mathcal{B})\) that satisfy \((T \otimes \mathbb{I}_{\mathcal{B}})(P)
\in \text{Pos}(\mathcal{A} \otimes \mathcal{B})\) where \(T\) denotes the linear transpose operation. We can implement
this SDP numerically in Python using the [`cvxpy`](https://github.com/cvxpy/cvxpy) and
[`toqito`](https://github.com/vprusso/toqito) modules.

```py
import cvxpy
import numpy as np
from toqito.channels import partial_transpose

def ppt_primal(
    states: list[np.ndarray],
    dims: list[int],
    sys: list[int],
) -> float:
    n, d = len(states), states[0].shape[0]

    # Define PSD variables for the measurements.
    meas = [cvxpy.Variable((d, d), hermitian=True) for _ in range(n)]

    # Constraints: PPT, PSD, and valid measurement collection.
    constraints = [
        *(partial_transpose(meas[i], sys=sys, dim=dims) >> 0 for i in range(n)),
        *(meas[i] >> 0 for i in range(n)),
        cvxpy.sum(meas) == np.identity(d)
    ]

    # Objective function: maximize the success probability.
    obj_func = [1/n * cvxpy.trace(states[i].conj().T @ meas[i]) for i in range(n)]
    objective = cvxpy.Maximize(cvxpy.real(cvxpy.sum(obj_func)))

    return cvxpy.Problem(objective, constraints).solve()
```

Note that in addition to the states (that we provide to the function as density operators in `states`), we need to
provide a list, `dims`, that corresponds to the dimensions of the systems held by the bipartite parties. Additionally,
the `sys` argument is a list that informs what subsystems to perform the partial transpose on. If we are assuming that
each state is a bipartite state held by Alice and Bob, we want to perform the partial trace only on Alice's subsystem(s)
but not on Bob's.

As an example, consider the four Bell states

$$
\begin{equation}
    \begin{aligned}
        \ket{\psi_1} = \frac{1}{\sqrt{2}}\left(\ket{00} + \ket{11}\right), \quad
        \ket{\psi_2} &= \frac{1}{\sqrt{2}}\left(\ket{00} - \ket{11}\right), \\
        \ket{\psi_3} = \frac{1}{\sqrt{2}}\left(\ket{01} + \ket{10}\right), \quad
        \ket{\psi_4} &= \frac{1}{\sqrt{2}}\left(\ket{01} - \ket{10}\right).
    \end{aligned}
\end{equation}
$$

where \(\ket{\psi_i} \in \mathcal{A} \otimes \mathcal{B}\) such that \(\mathcal{A} = \mathcal{B} = \mathbb{C}^2\). Since
\(\rho_i = \ket{\psi_i}\bra{\psi_i} \in \mathcal{A} \otimes \mathcal{B}\), we only want to perform the partial transpose
on the first subsystem. Consider the following code:

```py
import numpy as np

e0, e1 = np.array([[1], [0]]), np.array([[0], [1]])

# Define the four Bell state vectors.
psi_1 = 1/np.sqrt(2) * (np.kron(e0, e0) + np.kron(e1, e1))
psi_2 = 1/np.sqrt(2) * (np.kron(e0, e0) - np.kron(e1, e1))
psi_3 = 1/np.sqrt(2) * (np.kron(e0, e1) + np.kron(e1, e0))
psi_4 = 1/np.sqrt(2) * (np.kron(e0, e1) - np.kron(e1, e0))

# Compute the corresponding density matrices.
rho_1 = psi_1 @ psi_1.conj().T
rho_2 = psi_2 @ psi_2.conj().T
rho_3 = psi_3 @ psi_3.conj().T
rho_4 = psi_4 @ psi_4.conj().T

# Compute the PPT-distinguishability of the four Bell states.
states = [rho_1, rho_2, rho_3, rho_4]
ppt_primal(states, dims=[2, 2], sys=[0])
```

Now, consider the "two-copy" setting for the four Bell states. That is, each state in the set is now \(\ket{\psi_i}
\otimes \ket{\psi_i} \in \mathcal{A}_1 \otimes \mathcal{B}_1 \otimes \mathcal{A}_2 \otimes \mathcal{B}_2\). In other
words, Alice's subsystems, the ones we want to perform the partial transpose over, are now the first and third
subsystems.

```py
two_copy_states = [np.kron(state, state) for state in states]
ppt_primal(two_copy_states, dims=[2, 2, 2, 2], sys=[0, 2])
```

Note that `0` and `2` are used instead of `1` and `3` for the subsystem labeling as Python (like many other languages)
uses zero-based indexing.

### Numerical search

Given that we have an implementation of the PPT SDP for quantum state distinguishability, we could attempt a numerical
approach to search for a counterexample for the two-copy problem. The approach would entail:

- Generate a set of \(n\) random mutually orthogonal quantum states.
- Compute the optimal PPT value for the corresponding "two-copy" set of states.

To compute a random set of states, we could use a fairly standard trick of using Gram-Schmidt orthogonalization to
obtain a set of \(n\) states of dimension \(d\).

```py
def generate_orthogonal_states(n: int, d: int) -> list[np.ndarray]:
    """Generate a set of random mutually orthogonal pure states."""
    if n > d:
        raise ValueError("Number of states cannot exceed the dimension.")

    # Generate random complex vectors.
    random_vectors = np.random.randn(n, d) + 1j * np.random.randn(n, d)

    # Apply Gram-Schmidt orthogonalization.
    orthogonal_states = []
    for v in random_vectors:
        # Subtract projections onto previously added states.
        for u in orthogonal_states:
            v -= np.dot(np.conj(u), v) * u
        # Normalize the vector.
        v /= np.linalg.norm(v)
        orthogonal_states.append(v)

    return orthogonal_states
```

Now that we have both the mechanism by which to generate sets of orthogonal states and to calculate the optimal
PPT-distinguishable value, we can simply pick a dimension, a number of trial to run, and keep running until we find
something whose optimal two-copy value is strictly less than one.

```py
import pickle

num_trials = 100
dim = 2
for trial in range(num_trials):
    states = generate_orthogonal_states(dim**2, dim**2)
    two_copy = [np.kron(state, state) for state in states]
    two_copy_opt, _ = ppt_primal(two_copy, dims=[dim, dim, dim, dim], sys=[0, 2])

    if not np.isclose(two_copy_opt, 1):
        print(f"Two-copy optimization value is not close to 1. Saving states...")
        with open("states.pkl", "wb") as f:
            pickle.dump(states, f)
```

Of course, we may never find any such example. Perhaps because one does not exist, the structure of the states are too
special or specific to stumble upon randomly, or we are just unlucky.

One thing to note here is that the problem scales quickly as a function of `dim`, the dimenion. As we increase `dim`,
the matrices scale exponentially, and therefore, will likely only be feasible for relatively small dimensions. 

Also, certain solvers tend to perform quite a bit better than others. For instance the [MOSEK](https://www.mosek.com/) solver
heuristically seems to be much better than either the free and stock [CVXOPT](https://cvxopt.org/) or
[SCS](https://yalmip.github.io/solver/scs/) solvers. MOSEK, however, is not free, (although there are options for
obtaining a trial license).

Another thing to note as well is that one could also consider using SDPs to calculate the SEP-distinguishability of the
states (as this would be a closer approximation to the LOCC value). However, optimizing over the set of SEP operators is
NP-hard and requires a hierarchy of SDPs that become progressively more computationally expensive to compute as you
climb the hierarchy. The [toqito](https://github.com/vprusso/toqito) library does have such functionality for computing
these hierarchies (for instance,
[symmetric_extension_hierarchy.py](https://github.com/vprusso/toqito/blob/master/toqito/state_opt/symmetric_extension_hierarchy.py)),
and these may prove interesting to investigate further. 

I'm personally quite curious to know the resolution to this question. Please feel free to reach out to me should you
want to discuss it further!