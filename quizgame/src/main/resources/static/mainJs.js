import homeObj from "./home.js";
import inGameObj from "./inGame.js";
import rankPageObj from "./rankPage.js";

document.addEventListener('DOMContentLoaded', () => {

    homeObj.startQuizBtn.addEventListener('click', () => {
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
        //inGameObj.currentQuestionIndex = 0; //temporary fix
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
        const userAnswer = document.getElementById('user-answer-box').value;
        if(event.key === 'Enter'){
            event.preventDefault();
                    // 정답일 시
            if (userAnswer.toLowerCase() === inGameObj.questions[inGameObj.currentQuestionIndex].answer.toLowerCase()) {
                inGameObj.score++;
                inGameObj.currentQuestionIndex++;
                inGameObj.updateScore();
                // console.log("정답 "+inGameObj.score,userAnswer+","+inGameObj.questions[inGameObj.currentQuestionIndex].answer);
            }
            // 오답일 시
            else if (userAnswer.toLowerCase() !== inGameObj.questions[inGameObj.currentQuestionIndex].answer.toLowerCase()){ //질문 넘어가기
                inGameObj.currentQuestionIndex++;
            }
            else{
                // console.log("오답 "+inGameObj.score,userAnswer+","+inGameObj.questions[inGameObj.currentQuestionIndex].answer);
                inGameObj.gameOver();
                inGameObj.quizScreen.style.display = 'none';
                rankPageObj.recordScreen.style.display = 'block';
                rankPageObj.loadRecords();
            }
            
            //문제가 다 떨어지면 서버에 추가 문제 요청
            if (inGameObj.currentQuestionIndex === inGameObj.questions.length) {
                inGameObj.requestQuizSet();
            }
            if (inGameObj.currentQuestionIndex < inGameObj.questions.length) {
                inGameObj.showQuestion();
                inGameObj.resetTimer();
            }
            else {
                inGameObj.gameOver();
                inGameObj.quizScreen.style.display = 'none';
                rankPageObj.recordScreen.style.display = 'block';
                rankPageObj.loadRecords();
            }
        }
    });

    inGameObj.nextQuestionBtn.addEventListener('click', () => {
        const userAnswer = document.getElementById('user-answer-box').value;
        console.log(inGameObj.currentQuestionIndex);
        // 정답일 시
        if (userAnswer.toLowerCase() === inGameObj.questions[inGameObj.currentQuestionIndex].answer.toLowerCase()) {
            inGameObj.score++;
            inGameObj.currentQuestionIndex++;
            inGameObj.updateScore();

            // console.log("정답 "+inGameObj.score,userAnswer+","+inGameObj.questions[inGameObj.currentQuestionIndex].answer);
        }
        // 오답일 시
        else if (userAnswer.toLowerCase() !== inGameObj.questions[inGameObj.currentQuestionIndex].answer.toLowerCase()){ //질문 넘어가기
            inGameObj.currentQuestionIndex++;
        }
        else{
            // console.log("오답 "+inGameObj.score,userAnswer+","+inGameObj.questions[inGameObj.currentQuestionIndex].answer);
            inGameObj.gameOver();
            inGameObj.quizScreen.style.display = 'none';
            rankPageObj.recordScreen.style.display = 'block';
            rankPageObj.loadRecords();
        }
        
        //문제가 다 떨어지면 서버에 추가 문제 요청
        if (inGameObj.currentQuestionIndex === inGameObj.questions.length) {
            inGameObj.requestQuizSet();
        }
        if (inGameObj.currentQuestionIndex < inGameObj.questions.length) {
            inGameObj.showQuestion();
            inGameObj.resetTimer();
        }
        else {
            inGameObj.gameOver();
            inGameObj.quizScreen.style.display = 'none';
            rankPageObj.recordScreen.style.display = 'block';
            rankPageObj.loadRecords();
        }

    });

    

});

