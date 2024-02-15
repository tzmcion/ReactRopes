var to_blob = function (src) {
    return new Promise(function (resolve) {
        fetch(src).then(function (r) { return r.blob().then(function (blob) {
            var fs = new FileReader();
            fs.onload = function () { resolve(fs.result); };
            fs.readAsDataURL(blob);
        }); });
    });
};
export { to_blob };
