# E2E Test Acme

## Requirements
1. Node.js v16.3.0 or up
2. Google Chrome

## How to setup
1. Install dependencies.
```
npm install
```
1. Copy .env.example to .env.
2. Open .env in your text editor and set the properties:
**SHOW_TEST_IN_BROWSER** - yes or no.
**APP_USERNAME** - username to login in website.
**APP_PASSWORD** - password to login in website.
3. Run test command.
```
npm run test
```