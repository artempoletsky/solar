$ = function (selector) {
    if (typeof selector == 'function') {
        $.ready(selector)
    } else {
        return new $__(selector);
    }
};

$__ = function (selector) {
    if (!selector) {
        this.el = [];
    } else if (typeof selector == 'string') {
        this.el = $.toArray(document.querySelectorAll(selector))
    } else {
        this.el = $.toArray(selector);
    }
};

$.fn = $__.prototype;

$.fn.on = function (event_name, callback) {
    this.el[0].addEventListener(event_name, callback);
    return this;
};

$.toArray = function (nodeList) {
    return [].slice.call(nodeList);
};

$.fn.val = function () {
    if (arguments.length) {
        this.el[0].value = arguments[0];
        return this;
    } else {
        return this.el[0].value;
    }
};

$.fn.find = function (selector) {
    var result = $();
    this.el.forEach(function (el) {
        result.el=result.el.concat($.toArray(el.querySelectorAll(selector)));
    });
    return result;
};

$.fn.attr = function (key, value) {
    if (value !== undefined) {
        this.el.forEach(function (el) {
            el.setAttribute(key, value);
        })
    } else {
        return el.getAttribute(key);
    }
    return this;
};

$.fn.clone = function () {
    return $([this.el[0].cloneNode(true)]);
};

$.fn.append = function (elem) {
    if (elem.el) {
        elem = elem.el;
    }
    var parent = this.el[0];
    if (!elem.length) {
        elem = [elem];
    }
    for (var i = 0; i < elem.length; i++) {
        parent.appendChild(elem[i]);
    }
    return this;
};

$.fn.remove = function () {
    this.el.forEach(function (el) {
        el.parentNode.removeChild(el);
    });
    return this;
};

$.get = function (url, callback) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            callback(JSON.parse(this.responseText));
        }
    };
    xhttp.open("GET", url, true);
    xhttp.send();
};

$.ready = function (callback) {
    document.addEventListener("DOMContentLoaded", callback);
};