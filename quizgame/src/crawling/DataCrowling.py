import requests
from bs4 import BeautifulSoup
import re

url = "https://m.blog.naver.com/wlstmf2306/222408435436"  # 실제 퀴즈 웹사이트 URL로 대체
res = requests.get(url)
soup = BeautifulSoup(res.text, 'html.parser')

p = soup.find_all('p')

combined_text = ' '.join(p.text for p in p)
# print(combined_text)
txt = combined_text.split("구글", 1)[1]
# print(txt)
txt2 = txt.split('+', 1)[0]
# print(txt2)
pattern = re.compile(r"\d+\.\s*([^?]+\?)")
questions = pattern.findall(txt2)

for idx, question in enumerate(questions, start=1):
    # 물음표를 기준으로 나누고 두 번째 부분을 가져옴
    cleaned_question = question.split('?', 1)[0] + '?'
    print(f"{idx}. {cleaned_question.strip()}")