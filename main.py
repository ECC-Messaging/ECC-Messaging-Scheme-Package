from tinyec import registry
import numpy as np
from encrypt_decrypt import *


def initialize_public_env():
    C = registry.get_curve('secp192r1')
    print(f"Curve: {C}")
    return C


if __name__ == '__main__':

    #Key exchange
    C = initialize_public_env()

    a_private_k = np.random.randint(1,100)
    a_public_k = a_private_k * C.g

    b_private_k = np.random.randint(1,100)
    b_public_k = b_private_k * C.g

    ashared_k = b_public_k*a_private_k
    bshared_k = a_public_k*b_private_k

    assert(ashared_k == bshared_k)
    #Share messages
    key_b = ashared_k.x.to_bytes(24, byteorder='big')
    plaintext = "test 12312 "
    ciphertext,nonce = encrypt(key_b,plaintext)

    plaintext_out = decrypt(key_b,ciphertext,nonce)

    assert(plaintext==plaintext_out)
