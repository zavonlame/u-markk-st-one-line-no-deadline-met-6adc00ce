// One Line, No Deadline Met — u-markk-st-one-line-no-deadline-met-6adc00ce
// A single-line excuse for a missed deadline, written to $MAKEFUN_OUTPUT_DIR/entry.txt.
// The line is assembled from three spoken beats so the punch lands last:
// an apology opener, the escalating excuse, and the legal twist at the end.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const opener = "Sorry \u2014 I moved the deadline so many times";
const escalation = "it filed a restraining order";
const punchline = "and now legally I can't come within 500 feet of it.";
const line = [opener, escalation, punchline].join(" ");

function gate(text: string): void {
  if (text.length < 1 || text.length > 200) {
    throw new Error(`entry must be 1-200 chars, got ${text.length}`);
  }
  if (text.trim().length === 0 || text.includes("\n")) {
    throw new Error("entry must be a single non-blank line");
  }
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR;
if (!outDir) throw new Error("MAKEFUN_OUTPUT_DIR is not set");
gate(line);
mkdirSync(outDir, { recursive: true });
const target = join(outDir, "entry.txt");
writeFileSync(target, line, "utf8");

// Read-back check: what landed on disk must be byte-identical to the line.
// Measured entry: 123 characters, one line, no trailing newline.
const back = readFileSync(target, "utf8");
if (back !== line) throw new Error("read-back mismatch");
console.log(`wrote ${target} (${line.length} chars)`);
