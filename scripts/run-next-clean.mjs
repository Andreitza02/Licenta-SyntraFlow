import { spawn } from "node:child_process";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const nextBin = require.resolve("next/dist/bin/next");
const nextArgs = process.argv.slice(2);

const childEnv = { ...process.env };

delete childEnv.OPENAI_API_KEY;
delete childEnv.OPENAI_CHATKIT_WORKFLOW_ID;

const child = spawn(process.execPath, [nextBin, ...nextArgs], {
  cwd: process.cwd(),
  env: childEnv,
  stdio: "inherit",
});

child.on("exit", (code, signal) => {
  if (signal) {
    process.kill(process.pid, signal);
    return;
  }

  process.exit(code ?? 0);
});

child.on("error", (error) => {
  console.error(error);
  process.exit(1);
});
