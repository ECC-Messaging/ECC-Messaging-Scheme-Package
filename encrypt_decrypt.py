#pip install pycryptodome
from Crypto.Cipher import AES


def encrypt(key, plaintext):
    plaintext_b = plaintext.encode('ascii')

    cipher = AES.new(key, AES.MODE_EAX)
    ciphertext, tag = cipher.encrypt_and_digest(plaintext_b)

    return ciphertext,cipher.nonce


def decrypt(key, ciphertext,nonce):
    cipher = AES.new(key, AES.MODE_EAX,nonce=nonce)
    plaintext = cipher.decrypt(ciphertext)

    return plaintext.decode('ascii')
