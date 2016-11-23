"use strict";
var path = require('path');
var fs = require('fs');
var os = require('os');
/**
 * return a path to the local 'iTunes Music Library.xml'. Sometimes named 'iTunes Library.xml' depending on the iTunes version
 *
 * @param  null
 * @return Promise (of a String)
 */
function getItunesPath() {
    var xmlArray = _buildPaths();
    return _validatePath(xmlArray[1]);
}
exports.getItunesPath = getItunesPath;
/**
 * return an array containing the two likely iTunes XML filepaths.
 *
 * @param  null
 * @return Array<string>
 */
function _buildPaths() {
    var home = os.homedir();
    var path1 = path.resolve(home + '/Music/iTunes/iTunes Library.xml');
    var path2 = path.resolve(home + '/Music/iTunes/iTunes Music Library.xml');
    return [path1, path2];
}
exports._buildPaths = _buildPaths;
/**
 * Checks to ensure that the filepath actually exists
 *
 * @param  String
 * @return Promise<string>
 */
function _validatePath(iXmlPath) {
    return new Promise(function (resolve, reject) {
        fs.access(iXmlPath, function (err) {
            if (!err)
                resolve(iXmlPath);
            else
                reject(new Error('Unable to locate iTunes XML file'));
        });
    });
}
exports._validatePath = _validatePath;
//# sourceMappingURL=index.js.map