import requests
from bs4 import BeautifulSoup
import re, csv

all_questions = []
all_answers = []

urls = [
    "https://e-rs.tistory.com/entry/%EC%9D%BC%EB%B0%98-%EC%83%81%EC%8B%9D-%ED%80%B4%EC%A6%88-3",
    "https://e-rs.tistory.com/entry/2023%EB%85%84-%EC%9D%BC%EB%B0%98-%EC%83%81%EC%8B%9D-%ED%80%B4%EC%A6%88-%EB%AA%A8%EC%9D%8C",
    "https://e-rs.tistory.com/entry/%E2%91%A1-%EC%9D%BC%EB%B0%98-%EC%83%81%EC%8B%9D-%ED%80%B4%EC%A6%88-%EB%AA%A8%EC%9D%8C",
    "https://e-rs.tistory.com/entry/%E2%91%A3-%EC%9D%BC%EB%B0%98-%EC%83%81%EC%8B%9D-%ED%80%B4%EC%A6%88-%EB%AA%A8%EC%9D%8C"
]
for url in urls:
    res = requests.get(url)
    soup = BeautifulSoup(res.text, 'html.parser')

    p = soup.find_all('p')
    combined_text = ' '.join(p.text for p in p)

    sections = re.split(r'섬네일|일반 상식 퀴즈|①|②', combined_text)
    if sections:
        section_text = sections[0].strip()
        section_text += "QnA_end"
        
        question_pattern = re.compile(r"Q\.\s*(.*?)(?:\?\s*|A\s*:\s*)", re.DOTALL)
        answer_pattern = re.compile(r"(\?\s*|A\s*:\s*)(.*?)(?=Q\.\s*|QnA_end\s*|$)", re.DOTALL)

        questions = question_pattern.findall(section_text)
        answers = answer_pattern.findall(section_text)

        cleaned_questions = [q.split("A :", 1)[0].strip() for q in questions]

        cleaned_answers = []
        for a in answers:
            answer_text = a[1].strip()
            answer_text = answer_text.replace(": A :", "").strip()
            answer_text = answer_text.replace("A :", "").strip()
            answer_text = answer_text.replace("A:", "").strip()
            cleaned_answers.append(answer_text)

        all_questions.extend(cleaned_questions)
        all_answers.extend(cleaned_answers)


with open('quizgame\src\crawling\data.csv', 'w', newline='', encoding='utf-8') as csvfile:
    writer = csv.writer(csvfile)
    writer.writerow(['Question', 'Answer'])
    for question, answer in zip(all_questions, all_answers):
        writer.writerow([question, answer])
