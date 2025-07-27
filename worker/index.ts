import { Hono } from "hono";
import { api } from "@/worker/api";
import { fetchWorker } from "@/worker/api/fetch.worker";
import { fileSystemWorker } from "@/worker/api/filesystem.worker";
import { iframe } from "@/worker/api/iframe";

const app = new Hono()
  //
  .get("/health", (c) => c.json({ ok: true }))
  .route("/api", api)
  .route("/iframe", iframe)
  .route("/fetch.worker.96435430.js", fetchWorker)
  .route("/filesystem-worker.96435430.js", fileSystemWorker);

export default app;
