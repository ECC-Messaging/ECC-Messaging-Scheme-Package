
import * as ecc_math from 'simple-js-ec-math';
import { ECC_Instance } from "./ECC";
import * as ed from "./encrypt_decrypt";

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


//
// import {ECBEncryptor} from 'aes-ts';
//
// let encryptor = new ECBEncryptor(a_ecc_instance.get_shared_key())
// const ciphertext = encryptor.encrypt(plaintext)
//
//
// //Share messages
// let plain_text = 'test 1232'
// let ciphertext = ed.encrypt(a_ecc_instance.get_shared_key(),plain_text)
// console.log(ciphertext)
