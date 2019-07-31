# Docker ScreenShotMaker
It's allows you to make screenshoots of web pages

## Installation
```bash
npm install
```

## Development
Use eslint checks before publish
```bash
npm run lint
```

## Run
2 ways:
1. Run instantly
```sh
npm run start
```

2. Run in docker
```sh
docker run \
  --rm \
  -p 3000:3000 \
  --cap-add=SYS_ADMIN \
  bolid1/screen-shot-maker
```

## Usage
Go to the [link](http://localhost:3000/generate-png?url=https://google.com)

Alternatively you can use curl or other programs to get file, for example:
```sh
wget -O ./screen.png http://localhost:3000/generate-png?url=https://google.com
```
