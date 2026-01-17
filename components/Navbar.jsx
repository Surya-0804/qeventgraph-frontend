"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FiActivity, FiGitBranch, FiHome, FiLayers } from "react-icons/fi";

export default function Navbar() {
  const pathname = usePathname();

  const navItems = [
    { href: "/", label: "Dashboard", icon: FiHome },
    { href: "/executions", label: "Executions", icon: FiLayers },
    // { href: "/replay", label: "Replay", icon: FiGitBranch, disabled: true },
  ];

  return (
    <nav className="bg-zinc-900 border-b border-zinc-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <FiActivity className="w-8 h-8 text-blue-500" />
            <span className="text-xl font-bold text-white">QTraceGraph</span>
          </div>

          {/* Navigation Links */}
          <div className="flex items-center gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;

              if (item.disabled) {
                return (
                  <span
                    key={item.href}
                    className="flex items-center gap-2 px-4 py-2 text-sm text-zinc-500 cursor-not-allowed"
                    title="Coming soon"
                  >
                    <Icon className="w-4 h-4" />
                    {item.label}
                    <span className="text-xs bg-zinc-800 px-1.5 py-0.5 rounded">
                      Soon
                    </span>
                  </span>
                );
              }

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-2 px-4 py-2 text-sm rounded-lg transition-colors ${
                    isActive
                      ? "bg-blue-600 text-white"
                      : "text-zinc-400 hover:text-white hover:bg-zinc-800"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {item.label}
                </Link>
              );
            })}
          </div>

          {/* Status indicator */}
          <div className="flex items-center gap-2 text-sm">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
            <span className="text-zinc-400">Mock Mode</span>
          </div>
        </div>
      </div>
    </nav>
  );
}
