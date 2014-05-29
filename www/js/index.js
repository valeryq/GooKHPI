var config = {
//    host: "http://localhost/GooKHPIServer/public/index.php"
    host: "http://192.168.0.73/GooKHPIServer/public/index.php"
};

var isAuth = false;
var user = {};

$(document).ready(function() {
    $(document).on('pagebeforeshow', '#requests_page', getListRequests);
    $(document).on('pagebeforeshow', '#show_request_page', showRequest);
    $(document).on('pagebeforeshow', '#responses_page', getListResponses);
});



/***************************************
 *                                     *
 *    * * * BUTTON FUNCTIONS * * *     *
 *                                     *
 * *************************************
 */

function btnLogin() {
    sendRequest("user/signin", {
        email: $('#email').val(),
        password: $('#password').val()
    }, processLogin);
}

function btnCreateRequest() {
    sendRequest("datarequest/create", {
        request: $("#request").val()
    }, processCreateRequest);
}

function btnDeleteRequest() {
    if (confirm("Вы уверенны что хотите удалить запрос?")) {
        sendRequest("datarequest/delete", {
        id: localStorage.id
        }, processDeleteRequest);
    }
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

function getListResponses() {
    sendRequest("dataresponse/list", null, processGetListResponses);
}

function showRequest() {
    sendRequest("datarequest/show", {id: localStorage.id}, processShowRequest);
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
    var html = "";
    for (var key in response) {
        var isFinished = parseInt(response[key].is_finished) ? "Да" : "Нет";
        html += "<li onclick=\"changePage('show_request_page', this)\" id=\""+response[key].id+"\">\n\
                    <a href=\"\">\n\
                    <h3 id=\"title\">"+response[key].request+"</h3>\n\
                    <p><b>Завершен:</b> <span id=\"isFinished\">"+isFinished+".</span></p>\n\
                    <p id=\"dateCreate\">"+response[key].created_at+"</p>\n\
                    </a></li>";
    }
    $("#requestList").html(html);
    $("#requestList").listview("refresh");
}

function processShowRequest(response) {
    if (!response.result) {
        alert("Ошибка запроса!");
        return;
    }
    
    var dataRequest = response.datarequest;
    var isFinished = parseFloat(dataRequest.is_finished) ? "Да" : "Нет";
    var requestContent = "<small><div><b>Идентификатор</b>: "+dataRequest.id+"</div>\n\
                          <div><b>Запрос</b>: "+dataRequest.request+"</div>\n\
                          <div><b>Завершен</b>: "+isFinished+"</div><small><br />";
    
    var htmlSet = "";
    
    for (var key in response.dataresponses) {
        var dataResponse = response.dataresponses[key];
        
        var image = "";
        if (dataResponse.image) {
            image = "<img style='width:100%;' src='"+dataResponse.image+"' />";
        }
        var publishedDate = new Date(dataResponse.published_date);
        var createdAt = new Date(dataResponse.created_at);
        htmlSet += "\
            <div id='coll_"+key+"' data-role='collapsible' data-theme='a'>\n\
                <h1>"+dataResponse.title+"</h1>\n\
                <p><h2>"+dataResponse.title+"</h2></p>\n\
                "+image+"\n\
                <p>"+dataResponse.content_news+"...</p>\n\
                <p><div><b>Опубликовано:</b> " + dataResponse.publisher + "</div>\n\
                <div><b>Дата публикации:</b> " + publishedDate.toLocaleString() + "</div>\n\
                <div><b>Ссылка</b> : <a href='#' onclick=\"window.open('"+ dataResponse.url +"', '_blank', 'location=yes');\">Перейти</a></div>\n\
                </p>\n\
                <p><b>Результат получен</b>: " + createdAt.toLocaleString() + "</p>\n\
            </div>";
    }
    
    if (htmlSet) {
        htmlSet = "<div data-role=\"collapsible-set\" data-inset=\"false\" data-content-theme=\"b\" id=\"responses_set\">" + htmlSet + "</div>";
    }
    
    $("#request_content").html(requestContent + htmlSet).trigger( "create" );
    $("#responses_set").collapsibleset('refresh');
}


function processCreateRequest(response) {
    if (response.result) {
        alert("Запрос успешно создан");
        history.back();
    } else {
        alert("Ошибка! \nСообщение: "+response.message);
    }
}

function processDeleteRequest(response) {
    if (response.result) {
        alert("Запрос успешно удалён");
        history.back();
    } else {
        alert("Ошибка! \nСообщение: "+response.message);
    }
}

function processGetListResponses(response) {
    console.log(response);
    var htmlSet = "<div>Всего <b>" + response.length + "</b> результатов!</div><br />";
    
    for (var key in response) {
        var dataResponse = response[key];
        
        var image = "";
        if (dataResponse.image) {
            image = "<img style='width:100%;' src='"+dataResponse.image+"' />";
        }
        var publishedDate = new Date(dataResponse.published_date);
        var createdAt = new Date(dataResponse.created_at);
        htmlSet += "\
            <div id='coll_"+key+"' data-role='collapsible' data-theme='a'>\n\
                <h1>"+dataResponse.title+"</h1>\n\
                <p><h2>"+dataResponse.title+"</h2></p>\n\
                "+image+"\n\
                <p>"+dataResponse.content_news+"...</p>\n\
                <p><div><b>Опубликовано:</b> " + dataResponse.publisher + "</div>\n\
                <div><b>Дата публикации:</b> " + publishedDate.toLocaleString() + "</div>\n\
                <div><b>Ссылка</b> : <a href='#' onclick=\"window.open('"+ dataResponse.url +"', '_blank', 'location=yes');\">Перейти</a></div>\n\
                </p>\n\
                <p><b>Результат получен</b>: " + createdAt.toLocaleString() + "</p>\n\
            </div>";
    }
    
    $("#responsesList").html(htmlSet).trigger( "create" );
    $("#responsesList").collapsibleset('refresh');
    
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
        data: JSON.stringify(data),
        contentType: "application/json",
        success: (function(response) {
            loaderClose();

            if (!response.result && response.message == "Execute auth please") {
                isAuth = false;
                user = {};
                checkIsAuth();
                return;
            } else {
                callback(response);
            }
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


function changePage(page, elem) {
    localStorage.id= $(elem).attr('id');
    $.mobile.changePage("#"+page);
}