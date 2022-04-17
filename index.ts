
import * as ecc_math from 'simple-js-ec-math';
import { ECC_Instance } from "./ECC";
import * as ed from "./encrypt_decrypt";
declare function require(name:string);
var AES = require('aes-js');
let { encodeInto } = require('bigint-serialiser');

function initialize_public_env() {
  //Setup Curve secp256k1
  let g:ecc_math.ModPoint = new ecc_math.ModPoint(
    0x79BE667EF9DCBBAC55A06295CE870B07029BFCDB2DCE28D959F2815B16F81798n,
    0x483ADA7726A3C4655DA4FBFC0E1108A8FD17B448A68554199C47D08FFB10D4B8n
  )
  let secp256k1:ecc_math.Curve = new ecc_math.Curve(
    0n,
    7n,
    0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFEBAAEDCE6AF48A03BBFD25E8CD0364141n,
    2n ** 256n - 2n ** 32n - 977n,
    g)

    return [secp256k1,g]
}



//Run main
let [C,g]=initialize_public_env()

let a_ecc_instance = new ECC_Instance(C,g,'a');
a_ecc_instance.clear_keys()
a_ecc_instance.get_public_key()
console.log(a_ecc_instance.get_public_key())


let b_ecc_instance = new ECC_Instance(C,g,'b');
b_ecc_instance.clear_keys()
b_ecc_instance.get_public_key()
console.log(b_ecc_instance.get_public_key())

a_ecc_instance.generate_shared_key(b_ecc_instance.get_public_key())
b_ecc_instance.generate_shared_key(a_ecc_instance.get_public_key())

console.log(JSON.stringify(a_ecc_instance.get_shared_key())==JSON.stringify(b_ecc_instance.get_shared_key()))
console.log(a_ecc_instance.get_shared_key())

let plaintext = 'test 1232'
//let key= 2214985505730300089862508788166253079397673264944195698864n
let key = a_ecc_instance.get_shared_key()['x']

let cipherText = ed.encrypt(key,plaintext)
let decpyrtedText = ed.decyrpt(key,cipherText)

console.log(cipherText)
console.log(decpyrtedText)

//
// let textBytes = AES.utils.utf8.toBytes(plaintext);
// let key= 2214985505730300089862508788166253079397673264944195698864n
//
// let bytes = new Uint8Array(32); // [ 0, 0, 0, 0, 0 ]
// let followingOffset = encodeInto(a, bytes); // 4
//
// //
// // let utf8Encode = new TextEncoder();
// // var u8array = new Uint8Array(24);
// // utf8Encode.encodeInto(a,u8array)
//
// let aesCbc = new AES.ModeOfOperation.ctr(bytes, new AES.Counter(5));
//
// let encryptedBytes = aesCbc.encrypt(textBytes);
// let encryptedHex = AES.utils.hex.fromBytes(encryptedBytes);
// console.log(encryptedHex);
//
//
// var encryptedBytesIn = AES.utils.hex.toBytes(encryptedHex);
//
// // The counter mode of operation maintains internal state, so to
// // decrypt a new instance must be instantiated.
// var aesCtr = new AES.ModeOfOperation.ctr(bytes, new AES.Counter(5));
// var decryptedBytes = aesCtr.decrypt(encryptedBytesIn);
//
// // Convert our bytes back into text
// var decryptedText = AES.utils.utf8.fromBytes(decryptedBytes);
// console.log(decryptedText);
