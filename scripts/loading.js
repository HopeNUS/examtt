const ID_LOADING = "loading";
const CLASS_LOADING_HIDDEN = "hidden";
let loadingDom = null;

function initLoadingDom() {
    if (loadingDom == null)
        loadingDom = document.getElementById(ID_LOADING);
}

function showLoading() {
    initLoadingDom();
    loadingDom.classList.remove(CLASS_LOADING_HIDDEN);
}

function hideLoading() {
    initLoadingDom();
    loadingDom.classList.add(CLASS_LOADING_HIDDEN);
}