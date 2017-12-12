// export default function getQueryString(name) {
//     var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
//     var r = window.location.search.substr(1).match(reg);
//     var context = "";
//     if (r != null)
//         context = r[2];
//     reg = null;
//     r = null;
//     return context == null || context == "" || context == "undefined" ? "" : context;
// }
export default function getQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r !== null) {
        return decodeURIComponent(r[2]);
    }
    return null;
}

