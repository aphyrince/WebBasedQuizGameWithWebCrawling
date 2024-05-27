const rankPageObj = {};
rankPageObj.recordScreen = document.getElementById('ranking');
rankPageObj.backToHomeBtn = document.getElementById('backToHomeBtn');
rankPageObj.recordContainer = document.getElementById('recordContainer');
rankPageObj.searchBox = document.getElementById('searchBox');

rankPageObj.loadRecords = loadRecords;
rankPageObj.score = 0;

rankPageObj.currentPage = 0;
rankPageObj.recordsPerPage = 10;

rankPageObj.records = [
    { name: 'TestPlayer1', score: 3 },
    { name: 'TestPlayer2', score: 2 },
    { name: 'TestPlayer3', score: 1 },
    // Add more records as needed
];

rankPageObj.filteredRecords = [...rankPageObj.records];

function loadRecords() {
    const start = rankPageObj.currentPage * rankPageObj.recordsPerPage;
    const end = start + rankPageObj.recordsPerPage;
    const paginatedRecords = rankPageObj.filteredRecords.slice(start, end);

    paginatedRecords.forEach((record, index) => {
        const rankItem = document.createElement('div');
        rankItem.className = 'rank-item';
        rankItem.innerHTML = `<span>${start + index + 1}. ${record.name}</span><span>${record.score}</span>`;
        rankPageObj.recordContainer.appendChild(rankItem);
    });
}


export default rankPageObj;