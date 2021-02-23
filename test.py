import AESCrypto
import json
from requests_html import HTMLSession
from bs4 import BeautifulSoup
from bs4.element import Tag
import re

BASE_URL = 'http://shizhijiaoyu.net'

LOGIN_HTML_URL = BASE_URL+'/login.htm'
LOGIN_URL = BASE_URL+'/Services/CommonService.svc/UserLoginEnc'
MY_STUDY_HOME_URL = BASE_URL+'/sty/mystudytask.htm'

LOGIN_USER_ACCOUNT = '15002930174'
LOGIN_USER_PASSWORD = '123456'

LOGIN_GUO_FENG_USER_ACCOUNT = '13572229520'
LOGIN_GUO_FENG_USER_PASSWORD = '123456'


login_params = '{"userName":"'+AESCrypto.get_enc(LOGIN_GUO_FENG_USER_ACCOUNT)+'","password":"'+AESCrypto.get_enc(LOGIN_GUO_FENG_USER_PASSWORD)+'","isAutoLogin":"false","validateCode":"","fromUrl":""}'

# strHtml = requests.get(LOGIN_URL)
# print(strHtml.text)


def do_post(url, params, need_reset_head=False):
    global session
    head = None
    if need_reset_head or not session:
        session = HTMLSession()
        head = headers_base
    return session.post(url, headers=head, data=params)


def do_get(url, need_reset_head=False):
    global session
    head = None
    if need_reset_head or not session:
        session = HTMLSession()
        head = headers_base
    return session.get(url, headers=head)


# 设置头信息
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
global session
# session = requests.session()
# response = session.post(LOGIN_URL, headers=headers_base, data=login_params)
# content = json.loads(response.text)
# print(content)

response = do_post(LOGIN_URL, login_params, True)
results = response.text.replace('"', '').split('\\/')
status = results[0]
toJumpUrl = results[1]
if status == '0':
    print('status:' + status + ',toJumpUrl:' + toJumpUrl)
    # 登陆成功之后，直接跳转到我的学习页
    studyHomeResponse = do_get(MY_STUDY_HOME_URL)
    soup = BeautifulSoup(studyHomeResponse.text, 'lxml')
    soup.find()
    planListContainers = soup.findAll(name='ul', attrs={"class": "el-plan-list clearfix"})
    if planListContainers:
        planListContainer = planListContainers[0]
        if isinstance(planListContainer, Tag):
            lessons = planListContainer.findAll(name='li')
            for lesson in lessons:
                if isinstance(lesson, Tag):
                    onClick = str(lesson.get('onclick')).replace('"', "")
                    clickUrlsPattern = re.compile(r'[(](.*?)[)]', re.S)
                    patternResult = re.findall(clickUrlsPattern, onClick)
                    if patternResult:
                        clickUrl = BASE_URL+patternResult[0]
                        clickResult = do_get(clickUrl)
                        print(clickResult)


        # planListContainerSoup = BeautifulSoup(planListContainer, 'lxml')
        # childrenList = planListContainerSoup.children

    # cookie.set()
else:
    print('status:'+status)

print('cookie:'+str(response.cookies))
print('header:'+str(response.headers))
