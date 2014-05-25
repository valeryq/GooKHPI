function ajax2() {
    $.ajax({
        url: "http://192.168.0.73/GooKHPIServer/public/index.php/api/datarequest/list",
        crossDomain: true,
        type: "POST",
        dataType: "json",
        contentType: "application/json",
        success: (function(data, status) {
            alert(JSON.stringify(data));
        }),
        error: (function(xhr, status, err) {
            alert(status);
            alert(err);
            alert(JSON.stringify(xhr));
        })
    });
}