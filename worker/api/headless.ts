import { Hono } from "hono";
import { html } from "hono/html";

export const headless = new Hono()
  //
  .get(
    "/",
    //
    async (c) => {
      const { req } = c;

      const referer = req.header("referer") || req.url;

      const { origin } = new URL(referer);

      return c.html(
        html`
<!DOCTYPE html>
<html lang="en">

<head>
    <title>StackBlitz</title>
    <script src="/webcontainer.96435430.js"></script>
    <link rel="preload" as="script" href="/webcontainer.96435430.js" fetchpriority="low">
    <link rel="preload" as="script" href="/fetch.worker.96435430.js" fetchpriority="low">
    <script src="/headless-siO4QJGT.js" crossorigin="anonymous" type="module"></script>
    <link rel="modulepreload" href="/semver-Zyv2pDaP.js" as="script" crossorigin="anonymous">
</head>

<body>
    <script type="application/json" id="webcontainer-context">
                {
                    "options": {
                        "baseUrl": "${origin}",
                        "initOptions": {
                            "server": "https://local-corp.webcontainer-api.io",
                            "isolationPolicy": "require-corp",
                            "version": "96435430",
                            "flattenedServer": false
                        },
                        "systemBinaries": {
                        },
                        "git": {
                            "proxy": "https://p.stackblitz.com"
                        },
                        "turboBaseUrl": "https://t.staticblitz.com",
                        "registryProxy": "https://nr.staticblitz.com",
                        "registryMaxConcurrency": ""
                    },
                    "authenticationRequired": false,
                    "embedder": "/",
                    "embedderId": "813lgxqqmjqh07iwi7c1i1grfg664t",
                    "shortAppId": false,
                    "refreshInterval": 43200
                }</script>
</body>

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
