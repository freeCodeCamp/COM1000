var dotenv = require('dotenv');
dotenv.load();

var PATH_MARKER = process.platform === 'win32' ? '\\' : '/';
module.exports = {
  'fccPath': process.cwd().substr(0, process.cwd().lastIndexOf(PATH_MARKER))
    + '/' + process.env.FCC_FOLDER_NAME + '/seed/challenges/'
};

