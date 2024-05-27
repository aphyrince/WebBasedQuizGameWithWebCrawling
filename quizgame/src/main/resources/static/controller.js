// 퀴즈 정보 세트 10개를 서버에서 가져옴
function getQuizSet() {
    function onReadyStateChange(event) {
        const currentAjaxRequest = event.currentTarget;

        if (currentAjaxRequest.readyState === XMLHttpRequest.DONE && currentAjaxRequest.status === 200) {
            resultQuizSet = JSON.parse(currentAjaxRequest.responseText);
        }
        else {
            console.error('request failed');
        }
    }

    let resultQuizSet = {};
    const ajaxRequest = new XMLHttpRequest();

    ajaxRequest.onreadystatechange = onReadyStateChange;
    ajaxRequest.open('GET', '/getQuizSet');
    ajaxRequest.send();

    return resultQuizSet;
}

// 유저의 name과 score를 서버로 전송함
function postUserGameResultRecord() {
    function onReadyStateChange(event) {
        const currentAjaxRequest = event.currentTarget;

        if (currentAjaxRequest.readyState === XMLHttpRequest.DONE && currentAjaxRequest.status === 200) {
            alert("랭킹이 등록되었습니다");
        }
        else {
            console.error('request failed');
        }
    }
    const requestObject = {};
    const requestJson = JSON.stringify(requestObject);

    const ajaxRequest = new XMLHttpRequest();

    ajaxRequest.onreadystatechange = onReadyStateChange;
    ajaxRequest.open('POST', '/postUserGameResultRecord');
    ajaxRequest.setRequestHeader('Content-Type', 'application/json');
    ajaxRequest.send(requestJson);
}

// 랭킹 정보를 서버로부터 10개 가져옴
function getRankingInfoSet() {
    function onReadyStateChange(event) {
        const currentAjaxRequest = event.currentTarget;

        if (currentAjaxRequest.readyState === XMLHttpRequest.DONE && currentAjaxRequest.status === 200) {
            resultRankingSet(JSON.parse(currentAjaxRequest.responseText));
        }
        else{
            console.error('request failed');
        }
    }

    let resultRankingSet = {};
    const ajaxRequest = new XMLHttpRequest();

    ajaxRequest.onreadystatechange = onReadyStateChange;
    ajaxRequest.open('GET', '/getRankingInfoSet');
    ajaxRequest.send();
    
    return resultRankingSet;
}