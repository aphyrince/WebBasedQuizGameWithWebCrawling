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
    { question: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.', answer: '4' },
    { question: 'What is the capital of France?', answer: 'Paris' },
    { question: 'What is the largest planet in our solar system?', answer: 'Jupiter' }
];

//timer
const timer = document.getElementsByClassName('timer')[0];

const totalTime = 10000; //in ms
const resetTotalTime = totalTime;
const intervalTime = 10 //interval in ms;
let remainingTime = totalTime;

function formatTime(ms){
    return (ms/1000).toFixed(1);
}

timer.textContent = `${formatTime(remainingTime)}s`;

function startTimer(){
    const intervalID = setInterval(() => {
        const computedStyle = getComputedStyle(timer)
        const width = parseFloat(computedStyle.getPropertyValue('--width')) || 0
        timer.style.setProperty('--width', width - .1)

        remainingTime -= intervalTime

        timer.textContent = `${formatTime(remainingTime)}s`

        if(remainingTime <= 0){
            clearInterval(intervalID);
            timer.style.setProperty('--width', 0);
        }

    }, intervalTime)
}

function resetTimer(){
    timer.style.setProperty('--width', 100);
    remainingTime = totalTime;
}

startQuizBtn.addEventListener('click', () => {
    resetTimer();
    homeScreen.style.display = 'none';
    quizScreen.style.display = 'flex';
    showQuestion();
    
    startTimer();
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
        resetTimer();
        
    } 
    else {
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


/* Ranking Screen js */
document.addEventListener('DOMContentLoaded', (event) => {
    const startBtn = document.getElementById('startBtn');
    const showRecordBtn = document.getElementById('showRecordBtn');
    const backToHomeBtn = document.getElementById('backToHomeBtn');
    const homeScreen = document.getElementById('home');
    const rankingScreen = document.getElementById('ranking');
    const recordContainer = document.getElementById('recordContainer');
    const searchBox = document.getElementById('searchBox');

    const records = [
        { name: 'TestPlayer1', score: 3 },
        { name: 'TestPlayer2', score: 2 },
        { name: 'TestPlayer3', score: 1 },
        // Add more records as needed
    ];

    let filteredRecords = [...records];
    let currentPage = 0;
    const recordsPerPage = 10;

    startBtn.addEventListener('click', () => {
        homeScreen.style.display = 'none';
        inGameScreen.style.display = 'block';
    });

    showRecordBtn.addEventListener('click', () => {
        homeScreen.style.display = 'none';
        rankingScreen.style.display = 'block';
        recordContainer.innerHTML = '';
        currentPage = 0;
        loadRecords();
    });

    backToHomeBtn.addEventListener('click', () => {
        rankingScreen.style.display = 'none';
        homeScreen.style.display = 'block';
    });

    searchBox.addEventListener('input', () => {
        const searchTerm = searchBox.value.toLowerCase();
        filteredRecords = records.filter(record => record.name.toLowerCase().includes(searchTerm));
        recordContainer.innerHTML = '';
        currentPage = 0;
        loadRecords();
    });

    function loadRecords() {
        const start = currentPage * recordsPerPage;
        const end = start + recordsPerPage;
        const paginatedRecords = filteredRecords.slice(start, end);

        paginatedRecords.forEach((record, index) => {
            const rankItem = document.createElement('div');
            rankItem.className = 'rank-item';
            rankItem.innerHTML = `<span>${start + index + 1}. ${record.name}</span><span>${record.score}</span>`;
            recordContainer.appendChild(rankItem);
        });
    }

    function handleScroll() {
        const { scrollTop, scrollHeight, clientHeight } = recordContainer;
        if (scrollTop + clientHeight >= scrollHeight - 5) {
            currentPage++;
            loadRecords();
        }
    }

    recordContainer.addEventListener('scroll', handleScroll);
});