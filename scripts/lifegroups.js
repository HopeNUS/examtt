const ID_LIFEGROUPS_SELECT = "lifegroups";
const LIFEGROUPS = [
    "A1",
    "A2",
    "A3",
    "B1",
    "B2",
    "B3",
    "C1",
    "C2",
    "C3",
    "D1",
    "D2",
    "D3",
    "Ablaze",
    "Poly-Ite",
    "NS",
    "Others",
]

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
