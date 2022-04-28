import * as ecc_math from "simple-js-ec-math";
import { ECCInstance } from "./ECC";
import * as ed from "./encryptDecrypt";

function initializePublicEnv() {
  //Setup Curve secp256k1
  let g: ecc_math.ModPoint = new ecc_math.ModPoint(
    0x79be667ef9dcbbac55a06295ce870b07029bfcdb2dce28d959f2815b16f81798n,
    0x483ada7726a3c4655da4fbfc0e1108a8fd17b448a68554199c47d08ffb10d4b8n
  );
  let secp256k1: ecc_math.Curve = new ecc_math.Curve(
    0n,
    7n,
    0xfffffffffffffffffffffffffffffffebaaedce6af48a03bbfd25e8cd0364141n,
    2n ** 256n - 2n ** 32n - 977n,
    g
  );

  return [secp256k1, g];
}

export default class ECCM {
  ECC: ECCInstance;

  constructor(id: string) {
    let [C, g] = initializePublicEnv();
    this.ECC = new ECCInstance(C, g, id);
  }

  generateSharedKey(recipientPubKey: string) {
    this.ECC.generateSharedKey(recipientPubKey);
  }

  encrypt(plaintext: string) {
    const KEY = this.ECC.getSharedKey()["x"];
    return ed.encrypt(KEY, plaintext);
  }

  decrypt(ciphertext: string) {
    const KEY = this.ECC.getSharedKey()["x"];
    return ed.decrypt(KEY, ciphertext);
  }
}
