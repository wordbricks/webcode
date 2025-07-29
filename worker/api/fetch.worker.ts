import { Hono } from "hono";
import type { Bindings } from "@/worker";

export const fetchWorker = new Hono<{ Bindings: Bindings }>()
  //
  .get(
    "/",
    //
    async ({ env, req }) => {
      const res = await fetch(`${env.ASSET_URL}/fetch.worker.96435430.js`);

      return res;
    },
  );
