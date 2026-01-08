"use client";

import { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";
import { FiArrowLeft, FiCpu, FiHash } from "react-icons/fi";
import GraphView from "@/components/GraphView";
import EventDetails from "@/components/EventDetails";
import MetricsCard from "@/components/MetricsCard";
import { fetchExecutionGraph } from "@/lib/api";

export default function ExecutionPage({ params }) {
  const resolvedParams = use(params);
  const router = useRouter();
  const [graphData, setGraphData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);

  useEffect(() => {
    loadGraph();
  }, [resolvedParams.id]);

  const loadGraph = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchExecutionGraph(resolvedParams.id);
      setGraphData(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="animate-pulse">
          <div className="h-8 bg-zinc-800 rounded w-1/3 mb-8"></div>
          <div className="h-[600px] bg-zinc-800 rounded-xl"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-red-500/10 border border-red-500/50 rounded-xl p-8 text-center">
          <h2 className="text-xl font-semibold text-red-400 mb-2">
            Failed to load execution
          </h2>
          <p className="text-zinc-400 mb-4">{error}</p>
          <button
            onClick={() => router.push("/")}
            className="px-4 py-2 bg-zinc-700 hover:bg-zinc-600 text-white rounded-lg transition-colors"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <button
            onClick={() => router.push("/")}
            className="p-2 hover:bg-zinc-800 rounded-lg transition-colors"
          >
            <FiArrowLeft className="w-5 h-5 text-zinc-400" />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-white flex items-center gap-3">
              <FiCpu className="w-6 h-6 text-blue-400" />
              {graphData?.circuit_name?.toUpperCase()} Circuit
            </h1>
            <p className="text-sm text-zinc-500 font-mono">
              {graphData?.execution_id}
            </p>
          </div>
        </div>

        {/* Quick stats */}
        <div className="flex items-center gap-6">
          <div className="text-center">
            <div className="text-sm text-zinc-500">Events</div>
            <div className="text-2xl font-bold text-white flex items-center gap-1">
              <FiHash className="w-5 h-5 text-zinc-500" />
              {graphData?.nodes?.length || 0}
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Graph - takes 3 columns */}
        <div className="lg:col-span-3">
          <div className="bg-zinc-800/30 border border-zinc-700/50 rounded-xl overflow-hidden">
            <div className="px-4 py-3 border-b border-zinc-700/50">
              <h2 className="text-sm font-medium text-zinc-300">
                Event Dependency Graph
              </h2>
              <p className="text-xs text-zinc-500">
                Click on nodes to inspect events. Path to selected event is
                highlighted.
              </p>
            </div>
            <div className="h-[550px]">
              <GraphView
                graphData={graphData}
                onNodeSelect={setSelectedEvent}
                selectedNode={selectedEvent}
              />
            </div>
          </div>
        </div>

        {/* Sidebar - takes 1 column */}
        <div className="space-y-6">
          {/* Metrics */}
          <MetricsCard metrics={graphData?.metrics} counts={graphData?.counts} />

          {/* Event Details */}
          <div>
            <h3 className="text-sm font-medium text-zinc-400 mb-3">
              Selected Event
            </h3>
            {selectedEvent ? (
              <EventDetails
                event={selectedEvent}
                onClose={() => setSelectedEvent(null)}
              />
            ) : (
              <div className="bg-zinc-800/30 border border-zinc-700/50 border-dashed rounded-xl p-6 text-center">
                <p className="text-sm text-zinc-500">
                  Click on a node in the graph to see event details
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
