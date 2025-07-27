import { Hono } from "hono";
import { html } from "hono/html";
import { getEnv } from "@/src/utils/getEnv";
import { HOST } from "@/src/utils/host";

export const headless = new Hono()
  //
  .get(
    "/",
    //
    async (c) => {
      return c.html(
        html`
<!DOCTYPE html>
<html lang="en">

<head>
    <title>StackBlitz</title>
    <script src="/webcontainer.96435430.js"></script>
    <script src="/headless-siO4QJGT.js" crossorigin="anonymous" type="module"></script>
    <link rel="modulepreload" href="/semver-Zyv2pDaP.js" as="script" crossorigin="anonymous">
</head>

<body>
    <script type="application/json" id="webcontainer-context">
                {
                    "options": {
                        "baseUrl": "${HOST.WEBCODE[getEnv()]}",
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
                    "embedderId": "home",
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
