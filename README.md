# COM1000 (Challenge-O-Mattic 1000)
Free Code Camp's Challenge Editor

## Note
This **will** alter the challenge files in your Free Code Camp `/seed/challenges` directory!


## Initial Setup
* Clone this repo to the same directory where your Free Code Camp directory is (ex> `/Users/terakilobyte/Developer`)
  * The directory should be something like:
  ```
  /Users/terakilobyte/Developer
    |- freecodecamp
    \- COM1000
  ```
* `cd COM1000 && npm install`
* `<yourFCC_FOLDER_NAME>` is whatever you named your Free Code Camp repo locally(mine is freecodecamp).
* `echo 'FCC_FOLDER_NAME = "<yourFCC_FOLDER_NAME>"' >> .env`
* (Optional) Add `PORT = XXXX` in `.env` file to change the default port from 3000 to `XXXX` 
* `npm run build`

## To Run
* `npm start`

