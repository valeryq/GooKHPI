$(document).ready(function() {

    loadTweets();

//    $.ajax({
//        url: "http://localhost/GooKHPIServer/public/index.php/api/datarequest/list",
//        crossDomain: true,
//        type: "POST",
//        dataType: "json",
//        contentType: "application/json",
//        success: (function(data, status) {
//            alert(data);
//        }),
//        error: (function(xhr, status, err) {
//            alert(status);
//            alert(err);
//            alert(JSON.stringify(xhr));
//        })
//    });


});

function loadTweets() {
    var request = new XMLHttpRequest();
    request.open("GET", "http://search.twitter.com/search.json?q=phonegap", true);
    request.onreadystatechange = function() {//Call a function when the state changes.
        if (request.readyState == 4) {
            if (request.status == 200 || request.status == 0) {
                var tweets = JSON.parse(request.responseText);
                alert(request.responseText);
            }
        }
    }
    console.log("asking for tweets");
    request.send();
}