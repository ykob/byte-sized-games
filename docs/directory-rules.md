# Directory Rules

This document outlines the file naming and directory layout standards for this repository.

## `*/index.ts`

Serves as an entry point for bulk importing components within the directory.   
These should be provided in every directory where applicable.

## `src` Directory Rules

### `src/components`

This directory contains all React components.

- **Feature-Specific Components**: Components for a specific game or feature are grouped into their own directory. For example, all components for the "Concentration" game are located in `src/components/concentration`.
  - A feature directory is structured as follows:
    - `content.tsx`: The main component that assembles the feature.
    - `hooks/`: Contains React Hooks specific to the feature.
      - `use-*.ts`: Each file contains a single custom hook.
    - `stores/`: Contains state management logic (using Jotai) for the feature.
      - `game-state.ts`: Manages the overall state of the game (e.g., `isPlaying`, `isGameOver`).
      - `play-state.ts`: Manages the detailed state during gameplay (e.g., player position, score).
    - `ui/`: Contains smaller UI components that make up the feature's user interface.
      - `*.tsx`: Each file represents a single UI component.
- **Common Components**: Components shared across multiple features are placed in `src/components/common/`.
  - If a common component consists of multiple related files (e.g., `button.tsx`, `styles.ts`), they are grouped into a subdirectory like `src/components/common/button/`.

### `src/hooks`

This directory contains React Hooks that are shared across the entire application.

- If a hook is complex and requires its own state management, it is placed in a subdirectory (e.g., `src/hooks/use-timer/`).

### `src/pages`

This directory contains Astro page components, which define the routes of the application.

- The top page is `src/pages/index.astro`.
- Game pages are located in `src/pages/game/`.

### `src/utils`

This directory contains generic utility functions that are not specific to any framework or feature.

### `src/assets`

This directory contains static assets like images that are imported into the source code.

### `src/layouts`

This directory contains Astro layout components.

## PandaCSS
- `panda`: Configuration files for PandaCSS.
- `panda/global-css`: Defines global styles. Usage is strictly limited to elements outside of React's scope, such as `html` and `body`.
- `panda/semantic-tokens`: Design tokens that carry semantic meaning (e.g., brand colors, functional states).
- `panda/tokens`: Primitive design tokens without semantic meaning (e.g., raw color scales, spacing increments).

## Assets
- `public`: Static assets copied directly to the build output. Place files here that should not be processed by the build pipeline and are referenced via absolute paths (e.g., favicon, robots.txt).
- `src/assets`: Static assets to be optimized and hashed during the build process. Place images and other assets here that are intended to be `import`ed within the source code.
