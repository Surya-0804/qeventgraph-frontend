// API layer - currently uses mock data, will switch to backend later
// No business logic here - pure data fetching

import { mockExecutions, getGraphByExecutionId } from "./mockData";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

// Toggle between mock and real backend
const USE_MOCK = true;

/**
 * Fetch all executions
 * Backend: GET /api/executions (to be implemented)
 */
export async function fetchExecutions() {
  if (USE_MOCK) {
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 300));
    return mockExecutions;
  }

  const response = await fetch(`${API_BASE_URL}/api/executions`);
  if (!response.ok) {
    throw new Error("Failed to fetch executions");
  }
  return response.json();
}

/**
 * Fetch event graph for a specific execution
 * Backend: GET /api/executions/{id}/graph (to be implemented)
 */
export async function fetchExecutionGraph(executionId) {
  if (USE_MOCK) {
    await new Promise((resolve) => setTimeout(resolve, 300));
    const graph = getGraphByExecutionId(executionId);
    if (!graph) {
      throw new Error(`Execution not found: ${executionId}`);
    }
    return graph;
  }

  const response = await fetch(
    `${API_BASE_URL}/api/executions/${executionId}/graph`
  );
  if (!response.ok) {
    throw new Error("Failed to fetch execution graph");
  }
  return response.json();
}

/**
 * Execute a quantum circuit and get event graph
 * Backend: POST /execute/{circuit}
 */
export async function executeCircuit(circuitName) {
  const response = await fetch(`${API_BASE_URL}/execute/${circuitName}`, {
    method: "POST",
  });
  if (!response.ok) {
    throw new Error(`Failed to execute circuit: ${circuitName}`);
  }
  return response.json();
}
