/**
 * Helper class to be used like jQuery ajax method on old devices where JQuery may not be available.
 * https://github.com/NorthStarCodeRepo/JQueryAjaxPolyfill
 * */
 var AJAXHelper = function () { };

 /**
  * A jQuery ajax style method for async requests.
  * https://api.jquery.com/jquery.ajax/#jQuery-ajax-settings
  * @param requestObject - {contentType, method, data, url, async, success, error} requestObject - jQuery-like ajax [settings] object.
  * {data} must be of type: string, please serialize prior to passing to this method.
  * @returns { boolean }
  */
  AJAXHelper.prototype.ajax = function (requestObject)
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
         requestObject.error('Oops, please try again.');
         return false;
     }
 
     httpRequest.onreadystatechange = function ()
     {
         //Ready States => UNSENT: 0, OPENED: 1, HEADERS_RECEIVED: 2, LOADING: 3, DONE: 4
         if (httpRequest.readyState == 4)
         {
             // Our response from the server. String data, typically.
             var response = httpRequest.responseText;
 
             if (httpRequest.status === 200) // Request succeeded.
             {
                requestObject.success(response);
             }
             else if (httpRequest.status === 204) // No data returned, but successful.
             {
                requestObject.success(true);
             }
             else if (httpRequest.status != 500 || httpRequest.status != 404) // Internal server error or page not found.
             {
                // Success == false here because if you're not expecting any data back you can simply check the response object for true or false.
                requestObject.success(false);
             }
             else
             {
                requestObject.error(httpRequest.status);
             }
         }
     };
 
     httpRequest.open(requestObject.method, requestObject.url, requestObject.async);
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