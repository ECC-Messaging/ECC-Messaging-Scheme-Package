declare function require(name: string);
var AES = require("aes-js");
let { encodeInto } = require("bigint-serialiser");

export function encrypt(key, plaintext) {
  let textBytes = AES.utils.utf8.toBytes(plaintext);
  let keyBytes = new Uint8Array(100); // [ 0, 0, 0, 0, 0 ]
  encodeInto(key, keyBytes); // 4

  let aesCtr = new AES.ModeOfOperation.ctr(
    keyBytes.slice(0, 32),
    new AES.Counter(5)
  );

  let encryptedBytes = aesCtr.encrypt(textBytes);
  let encryptedHex = AES.utils.hex.fromBytes(encryptedBytes);

  return encryptedHex;
}

export function decrypt(key, ciphertext) {
  var ciphertextBytes = AES.utils.hex.toBytes(ciphertext);
  let keyBytes = new Uint8Array(100); // [ 0, 0, 0, 0, 0 ]
  encodeInto(key, keyBytes); // 4

  let aesCtr = new AES.ModeOfOperation.ctr(
    keyBytes.slice(0, 32),
    new AES.Counter(5)
  );
  var decryptedBytes = aesCtr.decrypt(ciphertextBytes);

  // Convert our bytes back into text
  var decryptedText = AES.utils.utf8.fromBytes(decryptedBytes);

  return decryptedText;
}
