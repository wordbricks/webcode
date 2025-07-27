import { env } from "std-env";
import { ENV } from "@/src/utils/env";
import { isLocal } from "@/src/utils/isLocal";
import { isServer } from "@/src/utils/isServer";

export const isProd = (): boolean => {
  if (isLocal()) {
    return false;
  }

  if (isServer()) {
    return (
      env.TARGET_ENV === ENV.PROD ||
      env.NODE_ENV === ENV.PROD ||
      env.MODE === ENV.PROD ||
      import.meta.env.PROD
    );
  }

  return (
    env.NODE_ENV === ENV.PROD ||
    import.meta.env.PROD ||
    globalThis.location?.hostname !== "localhost"
  );
};
