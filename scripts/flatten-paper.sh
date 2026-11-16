#!/usr/bin/env bash
# Run after match-paper.sh. Snaps every pixel within a hair of the page paper (#F4EFE6) to exactly the paper,
# so JPEG noise cannot show as faint blotches or a box on a flat page. The soft ramp (2 to 6 per cent difference)
# leaves real shadows alone and only removes the last whisper of their tail.
# Usage: scripts/flatten-paper.sh <slot> [slot...]
set -euo pipefail
cd "$(dirname "$0")/.."
for slot in "$@"; do
  f="src/assets/stand-ins/$slot.jpg"; t=$(mktemp -d)
  read -r W H <<<"$(magick identify -format '%w %h' "$f")"
  magick -size ${W}x${H} xc:'#F4EFE6' "$t/paper.png"
  magick "$f" "$t/paper.png" -compose Difference -composite -colorspace Gray -level 2%,6% "$t/mask.png"
  magick "$t/paper.png" "$f" "$t/mask.png" -compose Over -composite -strip -interlace Plane -sampling-factor 4:4:4 -quality 88 "$f"
  rm -rf "$t"; echo "$slot flat, $(stat -f %z "$f") bytes"
done
