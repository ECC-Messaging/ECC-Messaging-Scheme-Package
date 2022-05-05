import ECCM from "./index";
import * as ecc_math from "simple-js-ec-math";



let ecc1 = new ECCM("1");
let ecc2 = new ECCM("2");

ecc1.ECC.getPublicKey();
console.log(ecc1.ECC.getPublicKey()['x'])

let serverPub = new ecc_math.ModPoint(
  58245954963044076335222193032419637688317373475605757277584156718458924469103n,
  12764036181290433088658499435961200322530176588733628912045896254235383420282n
);


ecc2.generateSharedKey(serverPub);
console.log(ecc2.ECC.getSharedKey())

const cipher = ecc2.encrypt("It's working")
console.log(cipher);
console.log(ecc2.decrypt(cipher));
