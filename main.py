from tinyec import registry
import numpy as np

def initialize_public_env():
    C = registry.get_curve('secp192r1')
    print(f"Curve: {C}")
    return C


if __name__ == '__main__':
    C = initialize_public_env()

    a_private_k = np.random.randint(1,100)
    a_public_k = a_private_k * C.g

    b_private_k = np.random.randint(1,100)
    b_public_k = b_private_k * C.g

    ashared_k = b_public_k*a_private_k
    bshared_k = a_public_k*b_private_k

    assert(ashared_k == bshared_k)
