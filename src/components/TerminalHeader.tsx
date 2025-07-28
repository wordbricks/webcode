"use client";

import { Circle, Github, Terminal as TerminalIcon } from "lucide-react";
import type { FC } from "react";
import { Badge } from "@/src/components/ui/badge";
import { cn } from "@/src/utils/cn";

type TerminalHeaderProps = {
  status: "idle" | "booting" | "ready" | "error";
  className?: string;
};

export const TerminalHeader: FC<TerminalHeaderProps> = ({
  status,
  className,
}) => {
  const statusConfig = {
    idle: {
      color: "bg-zinc-500",
      text: "Idle",
      pulse: false,
    },
    booting: {
      color: "bg-yellow-500",
      text: "Booting",
      pulse: true,
    },
    ready: {
      color: "bg-emerald-500",
      text: "Ready",
      pulse: false,
    },
    error: {
      color: "bg-red-500",
      text: "Error",
      pulse: false,
    },
  };

  const config = statusConfig[status];

  return (
    <div
      className={cn(
        "flex items-center justify-between border-zinc-800 border-b bg-gradient-to-r from-zinc-950 via-zinc-900 to-zinc-950 px-4 py-3",
        className,
      )}
    >
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-1.5">
          <Circle className="h-3 w-3 fill-red-500 text-red-500" />
          <Circle className="h-3 w-3 fill-yellow-500 text-yellow-500" />
          <Circle className="h-3 w-3 fill-green-500 text-green-500" />
        </div>

        <div className="h-4 w-px bg-zinc-800" />

        <div className="flex items-center gap-2">
          <TerminalIcon className="h-4 w-4 text-zinc-400" />
          <span className="font-medium text-sm text-zinc-200">Terminal</span>

          <Badge
            variant="outline"
            className="ml-1 flex items-center gap-1.5 border-zinc-700 bg-zinc-900/50 px-2 py-0.5 text-zinc-300"
          >
            <div className="relative">
              <div className={cn("h-1.5 w-1.5 rounded-full", config.color)} />
              {config.pulse && (
                <div
                  className={cn(
                    "absolute inset-0 h-1.5 w-1.5 animate-ping rounded-full",
                    config.color,
                  )}
                />
              )}
            </div>
            <span className="text-xs">{config.text}</span>
          </Badge>
        </div>
      </div>

      <a
        href="https://github.com/wordbricks/webcode"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center rounded-md p-2 text-zinc-400 transition-colors hover:bg-zinc-800 hover:text-zinc-200"
        aria-label="View on GitHub"
      >
        <Github className="h-4 w-4" />
      </a>
    </div>
  );
};

TerminalHeader.displayName = "TerminalHeader";
