+++
title = "Compressed sensing for efficient fidelity estimation of GHZ states"
date = "2026-05-01"
author = "Vincent Russo"
authorTwitter = "captainhamptons"
cover = ""
tags = ["quantum_information", "compressed_sensing", "ghz_states"]
keywords = ["quantum_information", "compressed_sensing", "ghz_states", "error_detection", "fidelity"]
description = "Interactive exploration of compressed sensing for GHZ state fidelity estimation and flag qubit placement for error detection."
showFullContent = false
readingTime = true
hideComments = false
Toc = false
draft = false
math = true
+++

<!-- CDN Libraries -->
<script src="https://d3js.org/d3.v7.min.js"></script>
<script src="https://cdn.plot.ly/plotly-2.35.2.min.js"></script>
<link rel="stylesheet" href="/blog/ghz_cs/ghz_widgets.css">

This post accompanies our paper
*"Compressed Sensing for Efficient Fidelity Estimation of GHZ States"*
([arXiv:2604.27824](https://arxiv.org/abs/2604.27824)) by Farrokh Labib, David Nicholaeff, Vincent Russo, and William J. Zeng.

We present an approach for preparing and verifying large GHZ states on quantum processors with
all-to-all connectivity. The two key ideas are:

1. **Flag qubits for error detection** -- strategically placed ancilla qubits that detect errors via
   parity checks, improving fidelity through post-selection.
2. **Compressed sensing for efficient verification** -- estimating fidelity with exponentially fewer
   measurements than traditional methods by exploiting the sparsity of parity oscillation signals.

Below, we walk through each idea with interactive visualizations so you can build intuition for how
they work.

## GHZ States

The \(N\)-qubit Greenberger-Horne-Zeilinger (GHZ) state is a maximally entangled state:

$$|\text{GHZ}\rangle = \frac{1}{\sqrt{2}}\left(|0\rangle^{\otimes N} + |1\rangle^{\otimes N}\right)$$

GHZ states are fundamental benchmarks for quantum hardware. They are useful for quantum secret
sharing, metrology, and error correction -- but they are also extremely fragile. Any single-qubit
error can destroy the entanglement, making both *preparation* and *verification* of large GHZ states
a serious challenge.

Recently, IBM demonstrated a 120-qubit GHZ state with fidelity above 0.5 in their
["Big Cats"](https://arxiv.org/abs/2502.05982) paper (Javadi-Abhari et al., 2025), using
low-overhead error detection ideas from
[Martiel et al.](https://arxiv.org/abs/2504.15725). The core technique is to use pairs of qubits as
parity checks that maximize "coverage" of the preparation circuit. Our work applies these same ideas
to trapped-ion hardware with all-to-all connectivity, where the binary tree circuit topology gives us
logarithmic depth and simplifies coverage-aware flag placement.

### Binary tree preparation

On hardware with all-to-all connectivity (like Quantinuum's trapped-ion systems), we can prepare an
\(N\)-qubit GHZ state in \(\log(N)\) depth using a binary tree of CNOT gates. Starting from a root
qubit in superposition, each CNOT spreads the entanglement to one more qubit, doubling the size at
each tree level.

This is preferable to the linear-depth chain approach used on nearest-neighbor
hardware, but errors near the root of the tree are especially dangerous -- they
propagate through all downstream qubits.

## Error Detection with Flag Qubits

The GHZ state has a useful stabilizer structure: \(Z_i Z_j = +1\) for any pair of qubits \(i, j\).
This means we can detect bit-flip errors by introducing an ancilla ("flag") qubit and applying CNOTs
from two data qubits to it. If the flag measures 0, no error was detected on the path between those
two qubits; if it measures 1, we discard that shot.

### Coverage

The key question is: *which pairs of qubits should we connect with flags?*

The **coverage** of a flag pair \((i, j)\) is the set of all nodes on the paths from \(i\) and \(j\)
back to their least common ancestor (LCA) in the preparation tree. An error on any qubit in this
coverage set will propagate to the flag and be detected. We often normalize by the total number of
qubits to report a **coverage ratio**.

We want to choose \(k\) pairs that maximize the total coverage -- the union of all covered nodes.
This is an instance of the classical *maximum coverage problem*: each candidate set is defined by a
leaf pair and the nodes on their paths to the LCA. The resulting objective is monotone submodular, so
the greedy algorithm that repeatedly picks the pair with the largest marginal coverage has a formal
\((1 - 1/e) \approx 63\%\) worst-case guarantee thanks to a theorem by Nemhauser, Wolsey, and Fisher.
This is the same guarantee we rely on in the paper. Because our GHZ preparation circuits are binary
trees, there may be opportunities to design tree-specific algorithms that do even better than the
general guarantee---identifying those improved strategies is an open question we highlight in the
conclusion of the paper.

With that caveat in mind, the greedy procedure works well in practice. Try it yourself below:

<div id="tree-coverage-widget" class="ghz-widget">
  <h4>Interactive: Flag Qubit Placement on Binary Tree</h4>
  <div class="controls">
    <div class="control-group">
      <label>Tree nodes (N): <span id="tc-n-val">15</span></label>
      <input type="range" id="tc-n" min="7" max="63" value="15" step="1">
    </div>
    <div class="control-group">
      <label>Flag pairs (k): <span id="tc-k-val">0</span></label>
      <input type="range" id="tc-k" min="0" max="5" value="0" step="1">
    </div>
    <div class="control-group" style="align-self: flex-end;">
      <button id="tc-step-btn">Step Through Greedy</button>
      <button id="tc-reset-btn" style="margin-top: 4px;">Reset</button>
    </div>
  </div>
  <div id="tc-tree-svg" style="width:100%; height:400px;"></div>
  <div class="step-indicator" id="tc-step-info"></div>
  <div class="results-panel" id="tc-results"></div>
</div>
<script src="/blog/ghz_cs/tree_coverage_widget.js"></script>

Red nodes are covered by the selected flag pairs -- errors on those nodes will be detected. Gray
nodes are uncovered. The gold arcs show which leaf pairs are connected by flag qubits. Notice how
just a few well-chosen pairs can cover the majority of the tree, especially the critical high-weight
nodes near the root.

## Estimating Fidelity: Parity Oscillation

Once we have prepared a (hopefully) good GHZ state, how do we measure its quality? The standard
metric is **fidelity**:

$$F = \frac{1}{2}\left(\langle P \rangle + \langle \chi \rangle\right)$$

where \(\langle P \rangle = \langle 0 | \rho | 0 \rangle + \langle 1 | \rho | 1 \rangle\) is the
**population** and \(\langle \chi \rangle = \langle 0 | \rho | 1 \rangle + \langle 1 | \rho | 0 \rangle\)
captures the **coherence**.

The population is easy to measure -- just prepare the state and measure in the computational basis.
The coherence is harder. The standard approach is **parity oscillation**: apply \(R_z(-\phi)\) followed
by \(R_y(-\pi/2)\) to every qubit and then measure in the computational basis. This implements the
global observable

$$\mathcal{P}(\phi) = \Big\langle \bigotimes_{j=1}^N (\cos \phi \, X_j + \sin \phi \, Y_j) \Big\rangle.$$

For an ideal \(N\)-qubit GHZ state, the signal oscillates as \(C \cos(N\phi + \theta)\). The phase
offset \(\theta\) accounts for coherent phase errors and corresponds to preparing a rotated state
\(|\mathrm{GHZ}_\theta\rangle = (|0^{\otimes N}\rangle + e^{i\theta} |1^{\otimes N}\rangle)/\sqrt{2}\).
By measuring at many different phases \(\phi\) and fitting the resulting cosine, we can estimate the
coherence amplitude \(C\) (and optionally \(\theta\)).

### The sampling problem

The oscillation frequency is \(N\) -- the number of qubits. By the Nyquist-Shannon theorem, we need
at least \(2N\) measurements to faithfully sample this signal, typically at angles
\(\phi_k = k\pi/(N+1)\) for \(k = 0, \dots, 2N-1\). For a 100-qubit GHZ state, that is at least 200
different phase circuits, each requiring thousands of shots. This quickly becomes expensive.

## Compressed Sensing: Fewer Measurements

Here is the key insight: the parity oscillation signal is **1-sparse** in the frequency domain. It
consists of a single cosine at frequency \(N\). We do not actually need to sample the full signal --
we just need to identify that one frequency and its amplitude.

This is exactly the setting where **compressed sensing** excels. Instead of \(2N\) measurements, we
can recover the signal from just \(M \sim \mathcal{O}(\log N)\) random measurements using the Lasso
(L1-regularized regression):

$$\min_{\beta} \frac{1}{2M} \|y - D\beta\|_2^2 + \alpha \|\beta\|_1$$

where \(D\) is a dictionary matrix with columns \(\cos(k\phi_i)\) and \(-\sin(k\phi_i)\) for
candidate frequencies \(k = 1, \ldots, N\), and \(y\) is the vector of measured parities.

The L1 penalty promotes sparsity -- most coefficients are driven to zero, and only the true
frequency survives. We then refine the amplitude estimate with ordinary least squares on just the
detected frequency.

Classical compressed sensing theory says that if only \(s\) coefficients are non-zero, a random
measurement design needs on the order of \(m \ge c s \log N\) samples for stable recovery. Our signal
is effectively \(s=2\) (one cosine and one sine term), so we only need logarithmically many parity
circuits in the number of qubits. In practice we choose \(M \approx 5 \log N\), matching the scaling
used in the paper's simulations and hardware experiments. This is an exponential improvement over the
\(\mathcal{O}(N)\) scaling of traditional parity oscillation and a double-exponential reduction
relative to full state tomography.

Try it below. Compare how parity oscillation (blue, which knows \(N\)) and compressed sensing (gold,
which discovers \(N\)) estimate the coherence from noisy data:

<div id="parity-cs-widget" class="ghz-widget">
  <h4>Interactive: Parity Oscillation vs Compressed Sensing</h4>
  <div class="controls">
    <div class="control-group">
      <label>Qubits (n): <span id="pcs-n-val">7</span></label>
      <input type="range" id="pcs-n" min="3" max="30" value="7" step="1">
    </div>
    <div class="control-group">
      <label>Noise (σ): <span id="pcs-noise-val">0.10</span></label>
      <input type="range" id="pcs-noise" min="0" max="0.5" value="0.1" step="0.01">
    </div>
    <div class="control-group">
      <label>Measurements (M): <span id="pcs-m-val">15</span></label>
      <input type="range" id="pcs-m" min="5" max="50" value="15" step="1">
    </div>
    <div class="control-group">
      <label>Lasso α: <span id="pcs-alpha-val">0.10</span></label>
      <input type="range" id="pcs-alpha" min="0.001" max="0.5" value="0.1" step="0.001">
    </div>
  </div>
  <div id="pcs-signal-plot" style="width:100%; height:350px;"></div>
  <div id="pcs-spectrum-plot" style="width:100%; height:250px;"></div>
  <div class="results-panel" id="pcs-results"></div>
</div>
<script src="/blog/ghz_cs/parity_cs_widget.js"></script>

A few things to notice as you play with the sliders:

- **Increase the number of qubits** to see the oscillation frequency increase. Compressed sensing
  handles this well because it searches over all candidate frequencies.
- **Increase the noise** to see both methods degrade -- but they degrade in different ways. Parity
  oscillation can overfit noise; CS tends to be more robust due to the sparsity constraint.
- **Reduce measurements** to see the advantage of CS. With very few measurements, curve fitting
  becomes unreliable, but CS can still identify the correct frequency.
- **Adjust Lasso α** to control the sparsity-data tradeoff. Too high and the signal is
  over-regularized; too low and noise frequencies leak through.

## Putting It Together

The fidelity \(F = (P + C)/2\) benefits from both innovations:

- **Flag qubits** improve both \(P\) and \(C\) by post-selecting away erroneous shots
- **Compressed sensing** lets us estimate \(C\) efficiently with fewer measurement circuits

The widget below shows a simplified analytical model of how fidelity improves as you add flag pairs.
The model assumes depolarizing noise with a given 2-qubit gate error rate:

<div id="fidelity-widget" class="ghz-widget">
  <h4>Interactive: Fidelity Improvement with Flag Qubits</h4>
  <div class="controls">
    <div class="control-group">
      <label>Qubits (N): <span id="fc-n-val">11</span></label>
      <input type="range" id="fc-n" min="5" max="40" value="11" step="1">
    </div>
    <div class="control-group">
      <label>2-qubit gate error (p₂q): <span id="fc-err-val">0.010</span></label>
      <input type="range" id="fc-err" min="0.001" max="0.05" value="0.01" step="0.001">
    </div>
    <div class="control-group">
      <label>Flag pairs (k): <span id="fc-k-val">0</span></label>
      <input type="range" id="fc-k" min="0" max="6" value="0" step="1">
    </div>
  </div>
  <div id="fc-bar-plot" style="width:100%; height:350px;"></div>
  <div class="results-panel" id="fc-results"></div>
</div>
<script src="/blog/ghz_cs/fidelity_comparison_widget.js"></script>

Notice how even a small number of flag pairs can meaningfully improve fidelity, especially for
moderate error rates. The "acceptance" rate shows the fraction of shots that survive post-selection
-- this is the cost of the improved fidelity.

## Summary

We showed that:

1. **Flag qubits** on binary-tree GHZ circuits can be positioned with a simple greedy algorithm that
   enjoys the classical \((1-1/e)\) performance guarantee for maximum coverage; designing tree-specific
   algorithms that beat this bound remains an open direction.
2. **Compressed sensing** allows estimating GHZ state coherence from \(\mathcal{O}(\log N)\)
   measurements instead of \(\mathcal{O}(N)\), a significant reduction for large states.
3. The combination of these techniques makes it practical to prepare and verify large, high-fidelity
   GHZ states on all-to-all connected hardware.

For the full details, proofs, and experimental results on Quantinuum hardware, see the paper:
*"Compressed Sensing for Efficient Fidelity Estimation of GHZ States"*
([arXiv:2604.27824](https://arxiv.org/abs/2604.27824)).

The code is available at
[github.com/unitaryfoundation/wigners-friend](https://github.com/unitaryfoundation/wigners-friend).
