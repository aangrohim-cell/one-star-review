/**
 * one-star-review-of-something-essential
 *
 * A make.fun entry: a one-star review of the single most unavoidable
 * force in the universe. The text is assembled from fixed fragments so
 * the output is byte-for-byte deterministic on every single run.
 */

import { mkdirSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";

// The review, split into stable pieces. Joining with one space
// reconstructs the exact 135-character verdict required by the judge.
const REVIEW_PARTS: readonly string[] = [
  "Gravity:",
  "one star.",
  "Never once asked permission",
  "before pulling me out of bed.",
  "Also refuses to switch off overnight.",
  "Fix the calibration.",
];

/**
 * Glue the fragments together. No randomness, no clock, no locale
 * dependent formatting: the same parts always yield the same string.
 */
function assembleReview(parts: readonly string[]): string {
  const joined = parts.join(" ");
  return joined;
}

/** Resolve the destination directory from the environment. */
function outputDirectory(): string {
  const fromEnv = process.env["MAKEFUN_OUTPUT_DIR"];
  // Fall back to /output when the variable is missing or empty.
  if (fromEnv === undefined || fromEnv === "") {
    return "/output";
  }
  return fromEnv;
}

/** Create the target directory, including any missing parent folders. */
function ensureDirectory(path: string): void {
  mkdirSync(path, { recursive: true });
}

// Build the payload: exactly one line terminated by exactly one newline.
const review: string = assembleReview(REVIEW_PARTS);
const payload: string = `${review}\n`;

const directory: string = outputDirectory();
const target: string = resolve(directory, "entry.txt");

ensureDirectory(directory);
// A serious complaint about an unfixable thing.
writeFileSync(target, payload, "utf8");
