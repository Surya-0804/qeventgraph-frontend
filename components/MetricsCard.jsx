"use client";

import { FiClock, FiDatabase, FiCpu, FiZap } from "react-icons/fi";

export default function MetricsCard({ metrics, counts }) {
  if (!metrics) return null;

  const metricItems = [
    {
      label: "Event Extraction",
      value: metrics.event_extraction_time_ms,
      unit: "ms",
      icon: FiCpu,
      color: "text-blue-400",
    },
    {
      label: "Graph Build",
      value: metrics.in_memory_graph_time_ms,
      unit: "ms",
      icon: FiZap,
      color: "text-purple-400",
    },
    {
      label: "Neo4j Persistence",
      value: metrics.neo4j_persistence_time_ms,
      unit: "ms",
      icon: FiDatabase,
      color: "text-green-400",
    },
    {
      label: "Total Time",
      value: metrics.total_observability_time_ms,
      unit: "ms",
      icon: FiClock,
      color: "text-amber-400",
      highlight: true,
    },
  ];

  return (
    <div className="space-y-4">
      {/* Performance Metrics */}
      <div className="bg-zinc-800/50 border border-zinc-700/50 rounded-xl p-4">
        <h3 className="text-sm font-medium text-zinc-400 mb-4">
          Performance Metrics
        </h3>
        <div className="space-y-3">
          {metricItems.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.label}
                className={`flex items-center justify-between ${
                  item.highlight
                    ? "bg-zinc-700/30 -mx-2 px-2 py-2 rounded-lg"
                    : ""
                }`}
              >
                <div className="flex items-center gap-2">
                  <Icon className={`w-4 h-4 ${item.color}`} />
                  <span className="text-sm text-zinc-400">{item.label}</span>
                </div>
                <span
                  className={`text-sm font-mono ${
                    item.highlight ? "text-white font-bold" : "text-zinc-300"
                  }`}
                >
                  {item.value.toFixed(2)} {item.unit}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Measurement Counts */}
      {counts && Object.keys(counts).length > 0 && (
        <div className="bg-zinc-800/50 border border-zinc-700/50 rounded-xl p-4">
          <h3 className="text-sm font-medium text-zinc-400 mb-4">
            Measurement Results
          </h3>
          <div className="space-y-2">
            {Object.entries(counts)
              .sort(([, a], [, b]) => b - a)
              .map(([state, count]) => {
                const total = Object.values(counts).reduce((a, b) => a + b, 0);
                const percentage = ((count / total) * 100).toFixed(1);
                return (
                  <div key={state} className="space-y-1">
                    <div className="flex items-center justify-between text-sm">
                      <span className="font-mono text-blue-400">|{state}⟩</span>
                      <span className="text-zinc-300">
                        {count}{" "}
                        <span className="text-zinc-500">({percentage}%)</span>
                      </span>
                    </div>
                    <div className="h-1.5 bg-zinc-700 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-blue-500 rounded-full transition-all"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      )}
    </div>
  );
}
