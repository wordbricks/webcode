import { Hono } from "hono";
import { api } from "@/worker/api";
import { authCallback } from "@/worker/api/authCallback";
import { fetchWorker } from "@/worker/api/fetch.worker";
import { fileSystemWorker } from "@/worker/api/filesystem.worker";
import { iframe } from "@/worker/api/iframe";
import { iframeMain } from "@/worker/api/iframe.main";
import { webcontainer } from "@/worker/api/webcontainer";

export type Bindings = {
  ASSETS: Fetcher;
  ASSET_URL: string;
};

const app = new Hono()
  //
  .get("/health", (c) => c.json({ ok: true }))
  .route("/api", api)
  .route("/iframe", iframe)
  .route("/callback", authCallback)
  .route("/iframe-webkit.96435430.html", iframe)
  .route("/fetch.worker.96435430.js", fetchWorker)
  .route("/iframe.main.96435430.js", iframeMain)
  .route("/webcontainer.96435430.js", webcontainer)
  .route("/filesystem-worker.96435430.js", fileSystemWorker);

export default app;
