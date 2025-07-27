import { Hono } from "hono";
import { proxy as honoProxy } from "hono/proxy";

export const proxy = new Hono()
  //
  .all(
    "*",
    //
    async (c) => {
      const { origin } = new URL(c.req.url);

      const url = c.req.url.replace(`${origin}/api/v1/cors/proxy/`, "");
      const headers = c.req.header();

      if (url.includes("api.anthropic.com") && url.includes("messages")) {
        delete headers["host"];
        delete headers["origin"];
        delete headers["x-forwarded-host"];
        delete headers["x-forwarded-for"];
        delete headers["x-forwarded-port"];
        delete headers["x-forwarded-proto"];
        headers["user-agent"] = "claude-cli/1.0.54 (external, cli)";
        delete headers["via"];

        const body = await c.req.json();

        const res = await fetch(`https://${url}`, {
          headers,
          method: c.req.method,
          body: JSON.stringify(body),
        });
        return res;
      }

      if (url.startsWith("localhost")) {
        const res = await honoProxy(`http://${url}`, {
          ...c.req,
        });

        return res;
      }

      const res = await honoProxy(`https://${url}`, {
        ...c.req,
      });

      return res;
    },
  );
