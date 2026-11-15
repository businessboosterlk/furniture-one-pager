#!/usr/bin/env python3
"""Pulls each crew answer out of a run file into frames/Fnn.html. Usage: python3 extract.py <run.jsonl> [F03 F04 ...]"""
import json, re, sys, pathlib
HERE = pathlib.Path(__file__).parent
run = sys.argv[1]; only = set(sys.argv[2:])
(HERE / "frames").mkdir(exist_ok=True)
for l in open(run):
    d = json.loads(l)
    if d.get("type") != "receipt" or (only and d["item_ref"] not in only): continue
    s = d["out"]
    m = re.search(r"```html\s*(.*?)```", s, re.S)
    h = (m.group(1) if m else s).strip()
    (HERE / "frames" / f"{d['item_ref']}.html").write_text(h + "\n")
    print("frame", d["item_ref"], len(h), "chars", "" if m else "(no fence)")
