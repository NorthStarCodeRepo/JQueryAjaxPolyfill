// To use this simply include the js file on your page and call the AJAXHelper the following way
AJAXHelper.ajax({
    contentType: "application/json",
    method: "GET",
    data: yourDataToSend,
    URL: "api/yourendpoint",
    success: successCallback,
    error: errorCallback
});

// You'll notice that it's the exact same as a JQuery ajax request except for the $ dollar sign
$.ajax({
    contentType: "application/json",
    method: "GET",
    data: yourDataToSend,
    URL: "api/yourendpoint",
    success: successCallback,
    error: errorCallback
});

// So if you no longer need backward compatibility you can just swap the AJAXHelper variable for the $ sign