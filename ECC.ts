import * as ecc_math from 'simple-js-ec-math';
import Cookies from 'js-cookie'

export class ECC_Instance{
  C: ecc_math.Curve
  G: ecc_math.ModPoint
  name: string
  priv_key: number
  pub_key:string
  shared_key:string

  constructor(C: ecc_math.Curve, G: ecc_math.ModPoint, name: string) {
    this.C = C;
    this.G = G;
    this.name = name;
    this.load_public_key();
  }

  generate_private_key(): void{
    let min = 1;
    let max = 100;

    this.priv_key = Math.floor(Math.random() * (max - min + 1) + min);

    //ALTERNATE OPTION
    // localStorage.setItem("lastname", "Smith");
    // // Retrieve
    // console.log(localStorage.getItem("lastname"));
    if (Cookies.get('priv_key_'+this.name) == undefined){
      Cookies.set('priv_key_'+this.name, this.priv_key, { expires: 365 })
    }
  }

  load_public_key(): void{
    console.log('1')
    if (Cookies.get('priv_key_'+this.name) == undefined){
      console.log('2')
      this.generate_private_key()
    }
    else{
      this.priv_key = +Cookies.get('priv_key_'+this.name)
      console.log('3')
    }
    this.pub_key = this.C.multiply(this.G, this.priv_key)

  }

  generate_shared_key(other_pub_key:string): void{
    this.shared_key = this.C.multiply(other_pub_key,this.priv_key)
  }

  get_public_key(): string{
    return this.pub_key;
  }
  get_shared_key(): string{
    return this.shared_key;
  }

  get_name(){
    return this.name;
  }

  get_priv(){
    return this.priv_key;
  }

  clear_keys(){
    Cookies.remove('priv_key_'+this.name)
  }

}
