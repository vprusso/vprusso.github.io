"""Generate plots and outputs for the LRE blog post."""

import numpy as np
import matplotlib.pyplot as plt
import matplotlib.patches as mpatches
from math import comb
from cirq import (
    DensityMatrixSimulator,
    depolarize,
    LineQubit,
    Circuit,
    Moment,
    X, Y, H, CNOT, CZ, rx, ry, rz, ops,
)
from mitiq.lre import execute_with_lre
from mitiq.zne import execute_with_zne
from mitiq.lre.multivariate_scaling import multivariate_layer_scaling
from mitiq.lre.inference import multivariate_richardson_coefficients

plt.style.use("dark_background")
SAVE_DIR = "/Users/vincent.russo/Projects/research/vprusso.github.io/static/blog"


def make_layerwise_executor(base_noise, noise_variation):
    """
    Create an executor with layer-dependent noise.
    Each moment gets noise proportional to base_noise * (1 + variation * layer_index).
    This simulates realistic hardware where later layers accumulate more error.
    """
    def execute(circuit):
        noisy_moments = []
        num_moments = len(circuit.moments)
        for i, moment in enumerate(circuit.moments):
            # Noise increases with layer depth.
            layer_noise = base_noise * (1 + noise_variation * i / max(num_moments - 1, 1))
            layer_noise = min(layer_noise, 0.15)  # Cap to avoid unphysical values.
            noisy_moments.append(moment)
            # Add noise channel after each moment.
            qubits = sorted(circuit.all_qubits())
            noise_ops = [depolarize(p=layer_noise).on(q) for q in qubits]
            noisy_moments.append(Moment(noise_ops))
        noisy_circuit = Circuit(noisy_moments)
        rho = DensityMatrixSimulator().simulate(noisy_circuit).final_density_matrix
        return np.real(rho[0, 0])
    return execute


def make_uniform_executor(noise_level):
    """Create an executor with uniform depolarizing noise."""
    def execute(circuit):
        noisy_circuit = circuit.with_noise(depolarize(p=noise_level))
        rho = DensityMatrixSimulator().simulate(noisy_circuit).final_density_matrix
        return np.real(rho[0, 0])
    return execute


def ideal_executor(circuit):
    """Noiseless executor."""
    rho = DensityMatrixSimulator().simulate(circuit).final_density_matrix
    return np.real(rho[0, 0])


def make_test_circuit(num_qubits=3, depth=4):
    """Create a test circuit with varying layer structure."""
    qubits = LineQubit.range(num_qubits)
    moments = []

    for d in range(depth):
        # Single-qubit rotation layer.
        moments.append(Moment([rx(np.pi / (d + 2)).on(q) for q in qubits]))
        # Two-qubit entangling layer.
        pairs = []
        for i in range(0, num_qubits - 1, 2):
            pairs.append(CNOT(qubits[i], qubits[i + 1]))
        if pairs:
            moments.append(Moment(pairs))

    return Circuit(moments)


# --- Plot 1: LRE vs ZNE with layer-dependent noise (averaged over circuits) ---
print("=" * 60)
print("Plot 1: LRE vs ZNE with layer-dependent noise (averaged)")
print("=" * 60)

def make_random_circuit(num_qubits=3, depth=6):
    """Create a random circuit with rotation and CNOT layers."""
    qubits = LineQubit.range(num_qubits)
    moments = []
    for d in range(depth):
        rot_gates = [rx, ry, rz]
        rot_ops = [np.random.choice(rot_gates)(np.random.uniform(0, 2*np.pi)).on(q) for q in qubits]
        moments.append(Moment(rot_ops))
        pairs = []
        for i in range(0, num_qubits - 1, 2):
            pairs.append(CNOT(qubits[i], qubits[i + 1]))
        if pairs:
            moments.append(Moment(pairs))
    return Circuit(moments)

np.random.seed(42)  # Reproducibility.
num_circuits = 10
base_noise_levels = np.linspace(0.003, 0.012, 6)
noise_variation = 4.0

print(f"Averaging over {num_circuits} random circuits per noise level")

lre_mean_errors = []
zne_mean_errors = []
noisy_mean_errors = []
lre_std_errors = []
zne_std_errors = []

for base_noise in base_noise_levels:
    lre_errs = []
    zne_errs = []
    noisy_errs = []

    for _ in range(num_circuits):
        circuit = make_random_circuit(num_qubits=3, depth=6)
        ideal_value = ideal_executor(circuit)
        executor = make_layerwise_executor(base_noise, noise_variation)

        noisy_val = executor(circuit)
        lre_val = execute_with_lre(circuit, executor, degree=2, fold_multiplier=3)
        zne_val = execute_with_zne(circuit, executor)

        noisy_errs.append(abs(noisy_val - ideal_value))
        lre_errs.append(abs(lre_val - ideal_value))
        zne_errs.append(abs(zne_val - ideal_value))

    lre_mean_errors.append(np.mean(lre_errs))
    zne_mean_errors.append(np.mean(zne_errs))
    noisy_mean_errors.append(np.mean(noisy_errs))
    lre_std_errors.append(np.std(lre_errs))
    zne_std_errors.append(np.std(zne_errs))

    print(f"  base_noise={base_noise:.4f}: noisy={np.mean(noisy_errs):.5f}, "
          f"ZNE={np.mean(zne_errs):.5f}±{np.std(zne_errs):.5f}, "
          f"LRE={np.mean(lre_errs):.5f}±{np.std(lre_errs):.5f}")

fig, ax = plt.subplots(figsize=(8, 5))
ax.plot(base_noise_levels, noisy_mean_errors, "o--", color="#ff6b6b", label="Unmitigated", linewidth=2, markersize=7)
ax.errorbar(base_noise_levels, zne_mean_errors, yerr=zne_std_errors, fmt="s-", color="#ffd93d",
            label="ZNE (global folding)", linewidth=2, markersize=7, capsize=3)
ax.errorbar(base_noise_levels, lre_mean_errors, yerr=lre_std_errors, fmt="^-", color="#6bcb77",
            label="LRE (degree=2)", linewidth=2, markersize=7, capsize=3)
ax.set_xlabel("Base depolarizing noise level", fontsize=12)
ax.set_ylabel("Mean absolute error |estimated - ideal|", fontsize=12)
ax.set_title("LRE vs. ZNE: Layer-Dependent Noise (Averaged over 10 Circuits)", fontsize=14)
ax.legend(fontsize=11)
ax.grid(True, alpha=0.3)
ax.set_yscale("log")
plt.tight_layout()
plt.savefig(f"{SAVE_DIR}/lre_vs_zne_performance.png", dpi=150, bbox_inches="tight")
plt.close()
print(f"\nSaved: lre_vs_zne_performance.png")


# --- Plot 2: Effect of polynomial degree ---
print("\n" + "=" * 60)
print("Plot 2: Effect of polynomial degree on LRE accuracy")
print("=" * 60)

# Use a fixed test circuit for this comparison (not random).
test_circuit = make_test_circuit(num_qubits=3, depth=4)  # 8 moments - smaller for degree=3
test_ideal = ideal_executor(test_circuit)
print(f"Test circuit: {len(test_circuit.moments)} moments, ideal={test_ideal:.5f}")

base_noise = 0.005
noise_variation = 4.0
executor = make_layerwise_executor(base_noise, noise_variation)
noisy_baseline = abs(executor(test_circuit) - test_ideal)
print(f"Unmitigated error: {noisy_baseline:.5f}")

degrees = [1, 2]
fold_multipliers = [2, 3, 4]

fig, ax = plt.subplots(figsize=(8, 5))
colors = ["#ff6b6b", "#ffd93d", "#6bcb77"]

for deg, color in zip(degrees, colors):
    errors = []
    valid_fms = []
    for fm in fold_multipliers:
        try:
            lre_val = execute_with_lre(test_circuit, executor, degree=deg, fold_multiplier=fm)
            err = abs(lre_val - test_ideal)
            errors.append(err)
            valid_fms.append(fm)
            print(f"  degree={deg}, fold_multiplier={fm}: error={err:.6f}")
        except Exception as e:
            print(f"  degree={deg}, fold_multiplier={fm}: FAILED ({e})")
    if valid_fms:
        ax.plot(valid_fms, errors, "o-", color=color, label=f"degree={deg}",
                linewidth=2, markersize=8)

ax.axhline(noisy_baseline, color="#888888", linestyle="--",
           label="Unmitigated", linewidth=1.5)

ax.set_xlabel("Fold multiplier", fontsize=12)
ax.set_ylabel("Absolute error |estimated - ideal|", fontsize=12)
ax.set_title(f"LRE: Effect of Degree and Fold Multiplier", fontsize=14)
ax.legend(fontsize=11)
ax.grid(True, alpha=0.3)
ax.set_yscale("log")
ax.set_xticks(fold_multipliers)  # Integer ticks only.
plt.tight_layout()
plt.savefig(f"{SAVE_DIR}/lre_degree_comparison.png", dpi=150, bbox_inches="tight")
plt.close()
print(f"\nSaved: lre_degree_comparison.png")


# --- Plot 3: Number of noise-scaled circuits vs. layers and degree ---
print("\n" + "=" * 60)
print("Plot 3: Scaling of noise-scaled circuits (chunking motivation)")
print("=" * 60)

layers_range = range(2, 21)
fig, ax = plt.subplots(figsize=(8, 5))

for deg, color, marker in [(1, "#ff6b6b", "o"), (2, "#ffd93d", "s"), (3, "#6bcb77", "^")]:
    num_circuits = [comb(deg + l, deg) for l in layers_range]
    ax.plot(list(layers_range), num_circuits, f"{marker}-", color=color,
            label=f"degree={deg}", linewidth=2, markersize=6)

ax.set_xlabel("Number of circuit layers", fontsize=12)
ax.set_ylabel("Number of noise-scaled circuits (M)", fontsize=12)
ax.set_title("Circuit Overhead: Why Chunking Matters", fontsize=14)
ax.legend(fontsize=11)
ax.grid(True, alpha=0.3)
ax.set_yscale("log")
ax.set_xticks([2, 5, 10, 15, 20])  # Integer ticks only.
plt.tight_layout()
plt.savefig(f"{SAVE_DIR}/lre_scaling_overhead.png", dpi=150, bbox_inches="tight")
plt.close()
print(f"\nSaved: lre_scaling_overhead.png")


# --- Plot 4: Chunking visualization ---
print("\n" + "=" * 60)
print("Plot 4: Chunking illustration")
print("=" * 60)

fig, axes = plt.subplots(2, 1, figsize=(10, 5), gridspec_kw={"hspace": 0.6})

# Without chunking: each layer is independent.
ax = axes[0]
ax.set_title("Without chunking: each layer = independent variable", fontsize=12, pad=10)
num_layers = 8
colors_layers = plt.cm.Set3(np.linspace(0, 1, num_layers))
for i in range(num_layers):
    rect = mpatches.FancyBboxPatch(
        (i * 1.2 + 0.1, 0.2), 0.9, 0.6,
        boxstyle="round,pad=0.05", facecolor=colors_layers[i], edgecolor="white", linewidth=1.5
    )
    ax.add_patch(rect)
    ax.text(i * 1.2 + 0.55, 0.5, f"L{i+1}", ha="center", va="center",
            fontsize=9, fontweight="bold", color="#333")
    ax.text(i * 1.2 + 0.55, 0.05, f"\u03bb{i+1}", ha="center", va="center",
            fontsize=8, color="white")

ax.set_xlim(-0.1, num_layers * 1.2 + 2.5)
ax.set_ylim(-0.1, 1.1)
ax.axis("off")
num_circuits_no_chunk = comb(2 + num_layers, 2)
ax.text(num_layers * 1.2 + 0.3, 0.5,
        f"M = C({2+num_layers}, 2) = {num_circuits_no_chunk}\ncircuits required",
        fontsize=11, va="center", color="#ff6b6b", fontweight="bold")

# With chunking: layers grouped.
ax = axes[1]
ax.set_title("With chunking (num_chunks=4): groups of layers share a variable", fontsize=12, pad=10)
chunk_colors = ["#ff6b6b", "#ffd93d", "#6bcb77", "#74b9ff"]
chunk_size = 2
for i in range(num_layers):
    chunk_idx = i // chunk_size
    rect = mpatches.FancyBboxPatch(
        (i * 1.2 + 0.1, 0.2), 0.9, 0.6,
        boxstyle="round,pad=0.05", facecolor=chunk_colors[chunk_idx],
        edgecolor="white", linewidth=1.5
    )
    ax.add_patch(rect)
    ax.text(i * 1.2 + 0.55, 0.5, f"L{i+1}", ha="center", va="center",
            fontsize=9, fontweight="bold", color="#333")
    ax.text(i * 1.2 + 0.55, 0.05, f"\u03bb{chunk_idx+1}", ha="center", va="center",
            fontsize=8, color="white")

# Draw chunk brackets.
for c in range(4):
    x_start = c * chunk_size * 1.2 + 0.1
    x_end = x_start + chunk_size * 1.2 - 0.3
    ax.annotate("", xy=(x_start, 0.9), xytext=(x_end, 0.9),
                arrowprops=dict(arrowstyle="<->", color=chunk_colors[c], lw=2))
    ax.text((x_start + x_end) / 2, 0.97, f"Chunk {c+1}",
            ha="center", fontsize=8, color=chunk_colors[c])

ax.set_xlim(-0.1, num_layers * 1.2 + 2.5)
ax.set_ylim(-0.1, 1.15)
ax.axis("off")
num_circuits_chunk = comb(2 + 4, 2)
ax.text(num_layers * 1.2 + 0.3, 0.5,
        f"M = C({2+4}, 2) = {num_circuits_chunk}\ncircuits required",
        fontsize=11, va="center", color="#6bcb77", fontweight="bold")

plt.savefig(f"{SAVE_DIR}/lre_chunking.png", dpi=150, bbox_inches="tight")
plt.close()
print(f"Saved: lre_chunking.png")


# --- Code example outputs ---
print("\n" + "=" * 60)
print("Code example output (for blog post)")
print("=" * 60)

# Demo circuit: something with a nontrivial ideal value.
qubits = LineQubit.range(2)
circuit_demo = Circuit([
    Moment([H(qubits[0])]),
    Moment([CNOT(qubits[0], qubits[1])]),
    Moment([rx(np.pi / 4).on(qubits[0]), ry(np.pi / 3).on(qubits[1])]),
])

noise_level_demo = 0.02
executor_demo = make_uniform_executor(noise_level_demo)

ideal_value_demo = ideal_executor(circuit_demo)
noisy_value = executor_demo(circuit_demo)
mitigated_value = execute_with_lre(
    circuit_demo, executor_demo, degree=2, fold_multiplier=3,
)

print(f"Ideal value:     {ideal_value_demo:.5f}")
print(f"Noisy value:     {noisy_value:.5f}")
print(f"Mitigated (LRE): {mitigated_value:.5f}")

# Under the hood example.
print("\n--- Under the hood ---")
noise_scaled_circuits = multivariate_layer_scaling(circuit_demo, degree=2, fold_multiplier=3)
print(f"Number of noise-scaled circuits: {len(noise_scaled_circuits)}")

noisy_exp_values = [executor_demo(circ) for circ in noise_scaled_circuits]
coefficients = multivariate_richardson_coefficients(
    circuit_demo, fold_multiplier=3, degree=2
)
mitigated_manual = sum(
    exp_val * coeff for exp_val, coeff in zip(noisy_exp_values, coefficients)
)
print(f"Mitigated (manual): {mitigated_manual:.5f}")

print("\n" + "=" * 60)
print("All plots generated successfully!")
print("=" * 60)
