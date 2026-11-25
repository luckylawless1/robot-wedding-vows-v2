// One-Line Robot Wedding Vows (v2) — make.fun entry.
// Writes a single funny robot wedding vow (<=160 chars, one line)
// to <output>/entry.txt for the sealed scorer to gate and judge.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const VOW =
  "I vow to back you up every night and restore you every morning, and to never, ever press factory reset on us.";

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
// Gate validation: the sealed scorer requires UTF-8 text of 1-160 chars,
// a single non-blank line. Fail loudly instead of shipping a bad entry.
if (VOW.length < 1 || VOW.length > 160) {
  throw new Error(`Vow is ${VOW.length} characters; gate requires 1-160.`);
}
if (VOW.trim() !== VOW || VOW.includes("\n")) {
  throw new Error("Vow must be a single line with no surrounding whitespace.");
}
mkdirSync(outDir, { recursive: true });
const outPath = join(outDir, "entry.txt");
writeFileSync(outPath, VOW + "\n", "utf8");
// Read back and verify: exactly one line, single trailing newline.
const written = readFileSync(outPath, "utf8");
if (written !== VOW + "\n") {
  throw new Error("Written entry does not match the vow exactly.");
}
console.log(`Wrote ${VOW.length}-character vow to ${outPath}`);
