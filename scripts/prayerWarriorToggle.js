const ID_PRAYER_WARRIOR_CTRL = "prayer-warrior-ctrl";
const ID_PRAYER_WARRIOR_NAME = "prayer-warrior-name";
const CLASS_PRAYER_WARRIOR_CTRL = "student-only";
let prayerTableDom = null;
let prayerWarriorNameDom = null
function togglePrayerWarrior(e) {
    if (prayerTableDom == null)
        prayerTableDom = document.getElementById(ID_PRAYER_TABLE)
    if (prayerWarriorNameDom == null)
        prayerWarriorNameDom = document.getElementById(ID_PRAYER_WARRIOR_NAME)
    prayerTableDom.classList.toggle(CLASS_PRAYER_WARRIOR_CTRL);
    prayerWarriorNameDom.classList.toggle(CLASS_PRAYER_WARRIOR_CTRL);
}

function activatePrayerWarriorToggle() {
    let prayerWarriorCtrlBtn = document.getElementById(ID_PRAYER_WARRIOR_CTRL)
    prayerWarriorCtrlBtn.addEventListener("click", togglePrayerWarrior);
}