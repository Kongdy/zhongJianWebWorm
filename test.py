import requests


LOGIN_HTML_URL = 'http://shizhijiaoyu.net/login.htm'
LOGIN_USER_ACCOUNT = '15002930174'
LOGIN_USER_PASSWORD = '123456'

LOGIN_URL = 'http://shizhijiaoyu.net/Services/CommonService.svc/UserLoginEnc'

login_params = '{}'

strHtml = requests.get(LOGIN_URL)
print(strHtml.text)

