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
    const name = nameField.value;
    const lifegroup = parseInt(lifegroupField.value);
    const jsonObj = [];
    for (let module of modules) {
        module_data = {
            "datetime": module['datetime'],
            "place": module['location_index'],
            "course_code": module['code'],
            "name": name,
            "lifegroup": lifegroup,
        }
        jsonObj.push(module_data);
    }
    
    jsonStr = JSON.stringify(jsonObj);
    showLoading();
    $.ajax({
        url: getAddExamTtUrl(), 
        type: 'POST', 
        contentType: 'application/json', 
        data: jsonStr
    }).done(res => {
        hideLoading();
        if (res['error']) {
            alert(res['error']);
            return;
        }
        updatePreview(res);
    }).fail((jqXHR, textStatus, errorThrown) => {
        alert(errorThrown);
    })
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