<!--
pandoc -t beamer nyc_meetup.md -o output.pdf && open output.pdf
Slides for NYC Quantum Meetup Lighting Talk
# Introduction
![alt text](logo.png "Logo Title Text 1")
% Vincent Russo
% 08-01-2020
-->
---
theme: metropolis
title: \|toqito>
subtitle: An open source Python library for studying various objects in quantum information.
author: Vincent Russo
date: April 4th, 2018
toc: false
slide_level: 2
header-includes: \metroset{progressbar=frametitle,sectionpage=progressbar}
---

# What is \|toqito>

![toqito logo](logo.png)

- toqito (Theory of Quantum Information Toolkit).

- Open source Python library for studying objects in quantum information.

- More "computer science" and "math" focused. Less "physics" focused.

# Building blocks

Quantum information consists of *states*, *channels*, and *measurements*:

- States: Data to be processed.

- Channels: Operations to perform.

- Measurements: Result of applying the operations on data.

![States, channels, and measurements.](scm.png)

- These ingredients can all be represented as matrices with specific properties. 

- In some ways, toqito is a glorified linear algebra module.

# States

# States: Bras and kets

Standard basis ket vectors are given as $|0 \rangle$ and $|1 \rangle$ where

\begin{align*}
    |0\rangle = [1, 0]^{T} \quad \text{and} \quad |1 \rangle [0, 1]^{T}
\end{align*}

```python
>>> # Create |0> vector.
>>> from toqito.states import basis
>>> basis(2, 0)
[[1]
[0]]
```

# States: Well-known states

# States: Properties

# States: Operations

# Channels


# Measurements





# Test

```python
class LogisticRegression(linear_model.LogisticRegression):

    def __init__(self,*args,**kwargs):
        super(LogisticRegression,self).__init__(*args,**kwargs)

    def fit(self, data_x, target_y):
        # Basil's magic formula
```

