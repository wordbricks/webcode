import { ENV } from "@/src/utils/env";
import { isServer } from "@/src/utils/isServer";

const localHost = isServer() ? "localhost" : location.hostname;

export const HOST = {
  WEBCODE: {
    [ENV.PROD]: `https://webcode.sh`,
    [ENV.LOCAL]: `https://${localHost}:5174`,
  },
} as const;
