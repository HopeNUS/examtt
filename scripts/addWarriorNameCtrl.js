const ID_ADD_WARRIOR_NAME = "warrior-name";
let addWarriorDom = null;

function getAddWarriorDom() {
    if (addWarriorDom == null) {
        addWarriorDom = document.getElementById(ID_ADD_WARRIOR_NAME);
    }
    return addWarriorDom;
}

function getAddWarriorName() {
    warriorNameDom = getAddWarriorDom();
    return warriorNameDom.value;
}