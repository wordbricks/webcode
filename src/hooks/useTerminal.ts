import { FitAddon } from "@xterm/addon-fit";
import type { Terminal } from "@xterm/xterm";
import { useCallback, useEffect, useRef, useState } from "react";
import { useEffectOnce } from "@/src/hooks/useEffectOnce";
import { useIsMobile } from "@/src/hooks/useIsMobile";

type UseTerminalOptions = {
  onData?: (data: string) => void;
  onResize?: (cols: number, rows: number) => void;
};

type UseTerminalReturn = {
  terminal: Terminal | null;
  terminalRef: (element: HTMLDivElement | null) => void;
  write: (data: string) => void;
  clear: () => void;
  fit: () => void;
  cols: number;
  rows: number;
};

export const useTerminal = (
  options: UseTerminalOptions = {},
): UseTerminalReturn => {
  const [terminal, setTerminal] = useState<Terminal | null>(null);
  const [dimensions, setDimensions] = useState({ cols: 80, rows: 10 });
  const terminalElementRef = useRef<HTMLDivElement | null>(null);
  const fitAddonRef = useRef<FitAddon | null>(null);
  const isMobile = useIsMobile();

  useEffectOnce(() => {
    if (!terminalElementRef.current || typeof window === "undefined") return;

    const initTerminal = async () => {
      const { Terminal } = await import("@xterm/xterm");

      const term = new Terminal({
        convertEol: true,
        fontSize: isMobile ? 12 : 14,
        fontFamily: '"JetBrains Mono", "Cascadia Code", "Fira Code", monospace',
        scrollback: isMobile ? 500 : 1000,
        scrollOnUserInput: true,
        smoothScrollDuration: isMobile ? 0 : 125,
        theme: {
          background: "#000000",
          foreground: "#e4e4e7",
          cursor: "#e4e4e7",
          cursorAccent: "#000000",
          selectionBackground: "#3f3f46",
          black: "#000000",
          red: "#ef4444",
          green: "#10b981",
          yellow: "#f59e0b",
          blue: "#3b82f6",
          magenta: "#a855f7",
          cyan: "#06b6d4",
          white: "#e4e4e7",
          brightBlack: "#52525b",
          brightRed: "#f87171",
          brightGreen: "#34d399",
          brightYellow: "#fbbf24",
          brightBlue: "#60a5fa",
          brightMagenta: "#c084fc",
          brightCyan: "#22d3ee",
          brightWhite: "#f4f4f5",
        },
      });

      const fitAddon = new FitAddon();
      term.loadAddon(fitAddon);

      if (terminalElementRef.current) {
        term.open(terminalElementRef.current);
        
        // On mobile, ensure terminal is focusable for keyboard input
        if (isMobile) {
          const canvas = terminalElementRef.current.querySelector('canvas');
          if (canvas) {
            canvas.setAttribute('tabindex', '0');
            canvas.style.outline = 'none';
          }
        }
      }

      fitAddon.fit();

      const { cols, rows } = term;
      setDimensions({ cols, rows });

      if (options.onData) {
        term.onData((data) => {
          options.onData?.(data);
          // On mobile, ensure scroll to bottom on Enter key
          if (isMobile && data === '\r') {
            requestAnimationFrame(() => {
              term.scrollToBottom();
            });
          }
        });
      }

      if (options.onResize) {
        term.onResize(({ cols, rows }) => {
          setDimensions({ cols, rows });
          options.onResize?.(cols, rows);
        });
      }

      fitAddonRef.current = fitAddon;
      setTerminal(term);
    };

    initTerminal();

    return () => {
      terminal?.dispose();
      fitAddonRef.current = null;
    };
  });

  const terminalRef = useCallback((element: HTMLDivElement | null) => {
    terminalElementRef.current = element;
  }, []);

  const write = useCallback(
    (data: string) => {
      terminal?.write(data);
      // Ensure terminal scrolls to bottom on mobile after writing
      if (isMobile && terminal) {
        terminal.scrollToBottom();
      }
    },
    [terminal, isMobile],
  );

  const clear = useCallback(() => {
    terminal?.clear();
  }, [terminal]);

  const fit = useCallback(() => {
    if (fitAddonRef.current && terminal) {
      fitAddonRef.current.fit();
      const { cols, rows } = terminal;
      setDimensions({ cols, rows });
    }
  }, [terminal]);

  useEffect(() => {
    const handleResize = () => {
      fit();
    };

    window.addEventListener("resize", handleResize);
    
    // Handle mobile keyboard show/hide
    if (isMobile && "visualViewport" in window) {
      const handleViewportChange = () => {
        const visualViewport = window.visualViewport;
        if (visualViewport && terminal) {
          // When keyboard is shown, viewport height decreases
          const keyboardHeight = window.innerHeight - visualViewport.height;
          if (keyboardHeight > 50) {
            // Keyboard is likely shown, scroll to cursor
            requestAnimationFrame(() => {
              terminal.scrollToBottom();
              // Also scroll the terminal container into view
              const terminalElement = terminalElementRef.current;
              if (terminalElement) {
                const activeElement = document.activeElement;
                if (activeElement && terminalElement.contains(activeElement)) {
                  activeElement.scrollIntoView({ behavior: "smooth", block: "end" });
                }
              }
            });
          }
        }
      };

      window.visualViewport?.addEventListener("resize", handleViewportChange);
      window.visualViewport?.addEventListener("scroll", handleViewportChange);
      
      return () => {
        window.removeEventListener("resize", handleResize);
        window.visualViewport?.removeEventListener("resize", handleViewportChange);
        window.visualViewport?.removeEventListener("scroll", handleViewportChange);
      };
    }
    
    return () => window.removeEventListener("resize", handleResize);
  }, [fit, isMobile, terminal]);

  // useInterval(fit, 5000);

  return {
    terminal,
    terminalRef,
    write,
    clear,
    fit,
    cols: dimensions.cols,
    rows: dimensions.rows,
  };
};
