import requests
import AESCrypto
import json


LOGIN_HTML_URL = 'http://shizhijiaoyu.net/login.htm'
LOGIN_USER_ACCOUNT = '15002930174'
LOGIN_USER_PASSWORD = '123456'

LOGIN_URL = 'http://shizhijiaoyu.net/Services/CommonService.svc/UserLoginEnc'

login_params = '{"userName":"'+AESCrypto.get_enc(LOGIN_USER_ACCOUNT)+'","password":"'+AESCrypto.get_enc(LOGIN_USER_PASSWORD)+'","isAutoLogin":"false","validateCode":"","fromUrl":""}'

# strHtml = requests.get(LOGIN_URL)
# print(strHtml.text)


#设置头信息
headers_base = {
    'Accept': 'application/json, text/javascript, */*; q=0.01',
    'Accept-Encoding': 'gzip, deflate',
    'Accept-Language': 'zh,zh-CN;q=0.9,zh-HK;q=0.8,zh-TW;q=0.7',
    'Connection': 'keep-alive',
    'Content-Type': 'text/json',
    'Origin': 'http://shizhijiaoyu.net',
    'Host': 'shizhijiaoyu.net',
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.182 Safari/537.36',
    'Referer': 'http://shizhijiaoyu.net/login.htm',
}
session = requests.session()
response = session.post(LOGIN_URL, headers=headers_base, data=login_params)
# content = json.loads(response.text)
# print(content)

results = response.text.replace('"', '').split('\\/')
status = results[0]
toJumpUrl = results[1]
if status == '0':
    print('status:' + status + ',toJumpUrl:' + toJumpUrl)
    cookie = response.cookies
    # cookie.set()
else:
    print('status:'+status)

print('cookie:'+str(response.cookies))
print('header:'+str(response.headers))
