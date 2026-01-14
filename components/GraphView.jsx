"use client";

import { useEffect, useRef, useCallback } from "react";
import cytoscape from "cytoscape";
import {
  convertToGraphElements,
  cytoscapeStylesheet,
  cytoscapeLayout,
} from "@/lib/graphConfig";

export default function GraphView({ graphData, onNodeSelect, selectedNode }) {
  const containerRef = useRef(null);
  const cyRef = useRef(null);

  // Initialize Cytoscape
  useEffect(() => {
    if (!containerRef.current || !graphData) return;

    const elements = convertToGraphElements(graphData);

    cyRef.current = cytoscape({
      container: containerRef.current,
      elements,
      style: cytoscapeStylesheet,
      layout: cytoscapeLayout,
      wheelSensitivity: 0.3,
      minZoom: 0.3,
      maxZoom: 3,
      boxSelectionEnabled: false,
    });

    const cy = cyRef.current;

    // Node click handler
    cy.on("tap", "node", (event) => {
      const node = event.target;
      const nodeData = node.data();
      onNodeSelect?.(nodeData);

      // Highlight path to this node
      highlightPathTo(cy, node.id());
    });

    // Background click - deselect
    cy.on("tap", (event) => {
      if (event.target === cy) {
        onNodeSelect?.(null);
        clearHighlights(cy);
      }
    });

    // Hover effects
    cy.on("mouseover", "node", (event) => {
      event.target.addClass("hover");
      containerRef.current.style.cursor = "pointer";
    });

    cy.on("mouseout", "node", (event) => {
      event.target.removeClass("hover");
      containerRef.current.style.cursor = "default";
    });

    // Cleanup
    return () => {
      if (cyRef.current) {
        cyRef.current.destroy();
      }
    };
  }, [graphData, onNodeSelect]);

  // Update selection when selectedNode changes externally
  useEffect(() => {
    if (!cyRef.current || !selectedNode) return;

    const cy = cyRef.current;
    clearHighlights(cy);
    highlightPathTo(cy, selectedNode.id);
  }, [selectedNode]);

  return (
    <div className="relative w-full h-full">
      {/* Graph container */}
      <div
        ref={containerRef}
        className="w-full h-full bg-zinc-900 rounded-xl"
      />

      {/* Controls overlay */}
      <div className="absolute bottom-4 right-4 flex gap-2">
        <button
          onClick={() => cyRef.current?.fit(50)}
          className="px-3 py-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-sm rounded-lg transition-colors"
          title="Fit to view"
        >
          Fit
        </button>
        <button
          onClick={() => cyRef.current?.center()}
          className="px-3 py-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-sm rounded-lg transition-colors"
          title="Center view"
        >
          Center
        </button>
        <button
          onClick={() => {
            cyRef.current?.layout(cytoscapeLayout).run();
          }}
          className="px-3 py-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-sm rounded-lg transition-colors"
          title="Re-layout"
        >
          Layout
        </button>
      </div>

      {/* Legend */}
      <div className="absolute top-4 left-4 bg-zinc-800/90 backdrop-blur rounded-lg p-3 text-xs">
        <div className="text-zinc-400 font-medium mb-2">Event Types</div>
        <div className="space-y-1.5">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 bg-green-500 rounded"></span>
            <span className="text-zinc-300">Start</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 bg-purple-500 rounded"></span>
            <span className="text-zinc-300">Gate</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 bg-amber-500 rounded"></span>
            <span className="text-zinc-300">Measurement</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 bg-red-500 rounded"></span>
            <span className="text-zinc-300">End</span>
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * Highlight all edges leading to a specific node
 */
function highlightPathTo(cy, nodeId) {
  clearHighlights(cy);

  const targetNode = cy.getElementById(nodeId);
  if (!targetNode.length) return;

  // BFS backwards to find all predecessors
  const visited = new Set([nodeId]);
  const queue = [nodeId];

  while (queue.length > 0) {
    const current = queue.shift();
    const incomingEdges = cy.getElementById(current).incomers("edge");

    incomingEdges.forEach((edge) => {
      edge.addClass("highlighted");
      const sourceId = edge.source().id();
      if (!visited.has(sourceId)) {
        visited.add(sourceId);
        queue.push(sourceId);
      }
    });
  }

  // Select the target node
  targetNode.select();
}

/**
 * Clear all highlights
 */
function clearHighlights(cy) {
  cy.elements().removeClass("highlighted");
  cy.elements().unselect();
}
