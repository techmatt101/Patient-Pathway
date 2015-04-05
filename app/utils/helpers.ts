export function tableToArray (object) {
    var array = [];
    for (var key in object) {
        array.push(object[key]);
    }
    return array;
}