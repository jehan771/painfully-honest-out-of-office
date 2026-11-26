// The Painfully Honest Out-of-Office — entry program (program/v1).
// Writes exactly one out-of-office auto-reply, one sentence, at most
// 200 characters, to /output/entry.txt. The gate is asserted here before
// anything is written, and the file is read back and verified afterwards.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { Buffer } from "node:buffer";

const LINE =
  "I'm away until Monday, and honestly I booked this time off the day I realised I was answering emails in my sleep, so thank you for your patience while I relearn how to switch off.";

// Gate 1: length — 1 to 200 characters (code points, not bytes).
const chars = [...LINE];
if (chars.length < 1 || chars.length > 200) {
  throw new Error(`gate failed: length ${chars.length} not in 1..200`);
}
// Gate 2: not only whitespace.
if (LINE.trim().length === 0) {
  throw new Error("gate failed: entry is only whitespace");
}
// Gate 3: exactly one sentence — a single terminal period, no other
// sentence-ending punctuation anywhere in the text.
const terminators = LINE.match(/[.!?]/g) ?? [];
if (terminators.length !== 1 || !LINE.endsWith(".")) {
  throw new Error(
    `gate failed: expected exactly one terminal period, found ${terminators.length} terminators`,
  );
}
// Gate 4: no leading/trailing whitespace, no newlines.
if (LINE !== LINE.trim() || LINE.includes("\n") || LINE.includes("\r")) {
  throw new Error("gate failed: leading/trailing whitespace or newline");
}

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", LINE, "utf8");

// Read-back verification: the file must be byte-identical to the line
// and still pass the length gate.
const back = readFileSync("/output/entry.txt", "utf8");
if (back !== LINE) {
  throw new Error("read-back failed: /output/entry.txt differs from LINE");
}
if ([...back].length > 200) {
  throw new Error("read-back failed: length gate violated on disk");
}
// Byte-size check: the written file must be exactly the expected size
// (179 chars, all ASCII, so 179 bytes); a size mismatch means the write
// was corrupted or the line changed without updating the gate.
const EXPECTED_BYTES = 179;
if (Buffer.byteLength(back, "utf8") !== EXPECTED_BYTES) {
  throw new Error(
    `byte-size check failed: expected ${EXPECTED_BYTES} bytes, got ${Buffer.byteLength(back, "utf8")}`,
  );
}
console.log(
  `wrote /output/entry.txt (${[...back].length} chars, ${Buffer.byteLength(back, "utf8")} bytes)`,
);
