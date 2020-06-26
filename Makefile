install:
	npm ci
	npm link

lint:
	npx eslint .

test:
	npx -n --experimental-vm-modules -n --no-warnings jest

.PHONY: coverage
coverage:
	npx -n --experimental-vm-modules -n --no-warnings jest --coverage

check:
	make lint
	make test

publish:
	npm publish --dry-run

run:
	bin/gendiff.js
