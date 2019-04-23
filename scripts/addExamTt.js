const ID_NAME_FILED = "name-field";
const ID_LIFEGROUP_FIELD = "lifegroups";
const ID_MODULES_FIELD = "verification";
const ID_TEXTAREA_FIELD = "examtt-textarea";
const ID_SUBMIT_BUTTON = "submit";
let submitButton, nameField, lifegroupField, modules;

let inputs = {
    name: false,
    lifegroup: false,
    modules: false
}

function setModules(_modules) {
    modules = _modules;
    inputs.modules = modules != null && modules.length > 0;
    inputsOnChange()
}

function allInputsValid() {
    return inputs.name && inputs.lifegroup && inputs.modules;
}

function inputsOnChange() {
    submitButton.classList.remove("valid");
    if (!allInputsValid()) return;
    submitButton.classList.add("valid");
}

function sendAddStudentExam() {
    name = nameField.value;
    lifegroup = lifegroupField.value;
    jsonObj = {name, lifegroup, modules};
    jsonStr = JSON.stringify(jsonObj);
    send_json(getAddExamTtUrl(), jsonStr, res => {
        responseObj = JSON.parse(res);
        updatePreview(responseObj['successes'], responseObj['failures']);
    });
    // updatePreview(["CS 4231-L1", "PC 1221-L1"], [])
}

function submitOnClick() {
    if (!allInputsValid()) {
        missingStr = "Missing: ";
        if (!inputs.name) missingStr += "Name, ";
        if (!inputs.lifegroup) missingStr += "Lifegroup, ";
        if (!inputs.modules) missingStr += "Modules.";
        alert(missingStr);
        return;
    };
    sendAddStudentExam();
}

function listenToInputs() {
    submitButton = document.getElementById(ID_SUBMIT_BUTTON);
    submitButton.addEventListener("click", submitOnClick);
    nameField = document.getElementById(ID_NAME_FILED);
    lifegroupField = document.getElementById(ID_LIFEGROUP_FIELD);
    nameField.addEventListener("keyup", (e)=>{
        inputs.name = e.target.value !== "";
        inputsOnChange()
    });
    lifegroupField.addEventListener("change", (e)=>{
        inputs.lifegroup = e.target.value !== "";
        inputsOnChange()
    });
}