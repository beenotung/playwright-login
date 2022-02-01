build: dist/index.js dist/index.d.ts

dist/index.js dist/index.d.ts: node_modules/.bin/tsc src/index.ts
	rm -rf dist
	node_modules/.bin/tsc -p .

node_modules/.bin/tsc:
	pnpm i || npm i

test: node_modules/.bin/tsc src/index.ts
	node_modules/.bin/tsc --noEmit

publish: dist/index.js dist/index.d.ts
	npm pack
	npm version $@
	npm publish
