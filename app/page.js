"use client";

import { useState, useEffect } from "react";
import { FiActivity, FiCpu, FiDatabase, FiGitBranch } from "react-icons/fi";
import ExecutionList from "@/components/ExecutionList";
import { fetchExecutions } from "@/lib/api";

export default function Home() {
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

  const stats = [
    {
      label: "Total Executions",
      value: executions.length,
      icon: FiCpu,
      color: "text-blue-400",
    },
    {
      label: "Total Events",
      value: executions.reduce((sum, e) => sum + e.num_events, 0),
      icon: FiActivity,
      color: "text-purple-400",
    },
    {
      label: "Avg Time",
      value:
        executions.length > 0
          ? (
              executions.reduce((sum, e) => sum + e.total_observability_time_ms, 0) /
              executions.length
            ).toFixed(1)
          : "0",
      suffix: "ms",
      icon: FiDatabase,
      color: "text-green-400",
    },
    // {
    //   label: "Replay Ready",
    //   value: "Soon",
    //   icon: FiGitBranch,
    //   color: "text-amber-400",
    //   disabled: true,
    // },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">
          Quantum Execution Dashboard
        </h1>
        <p className="text-zinc-400">
          Monitor and analyze quantum program execution traces with event-graph
          observability.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.label}
              className={`bg-zinc-800/50 border border-zinc-700/50 rounded-xl p-5 ${
                stat.disabled ? "opacity-60" : ""
              }`}
            >
              <div className="flex items-center gap-3 mb-3">
                <div
                  className={`w-10 h-10 rounded-lg bg-zinc-700/50 flex items-center justify-center`}
                >
                  <Icon className={`w-5 h-5 ${stat.color}`} />
                </div>
                <span className="text-sm text-zinc-400">{stat.label}</span>
              </div>
              <div className="text-3xl font-bold text-white">
                {stat.value}
                {stat.suffix && (
                  <span className="text-lg text-zinc-500 ml-1">
                    {stat.suffix}
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Executions List */}
      <div className="mb-4">
        <h2 className="text-xl font-semibold text-white mb-4">
          Recent Executions
        </h2>
        <ExecutionList executions={executions} loading={loading} />
      </div>
    </div>
  );
}
