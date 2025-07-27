import { Hono } from "hono";
import { html } from "hono/html";

export const iframe = new Hono()
  //
  .get(
    "/",
    //
    async (c) => {
      return c.html(
        html`
<!DOCTYPE html>
<html>

<head>
	<meta charset="utf-8" />
	<script src="/iframe.main.96435430.js"></script>
</head>

<body></body>

</html>

  `,
        {
          headers: {
            "Cross-Origin-Embedder-Policy": "require-corp",
            "Cross-Origin-Opener-Policy": "same-origin",
          },
        },
      );
    },
  );
