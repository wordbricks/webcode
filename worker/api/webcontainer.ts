import { Hono } from "hono";
import type { Bindings } from "@/worker";

export const webcontainer = new Hono<{ Bindings: Bindings }>()
  //
  .get(
    "/",
    //
    async ({ env }) => {
      const res = await fetch(`${env.ASSET_URL}/webcontainer.96435430.js`);

      return res;
    },
  );
