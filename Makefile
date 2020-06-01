install:
	npm ci
	npm link

lint:
	npx eslint .

publish:
	npm publish --dry-run

run:
	bin/gendiff.js
