function deletePrayerWarriorSubscription(prayerSlot, warriorName, callback) {
    jsonData = [prayerSlot];
    jsonStr = JSON.stringify(jsonData);
    url = getDeleteWarriorSubscriptionUrl();
    $.ajax({
        url: url, 
        type: 'POST', 
        contentType: 'application/json', 
        data: jsonStr
    }).done(res => {
        if (res['error']) {
            hideLoading();
            alert(res['error']);
            return;
        }
        callback();
    }).fail((jqXHR, textStatus, errorThrown) => {
        hideLoading();
        alert(errorThrown);
    })
}

function addPrayerWarriorSubscription(prayerSlotId, warrior, callback) {
    jsonData = [{
        name: warrior,
        exam_id: prayerSlotId
    }];
    jsonStr = JSON.stringify(jsonData);
    url = getAddWarriorSubscriptionUrl();
    $.ajax({
        url: url, 
        type: 'POST', 
        contentType: 'application/json', 
        data: jsonStr
    }).done(res => {
        if (res['error']) {
            hideLoading();
            alert(res['error']);
            return;
        }
        callback();
    }).fail((jqXHR, textStatus, errorThrown) => {
        hideLoading();
        alert(errorThrown);
    })
}