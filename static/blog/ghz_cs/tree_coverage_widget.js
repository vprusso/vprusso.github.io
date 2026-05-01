/**
 * Tree Coverage Interactive Widget
 *
 * D3.js visualization for greedy flag-qubit pair selection on a binary tree.
 * Ported from the Python algorithms in ewfs/layout.py.
 *
 * Expects D3.js v7 to be loaded globally. The widget self-initializes on
 * DOMContentLoaded and is wrapped in an IIFE to avoid polluting the global
 * scope.
 */
(function () {
  "use strict";

  // -----------------------------------------------------------------------
  // 1. Tree construction and algorithm helpers
  // -----------------------------------------------------------------------

  /**
   * Build a level-order binary tree with `numNodes` nodes (0-indexed).
   * Left child of node i lives at index 2*i+1, right child at 2*i+2.
   *
   * Returns an array of node objects:
   *   { id, left (child id | null), right (child id | null),
   *     parentId (number | null), depth, isLeaf }
   */
  function buildTreeByNodeCount(numNodes) {
    if (numNodes <= 0) return [];

    var nodes = [];
    for (var i = 0; i < numNodes; i++) {
      nodes.push({
        id: i,
        left: null,
        right: null,
        parentId: null,
        depth: 0,
        isLeaf: true,
      });
    }

    for (var i = 0; i < numNodes; i++) {
      var leftIdx = 2 * i + 1;
      var rightIdx = 2 * i + 2;

      if (leftIdx < numNodes) {
        nodes[i].left = leftIdx;
        nodes[i].isLeaf = false;
        nodes[leftIdx].parentId = i;
      }
      if (rightIdx < numNodes) {
        nodes[i].right = rightIdx;
        nodes[i].isLeaf = false;
        nodes[rightIdx].parentId = i;
      }
    }

    // Compute depths via BFS from root (index 0).
    var queue = [0];
    nodes[0].depth = 0;
    while (queue.length > 0) {
      var cur = queue.shift();
      var node = nodes[cur];
      if (node.left !== null) {
        nodes[node.left].depth = node.depth + 1;
        queue.push(node.left);
      }
      if (node.right !== null) {
        nodes[node.right].depth = node.depth + 1;
        queue.push(node.right);
      }
    }

    return nodes;
  }

  /**
   * Return the subset of nodes that are leaves (no children).
   */
  function getLeafNodes(nodes) {
    return nodes.filter(function (n) {
      return n.left === null && n.right === null;
    });
  }

  /**
   * DFS from `rootId` to `targetId` over the node array.
   * Returns an array of node IDs forming the path, or null if not found.
   */
  function findPath(nodes, rootId, targetId) {
    function dfs(currentId, path) {
      if (currentId === null || currentId === undefined) return null;
      path.push(currentId);
      if (currentId === targetId) return path;
      var node = nodes[currentId];
      if (node.left !== null) {
        var result = dfs(node.left, path.slice());
        if (result) return result;
      }
      if (node.right !== null) {
        var result = dfs(node.right, path.slice());
        if (result) return result;
      }
      return null;
    }
    return dfs(rootId, []);
  }

  /**
   * Find the Least Common Ancestor of two nodes by comparing their
   * root-to-node paths.  Returns the LCA node ID, or null.
   */
  function findLCA(nodes, id1, id2) {
    var path1 = findPath(nodes, 0, id1);
    var path2 = findPath(nodes, 0, id2);
    if (!path1 || !path2) return null;

    var lca = null;
    var len = Math.min(path1.length, path2.length);
    for (var i = 0; i < len; i++) {
      if (path1[i] === path2[i]) {
        lca = path1[i];
      } else {
        break;
      }
    }
    return lca;
  }

  /**
   * Return the set (as a JS Set) of all node IDs on the paths from
   * id1 and id2 up to their LCA.
   */
  function calculateCoverage(nodes, id1, id2) {
    var lcaId = findLCA(nodes, id1, id2);
    if (lcaId === null) return new Set();

    var path1 = findPath(nodes, lcaId, id1);
    var path2 = findPath(nodes, lcaId, id2);
    var coverage = new Set();
    if (path1) path1.forEach(function (n) { coverage.add(n); });
    if (path2) path2.forEach(function (n) { coverage.add(n); });
    return coverage;
  }

  /**
   * Greedy algorithm: iteratively pick the leaf pair that covers the most
   * uncovered nodes.  Runs for exactly `k` iterations (or fewer if pairs
   * are exhausted).
   *
   * Returns { pairs: [[a,b], ...], coveredIds: Set, steps: [...] }
   * where each step records { pair, newlyCovered, totalCovered }.
   */
  function findOptimalKPairs(nodes, k) {
    var leaves = getLeafNodes(nodes);
    if (leaves.length < 2 || k === 0) {
      return { pairs: [], coveredIds: new Set(), steps: [] };
    }

    // Pre-compute coverage for every unique leaf pair.
    var potentialPairs = [];
    for (var i = 0; i < leaves.length; i++) {
      for (var j = i + 1; j < leaves.length; j++) {
        var a = leaves[i].id;
        var b = leaves[j].id;
        var cov = calculateCoverage(nodes, a, b);
        if (cov.size > 0) {
          potentialPairs.push({ pair: [a, b], coverage: cov });
        }
      }
    }

    var selectedPairs = [];
    var coveredIds = new Set();
    var steps = [];

    for (var step = 0; step < k; step++) {
      if (potentialPairs.length === 0) break;

      var bestIdx = -1;
      var bestNew = -1;

      for (var p = 0; p < potentialPairs.length; p++) {
        var newCount = 0;
        potentialPairs[p].coverage.forEach(function (id) {
          if (!coveredIds.has(id)) newCount++;
        });
        if (newCount > bestNew) {
          bestNew = newCount;
          bestIdx = p;
        }
      }

      if (bestIdx === -1 || bestNew === 0) break;

      var chosen = potentialPairs.splice(bestIdx, 1)[0];
      selectedPairs.push(chosen.pair);
      chosen.coverage.forEach(function (id) { coveredIds.add(id); });

      steps.push({
        pair: chosen.pair,
        newlyCovered: bestNew,
        totalCovered: coveredIds.size,
      });
    }

    return { pairs: selectedPairs, coveredIds: coveredIds, steps: steps };
  }

  // -----------------------------------------------------------------------
  // 2. D3 Visualization
  // -----------------------------------------------------------------------

  var COLOR_UNCOVERED_NODE = "#555";
  var COLOR_COVERED_NODE = "#e74c3c";
  var COLOR_UNCOVERED_EDGE = "#555";
  var COLOR_COVERED_EDGE = "#3498db";
  var COLOR_TEXT = "#eceae5";
  var COLOR_ACCENT = "#eec35e";
  var NODE_RADIUS = 14;
  var TRANSITION_MS = 500;

  /**
   * Build a d3-hierarchy from the flat node array and lay it out using
   * d3.tree().  Returns { root, width, height, allDescendants }.
   */
  function layoutTree(nodes) {
    if (nodes.length === 0) return null;

    // Build a map from id -> { id, children: [] }
    var map = {};
    nodes.forEach(function (n) {
      map[n.id] = { id: n.id, children: [] };
    });
    nodes.forEach(function (n) {
      if (n.left !== null) map[n.id].children.push(map[n.left]);
      if (n.right !== null) map[n.id].children.push(map[n.right]);
    });

    // Convert children === [] to undefined so d3 treats them as leaves.
    Object.keys(map).forEach(function (k) {
      if (map[k].children.length === 0) map[k].children = undefined;
    });

    var root = d3.hierarchy(map[0], function (d) { return d.children; });

    // Determine tree dimensions based on node count.
    var maxDepth = 0;
    root.each(function (d) { if (d.depth > maxDepth) maxDepth = d.depth; });
    var leafCount = root.leaves().length;
    var width = Math.max(300, leafCount * 55);
    var height = Math.max(200, (maxDepth + 1) * 80);

    d3.tree().size([width, height])(root);

    return { root: root, width: width, height: height };
  }

  /**
   * Compute which edges belong to the coverage set for given pairs.
   * Returns a Set of "a-b" strings where a < b.
   */
  function computeCoveredEdges(nodes, pairs) {
    var edgeSet = new Set();
    pairs.forEach(function (pair) {
      var lcaId = findLCA(nodes, pair[0], pair[1]);
      if (lcaId === null) return;
      [pair[0], pair[1]].forEach(function (leafId) {
        var path = findPath(nodes, lcaId, leafId);
        if (!path) return;
        for (var i = 0; i < path.length - 1; i++) {
          var a = Math.min(path[i], path[i + 1]);
          var b = Math.max(path[i], path[i + 1]);
          edgeSet.add(a + "-" + b);
        }
      });
    });
    return edgeSet;
  }

  // -----------------------------------------------------------------------
  // 3. Widget controller
  // -----------------------------------------------------------------------

  function init() {
    var container = document.getElementById("tc-tree-svg");
    if (!container) return; // Widget HTML not present on page.

    // --- State ---
    var treeNodes = [];
    var currentK = 0;
    var greedyResult = { pairs: [], coveredIds: new Set(), steps: [] };
    var stepIndex = 0; // how far through the greedy steps we've shown
    var stepping = false; // true when user is using step-through mode

    // --- DOM references ---
    var nSlider = document.getElementById("tc-n");
    var nVal = document.getElementById("tc-n-val");
    var kSlider = document.getElementById("tc-k");
    var kVal = document.getElementById("tc-k-val");
    var stepBtn = document.getElementById("tc-step-btn");
    var resetBtn = document.getElementById("tc-reset-btn");
    var stepInfo = document.getElementById("tc-step-info");
    var resultsPanel = document.getElementById("tc-results");

    // --- SVG setup ---
    var svg = d3.select(container).append("svg")
      .attr("preserveAspectRatio", "xMidYMid meet")
      .style("width", "100%")
      .style("height", "100%");

    var gMain = svg.append("g"); // will be translated for margins

    // -----------------------------------------------------------------
    // Draw / update cycle
    // -----------------------------------------------------------------

    function render() {
      var layout = layoutTree(treeNodes);
      if (!layout) {
        gMain.selectAll("*").remove();
        updateResults(0, treeNodes.length);
        return;
      }

      var margin = { top: 30, right: 30, bottom: 60, left: 30 };
      var fullW = layout.width + margin.left + margin.right;
      var fullH = layout.height + margin.top + margin.bottom;
      svg.attr("viewBox", "0 0 " + fullW + " " + fullH);
      gMain.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

      // Determine which nodes/edges are covered based on mode.
      var visiblePairs, coveredIds;
      if (stepping) {
        // Only show pairs up to stepIndex.
        visiblePairs = greedyResult.pairs.slice(0, stepIndex);
        coveredIds = new Set();
        visiblePairs.forEach(function (pair) {
          calculateCoverage(treeNodes, pair[0], pair[1]).forEach(function (id) {
            coveredIds.add(id);
          });
        });
      } else {
        visiblePairs = greedyResult.pairs;
        coveredIds = greedyResult.coveredIds;
      }

      var coveredEdges = computeCoveredEdges(treeNodes, visiblePairs);

      // Flatten hierarchy for bindings.
      var descendants = layout.root.descendants();
      var links = layout.root.links();

      // --- Edges (links) ---
      var edgeSel = gMain.selectAll("line.tree-edge")
        .data(links, function (d) { return d.source.data.id + "-" + d.target.data.id; });

      edgeSel.exit().remove();

      var edgeEnter = edgeSel.enter().append("line")
        .attr("class", "tree-edge")
        .attr("stroke-width", 2.5);

      edgeSel = edgeEnter.merge(edgeSel);

      edgeSel
        .attr("x1", function (d) { return d.source.x; })
        .attr("y1", function (d) { return d.source.y; })
        .attr("x2", function (d) { return d.target.x; })
        .attr("y2", function (d) { return d.target.y; })
        .transition().duration(TRANSITION_MS)
        .attr("stroke", function (d) {
          var a = Math.min(d.source.data.id, d.target.data.id);
          var b = Math.max(d.source.data.id, d.target.data.id);
          return coveredEdges.has(a + "-" + b) ? COLOR_COVERED_EDGE : COLOR_UNCOVERED_EDGE;
        });

      // --- Nodes (circles) ---
      var nodeSel = gMain.selectAll("g.tree-node")
        .data(descendants, function (d) { return d.data.id; });

      nodeSel.exit().remove();

      var nodeEnter = nodeSel.enter().append("g")
        .attr("class", "tree-node");

      nodeEnter.append("circle")
        .attr("r", NODE_RADIUS)
        .attr("stroke-width", 2);

      nodeEnter.append("text")
        .attr("dy", "0.35em")
        .attr("text-anchor", "middle")
        .attr("fill", COLOR_TEXT)
        .attr("font-size", "11px")
        .attr("pointer-events", "none");

      nodeSel = nodeEnter.merge(nodeSel);

      nodeSel
        .attr("transform", function (d) { return "translate(" + d.x + "," + d.y + ")"; });

      nodeSel.select("circle")
        .transition().duration(TRANSITION_MS)
        .attr("fill", function (d) {
          return coveredIds.has(d.data.id) ? COLOR_COVERED_NODE : COLOR_UNCOVERED_NODE;
        })
        .attr("stroke", function (d) {
          return coveredIds.has(d.data.id) ? "#c0392b" : "#777";
        });

      nodeSel.select("text")
        .text(function (d) { return d.data.id; });

      // --- Paired-leaf arcs ---
      var arcData = visiblePairs.map(function (pair, i) {
        var n1 = descendants.find(function (d) { return d.data.id === pair[0]; });
        var n2 = descendants.find(function (d) { return d.data.id === pair[1]; });
        return { pair: pair, index: i, n1: n1, n2: n2 };
      }).filter(function (d) { return d.n1 && d.n2; });

      var arcSel = gMain.selectAll("path.pair-arc")
        .data(arcData, function (d) { return d.pair[0] + "-" + d.pair[1]; });

      arcSel.exit().transition().duration(TRANSITION_MS)
        .attr("opacity", 0)
        .remove();

      var arcEnter = arcSel.enter().append("path")
        .attr("class", "pair-arc")
        .attr("fill", "none")
        .attr("stroke", COLOR_ACCENT)
        .attr("stroke-width", 2)
        .attr("stroke-dasharray", "6 3")
        .attr("opacity", 0);

      arcSel = arcEnter.merge(arcSel);

      arcSel
        .attr("d", function (d) {
          var x1 = d.n1.x, y1 = d.n1.y;
          var x2 = d.n2.x, y2 = d.n2.y;
          var midX = (x1 + x2) / 2;
          // Arc sags below the lower of the two leaves.
          var sag = 30 + 15 * d.index;
          var cy = Math.max(y1, y2) + sag;
          return "M" + x1 + "," + y1 +
                 " Q" + midX + "," + cy +
                 " " + x2 + "," + y2;
        })
        .transition().duration(TRANSITION_MS)
        .attr("opacity", 1);

      // --- Results panel ---
      updateResults(coveredIds.size, treeNodes.length, visiblePairs.length);
    }

    function updateResults(covered, total, pairsShown) {
      if (!resultsPanel) return;
      if (total === 0) {
        resultsPanel.innerHTML = "";
        return;
      }
      var pct = ((covered / total) * 100).toFixed(1);
      resultsPanel.innerHTML =
        '<span class="result-item">Coverage: <span class="result-value">' +
        covered + "/" + total + " nodes (" + pct + "%)</span></span>" +
        '<span class="result-item">Pairs selected: <span class="result-value">' +
        (pairsShown !== undefined ? pairsShown : 0) + "</span></span>";
    }

    function updateStepInfo() {
      if (!stepInfo) return;
      if (!stepping) {
        stepInfo.innerHTML = "";
        return;
      }
      var totalSteps = greedyResult.steps.length;
      if (stepIndex === 0) {
        stepInfo.innerHTML = "Press <strong>Step Through Greedy</strong> to begin.";
      } else {
        var s = greedyResult.steps[stepIndex - 1];
        stepInfo.innerHTML =
          "Step <strong>" + stepIndex + "/" + totalSteps + "</strong> &mdash; " +
          "paired leaves <strong>" + s.pair[0] + "</strong> &amp; <strong>" + s.pair[1] + "</strong>, " +
          "newly covered <strong>" + s.newlyCovered + "</strong> node" +
          (s.newlyCovered !== 1 ? "s" : "");
      }
    }

    // -----------------------------------------------------------------
    // Rebuild the tree (when N changes)
    // -----------------------------------------------------------------

    function rebuildTree() {
      var n = parseInt(nSlider.value, 10);
      nVal.textContent = n;
      treeNodes = buildTreeByNodeCount(n);

      // Reset k slider max to floor(numLeaves / 2).
      var leaves = getLeafNodes(treeNodes);
      var maxK = Math.floor(leaves.length / 2);
      kSlider.max = maxK;
      if (parseInt(kSlider.value, 10) > maxK) {
        kSlider.value = maxK;
      }
      currentK = parseInt(kSlider.value, 10);
      kVal.textContent = currentK;

      recomputeGreedy();
    }

    // -----------------------------------------------------------------
    // Recompute greedy (when k changes or tree changes)
    // -----------------------------------------------------------------

    function recomputeGreedy() {
      currentK = parseInt(kSlider.value, 10);
      kVal.textContent = currentK;

      // Always precompute full result for the chosen k.
      greedyResult = findOptimalKPairs(treeNodes, currentK);
      stepping = false;
      stepIndex = 0;
      updateStepInfo();
      render();
    }

    // -----------------------------------------------------------------
    // Event listeners
    // -----------------------------------------------------------------

    nSlider.addEventListener("input", function () {
      rebuildTree();
    });

    kSlider.addEventListener("input", function () {
      recomputeGreedy();
    });

    stepBtn.addEventListener("click", function () {
      if (greedyResult.steps.length === 0) {
        // Need at least some k to step through; auto-set k to max.
        var leaves = getLeafNodes(treeNodes);
        var maxK = Math.floor(leaves.length / 2);
        if (maxK === 0) return;
        kSlider.value = maxK;
        currentK = maxK;
        kVal.textContent = currentK;
        greedyResult = findOptimalKPairs(treeNodes, currentK);
      }

      if (!stepping) {
        stepping = true;
        stepIndex = 0;
      }

      if (stepIndex < greedyResult.steps.length) {
        stepIndex++;
      } else {
        // Wrap around.
        stepIndex = 1;
      }
      updateStepInfo();
      render();
    });

    resetBtn.addEventListener("click", function () {
      stepping = false;
      stepIndex = 0;
      kSlider.value = 0;
      currentK = 0;
      kVal.textContent = "0";
      greedyResult = { pairs: [], coveredIds: new Set(), steps: [] };
      updateStepInfo();
      render();
    });

    // -----------------------------------------------------------------
    // Initial draw
    // -----------------------------------------------------------------
    rebuildTree();
  }

  // Self-initialize.
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
