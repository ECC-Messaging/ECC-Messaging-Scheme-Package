from tinyec import registry
import numpy as np
from os.path import exists


class ECC_Instance(object):
    """docstring for ."""

    def __init__(self, C, name):
        self.C = C
        self.name = name
        self.load_public_key()

    def generate_private_key(self):
        self.priv_key = np.random.randint(1,100)
        with open(f'data/priv_key_{self.name}.txt', "w") as priv_file:
            priv_file.write(f"{self.priv_key}")

    def load_public_key(self):
        if exists(f'data/priv_key_{self.name}.txt'):
            with open(f'data/priv_key_{self.name}.txt', 'r') as f:
                self.priv_key = int(f.read())
        else:
            self.generate_private_key()
        self.pub_key = self.priv_key * self.C.g

    def generate_shared_key(self,other_pub_key):
        self.shared_key = self.priv_key*other_pub_key

    def get_public_key(self):
        return self.pub_key

    def get_shared_key(self):
        return self.shared_key
