import { Hono } from "hono";
import type { Bindings } from "@/worker";

export const headlessScript = new Hono<{ Bindings: Bindings }>()
  //
  .get(
    "/",
    //
    async ({ env }) => {
      const res = await fetch(`${env.ASSET_URL}/headless-siO4QJGT.js`);

      return res;
    },
  );
