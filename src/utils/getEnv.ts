import { ENV } from "@/src/utils/env";
import { isLocal } from "@/src/utils/isLocal";
import { isProd } from "@/src/utils/isProd";

export const getEnv = () => {
  if (isLocal()) return ENV.LOCAL;
  if (isProd()) return ENV.PROD;

  throw Error("Invalid environment");
};
