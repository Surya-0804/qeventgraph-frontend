// Cytoscape configuration for quantum event graph visualization
// Academic-clean visual language with dark theme

/**
 * Convert backend graph data to Cytoscape elements format
 * Handles backend format: nodes as [id, {type, timestamp}], edges as [source, target, {relation}]
 */
export function convertToGraphElements(graphData) {
  // Build a map of event details from the events array for richer node info
  const eventMap = {};
  if (graphData.events) {
    graphData.events.forEach((event) => {
      eventMap[event.event_id] = event;
    });
  }

  // Convert nodes - backend format: [id, {type, timestamp}]
  const nodes = graphData.nodes.map(([nodeId, nodeData]) => {
    const eventDetails = eventMap[nodeId] || {};
    const eventType = nodeData.type || eventDetails.event_type;

    return {
      data: {
        id: String(nodeId),
        label: getNodeLabel(eventType, eventDetails),
        eventType: eventType,
        gateName: eventDetails.gate_name || null,
        qubits: eventDetails.qubits || [],
        classicalBits: eventDetails.classical_bits || [],
        timestamp: nodeData.timestamp,
        outcome: eventDetails.outcome,
      },
      classes: eventType.toLowerCase(),
    };
  });

  // Convert edges - backend format: [source, target, {relation}]
  const edges = graphData.edges.map(([source, target, edgeData], index) => ({
    data: {
      id: `edge-${index}`,
      source: String(source),
      target: String(target),
      relationship: edgeData.relation,
    },
  }));

  return [...nodes, ...edges];
}

/**
 * Generate display label for node based on event type
 */
function getNodeLabel(eventType, eventDetails) {
  switch (eventType) {
    case "EXECUTION_START":
      return "▶ START";
    case "EXECUTION_END":
      return "⏹ END";
    case "GATE":
      return `⚙ ${eventDetails.gate_name || "GATE"}`;
    case "MEASUREMENT":
      const qubits = eventDetails.qubits || [];
      return `📏 M[${qubits.join(",")}]`;
    default:
      return eventType;
  }
}

/**
 * Cytoscape stylesheet - academic-clean dark theme
 */
export const cytoscapeStylesheet = [
  // Base node style
  {
    selector: "node",
    style: {
      label: "data(label)",
      "text-valign": "center",
      "text-halign": "center",
      "background-color": "#3B82F6", // Blue
      color: "#FFFFFF",
      "font-size": "12px",
      "font-weight": "500",
      width: 80,
      height: 40,
      shape: "roundrectangle",
      "border-width": 2,
      "border-color": "#1E40AF",
      "text-wrap": "wrap",
      "text-max-width": "70px",
    },
  },

  // Execution Start node
  {
    selector: "node.execution_start",
    style: {
      "background-color": "#10B981", // Green
      "border-color": "#047857",
      shape: "roundrectangle",
    },
  },

  // Execution End node
  {
    selector: "node.execution_end",
    style: {
      "background-color": "#EF4444", // Red
      "border-color": "#B91C1C",
      shape: "roundrectangle",
    },
  },

  // Gate node
  {
    selector: "node.gate",
    style: {
      "background-color": "#8B5CF6", // Purple
      "border-color": "#6D28D9",
    },
  },

  // Measurement node
  {
    selector: "node.measurement",
    style: {
      "background-color": "#F59E0B", // Amber
      "border-color": "#D97706",
    },
  },

  // Selected node highlight
  {
    selector: "node:selected",
    style: {
      "border-width": 4,
      "border-color": "#FFFFFF",
      "background-color": "#60A5FA",
    },
  },

  // Hovered node
  {
    selector: "node.hover",
    style: {
      "border-width": 3,
      "border-color": "#93C5FD",
    },
  },

  // Edge style
  {
    selector: "edge",
    style: {
      width: 2,
      "line-color": "#6B7280",
      "target-arrow-color": "#6B7280",
      "target-arrow-shape": "triangle",
      "curve-style": "bezier",
      "arrow-scale": 1.2,
    },
  },

  // Highlighted edge (for path tracing)
  {
    selector: "edge.highlighted",
    style: {
      "line-color": "#60A5FA",
      "target-arrow-color": "#60A5FA",
      width: 3,
    },
  },
];

/**
 * Cytoscape layout options - hierarchical left-to-right
 */
export const cytoscapeLayout = {
  name: "breadthfirst",
  directed: true,
  padding: 50,
  spacingFactor: 1.5,
  animate: true,
  animationDuration: 500,
  avoidOverlap: true,
  nodeDimensionsIncludeLabels: true,
};

/**
 * Alternative: Dagre layout for better DAG visualization
 * Requires: npm install cytoscape-dagre dagre
 */
export const dagreLayout = {
  name: "dagre",
  rankDir: "LR", // Left to right
  nodeSep: 50,
  rankSep: 100,
  padding: 30,
  animate: true,
  animationDuration: 500,
};
