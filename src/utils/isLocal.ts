import { env } from "std-env";
import { ENV } from "@/src/utils/env";
import { isServer } from "@/src/utils/isServer";

export const isLocal = (): boolean => {
  if (isServer()) {
    return (
      env.NODE_ENV === ENV.LOCAL ||
      env.TARGET_ENV === ENV.LOCAL ||
      env.MODE === ENV.LOCAL ||
      import.meta.env.DEV
    );
  }

  return (
    env.NODE_ENV === ENV.LOCAL ||
    import.meta.env.DEV ||
    globalThis.location?.hostname === "localhost" ||
    isIPAddress(globalThis.location?.hostname)
  );
};

const isIPAddress = (hostname: string) => {
  return /^(\d{1,3}\.){3}\d{1,3}$/.test(hostname);
};
