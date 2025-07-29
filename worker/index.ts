import { Hono } from "hono";
import { api } from "@/worker/api";
import { authCallback } from "@/worker/api/authCallback";
import { blitz } from "@/worker/api/blitz";
import { fetchWorker } from "@/worker/api/fetch.worker";
import { fileSystemWorker } from "@/worker/api/filesystem.worker";
import { fullBin } from "@/worker/api/fullBin";
import { headlessScript } from "@/worker/api/headlessScript";
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
  .route("/blitz.96435430.js", blitz)
  .route("/iframe-webkit.96435430.html", iframe)
  .route("/full_bin_index.96435430", fullBin)
  .route("/headless-siO4QJGT.js", headlessScript)
  .route("/fetch.worker.96435430.js", fetchWorker)
  .route("/iframe.main.96435430.js", iframeMain)
  .route("/webcontainer.96435430.js", webcontainer)
  .route("/filesystem-worker.96435430.js", fileSystemWorker);

export default app;
