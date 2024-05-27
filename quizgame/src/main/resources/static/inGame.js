const inGameObj = {};
inGameObj.quizScreen = document.getElementById('inGame');
inGameObj.nextQuestionBtn = document.getElementById('nextQuestionBtn');
inGameObj.questionContainer = document.getElementById('questionContainer');
inGameObj.userAnswerBox = document.getElementById('user-answer-box');

inGameObj.currentQuestionIndex = 0;
inGameObj.score = 0;
inGameObj.questions = [
    { question: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.', answer: '4' },
    { question: 'What is the capital of France?', answer: 'Paris' },
    { question: 'What is the largest planet in our solar system?', answer: 'Jupiter' }
];

inGameObj.timer = document.getElementsByClassName('timer')[0];
inGameObj.totalTime = 10000; //in ms
inGameObj.resetTotalTime = inGameObj.totalTime;
inGameObj.intervalTime = 10 //interval in ms;
inGameObj.remainingTime = inGameObj.totalTime;

inGameObj.timer.textContent = `${formatTime(inGameObj.remainingTime)}s`;

inGameObj.formatTime = formatTime;
inGameObj.startTimer = startTimer;
inGameObj.resetTimer = resetTimer;
inGameObj.showQuestion = showQuestion;
inGameObj.saveRecord = saveRecord;

function formatTime(ms) {
    return (ms / 1000).toFixed(1);
}

function startTimer() {
    const intervalID = setInterval(() => {
        const computedStyle = getComputedStyle(inGameObj.timer)
        const width = parseFloat(computedStyle.getPropertyValue('--width')) || 0
        inGameObj.timer.style.setProperty('--width', width - .1)

        inGameObj.remainingTime -= inGameObj.intervalTime

        inGameObj.timer.textContent = `${formatTime(inGameObj.remainingTime)}s`

        if (inGameObj.remainingTime <= 0) {
            clearInterval(intervalID);
            inGameObj.timer.style.setProperty('--width', 0);
        }

    }, inGameObj.intervalTime)
}

function resetTimer() {
    inGameObj.timer.style.setProperty('--width', 100);
    inGameObj.remainingTime = inGameObj.totalTime;
}

function showQuestion() {
    inGameObj.questionContainer.innerHTML = `
    <p>${inGameObj.questions[inGameObj.currentQuestionIndex].question}</p>
    
`;
    inGameObj.userAnswerBox.value = ``; //clear textbox
}

function saveRecord() {
    let records = JSON.parse(localStorage.getItem('quizRecords')) || [];
    records.push(inGameObj.score);
    localStorage.setItem('quizRecords', JSON.stringify(records));
}

export default inGameObj;