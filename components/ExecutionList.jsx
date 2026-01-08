"use client";

import { FiCpu, FiClock, FiHash, FiChevronRight } from "react-icons/fi";
import Link from "next/link";

export default function ExecutionList({ executions, loading }) {
  if (loading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="bg-zinc-800/50 rounded-xl p-6 animate-pulse"
          >
            <div className="h-6 bg-zinc-700 rounded w-1/3 mb-4"></div>
            <div className="h-4 bg-zinc-700 rounded w-1/2"></div>
          </div>
        ))}
      </div>
    );
  }

  if (!executions || executions.length === 0) {
    return (
      <div className="bg-zinc-800/50 rounded-xl p-12 text-center">
        <FiCpu className="w-12 h-12 text-zinc-600 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-zinc-400 mb-2">
          No executions found
        </h3>
        <p className="text-zinc-500 text-sm">
          Execute a quantum circuit to see event traces here.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {executions.map((exec) => (
        <Link
          key={exec.execution_id}
          href={`/execution/${exec.execution_id}`}
          className="block group"
        >
          <div className="bg-zinc-800/50 hover:bg-zinc-800 border border-zinc-700/50 hover:border-blue-500/50 rounded-xl p-6 transition-all duration-200">
            <div className="flex items-center justify-between">
              {/* Left side - Main info */}
              <div className="flex items-center gap-4">
                {/* Circuit badge */}
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <FiCpu className="w-6 h-6 text-white" />
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-white group-hover:text-blue-400 transition-colors">
                    {exec.circuit_name.toUpperCase()} Circuit
                  </h3>
                  <p className="text-sm text-zinc-500 font-mono">
                    {exec.execution_id}
                  </p>
                </div>
              </div>

              {/* Right side - Metrics */}
              <div className="flex items-center gap-8">
                {/* Events count */}
                <div className="text-center">
                  <div className="flex items-center gap-1.5 text-zinc-400">
                    <FiHash className="w-4 h-4" />
                    <span className="text-sm">Events</span>
                  </div>
                  <p className="text-2xl font-bold text-white">
                    {exec.num_events}
                  </p>
                </div>

                {/* Time */}
                <div className="text-center">
                  <div className="flex items-center gap-1.5 text-zinc-400">
                    <FiClock className="w-4 h-4" />
                    <span className="text-sm">Time</span>
                  </div>
                  <p className="text-2xl font-bold text-white">
                    {exec.total_observability_time_ms.toFixed(1)}
                    <span className="text-sm text-zinc-500 ml-1">ms</span>
                  </p>
                </div>

                {/* Arrow */}
                <FiChevronRight className="w-6 h-6 text-zinc-600 group-hover:text-blue-400 group-hover:translate-x-1 transition-all" />
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
