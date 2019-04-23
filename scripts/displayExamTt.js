const ID_PRAYER_TABLE = "prayer-table";
const DOM_TABLE_HEADER = `
    <table class = 'header'>
        <tr>
            <td class = 'field prayer-warriors'>
                <h3>Prayer Warriors</h3>
            </td>
            <td class = 'field location'>
                <h3>Location</h3>
            </td>
            <td class = 'field students'>
                <h3>Students</h3>
            </td>
        </tr>
    </table>`;

function getAndDisplayExamTt(date, month, callback) {
    getExamTt(date, month, (examTtResponse)=>{
        getPrayerWarriorSlot(date, month, (prayerSlotResponse) => {
            displayExamTt(
                `${date}${month}`,
                examTtResponse.students,
                examTtResponse.exams,
                prayerSlotResponse.prayerSlots,
                prayerSlotResponse.prayerSlotsWarriors);
            callback();
        });
    });
}

function makeExamTtInfo(students, exams) {
    let times = {}
    let examLocations = {};
    let examTimes = {};
    exams.forEach(exam => {
        const examLocation = exam.meetingPoint || exam.location;
        const examTime = exam.time;
        const moduleCode = exam.code;
        examLocations[moduleCode] = examLocation;
        examTimes[moduleCode] = examTime;
    });


    students.forEach(student => {
        const modules = student.module;
        modules.forEach(moduleCode => {
            const examTime = examTimes[moduleCode];
            const examLocation = examLocations[moduleCode];
            if (!(examTime in times)) times[examTime] = {};
            if (!(examLocation in times[examTime])) times[examTime][examLocation] = [];
            times[examTime][examLocation].push({
                name: student.name,
                lifegroup: student.lifegroup
            });
        })
    });

    return times;
}

function makeDateDom(date) {
    let dateDom = document.createElement("div");
    dateDom.classList.add("date");
    dateDom.innerHTML = `<h3>Date: </h3>${date}`;
    return dateDom;
}

function populateWarriorDom(warriorsDom, warriors) {
    /*
    <div class = 'prayer-warrior'>Kah Hoe</div>
    */
    warriors.forEach(warrior => {
        warriorDom = document.createElement("div");
        warriorDom.classList.add("prayer-warrior");
        warriorDom.innerHTML = warrior;
        warriorsDom.appendChild(warriorDom);
    });
}

function populateLocationDom(locationDom, examLocation) {
    locationDom.innerHTML = examLocation;
}

function populateStudentsDom(studentsDom, students) {
    students.forEach(student => {
        let studentDom = document.createElement("div");
        studentDom.classList.add("student");
        const name = student.name;
        const lifegroup = student.lifegroup;
        nameDom = document.createElement("div");
        nameDom.classList.add("student-detail");
        nameDom.classList.add("name");
        nameDom.innerHTML = name;
        lifegroupDom = document.createElement("div");
        lifegroupDom.classList.add("student-detail");
        lifegroupDom.classList.add("lifegroup");
        lifegroupDom.innerHTML = lifegroup;
        studentDom.appendChild(nameDom);
        studentDom.appendChild(lifegroupDom);
        studentsDom.appendChild(studentDom);
    });
}

function makeLocationStudentDom(examLocation, students, warriors) {
    /*
        <table>
            <tr>
                <td class = 'prayer-warriors'>
                    <div class = 'prayer-warrior'>Kah Hoe</div>
                    <div class = 'prayer-warrior'>Hillary</div>
                </td>
                <td class = 'location'>MPSH</td>
                <td class = 'students'>
                    <div class = 'student'>
                        <div class = 'student-detail name'>Jeremiah Ang Yong En</div>
                        <div class = 'student-detail lifegroup'>A2</div>
                    </div>
                </td>
            </tr>
        </table>
    */
    tableDom = document.createElement("table");
    tableRowDom = tableDom.insertRow(0);
    prayerWarriorDom = tableRowDom.insertCell(-1);
    prayerWarriorDom.classList.add("prayer-warriors");
    locationDom = tableRowDom.insertCell(-1);
    locationDom.classList.add("location");
    studentsDom = tableRowDom.insertCell(-1);
    studentsDom.classList.add("students");

    populateWarriorDom(prayerWarriorDom, warriors);
    populateLocationDom(locationDom, examLocation);
    populateStudentsDom(studentsDom, students);

    return tableDom;
}

function makeTimeLocationDom(time, locations, psLocations) {
    let timeLocDom = document.createElement("div");
    timeLocDom.classList.add("time-location");
    let timeDom = document.createElement("div");
    timeDom.classList.add("time");
    timeDom.innerHTML = `<h3>Time: </h3>${time}`
    timeLocDom.appendChild(timeDom);

    let rowDom = document.createElement("div");
    rowDom.classList.add("row");
    rowDom.innerHTML = DOM_TABLE_HEADER;
    for (const examLocation in locations) {
        students = locations[examLocation];
        warriors = psLocations[examLocation];
        tableDom = makeLocationStudentDom(examLocation, students, warriors);
        rowDom.appendChild(tableDom);
    }

    timeLocDom.appendChild(rowDom);
    return timeLocDom;
}

function makeSlotDom(date, times, psTimes) {
    let slotDom = document.createElement("div");
    slotDom.classList.add("slot");
    const dateDom = makeDateDom(date);
    slotDom.appendChild(dateDom);

    for (const time in times) {
        const locations = times[time];
        const psLocations = psTimes[time];
        const timeLocDom = makeTimeLocationDom(time, locations, psLocations);
        slotDom.appendChild(timeLocDom);
    }
    return slotDom;
}

function makeWarriorInfo(prayerSlots, warriors) {
    let times = {};
    let prayerSlotLocation = {};
    let prayerSlotTime = {};

    prayerSlots.forEach(prayerSlot => {
        const id = prayerSlot.id;
        const psLocation = prayerSlot.meetingPoint || prayerSlot.location;
        const psTime = prayerSlot.time;
        prayerSlotLocation[id] = psLocation;
        prayerSlotTime[id] = psTime;

        if (!(psTime in times)) times[psTime] = {};
        if (!(psLocation in times[psTime])) times[psTime][psLocation] = [];
    });

    warriors.forEach(psWarrior => {
        const psId = psWarrior[0];
        const warriorName = psWarrior[1];
        const psTime = prayerSlotTime[psId];
        const psLocation = prayerSlotLocation[psId];
        times[psTime][psLocation].push(warriorName);
    })

    return times;
}

function displayExamTt(date, students, exams, prayerSlots, warriors) {
    const times = makeExamTtInfo(students, exams);
    const psTimes = makeWarriorInfo(prayerSlots, warriors);
    let prayerTableDom = document.getElementById(ID_PRAYER_TABLE);
    const slotDom = makeSlotDom(date, times, psTimes);
    prayerTableDom.appendChild(slotDom);
}