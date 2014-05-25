$(document).ready(function() {
    $.mobile.allowCrossDomainPages = true;
});


function ajax1() {
    $.ajax({
        url: 'http://www.indiageeks.in/tutorials/reply.php',
        type: 'POST',
        dataType: 'json',
        error: function(jqXHR, text_status, strError) {
            alert("no connection");
        },
        timeout: 60000,
        success: function(data) {
            alert(data);
            $("#result").html("");
            for (var i in data) {
                $("#result").append("<li>" + data[i] + "</li>");
            }
        }
    });
}


function ajax2() {
    $.ajax({
        url: "http://192.168.0.73/GooKHPIServer/public/index.php/api/datarequest/list",
        crossDomain: true,
        type: "POST",
        dataType: "json",
        contentType: "application/json",
        success: (function(data, status) {
            alert(data);
        }),
        error: (function(xhr, status, err) {
            alert(status);
            alert(err);
            alert(JSON.stringify(xhr));
        })
    });
}