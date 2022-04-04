#pip install pycryptodome
from Crypto.Cipher import AES


def encrypt(key, plaintext):
    plaintext_b = plaintext.encode('ascii')

    cipher = AES.new(key, AES.MODE_EAX)
    ciphertext, tag = cipher.encrypt_and_digest(plaintext_b)

    return ciphertext


def decrypt(key, ciphertext):
    cipher = AES.new(key, AES.MODE_EAX)
    plaintext = cipher.decrypt(ciphertext)
    print(plaintext)

    return plaintext
