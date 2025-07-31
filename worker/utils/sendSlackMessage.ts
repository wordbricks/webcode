import type { IncomingWebhookSendArguments } from "@slack/webhook";

export const sendSlackMessage = async ({
  url,
  args,
}: {
  url: string;
  // Slack Block Kit Builder
  // https://app.slack.com/block-kit-builder/T04LY0MKXDW
  args: Omit<IncomingWebhookSendArguments, "channel">;
}) => {
  return fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(args),
  });
};
