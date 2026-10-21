import { execFileSync } from "node:child_process";
import { mkdirSync, readdirSync } from "node:fs";
import { join, resolve } from "node:path";

const [sourceArgument, destinationArgument] = process.argv.slice(2);
if (!sourceArgument || !destinationArgument) {
  throw new Error("Usage: node _scripts/prepare-conference-images.mjs SOURCE_DIRECTORY DESTINATION_DIRECTORY");
}

const source = resolve(sourceArgument);
const destination = resolve(destinationArgument);
if (source === destination) throw new Error("Use a separate destination to preserve the original photos.");
mkdirSync(destination, { recursive: true });

for (const file of readdirSync(source).sort()) {
  const match = file.match(/_(\d+)_\d+\.jpe?g$/i);
  if (!match) continue;
  for (const [suffix, edge, quality] of [["", 1100, 84], ["-large", 2560, 88]]) {
    execFileSync("magick", [join(source, file), "-auto-orient", "-resize", `${edge}x${edge}>`, "-strip", "-quality", String(quality), join(destination, `photo-${match[1]}${suffix}.webp`)]);
  }
  process.stdout.write(`Prepared photo ${match[1]}\n`);
}
