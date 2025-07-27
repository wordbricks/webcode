import { Hono } from "hono";
import { headless } from "@/worker/api/headless";
import { proxy } from "@/worker/api/proxy";

export const api = new Hono()
  //
  .route("/headless", headless)
  .route("/v1/cors/proxy", proxy);
