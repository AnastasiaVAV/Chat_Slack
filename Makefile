start:
	npx start-server -s ./frontend/dist

init:
	npm ci

install:
	npm install
	cd frontend && npm install

build:
	cd frontend && npm run build

run:
	cd frontend/
	npm run dev