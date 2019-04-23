const ID_DATE_PICKER = "date-picker";

function setupDatePicker(callback) {
    document.getElementById(ID_DATE_PICKER).addEventListener("change", e => {
        showLoading();
        const date = e.target.value.substr(0, 2);
        const month = e.target.value.substr(2, 3);
        getAndDisplayExamTt(date, month, hideLoading);
    });
}