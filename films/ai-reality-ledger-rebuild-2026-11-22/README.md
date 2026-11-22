# AI Reality Ledger — production film

This is a dedicated Remotion source for the 32m38s narration, not a reusable scene template.

- `src/timings.json` contains 4,329 aligned word records at 30 fps.
- `public/narration.wav` is the existing uninterrupted Algenib narration; no speech is generated during this render.
- `public/assets/` contains only newly generated illustrations, not stock or web footage.
- The GitHub workflow splits 58,744 frames into up to 20 H.264 shards, assembles them without video re-encoding, then adds the narration once.

Run from the repository root with the **Render video in parallel** workflow, `film=ai-reality-ledger-rebuild-2026-11-22`, `shards=20`.
