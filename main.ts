
import * as ecc_math from 'simple-js-ec-math';
import { ECC_Instance } from "./ECC";


const anExampleVariable = "Hello World"
console.log(anExampleVariable)

let g:ecc_math.ModPoint = new ecc_math.ModPoint(
  0x79BE667EF9DCBBAC55A06295CE870B07029BFCDB2DCE28D959F2815B16F81798,
  0x483ADA7726A3C4655DA4FBFC0E1108A8FD17B448A68554199C47D08FFB10D4B8
)
let secp256k1:ecc_math.Curve = new ecc_math.Curve(
  0,
  7,
  0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFEBAAEDCE6AF48A03BBFD25E8CD0364141,
  2 ** 256 - 2 ** 32 - 977,
  g)
console.log(secp256k1.multiply(g, 100))
console.log(g)
console.log(secp256k1)
let ecc = new ECC_Instance(secp256k1,g,'test');
console.log(ecc.get_name())
ecc.load_public_key()
console.log(ecc.get_priv())
