const rankPageObj = {};
rankPageObj.recordScreen = document.getElementById('ranking');
rankPageObj.backToHomeBtn = document.getElementById('backToHomeBtn');
rankPageObj.recordContainer = document.getElementById('recordContainer');
rankPageObj.searchBox = document.getElementById('searchBox');

rankPageObj.score = 0;
rankPageObj.currentPage = 0;
rankPageObj.recordsPerPage = 10;
rankPageObj.records = [];

rankPageObj.loadRecords = loadRecords;
rankPageObj.requestRecords = requestRecords;


async function loadRecords() {
    console.log("loadRecords:: ");
    rankPageObj.recordContainer.innerHTML = '';
    rankPageObj.records = [];
    await rankPageObj.requestRecords();
    rankPageObj.records.forEach((record) => {
        console.log(record);
        const rankItem = document.createElement('div');
        rankItem.className = 'rank-item';
        rankItem.innerHTML = `<span>${record.rank}. ${record.name}</span><span>${record.score}</span>`;
        rankPageObj.recordContainer.appendChild(rankItem);
    });
}

// 서버에 랭킹 record를 요청하고, 응답 받은 랭킹들을 rankPageObj.records에 넣음
function requestRecords() {
    console.log("requestRecords:: ")
    return new Promise((resolve, reject) => {
        const ajaxRequest = new XMLHttpRequest();

        ajaxRequest.onreadystatechange = event => {
            const currentAjaxRequest = event.currentTarget;
            if (currentAjaxRequest.readyState === XMLHttpRequest.DONE) {
                if (currentAjaxRequest.status === 200) {
                    const responsedQuizSet = JSON.parse(currentAjaxRequest.responseText);
                    responsedQuizSet.forEach(record => {
                        rankPageObj.records.push(record);
                    });
                    console.log(rankPageObj.records);
                    resolve();
                }
                else {
                    console.error("response error : getRecord");
                    reject("response error : getRecord");
                }
            }
        };
        ajaxRequest.open('GET', `/getRankingInfoSet?flag=${rankPageObj.records.length}`);
        ajaxRequest.send();
    });
}


export default rankPageObj;