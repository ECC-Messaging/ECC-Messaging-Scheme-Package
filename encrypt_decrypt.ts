import * as AES from 'aes';

export function encrypt(key,plaintext){
  let aes_instance = new AES(key);
  return aes_instance.encrypt(plaintext)
}

export function decyrpt(key,ciphertext){
  let aes_instance = new AES(key);
  return aes_instance.decyrpt(ciphertext)
}
