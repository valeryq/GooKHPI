var config = {
    host: "localhost/GooKHPIServer/public/index.php"
}
var isAuth = false;
var user = {};

$(document).ready(function() {
    setInterval(checkIsAuth, 30000);
});


function checkIsAuth() {
    if (!isAuth) {
        window.location.href = "#login_page";
    }
}


function btnLogin() {
    sendRequest("user/signin", JSON.stringify({
        email: $('#email').val(),
        password: $('#password').val()
    }), processLogin);
}

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




/***************************************
 *                                     *
 *    * * * HELPER FUNCTIONS * * *     *
 *                                     *
 * *************************************
 */
function sendRequest(method, data, callback) {
    loaderShow();
    $.ajax({
        url: "http://"+config.host+"/api/" + method,
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