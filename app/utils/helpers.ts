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

export function pathJoin(...paths/* path segments */) {
    // Split the inputs into a list of path commands.
    var parts = [];
    for (var i = 0, l = arguments.length; i < l; i++) {
        parts = parts.concat(arguments[i].split("/"));
    }
    // Interpret the path commands to get the new resolved path.
    var newParts = [];
    for (i = 0, l = parts.length; i < l; i++) {
        var part = parts[i];
        // Remove leading and trailing slashes
        // Also remove "." segments
        if (!part || part === ".") continue;
        // Interpret ".." to pop the last segment
        if (part === "..") newParts.pop();
        // Push new path segments.
        else newParts.push(part);
    }
    // Preserve the initial slash if there was one.
    if (parts[0] === "") newParts.unshift("");
    // Turn back into a single string path.
    return newParts.join("/") || (newParts.length ? "/" : ".");
}