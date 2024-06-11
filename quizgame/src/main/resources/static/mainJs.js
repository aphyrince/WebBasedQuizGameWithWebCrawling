import homeObj from "./home.js";
import inGameObj from "./inGame.js";
import rankPageObj from "./rankPage.js";

document.addEventListener('DOMContentLoaded', () => {

    homeObj.startQuizBtn.addEventListener('click', () => {
        inGameObj.requestQuizSet();
        homeObj.homeScreen.style.display = 'none';
        inGameObj.quizScreen.style.display = 'block';
        inGameObj.resetTimer();
        inGameObj.showQuestion();
        inGameObj.startTimer();
        inGameObj.currentQuestionIndex = 0;
    });

    homeObj.showRecordBtn.addEventListener('click', () => {
        homeObj.homeScreen.style.display = 'none';
        rankPageObj.recordScreen.style.display = 'block';
        rankPageObj.recordContainer.innerHTML = '';
        rankPageObj.currentPage = 0;

        rankPageObj.loadRecords();
    });

    rankPageObj.backToHomeBtn.addEventListener('click', () => {
        rankPageObj.recordScreen.style.display = 'none';
        homeObj.homeScreen.style.display = 'block';
        
        while(rankPageObj.recordContainer.hasChildNodes()){
            rankPageObj.recordContainer.removeChild(rankPageObj.recordContainer.firstChild);
        }
    });

    rankPageObj.searchBox.addEventListener('input', () => {
        const searchTerm = rankPageObj.searchBox.value.toLowerCase();
        rankPageObj.filteredRecords = rankPageObj.records.filter(record => record.name.toLowerCase().includes(searchTerm));
        rankPageObj.recordContainer.innerHTML = '';
        rankPageObj.currentPage = 0;
        rankPageObj.loadRecords();
    });

    rankPageObj.recordContainer.addEventListener('scroll', () => {
        const { scrollTop, scrollHeight, clientHeight } = rankPageObj.recordContainer;
        if (scrollTop + clientHeight >= scrollHeight - 5) {
            rankPageObj.currentPage++;
            rankPageObj.loadRecords();
        }
    });

    inGameObj.userAnswerBox.addEventListener('keydown', (event) => {
        if(event.key === 'Enter'){
            event.preventDefault();
            submitAnswerAction();
        }
    });

    inGameObj.nextQuestionBtn.addEventListener('click', () => {
        submitAnswerAction();
    });


    // 정답 제출 했을 때의 행동
    function submitAnswerAction(){
        const userAnswer = document.getElementById('user-answer-box').value;
        console.log("submitted answer = ",userAnswer);

        // 정답일 시
        if(userAnswer!== "" && inGameObj.isCorrectAnswer(userAnswer,inGameObj.questions[inGameObj.currentQuestionIndex].answer)){
            inGameObj.score++;
            inGameObj.currentQuestionIndex++;

            // 클라이언트가 가지고 있는 문제가 부족하면 서버에 추가 문제를 요청함.
            if(inGameObj.currentQuestionIndex <= inGameObj.questions.length){
                inGameObj.requestQuizSet();
            }
            // 다음 문제 표시
            inGameObj.resetTimer();
            inGameObj.showQuestion();
        }
        else{   // 오답일 시
            inGameObj.gameOver();
            inGameObj.quizScreen.style.display = 'none';
            rankPageObj.recordScreen.style.display = 'block';
            rankPageObj.loadRecords();
        }
    }

});