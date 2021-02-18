# encoding:utf-8
import base64
from Cryptodome.Cipher import AES
from Cryptodome import Random

def encrypt(data, password):
    bs = AES.block_size
    pad = lambda s: s + (bs - len(s) % bs) * chr(bs - len(s) % bs)
    # iv = Random.new().read(bs)
    # iv = b'1234567812345678'
    # cipher = AES.new(password, AES.MODE_ECB, iv)
    cipher = AES.new(password, AES.MODE_ECB)
    data = pad(data)
    data = cipher.encrypt(data.encode('utf-8'))
    # data = iv + data
    return (data)


def decrypt(data, password):
    bs = AES.block_size
    if len(data) <= bs:
        return (data)
    unpad = lambda s: s[0:-ord(s[-1])]
    iv = data[:bs]
    cipher = AES.new(password, AES.MODE_CBC, iv)
    data = unpad(cipher.decrypt(data[bs:]))
    return (data)


# if __name__ == '__main__':
#     data = 'd437814d9185a290af20514d9341b710'
#     password = '78f40f2c57eee727a4be179049cecf89'  # 16,24,32位长的密码
#     encrypt_data = encrypt(data, password)
#     encrypt_data = base64.b64encode(encrypt_data)
#     print('encrypt_data:', encrypt_data)
#
#     encrypt_data = base64.b64decode(encrypt_data)
#     decrypt_data = decrypt(encrypt_data, password)
#     print('decrypt_data:', decrypt_data)

key = b'1234567812345678'
data = '15002930174'

encrypt_data = encrypt(data, key)
encrypt_data = base64.b64encode(encrypt_data)
print('encrypt_data:', str(encrypt_data))

