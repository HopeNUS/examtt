const ID_LIFEGROUPS_SELECT = "lifegroups";
const ID_HOMESCREEN = "homeLoading";
const CLASS_HOMESCREEN_HIDDEN = "hidden";

function getLifegroups(callback)
{
    url = getLifegroupUrl();
    send_get(url, (response)=> {
        if (response === "") return;
        callback(JSON.parse(response));
    })
}

function populateLifegroupSelect(lifegroups)
{
    lifegroupsSelect = document.getElementById(ID_LIFEGROUPS_SELECT);
    for (const i in lifegroups) {
        lg = lifegroups[i];
        lg_dom = document.createElement("option");
        lg_dom.value = lg;
        lg_dom.innerHTML = lg;
        lifegroupsSelect.appendChild(lg_dom);
    }
}

function loadHomeScreen() {
    getLifegroups((response) => {
        populateLifegroupSelect(response);
        document.getElementById(ID_HOMESCREEN).classList.add(CLASS_HOMESCREEN_HIDDEN);
    });
}