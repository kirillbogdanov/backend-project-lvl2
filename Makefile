install:
	npm ci
	npm link

lint:
	npx eslint .

test:
	npm run test

text-coverage:
	npm run test -- --coverage

check:
	make lint
	make test

publish:
	npm publish --dry-run

run:
	bin/gendiff.js
