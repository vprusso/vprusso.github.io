(function () {
  "use strict";

  // ---------------------------------------------------------------
  // Seeded PRNG (mulberry32) for reproducible random numbers
  // ---------------------------------------------------------------
  function mulberry32(seed) {
    return function () {
      seed |= 0;
      seed = (seed + 0x6d2b79f5) | 0;
      var t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }

  // Box-Muller transform: two uniform -> two normal
  function gaussianPair(rng) {
    var u1 = rng();
    var u2 = rng();
    // Avoid log(0)
    if (u1 < 1e-15) u1 = 1e-15;
    var mag = Math.sqrt(-2.0 * Math.log(u1));
    var z0 = mag * Math.cos(2.0 * Math.PI * u2);
    var z1 = mag * Math.sin(2.0 * Math.PI * u2);
    return [z0, z1];
  }

  // Generate array of n Gaussian(0,1) samples using seeded rng
  function gaussianArray(rng, n) {
    var out = new Float64Array(n);
    for (var i = 0; i < n; i += 2) {
      var pair = gaussianPair(rng);
      out[i] = pair[0];
      if (i + 1 < n) out[i + 1] = pair[1];
    }
    return out;
  }

  // ---------------------------------------------------------------
  // Linear algebra helpers (no external deps)
  // ---------------------------------------------------------------

  // Dot product of two arrays
  function dot(a, b) {
    var s = 0.0;
    for (var i = 0; i < a.length; i++) s += a[i] * b[i];
    return s;
  }

  // Extract column j from a row-major matrix (rows x cols)
  function getColumn(mat, rows, cols, j) {
    var col = new Float64Array(rows);
    for (var i = 0; i < rows; i++) col[i] = mat[i * cols + j];
    return col;
  }

  // Solve 2x2 normal equations: (A^T A)^{-1} A^T y
  // A is M x 2, y is M x 1.  Returns [x0, x1].
  function solveOLS2(A, y, M) {
    // A^T A  (2x2 symmetric)
    var a00 = 0, a01 = 0, a11 = 0;
    var b0 = 0, b1 = 0;
    for (var i = 0; i < M; i++) {
      var c0 = A[i * 2];
      var c1 = A[i * 2 + 1];
      a00 += c0 * c0;
      a01 += c0 * c1;
      a11 += c1 * c1;
      b0 += c0 * y[i];
      b1 += c1 * y[i];
    }
    var det = a00 * a11 - a01 * a01;
    if (Math.abs(det) < 1e-30) return [0, 0];
    var x0 = (a11 * b0 - a01 * b1) / det;
    var x1 = (a00 * b1 - a01 * b0) / det;
    return [x0, x1];
  }

  // ---------------------------------------------------------------
  // Soft-threshold for Lasso coordinate descent
  // ---------------------------------------------------------------
  function softThreshold(x, t) {
    if (x > t) return x - t;
    if (x < -t) return x + t;
    return 0.0;
  }

  // ---------------------------------------------------------------
  // Core estimation routines
  // ---------------------------------------------------------------

  var C_TRUE = 0.85;
  var THETA_TRUE = 0.3;
  var MAX_FREQ = 50;
  var LASSO_ITERS = 200;

  // Generate synthetic data
  function generateData(n, M, noiseLevel, rng) {
    // Random phases in [0, 2pi], sorted
    var phases = new Float64Array(M);
    for (var i = 0; i < M; i++) phases[i] = rng() * 2.0 * Math.PI;
    phases.sort();

    // True signal: s(phi) = C_true * cos(n*phi + theta_true)
    var signal = new Float64Array(M);
    var noisy = new Float64Array(M);
    var noise = gaussianArray(rng, M);
    for (var i = 0; i < M; i++) {
      signal[i] = C_TRUE * Math.cos(n * phases[i] + THETA_TRUE);
      noisy[i] = signal[i] + noiseLevel * noise[i];
    }

    return { phases: phases, signal: signal, noisy: noisy };
  }

  // Parity oscillation fit (n is known)
  function parityOscillationFit(phases, y, n) {
    var M = phases.length;
    // Build M x 2 matrix: [cos(n*phi), -sin(n*phi)]
    var A = new Float64Array(M * 2);
    for (var i = 0; i < M; i++) {
      A[i * 2] = Math.cos(n * phases[i]);
      A[i * 2 + 1] = -Math.sin(n * phases[i]);
    }
    var ab = solveOLS2(A, y, M);
    var a = ab[0], b = ab[1];
    var C = Math.sqrt(a * a + b * b);
    var theta = Math.atan2(b, a);
    return { C: C, theta: theta, a: a, b: b };
  }

  // Compressed sensing estimation (n is unknown)
  function compressedSensingFit(phases, y, alpha) {
    var M = phases.length;
    var maxFreq = MAX_FREQ;
    var numCols = 2 * maxFreq;

    // Build dictionary matrix D: M x (2*maxFreq), row-major
    // Columns 0..maxFreq-1 are cos(k*phi) for k=1..maxFreq
    // Columns maxFreq..2*maxFreq-1 are -sin(k*phi) for k=1..maxFreq
    var D = new Float64Array(M * numCols);
    for (var i = 0; i < M; i++) {
      for (var k = 0; k < maxFreq; k++) {
        var freq = k + 1;
        D[i * numCols + k] = Math.cos(freq * phases[i]);
        D[i * numCols + maxFreq + k] = -Math.sin(freq * phases[i]);
      }
    }

    // Precompute column norms squared (z_j = ||D[:,j]||^2 / M)
    var zArr = new Float64Array(numCols);
    for (var j = 0; j < numCols; j++) {
      var col = getColumn(D, M, numCols, j);
      zArr[j] = dot(col, col) / M;
    }

    // Coordinate descent Lasso
    var beta = new Float64Array(numCols); // init zeros

    // Precompute D^T y / M for warm start correlation
    // (not strictly needed, coordinate descent will converge)

    // We need to maintain the residual r = y - D*beta efficiently
    var residual = new Float64Array(M);
    for (var i = 0; i < M; i++) residual[i] = y[i];

    for (var iter = 0; iter < LASSO_ITERS; iter++) {
      for (var j = 0; j < numCols; j++) {
        var oldBeta = beta[j];
        if (oldBeta !== 0) {
          // Add back contribution of column j to residual
          for (var i = 0; i < M; i++) {
            residual[i] += D[i * numCols + j] * oldBeta;
          }
        }

        // Compute rho = D[:,j]^T * residual / M
        var rho = 0.0;
        for (var i = 0; i < M; i++) {
          rho += D[i * numCols + j] * residual[i];
        }
        rho /= M;

        // Update beta[j]
        var z = zArr[j];
        if (z < 1e-30) {
          beta[j] = 0;
        } else {
          beta[j] = softThreshold(rho, alpha) / z;
        }

        // Remove new contribution from residual
        if (beta[j] !== 0) {
          for (var i = 0; i < M; i++) {
            residual[i] -= D[i * numCols + j] * beta[j];
          }
        }
      }
    }

    // Compute magnitudes per frequency
    var magnitudes = new Float64Array(maxFreq);
    for (var k = 0; k < maxFreq; k++) {
      var aCoeff = beta[k];
      var bCoeff = beta[maxFreq + k];
      magnitudes[k] = Math.sqrt(aCoeff * aCoeff + bCoeff * bCoeff);
    }

    // Find best frequency
    var bestIdx = 0;
    var bestMag = magnitudes[0];
    for (var k = 1; k < maxFreq; k++) {
      if (magnitudes[k] > bestMag) {
        bestMag = magnitudes[k];
        bestIdx = k;
      }
    }
    var recoveredN = bestIdx + 1; // 1-indexed

    // Refine with OLS on recovered frequency
    var refined = parityOscillationFit(phases, y, recoveredN);

    return {
      C: refined.C,
      theta: refined.theta,
      a: refined.a,
      b: refined.b,
      recoveredN: recoveredN,
      magnitudes: magnitudes,
    };
  }

  // ---------------------------------------------------------------
  // Generate fitted curves over a dense grid for plotting
  // ---------------------------------------------------------------
  function fittedCurve(phiArr, a, b, freq) {
    var out = new Float64Array(phiArr.length);
    for (var i = 0; i < phiArr.length; i++) {
      out[i] = a * Math.cos(freq * phiArr[i]) - b * Math.sin(freq * phiArr[i]);
    }
    return out;
  }

  // ---------------------------------------------------------------
  // Plotly rendering
  // ---------------------------------------------------------------

  var darkTheme = {
    paper_bgcolor: "#1a170f",
    plot_bgcolor: "#1a170f",
    font: { family: '"Fira Code", monospace', color: "#eceae5", size: 12 },
  };

  var axisStyle = {
    gridcolor: "rgba(236,234,229,0.1)",
    zerolinecolor: "rgba(236,234,229,0.15)",
    tickfont: { color: "#eceae5" },
    titlefont: { color: "#eceae5" },
  };

  function renderPlots(n, M, noiseLevel, alpha) {
    // Create a deterministic seed from all parameters
    var seed =
      n * 1000000 +
      M * 10000 +
      Math.round(noiseLevel * 1000) * 100 +
      Math.round(alpha * 1000);
    var rng = mulberry32(seed);

    // Generate data
    var data = generateData(n, M, noiseLevel, rng);
    var phases = data.phases;
    var noisy = data.noisy;

    // Run parity oscillation fit (knows n)
    var poResult = parityOscillationFit(phases, noisy, n);

    // Run compressed sensing (does NOT know n)
    var csResult = compressedSensingFit(phases, noisy, alpha);

    // Dense phi grid for smooth curves
    var numDense = 300;
    var phiDense = new Float64Array(numDense);
    for (var i = 0; i < numDense; i++) {
      phiDense[i] = (i / (numDense - 1)) * 2.0 * Math.PI;
    }

    // True signal: C*cos(n*phi + theta)
    var trueCurveArr = new Array(numDense);
    for (var i = 0; i < numDense; i++) {
      trueCurveArr[i] =
        C_TRUE * Math.cos(n * phiDense[i] + THETA_TRUE);
    }

    var poCurve = fittedCurve(phiDense, poResult.a, poResult.b, n);
    var csCurve = fittedCurve(
      phiDense,
      csResult.a,
      csResult.b,
      csResult.recoveredN
    );

    // Convert typed arrays to normal arrays for Plotly
    var phiDenseArr = Array.from(phiDense);
    var phasesArr = Array.from(phases);
    var noisyArr = Array.from(noisy);
    var poCurveArr = Array.from(poCurve);
    var csCurveArr = Array.from(csCurve);

    // ---- Top plot: Signal ----
    var traceNoisy = {
      x: phasesArr,
      y: noisyArr,
      mode: "markers",
      type: "scatter",
      name: "Noisy data",
      marker: { color: "#eceae5", size: 7, opacity: 0.85 },
    };

    var traceTrue = {
      x: phiDenseArr,
      y: trueCurveArr,
      mode: "lines",
      type: "scatter",
      name: "True signal",
      line: { color: "#888888", dash: "dash", width: 2 },
    };

    var tracePO = {
      x: phiDenseArr,
      y: poCurveArr,
      mode: "lines",
      type: "scatter",
      name: "Parity osc. fit (n known)",
      line: { color: "#3498db", width: 2.5 },
    };

    var traceCS = {
      x: phiDenseArr,
      y: csCurveArr,
      mode: "lines",
      type: "scatter",
      name: "CS recovered fit",
      line: { color: "#eec35e", width: 2.5 },
    };

    var signalLayout = {
      paper_bgcolor: darkTheme.paper_bgcolor,
      plot_bgcolor: darkTheme.plot_bgcolor,
      font: darkTheme.font,
      margin: { t: 35, b: 50, l: 55, r: 20 },
      xaxis: Object.assign({}, axisStyle, { title: "Phase \u03c6" }),
      yaxis: Object.assign({}, axisStyle, { title: "Parity" }),
      legend: {
        x: 0.01,
        y: 0.99,
        bgcolor: "rgba(26,23,15,0.8)",
        bordercolor: "rgba(236,234,229,0.2)",
        borderwidth: 1,
        font: { size: 11, color: "#eceae5" },
      },
      title: {
        text: "Signal & Fits",
        font: { size: 14, color: "#eceae5" },
        x: 0.5,
      },
    };

    Plotly.react(
      "pcs-signal-plot",
      [traceNoisy, traceTrue, tracePO, traceCS],
      signalLayout,
      { responsive: true, displayModeBar: false }
    );

    // ---- Bottom plot: Frequency Spectrum ----
    var maxFreq = MAX_FREQ;
    var freqLabels = [];
    var magValues = [];
    var barColors = [];
    for (var k = 0; k < maxFreq; k++) {
      freqLabels.push(k + 1);
      magValues.push(csResult.magnitudes[k]);
      if (k + 1 === csResult.recoveredN) {
        barColors.push("#eec35e");
      } else {
        barColors.push("rgba(150,150,150,0.5)");
      }
    }

    var traceSpectrum = {
      x: freqLabels,
      y: magValues,
      type: "bar",
      marker: { color: barColors },
      name: "Lasso magnitude",
      showlegend: false,
    };

    // Vertical line at true n
    var spectrumShapes = [
      {
        type: "line",
        x0: n,
        x1: n,
        y0: 0,
        y1: 1,
        yref: "paper",
        line: { color: "#e74c3c", width: 2, dash: "dash" },
      },
    ];

    // Annotation for true n
    var spectrumAnnotations = [
      {
        x: n,
        y: 1.0,
        yref: "paper",
        text: "true n=" + n,
        showarrow: false,
        font: { color: "#e74c3c", size: 11 },
        yanchor: "bottom",
      },
    ];

    var spectrumLayout = {
      paper_bgcolor: darkTheme.paper_bgcolor,
      plot_bgcolor: darkTheme.plot_bgcolor,
      font: darkTheme.font,
      margin: { t: 35, b: 50, l: 55, r: 20 },
      xaxis: Object.assign({}, axisStyle, {
        title: "Frequency",
        dtick: 5,
      }),
      yaxis: Object.assign({}, axisStyle, { title: "Magnitude" }),
      shapes: spectrumShapes,
      annotations: spectrumAnnotations,
      title: {
        text: "Lasso Frequency Spectrum",
        font: { size: 14, color: "#eceae5" },
        x: 0.5,
      },
      bargap: 0.15,
    };

    Plotly.react(
      "pcs-spectrum-plot",
      [traceSpectrum],
      spectrumLayout,
      { responsive: true, displayModeBar: false }
    );

    // ---- Results panel ----
    var fidelityPO = 0.5 + 0.5 * poResult.C;
    var fidelityCS = 0.5 + 0.5 * csResult.C;
    var fidelityTrue = 0.5 + 0.5 * C_TRUE;

    var matchStr =
      csResult.recoveredN === n
        ? '<span style="color:#27ae60;">&#10003; correct</span>'
        : '<span style="color:#e74c3c;">&#10007; mismatch</span>';

    var html =
      '<table class="pcs-results-table">' +
      "<tr><th></th><th>True</th><th>Parity Osc.</th><th>Compressed Sensing</th></tr>" +
      "<tr><td>Coherence <em>C</em></td>" +
      "<td>" + C_TRUE.toFixed(4) + "</td>" +
      "<td>" + poResult.C.toFixed(4) + "</td>" +
      "<td>" + csResult.C.toFixed(4) + "</td></tr>" +
      "<tr><td>Fidelity</td>" +
      "<td>" + fidelityTrue.toFixed(4) + "</td>" +
      "<td>" + fidelityPO.toFixed(4) + "</td>" +
      "<td>" + fidelityCS.toFixed(4) + "</td></tr>" +
      "<tr><td>Frequency <em>n</em></td>" +
      "<td>" + n + "</td>" +
      '<td><span style="color:#888;">(given)</span></td>' +
      "<td>" + csResult.recoveredN + " " + matchStr + "</td></tr>" +
      "</table>";

    document.getElementById("pcs-results").innerHTML = html;
  }

  // ---------------------------------------------------------------
  // Slider wiring
  // ---------------------------------------------------------------
  function readSliders() {
    var n = parseInt(document.getElementById("pcs-n").value, 10);
    var noise = parseFloat(document.getElementById("pcs-noise").value);
    var M = parseInt(document.getElementById("pcs-m").value, 10);
    var alpha = parseFloat(document.getElementById("pcs-alpha").value);
    return { n: n, noise: noise, M: M, alpha: alpha };
  }

  function updateLabels(p) {
    document.getElementById("pcs-n-val").textContent = p.n;
    document.getElementById("pcs-noise-val").textContent = p.noise.toFixed(2);
    document.getElementById("pcs-m-val").textContent = p.M;
    document.getElementById("pcs-alpha-val").textContent = p.alpha.toFixed(3);
  }

  function onSliderChange() {
    var p = readSliders();
    updateLabels(p);
    renderPlots(p.n, p.M, p.noise, p.alpha);
  }

  function init() {
    var container = document.getElementById("parity-cs-widget");
    if (!container) return;

    // Inject minimal inline styles for the results table
    var style = document.createElement("style");
    style.textContent =
      ".pcs-results-table { width:100%; border-collapse:collapse; margin-top:10px; font-family:'Fira Code',monospace; font-size:13px; color:#eceae5; }" +
      ".pcs-results-table th, .pcs-results-table td { padding:6px 10px; text-align:center; border-bottom:1px solid rgba(236,234,229,0.12); }" +
      ".pcs-results-table th { font-weight:600; color:#eec35e; }" +
      ".pcs-results-table td:first-child { text-align:left; font-weight:500; }";
    document.head.appendChild(style);

    // Bind sliders
    var ids = ["pcs-n", "pcs-noise", "pcs-m", "pcs-alpha"];
    for (var i = 0; i < ids.length; i++) {
      document.getElementById(ids[i]).addEventListener("input", onSliderChange);
    }

    // Initial render
    onSliderChange();
  }

  // ---------------------------------------------------------------
  // Bootstrap
  // ---------------------------------------------------------------
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
