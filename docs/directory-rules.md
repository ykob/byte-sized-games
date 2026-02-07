# Directory Rules

## PandaCSS
- `panda`: Configuration files for PandaCSS.
- `panda/global-css`: Defines global styles. Usage is strictly limited to elements outside of React's scope, such as `html` and `body`.
- `panda/semantic-tokens`: Design tokens that carry semantic meaning (e.g., brand colors, functional states).
- `panda/tokens`: Primitive design tokens without semantic meaning (e.g., raw color scales, spacing increments).

## Assets
- `public`: Static assets copied directly to the build output. Place files here that should not be processed by the build pipeline and are referenced via absolute paths (e.g., favicon, robots.txt).
- `src/assets`: Static assets to be optimized and hashed during the build process. Place images and other assets here that are intended to be `import`ed within the source code.
