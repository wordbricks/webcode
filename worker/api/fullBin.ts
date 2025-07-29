import { Hono } from "hono";
import type { Bindings } from "@/worker";

export const fullBin = new Hono<{ Bindings: Bindings }>()
  //
  .get(
    "/",
    //
    async ({ env }) => {
      const res = await fetch(`${env.ASSET_URL}//full_bin_index.96435430`);

      return res;
    },
  );
