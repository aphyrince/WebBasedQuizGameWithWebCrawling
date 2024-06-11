const rankPageObj = {};
rankPageObj.recordScreen = document.getElementById('ranking');
rankPageObj.backToHomeBtn = document.getElementById('backToHomeBtn');
rankPageObj.recordContainer = document.getElementById('recordContainer');
rankPageObj.searchBox = document.getElementById('searchBox');

rankPageObj.score = 0;
rankPageObj.currentPage = 0;
rankPageObj.recordsPerPage = 10;
rankPageObj.records = [];
rankPageObj.filteredRecords = [...rankPageObj.records];

rankPageObj.loadRecords = loadRecords;
rankPageObj.requestRecords = requestRecords; // 구현만 해놓은 상황. 다른 곳에서 호출해줘야 함


function loadRecords() {
    const start = rankPageObj.currentPage * rankPageObj.recordsPerPage;
    const end = start + rankPageObj.recordsPerPage;
    const paginatedRecords = rankPageObj.filteredRecords.slice(start, end);

    rankPageObj.requestRecords();

    paginatedRecords.forEach((record, index) => {
        const rankItem = document.createElement('div');
        rankItem.className = 'rank-item';
        rankItem.innerHTML = `<span>${start + index + 1}. ${record.name}</span><span>${record.score}</span>`;
        rankPageObj.recordContainer.appendChild(rankItem);
    });
}

// 서버에 랭킹 record를 요청하고, 응답 받은 랭킹들을 rankPageObj.records에 넣음
function requestRecords(){
    const ajaxRequest = new XMLHttpRequest();

    ajaxRequest.onreadystatechange = event =>{
        const currentAjaxRequest = event.currentTarget;
        if(currentAjaxRequest.readyState === XMLHttpRequest.DONE &&
            currentAjaxRequest.status === 200){
                const responsedQuizSet = JSON.parse(currentAjaxRequest.responseText);
                responsedQuizSet.forEach(record =>{
                    rankPageObj.records.push(record);
                });
            }
        else{
            console.error("response error : getRecord");
        }
    };
    ajaxRequest.open('GET', `/getRankingInfoSet?flag=${rankPageObj.records.length}`);
    ajaxRequest.send();
}


export default rankPageObj;