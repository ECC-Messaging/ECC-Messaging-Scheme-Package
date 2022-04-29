import ECCM from "./index";



let ecc1 = new ECCM("1");
let ecc2 = new ECCM("2");

ecc1.ECC.getPublicKey();
console.log(ecc1.ECC.getPublicKey()['x'])

let a = {
  "x": 58245954963044076335222193032419637688317373475605757277584156718458924469103n,
  "y": 12764036181290433088658499435961200322530176588733628912045896254235383420282n
}

ecc2.generateSharedKey(ecc1.ECC.getPublicKey());
console.log(ecc2.ECC.getSharedKey())
