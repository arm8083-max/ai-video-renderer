# AI Video Renderer

One public repository renders all films. Each film lives in `films/<film-id>` and keeps its own Remotion composition, timing, generated imagery, and one continuous narration track.

## Current film

- Film ID: `ai-reality-gap-2026-11-21`
- Composition: `CalibrationFilm`
- Duration: 46,995 frames at 24 fps (about 32:38)
- Visual source: 15 original generated images plus bespoke motion graphics
- Narration: one continuous track

## Rendering

Run the **Render video in parallel** workflow from the Actions tab. The default run splits the film into 12 independent frame ranges, renders them on separate GitHub-hosted runners, then joins the video losslessly and adds the narration once.

The final MP4 is uploaded as the `ai-reality-gap-2026-11-21-final` workflow artifact. Intermediate chunks and the final artifact are retained for one day to minimize storage use.

## Reusing this repository

For a new film, add a new `films/<film-id>` directory with:

- `package.json` and `package-lock.json`
- `render-config.json`
- `src/`
- `public/`

Then start the same workflow with the new film ID. A new GitHub repository is not needed.

