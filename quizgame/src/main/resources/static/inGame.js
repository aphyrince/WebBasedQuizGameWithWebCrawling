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
inGameObj.totalTime = 5000; //in ms
inGameObj.resetTotalTime = inGameObj.totalTime;
inGameObj.intervalTime = inGameObj.totalTime/1000; //interval in ms;
inGameObj.remainingTime = inGameObj.totalTime;

inGameObj.timer.textContent = `${formatTime(inGameObj.remainingTime)}s`;

inGameObj.formatTime = formatTime;
inGameObj.startTimer = startTimer;
inGameObj.resetTimer = resetTimer;
inGameObj.showQuestion = showQuestion;
inGameObj.gameOver = gameOver;
inGameObj.moveToNextQuestion = moveToNextQuestion;
inGameObj.showNextQuestion = showNextQuestion;
inGameObj.submitAnswer = submitAnswer;


inGameObj.requestQuizSet = requestQuizSet;
inGameObj.postUserRecord = postUserRecord;

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
            if (inGameObj.currentQuestionIndex < inGameObj.questions.length){
                inGameObj.moveToNextQuestion();
            }      
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

//showNextQuestion + moveToNextQuestion : 타이머가 종료되면 자동으로 다음 문제로 이동함
function showNextQuestion() {
    inGameObj.questionContainer.innerHTML = `
        <p>${inGameObj.questions[++inGameObj.currentQuestionIndex].question}</p>
        
    `;
    inGameObj.userAnswerBox.value = ``; //clear textbox
    
}

function moveToNextQuestion() {
        inGameObj.resetTimer();
        inGameObj.showNextQuestion(); 
        inGameObj.startTimer();
}



// 서버에 퀴즈 세트 요청하고, 응답 받은 퀴즈들 inGameObj.questions에 넣음
function requestQuizSet(){
    const ajaxRequest = new XMLHttpRequest();

    ajaxRequest.onreadystatechange = event =>{
        const currentAjaxRequest = event.currentTarget;
        if(currentAjaxRequest.readyState === XMLHttpRequest.DONE &&
            currentAjaxRequest.status === 200){
                const responsedQuizSet = JSON.parse(currentAjaxRequest.responseText);
                responsedQuizSet.forEach(quizSet =>{
                    inGameObj.questions.push(quizSet);
                });
            }
        else{
            console.error("response error : getQuizSet");
        }
    };
    ajaxRequest.open('GET', `/getQuizSet?flag=${inGameObj.questions.length}`);
    ajaxRequest.send();
}

function postUserRecord(paramName, paramResultScore){
    const ajaxRequest = new XMLHttpRequest();

    ajaxRequest.onreadystatechange = event =>{
        const currentAjaxRequest = event.currentTarget;
        if(currentAjaxRequest.readyState === XMLHttpRequest.DONE &&
            currentAjaxRequest.status === 200){
                console.log("유저 랭킹 등록 성공");
            }
        else{
            console.error("response error : postRecord");
        }
    };
    let userRankingJson = {name:paramName,resultScore:paramResultScore};
    userRankingJson = JSON.stringify(userRankingJson);
    console.log(userRankingJson);
    ajaxRequest.open('POST', `/postUserGameResultRecord`);
    ajaxRequest.setRequestHeader('Content-Type', 'application/json');
    ajaxRequest.send(userRankingJson);
}

// 게임 오버 시 나오는 액션
function gameOver(){
    let isWillSave = confirm(`Your score = ${inGameObj.score} !\n Would you like to save the record?`);
    if(isWillSave){
        let playerName = '';
        while(true){
            playerName = prompt('Please input your name.');   
            if(playerName === ''){
                alert('" " is not a name!');
                continue;
            }
            break;
        }
        //서버에 playerName과 score 전송
        inGameObj.postUserRecord(playerName,inGameObj.score);
    }
}

export default inGameObj;