from tinyec import registry
import numpy as np
from encrypt_decrypt import *
from ECC import ECC_Instance

def initialize_public_env():
    C = registry.get_curve('secp192r1')
    print(f"Curve: {C}")
    return C


if __name__ == '__main__':

    #Key exchange
    C = initialize_public_env()

    a_ecc_instance = ECC_Instance(C)
    a_ecc_instance.get_public_key()

    b_ecc_instance = ECC_Instance(C)
    b_ecc_instance.get_public_key()

    a_ecc_instance.generate_shared_key(b_ecc_instance.get_public_key())
    b_ecc_instance.generate_shared_key(a_ecc_instance.get_public_key())

    assert(a_ecc_instance.get_shared_key() == b_ecc_instance.get_shared_key())
    #Share messages
    key_b = a_ecc_instance.get_shared_key().x.to_bytes(24, byteorder='big')
    plaintext = "test 12312 "
    ciphertext,nonce = encrypt(key_b,plaintext)

    plaintext_out = decrypt(key_b,ciphertext,nonce)

    assert(plaintext==plaintext_out)
