"use strict";
var path = require('path');
var fs = require('fs');
/**
 * return a path to the local itunes-music-library.xml.
 *
 * @param  null
 * @return {String (if using callbacks) or promise (if using promises)}
 */
function getItunesPath(cb) {
    return new Promise(function (resolve, reject) {
        var ixmlpath = path.resolve(_getUserHome() + '/Music/iTunes/iTunes Music Library.xml');
        fs.access(ixmlpath, function (err) {
            if (!err) {
                if (cb) {
                    cb(null, ixmlpath);
                } //return success callback
                resolve(ixmlpath); //or return success promise
            }
            else {
                var error = new Error('Unable to locate iTunes XML file');
                if (cb) {
                    cb(error);
                } //return failure callback
                reject(error); //or return failure promise
            }
        });
    });
}
exports.getItunesPath = getItunesPath;
function _getUserHome() {
    return process.env[(process.platform == 'win32') ? 'USERPROFILE' : 'HOME'];
}
exports._getUserHome = _getUserHome;
//# sourceMappingURL=index.js.map