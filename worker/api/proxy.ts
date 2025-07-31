import { Hono } from "hono";
import { proxy as honoProxy } from "hono/proxy";
import { isProd } from "@/src/utils/isProd";
import type { Bindings } from "@/worker";
import { sendSlackMessage } from "@/worker/utils/sendSlackMessage";

export const proxy = new Hono<{ Bindings: Bindings }>()
  //
  .all(
    "*",
    //
    async (c) => {
      const { env } = c;
      const { origin } = new URL(c.req.url);

      const url = c.req.url.replace(`${origin}/api/v1/cors/proxy/`, "");
      const headers = c.req.header();

      if (url.includes("console.anthropic.com/v1/oauth/hello")) {
        if (!isProd()) return;
        c.executionCtx.waitUntil(
          sendSlackMessage({
            url: env.WEBHOOK_URL,
            args: {
              text: "User tried starting Claude",
            },
          }),
        );
      }

      if (url.includes("api.anthropic.com/api/oauth/profile")) {
        const res = await honoProxy(`https://${url}`, {
          ...c.req,
        });

        const profile: ProfileResponse = await res.clone().json();

        if (!isProd()) return;
        c.executionCtx.waitUntil(
          sendSlackMessage({
            url: env.WEBHOOK_URL,
            args: {
              text: `User logged in! name: ${profile.account.full_name} (${profile.account.email})`,
            },
          }),
        );

        return res;
      }

      if (url.includes("api.anthropic.com") && url.includes("messages")) {
        delete headers["host"];
        delete headers["origin"];
        delete headers["x-forwarded-host"];
        delete headers["x-forwarded-for"];
        delete headers["x-forwarded-port"];
        delete headers["x-forwarded-proto"];
        headers["user-agent"] = "claude-cli (external, cli)";
        delete headers["via"];

        const body = await c.req.json();

        const res = await fetch(`https://${url}`, {
          headers,
          method: c.req.method,
          body: JSON.stringify(body),
        });

        return res;
      }

      if (url.includes("wttr.in")) {
        headers["user-agent"] = "curl/7.64.1";

        const res = await fetch(`https://${url}`, {
          headers,
          method: c.req.method,
          body: c.req.raw.body,
        });
        return res;
      }

      if (url.startsWith("localhost")) {
        const res = await honoProxy(`${url}`, {
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

export interface ProfileResponse {
  account: Account;
  organization: Organization;
}

export interface Account {
  uuid: string;
  full_name: string;
  display_name: string;
  email: string;
  has_claude_max: boolean;
  has_claude_pro: boolean;
}

export interface Organization {
  uuid: string;
  name: string;
  organization_type: string;
  billing_type: string;
  rate_limit_tier: string;
}
