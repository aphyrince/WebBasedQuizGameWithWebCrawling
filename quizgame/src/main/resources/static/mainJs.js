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

    inGameObj.nextQuestionBtn.addEventListener('click', () => {
        const userAnswer = document.getElementById('user-answer-box').value;
        console.log(userAnswer);
        if (userAnswer.toLowerCase() === inGameObj.questions[inGameObj.currentQuestionIndex].answer.toLowerCase()) {
            score++;
        }
        inGameObj.currentQuestionIndex++;
        if (inGameObj.currentQuestionIndex === inGameObj.questions.length) {
            function onReadyStateChange(event) {
                const currentAjaxRequest = event.currentTarget;
                if (currentAjaxRequest.readyState === XMLHttpRequest.DONE
                    && currentAjaxRequest.status === 200) {
                    const responsedQuizSet = JSON.parse(currentAjaxRequest.responseText);
                    responsedQuizSet.forEach(quizSet => {
                        inGameObj.questions.push(quizSet);
                    });
                }
                else {
                    console.error('quizRequest failed');
                }
            }
            const ajaxRequest = new XMLHttpRequest();

            ajaxRequest.onreadystatechange = onReadyStateChange;
            ajaxRequest.open('GET', `/getQuizSet?flag=${inGameObj.questions.length}`);
            ajaxRequest.send();
        }
        else if (inGameObj.currentQuestionIndex < inGameObj.questions.length) {
            inGameObj.showQuestion();
            inGameObj.resetTimer();
        }
        else {
            rankPageObj.score = inGameObj.score;
            inGameObj.saveRecord();
            inGameObj.quizScreen.style.display = 'none';
            rankPageObj.recordScreen.style.display = 'flex';
            rankPageObj.showRecord();
        }

    });
});