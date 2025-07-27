export const ENV = {
  PROD: "production",
  STAGE: "stage",
  PREVIEW: "preview",
  LOCAL: "development",
} as const;

export type Env = (typeof ENV)[keyof typeof ENV];
