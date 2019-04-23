const ID_HOMESCREEN = "homeLoading";
const CLASS_HOMESCREEN_HIDDEN = "hidden";

function closeHomeScreen() {
    document.getElementById(ID_HOMESCREEN).classList.add(CLASS_HOMESCREEN_HIDDEN);
}