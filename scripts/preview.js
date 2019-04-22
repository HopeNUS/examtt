const ID_PREVIEW = "verification";
const CLASS_MODULE = "module", 
CLASS_CODE = "code", CLASS_TIME = "time",
CLASS_DATE = "date", CLASS_LOCATION = "venue",
CLASS_MODULE_SUCCESS = "success",
CLASS_MODULE_FAILURE = "failure",
CLASS_CELL = "cell";
let previewDom, codeToModuleDomMap = {};

function updatePreview(successes, failures) {
    console.log(successes, failures);
    successes.forEach(code => {
        moduleDom = codeToModuleDomMap[code];
        moduleDom.classList.add(CLASS_MODULE_SUCCESS);
    });
    failures.forEach(code => {
        moduleDom = codeToModuleDomMap[code];
        moduleDom.classList.add(CLASS_MODULE_FAILURE);
    });
}

function makeCellDom(content, className) {
    let dom = document.createElement("div");
    dom.classList.add(CLASS_CELL);
    dom.classList.add(className);
    dom.innerHTML = content;
    return dom;
}

function makeModuleDom(module) {
    /*
        <div class="module">
            <div class="cell code">CS4231</div>
            <div class="cell time">1300Hrs</div>
            <div class="cell date">01MAY</div>
            <div class="cell venue">COM1-0206</div>
        </div>
    */
    let dom = document.createElement("div");
    dom.classList.add(CLASS_MODULE);

    const codeDom = makeCellDom(module.code, CLASS_CODE);
    const timeDom = makeCellDom(`${module.hour}${module.minute}`, CLASS_TIME);
    const dateDom = makeCellDom(`${module.date}${module.month}`, CLASS_DATE);
    const venueDom = makeCellDom(module.location, CLASS_LOCATION);

    dom.appendChild(codeDom);
    dom.appendChild(timeDom);
    dom.appendChild(dateDom);
    dom.appendChild(venueDom);

    codeToModuleDomMap[module.code] = dom;

    return dom;
}

function showPreview(modules) {
    previewDom = document.getElementById(ID_PREVIEW);
    previewDom.innerHTML = "";
    modules.forEach(module => {
        moduleDom = makeModuleDom(module);
        previewDom.appendChild(moduleDom);
    });
    return true;
}