function deletePrayerWarriorSubscription(prayerSlot, warriorName, callback) {
    jsonData = [{prayerSlot, warriorName}];
    jsonStr = JSON.stringify(jsonData);
    url = getDeleteWarriorSubscriptionUrl();
    send_json(url, jsonStr, callback)
}

function addPrayerWarriorSubscription(prayerSlotId, warrior, callback) {
    prayerSlot = [prayerSlotId];
    jsonData = {warrior, prayerSlot};
    jsonStr = JSON.stringify(jsonData);
    url = getAddWarriorSubscriptionUrl();
    send_json(url, jsonStr, callback)
}