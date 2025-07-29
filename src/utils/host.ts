import { ENV } from "@/src/utils/env";

export const HOST = {
  WEBCODE: {
    [ENV.PROD]: `https://webcode.sh`,
    [ENV.LOCAL]: location.origin,
  },
} as const;
