"use client";

import type { WebContainerProcess } from "@webcontainer/api";
import { useCallback, useEffect, useRef, useState } from "react";
import { LoadingState } from "@/src/components/LoadingState";
import { Terminal, type TerminalHandle } from "@/src/components/Terminal";
import { TerminalHeader } from "@/src/components/TerminalHeader";
import { useWebContainer } from "@/src/hooks/useWebContainer";
import { jshrc } from "@/src/lib/files/jshrc";
import { templates } from "@/src/utils/registry";
import { wait } from "@/src/utils/wait";

export const TerminalPage = () => {
  const { container, state, mount, spawn, readdir, writeFile } =
    useWebContainer();
  const [terminalProcess, setTerminalProcess] =
    useState<WebContainerProcess | null>(null);
  const [terminalReady, setTerminalReady] = useState(false);
  const [setupComplete, setSetupComplete] = useState(false);
  const terminalComponentRef = useRef<TerminalHandle | null>(null);

  const startShell = useCallback(async () => {
    if (!container || terminalProcess || !terminalReady) return;

    try {
      await spawn("rm", ["~/.jshrc"]);
      await writeFile(".jshrc", jshrc);
      await spawn("mv", [".jshrc", "../.jshrc"]);
      await spawn("source", ["~/.jshrc"]);

      await spawn("mkdir", ["-p", "../.global"]);

      // move all files, folders to .global directory recursively
      // await spawn("mv", ["*", "../.global/"]);

      // await spawn("pnpm", ["i", "--prefix", "../.global"]);

      const shellProcess = await spawn("jsh");

      setTerminalProcess(shellProcess);

      if (terminalComponentRef.current) {
        await terminalComponentRef.current.connectProcess(shellProcess);
        terminalComponentRef.current.fit();
      } else {
        console.error("Terminal ref not available");
      }
    } catch (error) {
      console.error("Failed to start shell:", error);
    }
  }, [container, spawn, terminalProcess, terminalReady, writeFile]);

  const handleTerminalReady = useCallback(() => {
    setTerminalReady(true);
  }, []);

  useEffect(() => {
    if (state.status === "ready" && container) {
      // Load and mount the selected template
      (async () => {
        await mount(await templates["global"]());

        await wait(1000);

        await spawn("mkdir", ["-p", "../.global/src"]);
        await spawn("mv", ["git.ts", "../.global/src/git.ts"]);
        await spawn("mv", ["package.json", "../.global/package.json"]);
        await spawn("mv", ["pnpm-lock.yaml", "../.global/pnpm-lock.yaml"]);

        const pnpmProcess = await spawn("pnpm", ["i", "--prefix", "../.global"]);
        const exitCode = await pnpmProcess.exit;
        if (exitCode !== 0) {
          throw new Error('pnpm install failed');
        }

        setSetupComplete(true);
      })();
    }
  }, [state.status, container, mount, spawn]);

  useEffect(() => {
    if (
      state.status === "ready" &&
      container &&
      terminalReady &&
      !terminalProcess
    ) {
      startShell();
    }
  }, [state.status, container, terminalReady, terminalProcess, startShell]);

  const handleTerminalResize = useCallback(
    (cols: number, rows: number) => {
      terminalProcess?.resize({ cols, rows });
    },
    [terminalProcess],
  );

  if (state.status === "idle" || state.status === "booting" || !setupComplete) {
    return (
      <div className="flex h-screen w-screen flex-col bg-zinc-950">
        <TerminalHeader status={state.status} />
        <div className="flex flex-1 overflow-hidden">
          <LoadingState className="flex-1" />
        </div>
      </div>
    );
  }

  if (state.status === "error") {
    return (
      <div className="flex h-screen w-screen flex-col bg-zinc-950">
        <TerminalHeader status={state.status} />
        <div className="flex flex-1 items-center justify-center overflow-hidden">
          <div className="flex flex-col items-center gap-4 text-center">
            <div className="text-6xl">💥</div>
            <h1 className="font-bold text-2xl text-red-500">
              WebContainer Error
            </h1>
            <p className="max-w-md text-sm text-zinc-400">
              {state.error?.message || "Failed to initialize WebContainer"}
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen w-screen flex-col bg-zinc-950">
      <TerminalHeader status={state.status} />
      <div className="flex flex-1 overflow-hidden">
        <div className="flex flex-1 flex-col overflow-hidden">
          <div className="relative flex-1 overflow-hidden p-0 sm:p-2">
            <div className="absolute inset-0 overflow-auto rounded-none border-0 border-zinc-800 bg-black shadow-2xl sm:inset-2 sm:overflow-hidden sm:rounded-lg sm:border">
              <Terminal
                ref={terminalComponentRef}
                className="h-full w-full"
                onResize={handleTerminalResize}
                onReady={handleTerminalReady}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
