export function tableToArray (object) {
    var array = [];
    for (var key in object) {
        array.push(object[key]);
    }
    return array;
}

export function supportsHistoryApi () {
    return !!(window.history && history.pushState);
}

export function getDiff (a, b) {
    var added = [];
    var removed = [];
    for (var i = 0; i < a.length; i++) {
        if (b.indexOf(a[i]) === -1) added.push(a[i]);
    }
    for (var i = 0; i < b.length; i++) {
        if (a.indexOf(b[i]) === -1) removed.push(b[i]);
    }
    return { added: added, removed: removed };
}