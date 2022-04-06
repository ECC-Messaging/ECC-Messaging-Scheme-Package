from tinyec import registry
import numpy as np

class ECC_Instance(object):
    """docstring for ."""

    def __init__(self, C):
        self.C = C
        self.pub_key = None

    def generate_private_key(self):
        self.priv_key = np.random.randint(1,100)

    def generate_public_key(self):
        if self.pub_key == None:
            self.generate_private_key()
        self.pub_key = self.priv_key * self.C.g

    def generate_shared_key(self,other_pub_key):
        self.shared_key = self.priv_key*other_pub_key

    def get_public_key(self):
        if self.pub_key == None:
            self.generate_public_key()
        return self.pub_key

    def get_shared_key(self):
        return self.shared_key
