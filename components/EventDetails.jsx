"use client";

import {
  FiX,
  FiCpu,
  FiHash,
  FiClock,
  FiTarget,
  FiActivity,
  FiBox,
} from "react-icons/fi";

export default function EventDetails({ event, onClose }) {
  if (!event) return null;

  const getEventIcon = () => {
    switch (event.eventType) {
      case "EXECUTION_START":
        return <FiActivity className="w-5 h-5 text-green-400" />;
      case "EXECUTION_END":
        return <FiTarget className="w-5 h-5 text-red-400" />;
      case "GATE":
        return <FiCpu className="w-5 h-5 text-purple-400" />;
      case "MEASUREMENT":
        return <FiHash className="w-5 h-5 text-amber-400" />;
      default:
        return <FiActivity className="w-5 h-5 text-blue-400" />;
    }
  };

  const getEventColor = () => {
    switch (event.eventType) {
      case "EXECUTION_START":
        return "border-green-500 bg-green-500/10";
      case "EXECUTION_END":
        return "border-red-500 bg-red-500/10";
      case "GATE":
        return "border-purple-500 bg-purple-500/10";
      case "MEASUREMENT":
        return "border-amber-500 bg-amber-500/10";
      default:
        return "border-blue-500 bg-blue-500/10";
    }
  };

  return (
    <div
      className={`bg-zinc-800/95 backdrop-blur border-l-4 ${getEventColor()} rounded-xl p-5`}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          {getEventIcon()}
          <div>
            <h3 className="text-lg font-semibold text-white">
              {event.eventType.replace(/_/g, " ")}
            </h3>
            <p className="text-xs text-zinc-500 font-mono">Event #{event.id}</p>
          </div>
        </div>
        <button
          onClick={onClose}
          className="p-1 hover:bg-zinc-700 rounded-lg transition-colors"
        >
          <FiX className="w-5 h-5 text-zinc-400" />
        </button>
      </div>

      {/* Properties */}
      <div className="space-y-3">
        {/* Timestamp */}
        <div className="flex items-center justify-between py-2 border-b border-zinc-700/50">
          <span className="text-sm text-zinc-400 flex items-center gap-2">
            <FiClock className="w-4 h-4" />
            Timestamp
          </span>
          <span className="text-sm font-mono text-white">{event.timestamp}</span>
        </div>

        {/* Gate Name (if applicable) */}
        {event.gateName && (
          <div className="flex items-center justify-between py-2 border-b border-zinc-700/50">
            <span className="text-sm text-zinc-400 flex items-center gap-2">
              <FiCpu className="w-4 h-4" />
              Gate
            </span>
            <span className="text-sm font-bold text-purple-400 bg-purple-500/20 px-2 py-0.5 rounded">
              {event.gateName}
            </span>
          </div>
        )}

        {/* Qubits */}
        {event.qubits && event.qubits.length > 0 && (
          <div className="flex items-center justify-between py-2 border-b border-zinc-700/50">
            <span className="text-sm text-zinc-400 flex items-center gap-2">
              <FiTarget className="w-4 h-4" />
              Qubits
            </span>
            <div className="flex gap-1">
              {event.qubits.map((q, i) => (
                <span
                  key={i}
                  className="text-sm font-mono text-blue-400 bg-blue-500/20 px-2 py-0.5 rounded"
                >
                  q[{q}]
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Classical Bits (for measurements) */}
        {event.classicalBits && event.classicalBits.length > 0 && (
          <div className="flex items-center justify-between py-2 border-b border-zinc-700/50">
            <span className="text-sm text-zinc-400 flex items-center gap-2">
              <FiBox className="w-4 h-4" />
              Classical Bits
            </span>
            <div className="flex gap-1">
              {event.classicalBits.map((c, i) => (
                <span
                  key={i}
                  className="text-sm font-mono text-green-400 bg-green-500/20 px-2 py-0.5 rounded"
                >
                  c[{c}]
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Outcome (if applicable) */}
        {event.outcome !== null && event.outcome !== undefined && (
          <div className="flex items-center justify-between py-2 border-b border-zinc-700/50">
            <span className="text-sm text-zinc-400">Outcome</span>
            <span className="text-sm font-mono text-amber-400">
              {event.outcome}
            </span>
          </div>
        )}
      </div>

      {/* Help text */}
      <p className="mt-4 text-xs text-zinc-500">
        Click on nodes in the graph to inspect event details. Path to this event
        is highlighted.
      </p>
    </div>
  );
}
