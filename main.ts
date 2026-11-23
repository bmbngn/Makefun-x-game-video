// main.ts — copies POST.json (the X post's address) into the output dir.
// Node 22 stdlib only. Never deletes or recreates the output directory.
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { join } from "node:path";

const botDir = process.env.MAKEFUN_BOT_DIR ?? ".";
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "out";

const raw = readFileSync(join(botDir, "POST.json"), "utf8");
const post = JSON.parse(raw);
if (typeof post !== "object" || post === null || typeof post.url !== "string") {
  throw new Error("POST.json must be an object with a url string");
}
const url = post.url.trim();
if (!/^https:\/\/(www\.|mobile\.)?(x|twitter)\.com\/[^/]+\/status\/\d+/.test(url)) {
  throw new Error("POST.json url must be an X post address (https://x.com/<handle>/status/<id>)");
}

mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "POST.json"), raw);
