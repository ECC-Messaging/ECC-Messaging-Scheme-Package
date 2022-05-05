import * as ecc_math from "simple-js-ec-math";
import Cookies from "js-cookie";

export class ECCInstance {
  C: ecc_math.Curve;
  G: ecc_math.ModPoint;
  name: string;
  privateKey: number;
  publicKey: string;
  sharedKey: ecc_math.ModPoint;

  constructor(C: ecc_math.Curve, G: ecc_math.ModPoint, name: string) {
    this.C = C;
    this.G = G;
    this.name = name;
    this.loadPublicKey();
  }

  generatePrivateKey(): void {
    let min = 1;
    let max = 1000;

    this.privateKey = Math.floor(Math.random() * (max - min + 1) + min);

    //ALTERNATE OPTION
    // localStorage.setItem("lastname", "Smith");
    // console.log(localStorage.getItem("lastname"));
    if (Cookies.get("privateKey_" + this.name) == undefined) {
      Cookies.set("privateKey_" + this.name, this.privateKey, { expires: 365 });
    }
  }

  loadPublicKey(): void {
    if (Cookies.get("privateKey_" + this.name) == undefined) {
      this.generatePrivateKey();
    } else {
      this.privateKey =+ Cookies.get("privateKey_" + this.name);
    }
    this.publicKey = this.C.multiply(this.G, this.privateKey);
  }

  generateSharedKey(publicKey: string): void {
    this.sharedKey = this.C.multiply(publicKey, this.privateKey);
  }

  getPublicKey(): string {
    return this.publicKey;
  }

  getSharedKey(): string {
    return this.sharedKey;
  }

  getName() {
    return this.name;
  }

  getPrivateKey() {
    return this.privateKey;
  }

  clearKeys() {
    Cookies.remove("privateKey_" + this.name);
  }
}
