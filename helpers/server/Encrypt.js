const crypto = require('crypto')
// const {performance} = require('perf_hooks')

//Sha 256-encryption with the built in Node.js module crypto
module.exports = class Encrypt{

static encrypt(password){
 return crypto
  .createHmac("sha256", require('../salt.json'))
  .update(password)
  .digest('hex')
}

//Multencryption makes it more CPU-expensive to run 
//a whole wordlist against a stolen database of passwords...
//But maybe not implemented we could be more obscure 
//by using the last encryption as the salt for the new one
static multiEncrypt(password, encryptTimes = 9999){
  while(encryptTimes--){
    password = this.encrypt(password)
  }
  return password
}

}

