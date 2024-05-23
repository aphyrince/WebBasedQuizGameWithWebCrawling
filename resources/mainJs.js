document.addEventListener('DOMContentLoaded', () => {
    const homeScreen = document.getElementById('home');
    const quizScreen = document.getElementById('inGame');
    const recordScreen = document.getElementById('ranking');

    const startQuizBtn = document.getElementById('startBtn');
    const showRecordBtn = document.getElementById('showRecordBtn');
    const nextQuestionBtn = document.getElementById('nextQuestionBtn');
    const backToHomeBtn = document.getElementById('backToHomeBtn');

    const questionContainer = document.getElementById('questionContainer');
    const recordContainer = document.getElementById('recordContainer');

    const userAnswerBox = document.getElementById('user-answer-box');

    let currentQuestionIndex = 0;
    let score = 0;
    let questions = [
        { question: 'What is 2 + 2?', answer: '4' },
        { question: 'What is the capital of France?', answer: 'Paris' },
        { question: 'What is the largest planet in our solar system?', answer: 'Jupiter' }
    ];

    startQuizBtn.addEventListener('click', () => {
        homeScreen.style.display = 'none';
        quizScreen.style.display = 'flex';
        showQuestion();
    });

    showRecordBtn.addEventListener('click', () => {
        homeScreen.style.display = 'none';
        recordScreen.style.display = 'flex';
        showRecord();
    });

    nextQuestionBtn.addEventListener('click', () => {
        const userAnswer = document.getElementById('user-answer-box').value;
        console.log(userAnswer);
        if (userAnswer.toLowerCase() === questions[currentQuestionIndex].answer.toLowerCase()) {
            score++;
        }
        currentQuestionIndex++;
        if (currentQuestionIndex < questions.length) {
            showQuestion();
        } else {
            saveRecord();
            quizScreen.style.display = 'none';
            recordScreen.style.display = 'flex';
            showRecord();
        }

    });

    backToHomeBtn.addEventListener('click', () => {
        recordScreen.style.display = 'none';
        homeScreen.style.display = '';
    });

    function showQuestion() {
        questionContainer.innerHTML = `
            <p>${questions[currentQuestionIndex].question}</p>
            
        `;
        userAnswerBox.value = ``; //clear textbox
        
    }

    function saveRecord() {
        let records = JSON.parse(localStorage.getItem('quizRecords')) || [];
        records.push(score);
        localStorage.setItem('quizRecords', JSON.stringify(records));
    }

    function showRecord() {
        let records = JSON.parse(localStorage.getItem('quizRecords')) || [];
        recordContainer.innerHTML = `
            <p>Your score: ${score}</p>
            <p>Previous scores:</p>
            <ul>
                ${records.map(record => `<li>${record}</li>`).join('')}
            </ul>
        `;
    }
});
