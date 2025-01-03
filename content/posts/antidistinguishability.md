+++
title = "Computational Tools for Quantum State Antidistinguishability"
date = "2025-01-01"
#dateFormat = "2006-01-02" # This value can be configured for per-post date formatting
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

Distinguishing between quantum states is a fundamental problem in quantum theory, where the aim is
to ascertain the state of a quantum system promised to be in one of a known set of states. 

```py
>>> # Generate a random collection of "n" states of dimension "d":
>>> n, d = 3, 3
>>> S = random_states(n=n, d=d)
>>> print(f"S(n={n}, d={d}) = \n{S}")
S(n=3, d=3) = 
[array([[-0.76030164+0.26041991j],
       [-0.03364073-0.39738476j],
       [-0.42462006-0.12154974j]]), array([[-0.70631974+0.23361175j],
       [-0.60188882-0.22286257j],
       [-0.17634133-0.05919318j]]), array([[ 0.28420146-0.03973524j],
       [-0.02869086-0.36906976j],
       [ 0.74954812+0.46775272j]])]
```

```
```

A *pure quantum state* is a unit vector \(\ket{\psi} \in \mathbb{C}^d\)

```py
import 
```
