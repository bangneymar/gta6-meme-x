// gta6-meme-x-01 — the post itself is the entry, so this program only hands
// POST.json (the X post's address) over to the grader. Node 22, standard
// library only: no network, no clock, no files outside the repository.
//
// The meme: "FINALLY DOWNLOADING GTA 6" — a gamer on his couch watching the
// download bar sit at 99% with "13 YEARS REMAINING", while make.fun's ghost
// floats beside the TV holding its magenta star coin. The post lives on X;
// this file just copies its address to /output for the gate to read.

import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const BOT_DIR = process.env.MAKEFUN_BOT_DIR ?? '/bot';
const OUTPUT_DIR = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

const raw = readFileSync(join(BOT_DIR, 'POST.json'), 'utf8');
const parsed: unknown = JSON.parse(raw);
const url = (parsed as { url?: unknown } | null)?.url;
if (typeof parsed !== 'object' || parsed === null || typeof url !== 'string' || !url.startsWith('https://') || !url.includes('/status/')) {
  console.error('POST.json must be a JSON object with a string url field holding an X post address');
  process.exit(1);
}

mkdirSync(OUTPUT_DIR, { recursive: true });
writeFileSync(join(OUTPUT_DIR, 'POST.json'), raw);
