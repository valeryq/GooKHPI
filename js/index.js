var isAuth = false;
var user = {};

$(document).ready(function() {
    window.location.href = "#login_page";
});


function btnLogin() {
    sendRequest("user/signin", JSON.stringify({
        email: $('#email').val(),
        password: $('#password').val()
    }), processLogin);
}

function processLogin(response) {
    alert(JSON.stringify(response));
    if (response) {
        if (!response.result) {
            alert("Ошибка авторизации");
            return;
        }
        
        isAuth = true;
        user = response;
        alert("Your email: " + user.email);
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
        url: "http://192.168.0.73/GooKHPIServer/public/index.php/api/" + method,
        crossDomain: true,
        type: "POST",
        dataType: "json",
        data: data,
        contentType: "application/json",
        success: (function(response) {
            loaderClose();
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