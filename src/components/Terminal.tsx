"use client";

import "@xterm/xterm/css/xterm.css";

import type { WebContainerProcess } from "@webcontainer/api";
import {
  type Ref,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
} from "react";
import { useInterval } from "@/src/hooks/useInterval";
import { useTerminal } from "@/src/hooks/useTerminal";
import { cn } from "@/src/utils/cn";

type TerminalProps = {
  className?: string;
  onData?: (data: string) => void;
  onResize?: (cols: number, rows: number) => void;
  onReady?: () => void;
  ref?: Ref<TerminalHandle>;
};

export type TerminalHandle = {
  connectProcess: (process: WebContainerProcess) => Promise<void>;
  fit: () => void;
};

export const Terminal = ({
  className,
  onData,
  onResize,
  onReady,
  ref,
}: TerminalProps) => {
  const processRef = useRef<WebContainerProcess | null>(null);
  const inputWriterRef = useRef<WritableStreamDefaultWriter<string> | null>(
    null,
  );

  const { terminalRef, write, cols, rows, terminal, fit } = useTerminal({
    onData: (data) => {
      onData?.(data);
      inputWriterRef.current?.write(data);
    },
    onResize: (cols, rows) => {
      onResize?.(cols, rows);
      processRef.current?.resize({ cols, rows });
    },
  });

  useInterval(() => processRef.current?.resize({ cols, rows }), 5000);

  const connectProcess = useCallback(
    async (process: WebContainerProcess) => {
      processRef.current = process;

      const input = process.input.getWriter();
      inputWriterRef.current = input;

      process.output.pipeTo(
        new WritableStream({
          write(data) {
            write(data);
          },
        }),
      );
    },
    [write],
  );

  useImperativeHandle(
    ref,
    () => ({
      connectProcess,
      fit,
    }),
    [connectProcess, fit],
  );

  useEffect(() => {
    return () => {
      inputWriterRef.current?.releaseLock();
      processRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (terminal && onReady) {
      onReady();
    }
  }, [terminal, onReady]);

  return (
    <div
      ref={terminalRef}
      className={cn("h-full w-full bg-black", className)}
      data-terminal-cols={cols}
      data-terminal-rows={rows}
    />
  );
};
