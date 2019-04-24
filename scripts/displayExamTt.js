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
    let examPsIds = {};
    exams.forEach(exam => {
        const examLocation = exam.meetingPoint || exam.location;
        const examTime = exam.time;
        const examId = exam.id;
        const examPsId = exam.prayerSlotId;
        examLocations[examId] = examLocation;
        examTimes[examId] = examTime;
        examPsIds[examId] = examPsId;
    });


    students.forEach(student => {
        const exams = student.exam;
        exams.forEach(examId => {
            const examTime = examTimes[examId];
            const examLocation = examLocations[examId];
            const examPsId = examPsIds[examId];
            if (!(examTime in times)) times[examTime] = {};
            if (!(examLocation in times[examTime])) times[examTime][examLocation] = [];
            times[examTime][examLocation].push({
                name: student.name,
                lifegroup: student.lifegroup,
                prayerSlotId: examPsId
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

function makeWarriorCtrlDomOnClick(warriorDom, psId, warriorName) {
    return (e) => {
        showLoading();
        deletePrayerWarriorSubscription(psId, warriorName, (res) => {
            warriorDom.parentNode.removeChild(warriorDom);
            hideLoading();
        });
    }
}

function makeWarriorCtrlAddOnClick(warriorsDom, psId) {
    return ()=>{
        warriorName = getAddWarriorName().trim();
        if (warriorName == "") {
            alert("Please enter Your Name");
            return;
        }
        showLoading();
        addPrayerWarriorSubscription(psId, warriorName, (res) => {
            console.log(res);
            warriorDom = makeNewWarriorDom({psId, warriorName});
            warriorsDom.insertBefore(warriorDom, warriorsDom.lastChild);
            hideLoading();
        })
    };
}

function populateWarriorDom(warriorsDom, warriors) {
    /*
    <div class = 'prayer-warrior'>Kah Hoe
        <span class = 'warrior-del-ctrl'>x</span></div>
    
    <div class = 'warrior-add-ctrl'>+</div>
    */
    warriors.forEach(warrior => {
        warriorDom = makeNewWarriorDom(warrior);
        warriorsDom.appendChild(warriorDom);
        psId = warrior.psId;
    });
}

function makeNewWarriorDom(warrior) {
    let warriorDom = document.createElement("div");
    warriorDom.classList.add("prayer-warrior");
    let warriorCtrlDom = document.createElement("span");
    warriorCtrlDom.classList.add("warrior-del-ctrl");
    warriorCtrlDom.innerHTML = "x";
    warriorCtrlDom.addEventListener("click", makeWarriorCtrlDomOnClick(warriorDom, warrior.psId, warrior.warriorName));
    warriorDom.innerHTML = `<span>${warrior.warriorName}</span>`;
    warriorDom.appendChild(warriorCtrlDom);
    return warriorDom;
}

function populateWarriorDomAddCtrl(warriorsDom, psId) {
    warriorAddCtrlDom = document.createElement("div");
    warriorAddCtrlDom.classList.add("warrior-add-ctrl");
    warriorAddCtrlDom.innerHTML="<span>+</span>";
    warriorsDom.appendChild(warriorAddCtrlDom);
    warriorAddCtrlDom.addEventListener(
        "click", makeWarriorCtrlAddOnClick(warriorsDom, psId));
}

function populateLocationDom(locationDom, examLocation) {
    locationDom.innerHTML = examLocation;
}

function populateStudentsDom(studentsDom, students) {
    let psId = null;
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
        psId = student.prayerSlotId;
    });
    return psId;
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
    psId = populateStudentsDom(studentsDom, students);
    populateWarriorDomAddCtrl(prayerWarriorDom, psId);
    
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
    locationsKey = Object.keys(locations).sort();
    locationsKey.forEach(examLocation => {
        students = locations[examLocation];
        warriors = psLocations[examLocation];
        tableDom = makeLocationStudentDom(examLocation, students, warriors);
        rowDom.appendChild(tableDom);
    });

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
        times[psTime][psLocation].push({warriorName, psId});
    })

    return times;
}

function displayExamTt(date, students, exams, prayerSlots, warriors) {
    const times = makeExamTtInfo(students, exams);
    const psTimes = makeWarriorInfo(prayerSlots, warriors);
    let prayerTableDom = document.getElementById(ID_PRAYER_TABLE);
    const slotDom = makeSlotDom(date, times, psTimes);
    prayerTableDom.innerHTML = "";
    prayerTableDom.appendChild(slotDom);
}