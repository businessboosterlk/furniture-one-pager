#!/usr/bin/env bash
# Keeps every stand-in picture light enough for the speed gate (page weight 1,000 KB on a slow phone, every hero frame loads at once).
# Recompresses in place any picture over 100 KB: longest side at most 1500 px, progressive, no metadata.
# The speed gate (node ~/bb-systems/qa/speed.mjs) is the judge. Safe to run again.
set -euo pipefail
cd "$(dirname "$0")/.."
for f in src/assets/stand-ins/*.jpg; do
  size=$(stat -f %z "$f")
  [ "$size" -le 100000 ] && continue
  for q in 78 72 66 60; do
    magick "$f" -resize '1500x1500>' -strip -interlace Plane -sampling-factor 4:2:0 -quality $q "$f.tmp.jpg"
    [ "$(stat -f %z "$f.tmp.jpg")" -le 100000 ] && break
  done
  mv "$f.tmp.jpg" "$f"; echo "$(basename "$f") $size -> $(stat -f %z "$f") bytes"
done
