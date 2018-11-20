api_base_url = "https://jeremiahang.pythonanywhere.com/api/examtt"

LOADER = null;
DATE_PICKER = null

window.onload = function() {
    main();
    LOADER = document.getElementById("loading");
    DATE_PICKER = document.getElementById("date-picker");
}

function play_loader() {
    LOADER.classList.remove("hidden")
}
function stop_loader() {
    LOADER.classList.add("hidden")
}

function main() {
    listenToOverlay();
    listenToExamttForm();
    listenToDatePicker();
}

function listenToOverlay() {
    const picker_overlay = document.getElementById("picker-overlay");
    picker_overlay.addEventListener("click", close_date_picker);
}

function listenToDatePicker() {
    const view_date_day = document.getElementById("view-date-controller");
    view_date_day.addEventListener("click", open_date_picker);

    const datePickers = document.getElementsByClassName("picker-day");
    for (const i in datePickers) {
        if (!datePickers.hasOwnProperty(i)) continue;
        datePickers[i].addEventListener("click", pickDate);
    }
}

function open_date_picker() {
    DATE_PICKER.classList.remove("hidden");
}
function close_date_picker() {
    DATE_PICKER.classList.add("hidden");
}

function pickDate(e) {
    target = e.target;
    const date = target.innerHTML;
    const month = (parseInt(date) < 10) ? "DEC" : "NOV";
    const day = date + month;
    close_date_picker();
    getExammttByDay(day);
}

function getExammttByDay(day) {
    url = api_base_url + "/slot?day="+day;
    send_get(url, makeExamttByDayResponseHandler(day))
}

function makeExamttByDayResponseHandler(day) {
    return (response) => handleExamttByDayResponse(day, response);
}

function handleExamttByDayResponse(day, response) {
    if (response === "") return;
    stop_loader();
    json = JSON.parse(response);
    slots = json.slots;
    venues = json.venues;
    result = [];

    for (const key in slots) {
        if (!slots.hasOwnProperty(key)) continue;
        const slot = slots[key];
        const time = slot.time;
        const slot_venues = slot.venues;
        for (const venue_id in slot_venues) {
            if (!slot_venues.hasOwnProperty(venue_id)) continue;
            const venue = venues[venue_id].name;
            const venue_module = slot_venues[venue_id];
            for (const module_code in venue_module) {
                if (!venue_module.hasOwnProperty(module_code)) continue;
                const students_module = venue_module[module_code];
                for (const i in students_module) {
                    if (!students_module.hasOwnProperty(i)) continue;
                    student = students_module[i];
                    console.log(student);
                    result.push([day, time, venue, module_code, student.name]);
                }
            }
        }
    }
    result.sort((a, b) => a[1] - b[1])
    populate_slots_dom(day, result)
}

function populate_slots_dom(day, result) {
    const view_date_day = document.getElementById("view-date-day");
    view_date_day.innerHTML = day;

    slot_dom = document.getElementById("view-date-results");
    slot_dom.innerHTML = "";
    for (const i in result) {
        slot_dom.appendChild(make_slot_dom(result[i]));
    }
}

function make_slot_dom(slot) {
    /**
     * <div class = 'view-date-result'>
            <div class = 'view-date-result-name'>JEREMIAH ANG YONG EN</div>
            <div class = 'view-date-result-badges'>
                <div class = 'view-date-result-time'>1300</div>
                <div class = 'view-date-result-venue'>COM1-0206</div>
                <div class = 'view-date-result-module'>CS4226</div>
            </div>
        </div>
     */
    // Name
    const view_date_result_name = document.createElement("div");
    view_date_result_name.classList.add("view-date-result-name");
    view_date_result_name.innerHTML = slot[4];
    // Time
    const view_date_result_time = document.createElement("div");
    view_date_result_time.classList.add("view-date-result-time");
    view_date_result_time.innerHTML = slot[1];
    // Venue
    const view_date_result_venue = document.createElement("div");
    view_date_result_venue.classList.add("view-date-result-venue");
    view_date_result_venue.innerHTML = slot[2];
    // Module
    const view_date_result_module = document.createElement("div");
    view_date_result_module.classList.add("view-date-result-module"); 
    view_date_result_module.innerHTML = slot[3];
    // Badges
    const view_date_result_badges = document.createElement("div");
    view_date_result_badges.classList.add("view-date-result-badges");
    view_date_result_badges.appendChild(view_date_result_time);
    view_date_result_badges.appendChild(view_date_result_venue);
    view_date_result_badges.appendChild(view_date_result_module);
    // Result
    const view_date_result = document.createElement("div");
    view_date_result.classList.add("view-date-result");
    view_date_result.appendChild(view_date_result_name);
    view_date_result.appendChild(view_date_result_badges);

    return view_date_result;

}

function listenToExamttForm() {
    const form = document.getElementById('examtt-input-form');
    form.addEventListener("submit", processForm);
}

function processForm(e) {
    if (e.preventDefault) e.preventDefault();
    form = e.target;
    examtt_str = form.elements['examtt-textarea'].value;
    lifegroup = form.elements['examtt-lifegroup'].value;
    send_examtt(examtt_str, lifegroup)
    return false;
}

function parse_examtt_str(examtt_str, lifegroup) {
    return {"examtt": examtt_str, "lifegroup": lifegroup};
}

function send_examtt(examtt_str, lifegroup) {
    parsed_examtt = parse_examtt_str(examtt_str, lifegroup);
    url = api_base_url + "/parse/myaces";
    send_json(url, JSON.stringify(parsed_examtt));
}

function send_get(url, callback) {
    play_loader()
    const Http = new XMLHttpRequest();
    Http.open("GET", url);
    Http.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    Http.send();
    Http.onreadystatechange = (e) => {
        if (Http.readyState === 4)
            callback(Http.responseText)
    }
}

function send_json(url, json) {
    play_loader()
    const Http = new XMLHttpRequest();
    Http.open("POST", url);
    Http.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    Http.send(json);
    Http.onreadystatechange = (e) => {
        if (Http.readyState === 4)
            update_confirmation(Http.responseText)
    }
}

function update_confirmation(msg) {
    if (msg === "") return;
    stop_loader()
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