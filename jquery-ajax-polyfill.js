/**
 * Helper class to be used like jQuery ajax method on old devices.
 * https://github.com/NorthStarCodeRepo/JQueryAjaxPolyfill
 * */
 var AJAXHelper = function () { };

 /**
  * A jQuery ajax style method for async requests.
  * https://api.jquery.com/jquery.ajax/#jQuery-ajax-settings
  * @param {contentType, method, data, URL} requestObject - jQuery-like ajax [settings] object.
  * {data} must be of type: string, please serialize prior to passing to this method.
  * @param {successCallback} successCallback - Handles a successful request.
  * @param {failureCallback} failureCallback - Handles a failed request.
  * @returns {void}
  */
  AJAXHelper.prototype.ajax = function (requestObject, successCallback, failureCallback)
 {
     var httpRequest;
 
     if (window.XMLHttpRequest)
     {
         // Mozilla, Safari, IE7+ ...
         httpRequest = new XMLHttpRequest();
     }
     else if (window.ActiveXObject)
     {
         // IE 6 and older
         httpRequest = new ActiveXObject("Microsoft.XMLHTTP");
     }
 
     if (!httpRequest)
     {
         failureCallback('Oops, please try again.');
         return false;
     }
 
     httpRequest.onreadystatechange = function ()
     {
         //Ready States => UNSENT: 0, OPENED: 1, HEADERS_RECEIVED: 2, LOADING: 3, DONE: 4
         if (httpRequest.readyState == 4)
         {
             // Our response from the server. String data, typically.
             var response = httpRequest.responseText;
 
             if (httpRequest.status === 200)
             {
                 successCallback(response);
             }
             else if (httpRequest.status === 204) // No data returned, but successful.
             {
                 successCallback(true);
             }
             else if (httpRequest.status != 500 || httpRequest.status != 404)
             {
                 successCallback(true);
             }
             else
             {
                 failureCallback(httpRequest.status);
             }
         }
     };
 
     httpRequest.open(requestObject.method, requestObject.URL, true);
     httpRequest.setRequestHeader('Content-Type', requestObject.contentType);
 
     if (requestObject.method == 'POST')
     {
         // If it's a POST method send STRINGIFIED JSON body data.
         httpRequest.send(requestObject.data);
     }
     else
     {
         // If it's a GET method then any data should be a query string parameter.
         httpRequest.send();
     }
 }