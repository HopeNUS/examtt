const ID_TEXTAREA = "examtt-textarea"

function onExamTtTextareaChange(e) {
   const modules = extractExamTtModules(e.target.value);
   setModules(modules);
   showPreview(modules);
}

function listenToTextarea() {
    textAreaDom = document.getElementById(ID_TEXTAREA);
    textAreaDom.addEventListener("keyup input", onExamTtTextareaChange)
}