"use client";

import { FiGitBranch, FiLock } from "react-icons/fi";

export default function ReplayPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="text-center py-20">
        {/* Icon */}
        <div className="w-20 h-20 bg-zinc-800 rounded-2xl flex items-center justify-center mx-auto mb-6">
          <FiGitBranch className="w-10 h-10 text-zinc-600" />
        </div>

        {/* Title */}
        <h1 className="text-3xl font-bold text-white mb-4">
          Replay-Based Comparison
        </h1>
        <p className="text-zinc-400 max-w-lg mx-auto mb-8">
          Compare execution traces across multiple runs to detect divergence and
          analyze execution differences. This feature enables side-by-side
          visual analysis of quantum program behavior.
        </p>

        {/* Coming Soon Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-500/10 border border-amber-500/30 rounded-full text-amber-400">
          <FiLock className="w-4 h-4" />
          <span className="text-sm font-medium">Coming in Phase 2</span>
        </div>

        {/* Feature preview */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
          {[
            {
              title: "Multi-Run Selection",
              description: "Select two or more executions to compare",
            },
            {
              title: "Divergence Detection",
              description: "Automatically highlight where runs differ",
            },
            {
              title: "Split-Screen View",
              description: "Side-by-side graph visualization",
            },
          ].map((feature) => (
            <div
              key={feature.title}
              className="bg-zinc-800/30 border border-zinc-700/50 rounded-xl p-5 text-left"
            >
              <h3 className="text-sm font-medium text-white mb-2">
                {feature.title}
              </h3>
              <p className="text-xs text-zinc-500">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
