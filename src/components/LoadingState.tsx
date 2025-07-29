import { Terminal } from "lucide-react";
import type { FC } from "react";
import { cn } from "@/src/utils/cn";

type LoadingStateProps = {
  className?: string;
};

export const LoadingState: FC<LoadingStateProps> = ({ className }) => {
  return (
    <div
      className={cn(
        "flex h-dvh w-full items-center justify-center bg-black",
        className,
      )}
    >
      <div className="flex flex-col items-center gap-6">
        <div className="relative">
          <div className="absolute inset-0 animate-ping">
            <Terminal className="h-16 w-16 text-zinc-600" />
          </div>
          <Terminal className="relative h-16 w-16 text-zinc-400" />
        </div>

        <div className="flex flex-col items-center gap-2">
          <h2 className="font-semibold text-lg text-zinc-200">
            Initializing Container...
          </h2>
          <p className="text-sm text-zinc-500">
            Setting up your development environment...
          </p>
        </div>

        <div className="flex items-center gap-1">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="h-2 w-2 animate-pulse rounded-full bg-zinc-600"
              style={{ animationDelay: `${i * 150}ms` }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
