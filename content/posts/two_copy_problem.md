+++
title = "The two-copy problem for quantum states"
date = "2025-01-08"
author = "Vincent Russo"
authorTwitter = "captainhamptons"
cover = ""
tags = ["quantum_information", "quantum_state_distinguishability"]
keywords = ["quantum_information", "quantum_state_distinguishability"]
description = ""
showFullContent = false
readingTime = true
hideComments = false
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
        |\psi_1\rangle = \frac{1}{\sqrt{2}}\left(|00\rangle + |11\rangle\right), \quad
        |\psi_2\rangle &= \frac{1}{\sqrt{2}}\left(|00\rangle - |11\rangle\right), \\
        |\psi_3\rangle = \frac{1}{\sqrt{2}}\left(|01\rangle + |10\rangle\right), \quad
        |\psi_4\rangle &= \frac{1}{\sqrt{2}}\left(|01\rangle - |10\rangle\right).
    \end{aligned}
\end{equation}
$$

where \(|\psi_i\rangle \in \mathcal{A} \otimes \mathcal{B}\) such that \(\mathcal{A} = \mathcal{B} = \mathbb{C}^2\). Since
\(\rho_i = |\psi_i\rangle\langle\psi_i| \in \mathcal{A} \otimes \mathcal{B}\), we only want to perform the partial transpose
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

Now, consider the "two-copy" setting for the four Bell states. That is, each state in the set is now \(|\psi_i\rangle
\otimes |\psi_i\rangle \in \mathcal{A}_1 \otimes \mathcal{B}_1 \otimes \mathcal{A}_2 \otimes \mathcal{B}_2\). In other
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

# Update (August 2026)

Since writing this post I learned of work that settles a restricted form of the
question. It does not resolve the question as posed above, but it does show that
the question needs to be stated more carefully than I stated it.

## Adaptive versus generic protocols

There are two ways that Alice and Bob might use two copies. In an *adaptive*
protocol the copies are measured one at a time, and the measurement applied to
the second copy may depend on the outcome obtained from the first. In a
*non-adaptive* protocol each party addresses both of their systems at once, so
that Alice performs a single measurement on her halves of both copies while Bob
does the same. Neither class contains the other.

The optimal values computed by the SDPs above are taken over a class that is
larger than both. A PPT or separable operator on \(\mathcal{X} \otimes
\mathcal{X}\) is under no obligation to factor across the two copies, nor to
arise from measuring one copy and then the other. This distinction is what the
question above turns on, and I did not draw it originally.

## What is now known

Banik, Guha, Alimuddin, Kar, Halder, and Bhattacharya
[BGAKHB20](https://arxiv.org/abs/2011.09287) resolve the adaptive case for two
qubits. Their Theorem 3 states that any orthonormal basis of \(\mathbb{C}^2
\otimes \mathbb{C}^2\) containing exactly three entangled states requires three
copies for perfect discrimination under adaptive LOCC. Two copies therefore do
not suffice for such a basis under an adaptive protocol. One such basis is

$$
\left\{
|00\rangle, \quad
\frac{|01\rangle + |10\rangle}{\sqrt{2}}, \quad
\frac{1}{\sqrt{2}}\left(\frac{|01\rangle - |10\rangle}{\sqrt{2}} + |11\rangle\right), \quad
\frac{1}{\sqrt{2}}\left(\frac{|01\rangle - |10\rangle}{\sqrt{2}} - |11\rangle\right)
\right\},
$$

whose first element is a product state and whose remaining three elements are
entangled. The result is striking in that the Bell basis, in which all four
states are entangled, *is* two-copy distinguishable under an adaptive protocol.
A basis with less entanglement is here the harder one.

That paper is explicit that the non-adaptive case is not settled. The authors
write that their constructions "either will establish two-copy
indistinguishability (under generic protocol) or it will demonstrate
super-additivity of locally accessible information", and they leave the
construction of such ensembles open.

The question posed in this post is the generic one, so it remains open.

## What the numerics say

Running the search described above turns up nothing. The optimal PPT value for
the two-copy ensemble came back equal to one for random orthonormal bases in
\(2 \otimes 2\), \(2 \otimes 3\), and \(2 \otimes 4\), for structured families,
and for gradient-free minimization run directly against the two-copy value from
several starting points.

The most informative of these is a one-parameter family interpolating between a
maximally entangled basis and a product basis. Along that family the single-copy
value moves smoothly from \(1/2\) to \(1\), so the family covers the full range
from hard to trivial, while the two-copy value stays fixed at one throughout.

Two remarks bear on where a counterexample could live, though they constrain
less than I first supposed. A basis of product states is perfectly
distinguishable by the measurement onto those states, which is separable, so the
value is one for a trivial reason. The maximally entangled case is narrower than
I stated it above: [GKRS04](https://arxiv.org/abs/quant-ph/0205105) covers sets
drawn from the canonical generalized-Bell family
\(\frac{1}{\sqrt{d}}\sum_j e^{2\pi i jn/d}|j\rangle|(j+m) \bmod d\rangle\),
and its authors write that they are unable to proceed the same way for an
arbitrary set of \(d^2\) pairwise orthogonal maximally entangled states, giving
a \(3 \otimes 3\) case where the method fails. A maximally entangled basis
outside that family is therefore still a candidate, and the middle range is not
the only place to look.

One caution about reading such numerics, which cost me some time. The three
classes are ordered by inclusion, so their optimal values satisfy

$$
\omega_{\text{LOCC}} \leq \omega_{\text{SEP}} \leq \omega_{\text{PPT}}.
$$

A PPT value of one is consistent with a separable or LOCC value strictly below
one, and says nothing about either. The PPT computations above are evidence only
about the largest of the three classes.

## What the literature does and does not contain

A systematic search turned up one partial result worth recording. Shu
([EPJ Plus 136:1172](https://doi.org/10.1140/s13360-021-02182-5)) proves that any
\(N\) pairwise orthogonal *product* states in \(\mathbb{C}^m \otimes
\mathbb{C}^n\) are perfectly LOCC-distinguishable with \(\lceil N/4 \rceil\)
copies, so any set of at most eight orthogonal product states is two-copy
distinguishable. That covers no entangled ensemble, but it does transfer to SEP
and PPT for the reason given next.

There is a logical asymmetry here that is easy to get backwards, and I did. An
adaptive protocol is itself a measurement on the joint two-copy system, so every
achievability result stated for adaptive protocols is already valid for the
generic classes, and for SEP and PPT above them. The adaptive restriction
therefore matters only for *negative* results. A counterexample answering the
question must be a lower bound against a genuinely joint measurement, and no
bound of that kind appears in the literature.

I could find no treatment of the two-copy PPT question for orthogonal pure
states anywhere in the literature. The multi-copy PPT results I am aware of, such
as those of [YDY14](https://arxiv.org/abs/1209.4222) and
[LWD17](https://arxiv.org/abs/1702.00231), all concern ensembles containing a
mixed state, and the reason is structural rather than incidental. That machinery
requires the support of one ensemble member to be strongly PPT-unextendible, and
the minimum dimension of such a subspace in an \(m \otimes n\) system is
\(m + n - 1 \geq 3\). A pure state has support of dimension one, so the
mechanism can never be triggered by a pure-state ensemble. Relatedly, since
\(N-1\) copies always suffice for \(N\) orthogonal pure states, no pure
ensemble is *many*-copy indistinguishable at all, which is why that literature
never formulates the fixed two-copy question.

As before, I would be glad to hear from anyone who wants to discuss it.
