function getExamTt(date, month, callback) {
    const data = {
        'from_datetime': `${date}/${month}/${YEAR} 00:00`,
        'duration_days': 1,
    }
    $.ajax({
        url: getExamTtUrl(), 
        type: 'GET', 
        contentType: 'application/json', 
        data: data
    }).done(res => {
        if (res['error']) {
            hideLoading();
            alert(res['error']);
            return;
        }
        callback(res);
    }).fail((jqXHR, textStatus, errorThrown) => {
        hideLoading();
        alert(errorThrown);
    })
}