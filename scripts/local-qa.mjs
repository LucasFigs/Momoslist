// Local test infrastructure only. Never used by the application or deployment.
import net from "node:net";
import { mkdirSync, writeFileSync } from "node:fs";
import { spawn } from "node:child_process";
import { randomBytes } from "node:crypto";

const databaseUrl = process.env.TEST_DATABASE_URL;
if (!databaseUrl)
  throw new Error(
    "Set TEST_DATABASE_URL for an isolated PostgreSQL cluster first.",
  );
const target = new URL(databaseUrl);
if (
  target.hostname !== "127.0.0.1" ||
  target.port !== "55439" ||
  target.pathname !== "/postgres"
) {
  throw new Error(
    "QA only connects to the disposable cluster at 127.0.0.1:55439/postgres.",
  );
}
mkdirSync(".local", { recursive: true });
const mailbox = {};
const smtp = net.createServer((socket) => {
  let buffer = "",
    readingData = false,
    message = "",
    recipient = "";
  socket.write("220 localhost test SMTP\r\n");
  socket.on("data", (chunk) => {
    buffer += chunk.toString();
    let index;
    while ((index = buffer.indexOf("\r\n")) >= 0) {
      const line = buffer.slice(0, index);
      buffer = buffer.slice(index + 2);
      if (readingData) {
        if (line !== ".") {
          message += line + "\n";
          continue;
        }
        readingData = false;
        const code = message.match(/\b[0-9]{6}\b/);
        if (code) {
          mailbox[recipient] = code[0];
          writeFileSync(".local/qa-mailbox.json", JSON.stringify(mailbox));
        }
        message = "";
        socket.write("250 accepted\r\n");
      } else if (/^(EHLO|HELO)/i.test(line)) {
        socket.write("250-localhost\r\n250 OK\r\n");
      } else if (/^RCPT TO:/i.test(line)) {
        recipient = (line.match(/<([^>]+)>/)?.[1] ?? "").toLowerCase();
        socket.write(
          recipient.endsWith(".invalid")
            ? "250 OK\r\n"
            : "550 Test addresses only\r\n",
        );
      } else if (line === "DATA") {
        readingData = true;
        socket.write("354 Send data\r\n");
      } else if (line === "QUIT") {
        socket.end("221 bye\r\n");
      } else {
        socket.write("250 OK\r\n");
      }
    }
  });
  socket.on("error", () => {});
});
smtp.listen(25259, "127.0.0.1");
const child = spawn(
  process.execPath,
  [
    "node_modules/next/dist/bin/next",
    "start",
    "--hostname",
    "127.0.0.1",
    "-p",
    "3107",
  ],
  {
    stdio: "inherit",
    windowsHide: true,
    env: {
      ...process.env,
      DATABASE_URL: databaseUrl,
      DIRECT_URL: databaseUrl,
      AUTH_SECRET: randomBytes(32).toString("hex"),
      AUTH_TRUST_HOST: "true",
      SMTP_HOST: "127.0.0.1",
      SMTP_PORT: "25259",
      SMTP_SECURE: "false",
      SMTP_USER: "",
      SMTP_PASSWORD: "",
      EMAIL_FROM_ADDRESS: "test@example.invalid",
      NEXT_PUBLIC_SITE_URL: "http://127.0.0.1:3107",
    },
  },
);
child.on("exit", () => smtp.close());
function stop() {
  child.kill();
  smtp.close();
}
process.on("SIGINT", stop);
process.on("SIGTERM", stop);
console.log(
  "Local-only QA: app 127.0.0.1:3107; SMTP 127.0.0.1:25259; codes in .local/qa-mailbox.json.",
);
