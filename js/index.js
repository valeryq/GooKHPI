var config = {
    host: "http://192.168.0.73/GooKHPIServer/public/index.php"
};

var isAuth = false;
var user = {};

$(document).ready(function() {
    $(document).on('pageinit', '#requests_page', getListRequests);
});



/***************************************
 *                                     *
 *    * * * BUTTON FUNCTIONS * * *     *
 *                                     *
 * *************************************
 */

function btnLogin() {
    sendRequest("user/signin", JSON.stringify({
        email: $('#email').val(),
        password: $('#password').val()
    }), processLogin);
}


/***************************************
 *                                     *
 *    * * * PROCESS FUNCTIONS * * *    *
 *                                     *
 * *************************************
 */

function getListRequests() {
    sendRequest("datarequest/list", null, processGetListRequests);
}


/***************************************
 *                                     *
 *   * * * CALLBACK FUNCTIONS * * *    *
 *                                     *
 * *************************************
 */

function processLogin(response) {
    if (response) {
        if (!response.result) {
            alert("Ошибка авторизации");
            return;
        }

        isAuth = true;
        user = response.user;
        alert("Успешная авторизация! \nВаш email: " + user.email);
        window.location.href = "#main_page";
    }
}


function processGetListRequests(response) {
    for (var key in response) {
        var isFinished = response[key].is_finished ? "Да" : "Нет";
        var html = "<li>\n\
                    <a href=\"\">\n\
                    <h3 id=\"title\">"+response[key].request+"</h3>\n\
                    <p><b>Завершен:</b> <span id=\"isFinished\">"+isFinished+".</span></p>\n\
                    <p id=\"dateCreate\">"+response[key].created_at+"</p>\n\
                    </a></li>";
        $("#requestList").append(html);
    }
    $("#requestList").listview("refresh");
}




/***************************************
 *                                     *
 *    * * * HELPER FUNCTIONS * * *     *
 *                                     *
 * *************************************
 */
function sendRequest(method, data, callback) {
    loaderShow();
    $.ajax({
        url: config.host + "/api/" + method,
        crossDomain: true,
        type: "POST",
        dataType: "json",
        data: data,
        contentType: "application/json",
        success: (function(response) {
            loaderClose();

            if (!response.result && response.message == "Auth error") {
                isAuth = false;
                user = {};
                checkIsAuth();
            }

            callback(response);
        }),
        error: (function(xhr, status, err) {
            loaderClose();
            alert(status);
            alert(err);
            alert(JSON.stringify(xhr));
        })
    });
}


function loaderShow() {
    $.mobile.loading('show', {
        text: 'Подождите...',
        textVisible: true,
        theme: 'b'
    });
}

function loaderClose() {
    $.mobile.loading('hide');
}

function checkIsAuth() {
    if (!isAuth) {
        window.location.href = "#login_page";
    }
}