// To use this simply include the js file on your page and call the AJAXHelper the following way
var ajaxHelper = new AJAXHelper();

ajaxHelper.ajax({
    contentType: "application/json",
    method: "GET",
    data: yourDataToSend,
    url: "api/yourendpoint",
    async: true,
    success: successCallback,
    error: errorCallback
});

// You'll notice that it's the exact same as a JQuery ajax request except for the $ dollar sign
$.ajax({
    contentType: "application/json",
    method: "GET",
    data: yourDataToSend,
    url: "api/yourendpoint",
    async: true,
    success: successCallback,
    error: errorCallback
});

// So if you no longer need backward compatibility you can just swap the AJAXHelper variable for the $ sign