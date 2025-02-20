+++
title = "Disproving a conjecture on quantum state antidistinguishability"
date = "2025-01-05"
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

I'm going to discuss a conjecture that got me interested in the topic of "quantum state antidistinguishability".

**Conjecture** [[Havlíček-Barret (2020)](https://arxiv.org/abs/1911.01927)]:

Let \(S = \{|\psi_1\rangle, \ldots, |\psi_n\rangle\} \subset \mathbb{C}^n\) be a set of \(n\) pure quantum states each
of dimension \(n\). Then \(S\) is antidistinguishable when

$$
    |\langle \psi_i | \psi_j \rangle| \leq \frac{n-2}{n-1}
$$
for all \(i \neq j\).

Before unpacking this statement more formally, I want to mention some points that drew me to it:

- The validity of the conjecture would imply the existence of a quantum communication task with an exponential
separation between classical and quantum communication complexity.

- The notion of "antidistinguishability" is closely related to a quantum state distinguishability; a topic that I've
been interested in and have previously worked on ([arXiv:1307.3232](https://arxiv.org/abs/1307.3232),
[arXiv:1408.6981](https://arxiv.org/abs/1408.6981), [arXiv:2106.08721](https://arxiv.org/abs/2106.08721), and
[arXiv:2406.13430](https://arxiv.org/abs/2406.13430), to name a few).

- Antidistinguishability has connections to the foundations of quantum mechanics. Specifically, in the [PBR
theorem](https://en.wikipedia.org/wiki/Pusey%E2%80%93Barrett%E2%80%93Rudolph_theorem), it was used (although the term
"antidistinguishable" was not used) as a key piece of machinery about the question of whether the quantum state
is ontological or epistemic.

- It's an intriguingly concise conjecture with little baggage and lends itself to numerical attack. This seemed like a
good way for me to kick the tires on my (at the time) newly developed [|toqito>](https://github.com/vprusso/toqito)
software package.

- I tend to excel at breaking things, so I figured that an attempt to disprove it would be fun and keep me out of
trouble.

The conjecture can be viewed as a statement about a set of unit vectors in a complex Euclidean space (pure quantum
states) and a property that a set of quantum states can possess called *antidistinguishability*. 

### Antidistinguishability

To describe antidistinguishability, let's consider the following setting:

**Problem**: 
Given a single copy of an arbitrary pure state (in a lab, not on paper), from a set of states, we want to figure out
exactly which one were *not* given to us: measuring it provides some information but causes the state to collapse.

**Approach**:
However, if we are given extra information about the state, sometimes we can figure out which state was (not) given to us.  

**Scenario**:
Suppose we are given (on paper) a set of potential states:

$$
    S = \{|\psi_1\rangle, |\psi_2\rangle, \ldots, |\psi_n\rangle \} \subset \mathbb{C}^d.
$$

Then we are given (in a lab) one of those \(n\) states. If we can successfully determine which states was *not* given to
us for every state in the set, then we say that the set of quantum states are *antidistinguishable*.

This scenario is depicted in the following ASCII image: Note that `--->` denotes the transmission of quantum information
whereas `===>` denotes the transmission of classical information (in this case, Bob's answer about the index of the
state).

```
   Alice                                  Bob
 ---------                              ---------  
|         |         |ψ_i⟩              |         |
|         |   ------------------>      |         |
| Prepare |           i                | Measure |
|         |   <=================       |         |
|         |                            |         |
 ---------                              --------- 
```

Alice selects one of the states \(\ket{\psi_i}\) from the set \(\{\ket{\psi_1}, \ldots, \ket{\psi_n}\}\) and sends
\(\ket{\psi_i}\) to Bob. Bob needs to return an index "i". We say that Bob's answer is "correct" if the index "i" he
returns is *not* the index corresponding to the index of the state \(\ket{\psi_i}\). If Bob can perform this task
correctly for each state in the set, then the states are antidistinguishable and otherwise, they are not.

For clarity, let's write a formal definition for what it means for a set of states to be antidistinguishable:

**Definition**: Let \(n\) and \(d\) be integers. A collection of quantum states 

$$
\begin{equation}
    S = \{|\psi_1\rangle, \ldots, |\psi_{n}\rangle\} \subset \mathbb{C}^d
\end{equation}
$$

are *antidistinguishable* if there exists a collection of positive operator value measurements (POVMs) \(\{M_1, \ldots,
M_{n}\}\) such that \(\langle \psi_i | M_i | \psi_i \rangle = 0\) for all \(1 \leq i \leq n\).

Recall that a collection of POVMs are positive semidefinite operators \(\{M_i : 1 \leq i \leq n\} \subset \mathbb{C}^d\)
that satisfy 

$$
\begin{equation}
    \sum_{i=1}^{n} M_i = \mathbb{I}_d.
\end{equation}
$$

Another way of phrasing this is that if such a valid set of measurement operators exists that gives an inner product value
of zero for each state in the set, then the set of states are antidistinguishable, and otherwise, they are not.

#### Example: Trine states   

Let's take a look at a set of states that we will show to be antidistinguishable (but interestingly are *not*
distinguishable, that is, they cannot be perfectly distinguished). Consider the so-called *trine states* which are a set
of three states, each of dimension two defined as

$$
\begin{equation}
    |\psi_1\rangle = |0\rangle, \quad
    |\psi_2\rangle = -\frac{1}{2}(|0\rangle + \sqrt{3}|1\rangle), \quad
    |\psi_3\rangle = -\frac{1}{2}(|0\rangle - \sqrt{3}|1\rangle).
\end{equation}
$$

We can define this set of states in Python like so:

```py
import numpy as np

e_0, e_1 = np.array([[1], [0]]), np.array([[0], [1]])

psi_1 = e_0
psi_2 = -1 / 2 * (e_0 + np.sqrt(3) * e_1)
psi_3 = -1 / 2 * (e_0 - np.sqrt(3) * e_1)

trine_states = [psi_1, psi_2, psi_3]
```

Here are a set of measurements we can verify that satisfy the antidistinguishability constraints. We will see a
method that we can use to obtain these directly later, but for now, let's just assume that we have a process to obtain
these from a black box.

$$
\begin{equation}
    M_1 = \frac{2}{3} (\mathbb{I} - |\psi_1\rangle \langle \psi_1|), \quad
    M_2 = \frac{2}{3} (\mathbb{I} - |\psi_2\rangle \langle \psi_2|), \quad
    M_3 = \frac{2}{3} (\mathbb{I} - |\psi_3\rangle \langle \psi_3|).
\end{equation}
$$

We will want to check the requisite properties of these measurements, so let's go ahead and define them numerically.

```py
M1 = 2/3 * (np.identity(2) - psi1 @ psi1.conj().T)
M2 = 2/3 * (np.identity(2) - psi2 @ psi2.conj().T)
M3 = 2/3 * (np.identity(2) - psi3 @ psi3.conj().T)
```

In order for \(M_1\), \(M_2\), and \(M_3\) to constitute as valid POVMs, each of these matrices must be positive
semidefinite and we must ensure that \(\sum_{i \in \{1,2,3\}} M_i = \mathbb{I}_2\). It's straightforward to confirm that
the matrices are positive semidefinite by inspection and we can also see that they do indeed sum to the identity
operator.

```py
>>> print(f"M_1 + M_2 + M_3: \n {M1 + M2 + M3}")
M_1 + M_2 + M_3: 
 [[1. 0.]
 [0. 1.]]
```

Next, we must show that these measurements satisfy \(\langle \psi_i | M_i | \psi_i \rangle = 0\) for all \(i \in
\{1,2,3\}\). Indeed, for the measurements we have defined, we can check that this is the case.

```py
>>> print(f"<𝛙_1| M_1 |𝛙_1>: ", (psi1.reshape(1, -1)[0] @ M1 @ psi1)[0])
>>> print(f"<𝛙_2| M_2 |𝛙_2>: ", (psi2.reshape(1, -1)[0] @ M2 @ psi2)[0])
>>> print(f"<𝛙_3| M_3 |𝛙_3>: ", (psi3.reshape(1, -1)[0] @ M3 @ psi3)[0])
<𝛙_1| M_1 |𝛙_1>:  0.0
<𝛙_2| M_2 |𝛙_2>:  6.999554767325977e-17
<𝛙_3| M_3 |𝛙_3>:  6.999554767325977e-17
```

Since we have exhibited a set of measurements \(\{M_i: i \in \{1,2,3\}\} \subset \text{Pos}(\mathbb{C^d})\) that satisfy

$$
\begin{equation}
    \langle \psi_i | M_i | \psi_i \rangle = 0 
    \quad \text{and} \quad
    \sum_{i \in \{1,2,3\}} M_i = \mathbb{I}_2
\end{equation}
$$

for all \(i\), we conclude that the trine states are antidistinguishable. So, we have shown that the trine states are
antidistinguishable by exhibiting a set of measurement operators that satisfy the necessary criteria. 

But where did these measurements come from and how can we construct such a set of measurements (if such a set exists)
for an arbitrary set of quantum states? For this, we require the technique of semidefinite programming.

### Semidefinite program for determining antidistinguishability

[Semidefinite programming](https://en.wikipedia.org/wiki/Semidefinite_programming) is a technique for optimizing over
positive semidefinite (PSD) matrices. Conveniently, in quantum information, many of the objects of interest (quantum
states, channels, and measurements) can all be represented by positive semidefinite matrices. 

In general semidefinite programs (SDPs) are:
- Generalization of linear programming.
- Powerful tool with many applications in quantum information.
- SDPs are efficiently solvable (polynomial time).
- Provides an upper bound (dual) and lower bound (primal) for the problem.
- Software packages for solving SDPs exist ([cvxpy](https://www.cvxpy.org/), [cvxopt](https://cvxopt.org/), [picos](https://picos-api.gitlab.io/picos/complex.html), etc.).

[Jamie Sikora](https://sites.google.com/site/jamiesikora/home) has compiled a list of useful SDP resources with a focus
on quantum information [here](https://sites.google.com/site/jamiesikora/sdp-resources?authuser=0).

Whether a collection of states \(\{|\psi_1 \rangle, |\psi_2\rangle, \ldots, |\psi_{n}\rangle \}\) are antidistinguishable
or not can be determined by the following semidefinite program.

$$
\begin{equation}
    \begin{aligned}
        \text{minimize:} \quad & \sum_{i=1}^{n} \langle \psi_i | M_i | \psi_i \rangle  \\
        \text{subject to:} \quad & \sum_{i=1}^{n} M_i = \mathbb{I}_{\mathcal{X}}, \\
                                    & M_i \succeq 0 \quad \forall \ 1 \leq i \leq n.
    \end{aligned}
\end{equation}
$$

In this SDP, we are optimizing over a set of \(n\) valid quantum measurements (this is what our constraints impose). If
the objective function yields a value of zero, this indicates that the set of states are indeed antidistinguishable. We
can numerically implement the primal problem using `cvxpy` for a given set of vectors specified as `numpy` arrays.

```py
    import cvxpy
    import numpy as np
    from toqito.matrix_ops import to_density_matrix

    def primal(vectors: list[np.nadarray]):
        n, d = len(vectors), vectors[0].shape[0]

        # Define PSD variables for the measurements.
        meas = [cvxpy.Variable((d, d), hermitian=True) for _ in range(n)]

        # Constraints: measurements are PSD and sum to identity.
        constraints = [meas[i] >> 0 for i in range(n)]
        constraints.append([cvxpy.sum(meas) == np.eye(d)])

        # Objective function: maximize the success probability.
        obj_func = [
            1 / n * cvxpy.trace(to_density_matrix(vectors[i]).conj().T @ meas[i])
            for i in range(n)
        ]

        objective = cvxpy.Minimize(cvxpy.real(cvxpy.sum(obj_func)))
        problem = cvxpy.Problem(objective, constraints)
        return problem.solve(), meas
```

Using a standard SDP recipe, we can construct the corresponding dual optimization problem. 

$$
\begin{equation}
    \begin{aligned}
        \text{maximize:} \quad & \text{Tr}(Y)  \\
        \text{subject to:} \quad & Y \preceq \ket{\psi_i}\bra{\psi_i}, \ \forall i \in \{1, \ldots, n\}.
    \end{aligned}
\end{equation}
$$

where \(Y\) is understood to be a Hermitian operator. Using `cvxpy`, we can code up the dual problem as well.

```py
    import cvxpy
    import numpy as np
    from toqito.matrix_ops import to_density_matrix

    def dual(vectors: list[np.ndarray]):
        # Define the dual problem.
        y_var = cvxpy.Variable((d, d), hermitian=True)
        constraints = [
            y_var << 1 / n * to_density_matrix(vector)
            for vector in vectors
        ]
        objective = cvxpy.Maximize(cvxpy.trace(cvxpy.real(y_var)))
        problem = cvxpy.Problem(objective, constraints)
        return problem.solve(), y_var
```

Through the magic of SDPs, this gives us a way to certify an upper bound for the specific instance of the problem we are
considering. In other words, for a given set of states, we can find a feasible variable \(Y\) that satisfies the
properties of the dual problem, we have a certificate to say that the upper bound is optimal. 

In the next section, we will see how we can use this property of the dual problem to disprove the conjecture for a given
set of states, but first, let's take another look at the trine states with this SDP in our toolbelt.

#### Example: Revisiting the trine states

Consider again the trine states from the previous example. We can determine that they are antidistinguishable by way of
the antidistinguishability SDP. 

```py
>>> opt_value, measurements = primal(trine_states)
>>> print(f"Optimal SDP value: {opt_value}")
Optimal SDP value: 4.334787693145857e-08
```

The SDP not only gives us the optimal value, which is \(0\) in this case, indicating that the states are
antidistinguishable, but we also get a set of optimal measurement operators. 

```py
>>> print(f"M1: \n {np.around(measurements[0], decimals=5)}")
>>> print(f"M2: \n {np.around(measurements[1], decimals=5)}")
>>> print(f"M3: \n {np.around(measurements[2], decimals=5)}")
M1: 
 [[0.     +0.j 0.     +0.j]
 [0.     +0.j 0.66664+0.j]]
M2: 
 [[ 0.5    +0.j -0.28869+0.j]
 [-0.28869+0.j  0.16668+0.j]]
M3: 
 [[0.5    +0.j 0.28869+0.j]
 [0.28869+0.j 0.16668+0.j]]
```

These should look familiar to the measurements we explicitly constructed earlier.

### Disproving the conjecture

Now that we have defined antidistinguishability, let's return to thinking about the conjecture at the beginning of this
blog post. 

If we want to disprove it, we would need to find a counterexample. We also need to be aware that when \(n = 2\) or \(n =
3\), the RHS of the conjectured equation is \(0\) or \(1/2\), respectively, which are true (and tight). So if any
counterexamples exist, we need to restrict our search to \(n \geq 4\).

And unceremonously, that is precisely what can be done:

- Generate a random set of \(n\) quantum states each of dimension \(n\).
- Check if the conjectured bound is satisfied:
- Check if the states are antidistinguishable (using the SDP).
- If the bound is satisfied but the states are not antidistinguishable, we have our counterexample.

The following snippet of code follows this procedure for a fixed number of randomly generated examples. 

```py
# Generate a random collection of "n" states of dimension "d":
from toqito.rand import random_states

def is_bound_satisfied(S: np.ndarray) -> bool:
    for i, _ in enumerate(S):
        for j, _ in enumerate(S):
            if i != j:
                ip_val = np.abs(np.trace(S[i].conj().T * S[j].reshape(-1, 1)))

                # If |<Ψ_i|Ψ_j>| > (d − 2)/(d − 1) for some i != j, return False.
                if ip_val > (len(S) - 2)/(len(S) - 1):
                    return True
    return False

n = 4
num_tests = 10_000
for i in range(num_tests):
    S = random_states(n=n, d=n)
    dual_val, y_var = dual(S)

    print(f"Is conjectured bound satisfied: {is_bound_satisfied(S)}")
    print(f"Is antidistinguishable: {dual(S)}")
```

After running the code for a long while, we were able to stumble upon the following counterexample.

**Counterexample** [[Russo–Sikora, (2022)](https://arxiv.org/abs/2206.08313)]: 
For \(n=4\), the conjecture states that if \(|\langle \psi_i | \psi_j \rangle| \leq 2/3 \approx 0.6666\) for all \(i \neq
j\) then \(S\) is antidistinguishable. A numerical search was able to exhibit a non-antidistinguishable set of states with
\(|\langle \psi_i | \psi_j \rangle| \leq 0.6451\) for all \(i \neq j\).

While this counterexample is not unique, the one that was found and used in our paper was the following:

$$
\begin{equation}
    \begin{aligned} 
        |\psi_1\rangle = \begin{bmatrix} 
             +0.50127198 - 0.037607i \\ 
            -0.00698152 - 0.590973i \\ 
             +0.08186514 - 0.4497548i \\
            -0.01299883 + 0.43458491i 
        \end{bmatrix}, &\quad
        |\psi_2\rangle = \begin{bmatrix} 
            -0.07115345 - 0.27080326i \\ 
             +0.82047712 + 0.26320823i \\ 
             +0.22105089 - 0.2091996i \\ 
            -0.23575591 - 0.1758769i       
        \end{bmatrix}, \\ 
        |\psi_3\rangle = \begin{bmatrix} 
            +0.31360906 + 0.46339313i \\ 
           -0.0465825 - 0.47825017i \\ 
           -0.10470394 - 0.11776404i \\ 
            +0.60231515 + 0.26154959i 
        \end{bmatrix}, &\quad
        |\psi_4\rangle = \begin{bmatrix} 
            -0.53532122 - 0.03654632i \\
             +0.40955941 - 0.15150576i \\ 
            -0.05741386 + 0.23873985i \\
            -0.4737113 - 0.48652564i \\ 
        \end{bmatrix}.
    \end{aligned}
\end{equation} 
$$

We can observe that the above set of \(4\) states violates the conjecture.

```py
dim = 4
S = np.array(
    [
        [
            0.50127198 - 0.037607j,
            -0.00698152 - 0.590973j,
            0.08186514 - 0.4497548j,
            -0.01299883 + 0.43458491j,
        ],
        [
            -0.07115345 - 0.27080326j,
            0.82047712 + 0.26320823j,
            0.22105089 - 0.2091996j,
            -0.23575591 - 0.1758769j,
        ],
        [
            0.31360906 + 0.46339313j,
            -0.0465825 - 0.47825017j,
            -0.10470394 - 0.11776404j,
            0.60231515 + 0.26154959j,
        ],
        [
            -0.53532122 - 0.03654632j,
            0.40955941 - 0.15150576j,
            -0.05741386 + 0.23873985j,
            -0.4737113 - 0.48652564j,
        ],
    ]
)

# Is conjectured bound satisfied: True
print(f"Is conjectured bound satisfied: {is_bound_satisfied(S)}")
# Is antidistinguishable: False
print(f"Is antidistinguishable: {dual(S)}")
```

The nice thing about the code is that not only do we have access to the dual value, but also the dual variable, \(Y\)
which gives us a certificate to verify that this is an upper bound for this choice of states. I'll omit this check
explicitly here, but this is precisely what we do in [arXiv:2206.08313](https://arxiv.org/abs/2206.08313).

Now, finding a counterexample and breaking things is fine, but it's a bit unsatisfactory. In a follow-up work, we were
able to patch up the conjectured statement into the following theorem.

**Theorem** [[Johnston-Russo-Sikora, (2023)](https://arxiv.org/abs/2311.17047)]: 

Let \(n \geq 2\) be an integer and let \(S = \{|\psi_1\rangle, |\psi_2\rangle, \ldots, |\psi_n\rangle \}\). If

$$
    \begin{equation}
        |\langle \psi_i | \psi_j \rangle| \leq \frac{1}{\sqrt{2}} \sqrt{\frac{n-2}{n-1}}
    \end{equation}
$$

for all \(i \neq j\), then \(S\) is antidistinguishable.

I'll leave the details of this to our paper, but will mention that:

- When \(n = 2, 3\), or \(4\), the RHS bound is \(0\), \(1/2\), or \(1/\sqrt{3}\) respectively, which are tight.

- Unknown if it’s tight for \(n \geq 5\).

There is certainly a lot more that can be said on the topic, and I look forward to continuing to doing so in the
future!
