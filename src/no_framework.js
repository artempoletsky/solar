$ = function (selector) {
    if(typeof selector == 'function')
    {
        $.ready(selector)
    }else
    {
        return new $__(selector);
    }
}

$__ = function (selector) {
    this.el = document.querySelectorAll(selector);
}

$.fn = $__.prototype;

$.fn.on = function (event_name, callback) {
    this.el[0].addEventListener(event_name, callback);
    return this;
}

$.fn.val = function () {
    if(arguments.length){
        this.el[0].value = arguments[0];
        return this;
    }else{
        return this.el[0].value;
    }
}

$.get = function (url, callback) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            callback(JSON.parse(this.responseText));
        }
    };
    xhttp.open("GET", url, true);
    xhttp.send();
}

$.ready = function (callback) {
    document.addEventListener("DOMContentLoaded", callback);
}