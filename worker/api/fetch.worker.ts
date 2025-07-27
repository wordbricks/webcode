import { Hono } from "hono";

type Bindings = {
  ASSETS: Fetcher;
};

export const fetchWorker = new Hono<{ Bindings: Bindings }>()
  //
  .get(
    "/",
    //
    async ({ env, req }) => {
      console.log(req.url);

      const res = await env.ASSETS.fetch(
        new URL("/fetch.worker.96435430.js", req.url),
      );

      return new Response(res.body, {
        headers: {
          "Cross-Origin-Embedder-Policy": "require-corp",
          "Cross-Origin-Opener-Policy": "same-origin",
        },
      });
    },
  );
