const ID_PRAYER_WARRIOR_CTRL = "prayer-warrior-ctrl";
const CLASS_PRAYER_WARRIOR_CTRL = "student-only";
let prayerTableDom = null;
function togglePrayerWarrior(e) {
    if (prayerTableDom == null)
        prayerTableDom = document.getElementById(ID_PRAYER_TABLE)
    prayerTableDom.classList.toggle(CLASS_PRAYER_WARRIOR_CTRL);
}

function activatePrayerWarriorToggle() {
    let prayerWarriorCtrlBtn = document.getElementById(ID_PRAYER_WARRIOR_CTRL)
    prayerWarriorCtrlBtn.addEventListener("click", togglePrayerWarrior);
}