const ID_LIFEGROUPS_SELECT = "lifegroups";

function getLifegroups(callback)
{
    return callback(LIFEGROUPS);
}

function populateLifegroupSelect(lifegroups)
{
    lifegroupsSelect = document.getElementById(ID_LIFEGROUPS_SELECT);
    for (const i in lifegroups) {
        lg = lifegroups[i];
        lg_dom = document.createElement("option");
        lg_dom.value = i;
        lg_dom.innerHTML = lg;
        lifegroupsSelect.appendChild(lg_dom);
    }
}

function getAndPopulateLifegroup(callback)
{
    getLifegroups((response) => {
        populateLifegroupSelect(response);
        callback();
    });
}
