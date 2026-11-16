#!/usr/bin/env bash
# Makes a stand-in picture's backdrop the exact page paper (#F4EFE6) so no soft box shows.
# Reads the untouched original from stand-in-originals/, writes src/assets/stand-ins/.
# Method: sample the backdrop outside the piece, fit a smooth surface (Shepards), divide the picture by it,
# multiply by paper. Shadows keep their strength because the division is relative.
# Usage: scripts/match-paper.sh <slot> <bbox as x0 y0 x1 y1 in percent, the area holding piece and shadow>
set -euo pipefail
cd "$(dirname "$0")/.."
slot="$1"; x0="$2"; y0="$3"; x1="$4"; y1="$5"
src="stand-in-originals/$slot.jpg"; dst="src/assets/stand-ins/$slot.jpg"
read -r W H <<<"$(magick identify -format '%w %h' "$src")"
sw=48; sh=$(( H * sw / W ))
tmp=$(mktemp -d)
magick "$src" -resize ${sw}x${sh}! -blur 0x0.8 txt:- | tail -n +2 | awk -v x0="$x0" -v y0="$y0" -v x1="$x1" -v y1="$y1" -v sw="$sw" -v sh="$sh" '
 { split($1,a,/[:,]/); x=a[1]; y=a[2]; gsub(/[()]/,"",$2); split($2,c,","); fx=x*100/sw; fy=y*100/sh;
   if (fx<x0 || fx>x1 || fy<y0 || fy>y1) printf "%f,%f,srgb(%d,%d,%d) ", x*W/sw+W/sw/2, y*H/sh+H/sh/2, c[1],c[2],c[3] }' W="$W" H="$H" > "$tmp/pts"
magick -size ${W}x${H} xc: -sparse-color Shepards "$(cat "$tmp/pts")" -blur 0x30 "$tmp/B.png"
magick "$src" "$tmp/B.png" -compose DivideSrc -composite \( -size 1x1 xc:'#F4EFE6' -resize ${W}x${H}! \) -compose Multiply -composite -quality 92 "$dst"
rm -rf "$tmp"
echo "$slot ok"
