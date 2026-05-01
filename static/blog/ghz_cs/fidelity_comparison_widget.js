(function () {
    'use strict';

    // Theme colors matching Hugo terminal theme
    const COLORS = {
        bg: '#1a170f',
        text: '#eceae5',
        accent: '#eec35e',
        grid: 'rgba(236,234,229,0.1)',
        zeroline: 'rgba(236,234,229,0.2)',
        population: '#2ecc71',
        coherence: '#3498db',
        fidelity: '#e74c3c',
        populationFlag: '#27ae60',
        coherenceFlag: '#2980b9',
        fidelityFlag: '#c0392b'
    };

    const darkLayout = {
        paper_bgcolor: COLORS.bg,
        plot_bgcolor: COLORS.bg,
        font: { family: '"Fira Code", monospace', color: COLORS.text, size: 12 },
        xaxis: {
            gridcolor: COLORS.grid,
            zerolinecolor: COLORS.zeroline,
            tickfont: { size: 11 }
        },
        yaxis: {
            gridcolor: COLORS.grid,
            zerolinecolor: COLORS.zeroline,
            range: [0, 1.15],
            title: { text: 'Value', font: { size: 12 } },
            tickfont: { size: 11 }
        },
        margin: { t: 40, r: 20, b: 60, l: 60 },
        showlegend: true,
        legend: { font: { size: 11 }, orientation: 'h', y: -0.2 },
        barmode: 'group',
        bargap: 0.3,
        bargroupgap: 0.1
    };

    // Simple noise model for GHZ state fidelity
    // Population: probability of measuring |00...0> or |11...1>
    // Under depolarizing noise with 2-qubit gate error p:
    //   P ~ (1 + (1-2p)^{N-1}) / 2   (simplified model)
    //   C ~ (1-2p)^{N-1}              (coherence decays with each CNOT)
    // With k flag pairs covering a fraction r of the tree:
    //   Post-selection discards ~r*p fraction of shots per flag
    //   Effective error per covered gate reduced
    function computeFidelity(N, p2q, numPairs) {
        const nCNOT = N - 1;

        // Baseline (no flags)
        const cBase = Math.pow(1 - 2 * p2q, nCNOT);
        const pBase = (1 + Math.pow(1 - 2 * p2q, nCNOT)) / 2;
        const fBase = (pBase + Math.abs(cBase)) / 2;

        // With flags: compute coverage ratio from a simple model
        // For a binary tree with N nodes, k pairs cover approximately:
        // k=0: 0%, k=1: ~30-40%, k=2: ~50-60%, k=3: ~70-80%, etc.
        // Using the actual ratios from the paper's 25-node tree:
        const coverageTable = {
            0: 0.0,
            1: 0.32,
            2: 0.56,
            3: 0.72,
            4: 0.80,
            5: 0.88,
            6: 0.96
        };
        const coverage = coverageTable[Math.min(numPairs, 6)] || Math.min(numPairs * 0.15, 0.98);

        // Post-selection model:
        // Flag qubits detect bit-flip errors on covered edges.
        // Post-selection keeps only shots where all flags measure 0.
        // This effectively removes single-error events on covered gates.
        // Simplified: for covered gates, the effective error becomes p^2 instead of p
        const nCovered = Math.round(coverage * nCNOT);
        const nUncovered = nCNOT - nCovered;

        // Covered gates: errors are detected and discarded (post-selected away)
        // Effective coherence: product over uncovered gates only (covered ones are "perfect" after post-selection)
        const cFlag = Math.pow(1 - 2 * p2q, nUncovered) *
                       Math.pow(1 - 2 * p2q * p2q, nCovered);
        const pFlag = (1 + Math.pow(1 - 2 * p2q, nUncovered) *
                       Math.pow(1 - 2 * p2q * p2q, nCovered)) / 2;
        const fFlag = (pFlag + Math.abs(cFlag)) / 2;

        // Post-selection acceptance probability
        const acceptance = Math.pow(1 - p2q, nCovered);

        return {
            baseline: { P: pBase, C: Math.abs(cBase), F: fBase },
            flagged: { P: pFlag, C: Math.abs(cFlag), F: fFlag },
            coverage: coverage,
            acceptance: acceptance
        };
    }

    function update() {
        const N = parseInt(document.getElementById('fc-n').value);
        const p2q = parseFloat(document.getElementById('fc-err').value);
        const k = parseInt(document.getElementById('fc-k').value);

        document.getElementById('fc-n-val').textContent = N;
        document.getElementById('fc-err-val').textContent = p2q.toFixed(3);
        document.getElementById('fc-k-val').textContent = k;

        const result = computeFidelity(N, p2q, k);

        const categories = ['Population (P)', 'Coherence (C)', 'Fidelity (F)'];
        const baseVals = [result.baseline.P, result.baseline.C, result.baseline.F];
        const flagVals = [result.flagged.P, result.flagged.C, result.flagged.F];

        const traces = [
            {
                x: categories,
                y: baseVals,
                name: 'Baseline (no flags)',
                type: 'bar',
                marker: {
                    color: [COLORS.population, COLORS.coherence, COLORS.fidelity],
                    opacity: 0.6
                },
                text: baseVals.map(v => v.toFixed(3)),
                textposition: 'outside',
                textfont: { color: COLORS.text, size: 11 }
            },
            {
                x: categories,
                y: flagVals,
                name: `With ${k} flag pair${k !== 1 ? 's' : ''} (${(result.coverage * 100).toFixed(0)}% coverage)`,
                type: 'bar',
                marker: {
                    color: [COLORS.populationFlag, COLORS.coherenceFlag, COLORS.fidelityFlag],
                    opacity: 0.9
                },
                text: flagVals.map(v => v.toFixed(3)),
                textposition: 'outside',
                textfont: { color: COLORS.accent, size: 11 }
            }
        ];

        Plotly.react('fc-bar-plot', traces, {
            ...darkLayout,
            yaxis: {
                ...darkLayout.yaxis,
                title: { text: '' }
            },
            xaxis: {
                ...darkLayout.xaxis,
                tickfont: { size: 12, color: COLORS.text }
            }
        }, { responsive: true, displayModeBar: false });

        // Results panel
        const improvement = result.flagged.F - result.baseline.F;
        const improvePct = result.baseline.F > 0
            ? ((improvement / result.baseline.F) * 100).toFixed(1)
            : '0.0';

        document.getElementById('fc-results').innerHTML =
            `<span class="result-item">Baseline F: <span class="result-value">${result.baseline.F.toFixed(4)}</span></span>` +
            `<span class="result-item">Flagged F: <span class="result-value">${result.flagged.F.toFixed(4)}</span></span>` +
            `<span class="result-item">Improvement: <span class="result-value">+${(improvement * 100).toFixed(2)}% (+${improvePct}% rel.)</span></span>` +
            `<span class="result-item">Coverage: <span class="result-value">${(result.coverage * 100).toFixed(0)}%</span></span>` +
            `<span class="result-item">Acceptance: <span class="result-value">${(result.acceptance * 100).toFixed(1)}%</span></span>`;
    }

    function init() {
        const container = document.getElementById('fidelity-widget');
        if (!container) return;

        ['fc-n', 'fc-err', 'fc-k'].forEach(id => {
            document.getElementById(id).addEventListener('input', update);
        });

        update();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
