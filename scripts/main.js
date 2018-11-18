api_base_url = "https://jeremiahang.pythonanywhere.com/api/examtt"

window.onload = function() {
    main();
}

function main() {
    listenToExamttForm();
}

function listenToExamttForm() {
    const form = document.getElementById('examtt-input-form');
    form.addEventListener("submit", processForm);
}

function processForm(e) {
    if (e.preventDefault) e.preventDefault();
    form = e.target;
    examtt_str = form.elements['examtt-textarea'].value;
    send_examtt(examtt_str)
    return false;
}

function parse_examtt_str(examtt_str) {
    return {"examtt": examtt_str};
}

function send_examtt(examtt_str) {
    parsed_examtt = parse_examtt_str(examtt_str)
    url = api_base_url + "/parse/myaces"
    send_json(url, JSON.stringify(parsed_examtt));
}

function send_json(url, json) {
    const Http = new XMLHttpRequest();
    Http.open("POST", url);
    Http.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    Http.send(json);
    Http.onreadystatechange = (e) => {
        update_confirmation(Http.responseText)
    }
}

function update_confirmation(msg) {
    if (msg === "") return;
    document.getElementById("examtt-viewer").classList.remove("hidden");
    name_dom = document.getElementById("examtt-confirmation-name");
    number_dom = document.getElementById("examtt-confirmation-number");

    students = JSON.parse(msg).students;
    name = '';
    modules = [];
    for (const student in students) {
        if (students.hasOwnProperty(student)) {
            name = student;
            modules = students[student].modules;
        }
        break;
    }

    name_dom.innerHTML = name;
    number_dom.innerHTML = modules.length;
    update_confirmation_modules(modules);
}

function update_confirmation_modules(modules) {
    modules_dom = document.getElementById("examtt-confirmation-modules");
    modules_dom.innerHTML = "";
    for (const i in modules) {
        if (!modules.hasOwnProperty(i)) continue; 
        const module = modules[i];
        modules_dom.appendChild(newModule(module));
    }
}

function newModule(module) {
    dom = document.createElement('div');
    dom.className = "examtt-module";
    dom.innerHTML = module.code;
    return dom;
}