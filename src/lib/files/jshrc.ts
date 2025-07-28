import dedent from "dedent";

export const jshrc = dedent`export DISABLE_TELEMETRY=1
alias claude=~/.global/node_modules/.bin/claude
alias isogit=~/.global/node_modules/.bin/isogit
alias tsx=~/.global/node_modules/.bin/tsx
alias git="~/.global/node_modules/.bin/tsx ~/.global/src/git.ts"
`;
