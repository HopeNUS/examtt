function getParseAndCallback(url, callback) {
    send_get(url, res => {
        resJson = JSON.parse(res);
        callback(resJson);
    })
}

function getExamTt(date, month, callback) {
    const url = getExamTtUrl(date, month);
    getParseAndCallback(url, callback);
}

function getPrayerWarriorSlot(date, month, callback) {
    const url = getPrayerSlotUrl(date, month);
    getParseAndCallback(url, callback);
}