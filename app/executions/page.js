"use client";

import { useState, useEffect } from "react";
import { FiCpu, FiPlay, FiRefreshCw } from "react-icons/fi";
import ExecutionList from "@/components/ExecutionList";
import { fetchExecutions } from "@/lib/api";

export default function ExecutionsPage() {
  const [executions, setExecutions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadExecutions();
  }, []);

  const loadExecutions = async () => {
    try {
      setLoading(true);
      const data = await fetchExecutions();
      setExecutions(data);
    } catch (error) {
      console.error("Failed to load executions:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
            <FiCpu className="w-8 h-8 text-blue-400" />
            Execution Traces
          </h1>
          <p className="text-zinc-400">
            Browse all quantum program execution traces stored in the system.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={loadExecutions}
            disabled={loading}
            className="flex items-center gap-2 px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 rounded-lg transition-colors disabled:opacity-50"
          >
            <FiRefreshCw
              className={`w-4 h-4 ${loading ? "animate-spin" : ""}`}
            />
            Refresh
          </button>
          <button
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg transition-colors"
            title="Execute new circuit (requires backend connection)"
          >
            <FiPlay className="w-4 h-4" />
            New Execution
          </button>
        </div>
      </div>

      {/* Filter/Search (placeholder for future) */}
      <div className="bg-zinc-800/30 border border-zinc-700/50 rounded-xl p-4 mb-6">
        <div className="flex items-center gap-4 text-sm text-zinc-500">
          <span>Showing {executions.length} executions</span>
          <span className="text-zinc-700">|</span>
          <span className="text-zinc-600">
            Filters coming soon (circuit type, date range)
          </span>
        </div>
      </div>

      {/* Executions List */}
      <ExecutionList executions={executions} loading={loading} />
    </div>
  );
}
