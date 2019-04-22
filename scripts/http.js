function send_get(url, callback) {
    const Http = new XMLHttpRequest();
    Http.open("GET", url);
    Http.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    Http.send();
    Http.onreadystatechange = (e) => {
        if (Http.readyState === 4)
            callback(Http.responseText)
    }
}

function send_json(url, json, callback) {
    const Http = new XMLHttpRequest();
    Http.open("POST", url);
    Http.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    Http.send(json);
    Http.onreadystatechange = (e) => {
        if (Http.readyState === 4)
            callback(Http.responseText)
    }
}