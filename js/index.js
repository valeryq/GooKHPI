$(document).ready(function() {


    $.ajax({
        url: "http://localhost/GooKHPIServer/public/index.php/api/datarequest/list",
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
});