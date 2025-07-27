import { spawn } from "node:child_process";
import { mkdir } from "node:fs/promises";
import { homedir } from "node:os";
import { basename, join } from "node:path";

async function runCommand(
  command: string,
  args: string[],
  options?: { cwd?: string },
): Promise<void> {
  return new Promise((resolve, reject) => {
    const proc = spawn(command, args, {
      stdio: "inherit",
      shell: false,
      cwd: options?.cwd,
    });

    proc.on("error", (error) => {
      reject(error);
    });

    proc.on("exit", (code) => {
      if (code === 0) {
        resolve();
      } else {
        reject(new Error(`Process exited with code ${code}`));
      }
    });
  });
}

async function main() {
  const args = process.argv.slice(2);
  const isogitPath = join(
    homedir(),
    ".global",
    "node_modules",
    ".bin",
    "isogit",
  );

  if (args.length >= 2 && args[0] === "clone") {
    const gitUrl = args[1];

    // Extract repo name from URL (e.g., "repo.git" or "repo" from "https://github.com/user/repo.git")
    const repoName = basename(gitUrl, ".git");

    // Create directory for the repository
    await mkdir(repoName, { recursive: true });

    // Clone into the directory
    await runCommand(isogitPath, ["clone", `--url=${gitUrl}`, "."], {
      cwd: repoName,
    });
    return;
  }

  await runCommand(isogitPath, args);
}

main().catch(console.error);
