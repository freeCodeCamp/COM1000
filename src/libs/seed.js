const crypto = require('crypto');

export function textToSeed(data) {
  let hash = crypto.createHash('sha256');

  hash.update(data);

  return(hash.digest('hex'));
}