start:
	npx start-server -s ./frontend/dist

lint:
	npx eslint .

lint-fix:
	npx eslint --fix

init:
	npm ci