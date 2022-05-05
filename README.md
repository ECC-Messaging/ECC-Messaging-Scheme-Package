# ECC-Messaging-Scheme-Package
A system that encrypts and decrypts data packets with the elliptic curve cryptography (ECC) for others
to utilize and download.

## Where to download:
### typescript/javascript
https://www.npmjs.com/package/ecc-messaging-scheme-package

### Python
https://pypi.org/project/ecc-messaging-scheme-package/


## Classes
We have one main class, ECCM class, which combines our ECC class and our Encrypt/Decrypt, and
curve initialization(initializePublicEnv) functions.

The ECC Class:
-  Responsible for generating/loading private key
-  Get current users public key from cookies or create a new one and save
-  Gets shared key using diffie hellman when given another users public key
-  Clear cookies containing private key for current instance.

Encrypt/Decrypt:
-  Given a key and text it encrypts/decrypts text using AES

initializePublicEnv function:
-  Inizalites a point and an ecc curve: secp256k1

ECCM class:
-  Main interface for users
-  Users can initialize curve
-  Get shared keys
-  Run encryption/decryption using ECCDH

## Examples:

How to instaciate a ECC object. This creates a randomly generate private key for each user and is store in their cookies.
The main param is a uuid string.
```
let ecc1 = new ECCM("1");
let ecc2 = new ECCM("2");
```

This is how you get a users public key and access the x coordinate.
```
ecc1.ECC.getPublicKey();
console.log(ecc1.ECC.getPublicKey()['x'])
```

This is how you create a point, when you already have a previsouly generated external keys

```
let randomKey = new ecc_math.ModPoint(
  58245954963044076335222193032419637688317373475605757277584156718458924469103n,
  12764036181290433088658499435961200322530176588733628912045896254235383420282n
);
```

Given another key this is how you generate a shared key

```
ecc2.generateSharedKey(randomKey);
console.log(ecc2.ECC.getSharedKey())
```

Finally once the shared key is set you can encrypt and decrypt as follows:
```
const cipher = ecc2.encrypt("It's working")
console.log(cipher);
console.log(ecc2.decrypt(cipher));
```

# Disclaimer
Use at Your Own Risk.
