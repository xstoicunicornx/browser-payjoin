#!/usr/bin/env bash
set -euo pipefail

PAYOIN_DIR="node_modules/@xstoicunicornx/payjoin"

cd "$PAYOIN_DIR"

# Patch dist/index.web.js: force Vite to treat the wasm-bindgen wasm as a
# URL asset (`?url`) rather than letting vite-plugin-wasm instantiate it
# as a module. wasm-bindgen `--target web` emits an `init({module_or_path})`
# loader that wants a URL string; without `?url` Vite intercepts the
# default `.wasm` import and tries to bundle it via vite-plugin-wasm,
# which can't find the bundler-style `index_bg.js` companion that
# `--target web` doesn't emit. The sed is idempotent: `?url` already
# present is a no-op.
if [[ -f dist/index.web.js ]] && ! grep -q 'index_bg.wasm?url' dist/index.web.js; then
  sed -i.bak 's|index_bg\.wasm|index_bg.wasm?url|' dist/index.web.js
  rm -f dist/index.web.js.bak
fi

# if [[ -f dist/index.web.js ]] && ! grep -q './generated' dist/index.web.js; then
#   sed -i.bak 's|\/\.\.\/src||' dist/index.web.js
#   rm -f dist/index.web.js.bak
# fi
if [[ -f "dist/index.web.js" ]] && grep -q '/../src/generated' "dist/index.web.js"; then
  sed -i.bak 's|/../src/generated|/generated|g' "dist/index.web.js"
  rm -f "dist/index.web.js.bak"
fi
