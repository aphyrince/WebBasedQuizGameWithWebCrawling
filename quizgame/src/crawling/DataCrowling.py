import requests
from bs4 import BeautifulSoup
import re, csv

url = "https://m.blog.naver.com/wlstmf2306/222408435436"
res = requests.get(url)
soup = BeautifulSoup(res.text, 'html.parser')

p = soup.find_all('p')

combined_text = ' '.join(p.text for p in p)
# print(combined_text)
txt = combined_text.split("구글", 1)[1]
# print(txt)
txt2 = txt.split('+', 1)[0]
txt3 = txt2.split('#', 1)[0]
# print(txt2)
q_pattern = re.compile(r"\d+\.\s*([^?]+\?)")
questions = q_pattern.findall(txt2)
cleaned_questions = []
for idx, question in enumerate(questions, start=1):
    # 물음표를 기준으로 나누고 두 번째 부분을 가져옴
    cleaned_question = question.split('?', 1)[0] + '?'
    cleaned_questions.append(cleaned_question.strip())
    print(f"{idx}. {cleaned_question.strip()}")

a_pattern = r'답\s*:\s*.*?(?=\s*<[^\s]*|\s*\d+\.\s*|\s*$)'
matches = re.findall(a_pattern, txt3)

cleaned_answers = []

for match in matches:
    cleaned_answer = match.replace('답 :', '').strip()
    cleaned_answers.append(cleaned_answer)
    # print(cleaned_answer)

with open('quizgame\src\crawling\data.csv', 'w', newline='', encoding='utf-8') as csvfile:
    writer = csv.writer(csvfile)
    writer.writerow(['Question', 'Answer'])
    for question, answer in zip(cleaned_questions, cleaned_answers):
        writer.writerow([question, answer])