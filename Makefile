install:
	npm ci
	npm link

lint:
	npx eslint .

test:
	npx jest

.PHONY: coverage
coverage:
	npx jest --coverage

check:
	make lint
	make test

publish:
	npm publish --dry-run

run:
	bin/gendiff.js
