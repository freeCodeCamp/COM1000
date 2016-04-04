# COM1000 (Challenge-O-Mattic 1000)

Free Code Camp's Challenge Editor

## Table of Contents

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->


- [Note](#note)
- [Requirements](#requirements)
- [Initial Setup](#initial-setup)
- [To Run](#to-run)
- [Contributing](#contributing)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Note

Users should only download the `production` version of COM1000, `master` is not guaranteed to be safe.

This **will** alter the challenge files in your Free Code Camp's `/seed/challenges` directory!

## Requirements

COM1000 requires the following to run:

- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/) (normally comes with Node.js)

## Initial Setup

Clone this repo to the same directory where your Free Code Camp directory is (e.g. `/Users/terakilobyte/Developer`)

```shell
# Copy repository
git clone https://github.com/FreeCodeCamp/COM1000.git
```

The directory structure should be something like the following:

```
/Users/terakilobyte/Developer
  |- freecodecamp
  \- COM1000
```

Now we can download the necessary packages and build COM1000.

```shell
# Change directory and install NPM dependencies
cd COM1000 && npm install

# <yourFCC_FOLDER_NAME>` is whatever you named your Free Code Camp repo
# locally (mine is `freecodecamp`).
echo 'FCC_FOLDER_NAME = "<yourFCC_FOLDER_NAME>"' >> .env

# (Optional) Add `PORT = XXXX` in `.env` file to change the default port from
# 3000 to `XXXX`
echo 'PORT = XXXX' >> .env

# Build application
npm run build
```

## To Run

```shell
# Start application
npm start
```

Now navigate to your browser and open `http://localhost:XXXX`, where `XXXX` is
3000 or the port number you specified above.

## Contributing

 All PRs should be filed against the `master` branch.

 Once the `master` branch is deemed necessary to be pushed into the `production` branch a PR will be made and QA'd.
