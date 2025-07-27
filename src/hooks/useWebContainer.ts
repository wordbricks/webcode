import type {
  SpawnOptions,
  WebContainer,
  WebContainerProcess,
} from "@webcontainer/api";
import { useCallback, useRef, useState } from "react";
import { useEffectOnce } from "@/src/hooks/useEffectOnce.ts";

type WebContainerState = {
  status: "idle" | "booting" | "ready" | "error";
  error?: Error;
  serverUrl?: string;
};

type UseWebContainerReturn = {
  container: WebContainer | null;
  state: WebContainerState;
  mount: typeof WebContainer.prototype.mount;
  spawn: (
    command: string,
    args?: string[],
    options?: SpawnOptions,
  ) => Promise<WebContainerProcess>;
  writeFile: (path: string, content: string) => Promise<void>;
  readFile: (path: string) => Promise<string>;
  readdir: (path: string) => Promise<string[]>;
};

declare global {
  interface Window {
    WEBCONTAINER_API_IFRAME_URL?: string;
  }
}

window.WEBCONTAINER_API_IFRAME_URL = location.origin;

export const useWebContainer = (): UseWebContainerReturn => {
  const [container, setContainer] = useState<WebContainer | null>(null);
  const [state, setState] = useState<WebContainerState>({ status: "idle" });
  const bootingRef = useRef(false);

  useEffectOnce(() => {
    const bootContainer = async () => {
      if (bootingRef.current || typeof window === "undefined") return;
      bootingRef.current = true;

      setState({ status: "booting" });

      try {
        const { WebContainer } = await import("@webcontainer/api");
        const instance = await WebContainer.boot();

        instance.on("xdg-open", (e) => {
          console.log("xdg-open event:", e);
        });
        instance.on("code", (e) => console.log("code event:", e));
        instance.on("port", (e) => console.error("port event:", e));
        instance.on("preview-message", (e) =>
          console.error("preview-message event:", e),
        );

        instance.on("server-ready", (_port, url) => {
          setState((prev) => ({ ...prev, serverUrl: url }));
        });

        instance.on("error", (error) => {
          console.error("WebContainer error:", error);
          setState({ status: "error", error: new Error(error.message) });
        });

        setContainer(instance);
        setState({ status: "ready" });
      } catch (error) {
        setState({
          status: "error",
          error:
            error instanceof Error
              ? error
              : new Error("Failed to boot WebContainer"),
        });
      }
    };

    bootContainer();
  });

  const mount = useCallback(
    async (...args: Parameters<typeof WebContainer.prototype.mount>) => {
      if (!container) throw new Error("WebContainer not ready");
      await container.mount(...args);
    },
    [container],
  );

  const spawn = useCallback(
    async (command: string, args: string[] = [], options?: SpawnOptions) => {
      if (!container) throw new Error("WebContainer not ready");
      return container.spawn(command, args, options);
    },
    [container],
  );

  const writeFile = useCallback(
    async (path: string, content: string) => {
      if (!container) throw new Error("WebContainer not ready");
      await container.fs.writeFile(path, content);
    },
    [container],
  );

  const readFile = useCallback(
    async (path: string) => {
      if (!container) throw new Error("WebContainer not ready");
      const content = await container.fs.readFile(path, "utf-8");
      return content;
    },
    [container],
  );

  const readdir = useCallback(
    async (path: string) => {
      if (!container) throw new Error("WebContainer not ready");
      const files = await container.fs.readdir(path);
      return files;
    },
    [container],
  );

  return {
    container,
    state,
    mount,
    spawn,
    writeFile,
    readFile,
    readdir,
  };
};
