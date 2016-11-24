"use strict";
var path = require('path');
var os = require('os');
var Promise = require('bluebird');
var promiseIt = require('@johnpaulvaughan/promise-it-exists');
/**
 * return a path to the local iTunes XML. Rejects if not found.
 *
 * @param  null
 * @return Promise<string>
 */
function getItunesPath() {
    var xmlArray = _buildPaths();
    return _reduceArray(xmlArray).then(function (result) {
        return result;
    });
}
exports.getItunesPath = getItunesPath;
/**
 * return an array containing the two most likely iTunes XML filepaths.
 *
 * @param  null
 * @return Array<string>
 */
function _buildPaths() {
    var home = os.homedir();
    var path1 = path.resolve(home + '/Music/iTunes/iTunes Music Library.xml');
    var path2 = path.resolve(home + '/Music/iTunes/iTunes Library.xml');
    return [path1, path1];
}
exports._buildPaths = _buildPaths;
/**
 * reduce an array of paths down to one valid path.
 *
 * @param  Array<string>
 * @return Promise<string>
 */
function _reduceArray(xmlArray) {
    return new Promise(function (resolve, reject) {
        var funcArray = [];
        xmlArray.forEach(function (item) { return funcArray.push(promiseIt.exists(item)); });
        return Promise.some(funcArray, 1).spread(function (success) {
            resolve(success);
        }).catch(Promise.AggregateError, function (err) {
            reject(new Error('Unable to locate valid file from Array'));
        });
    });
}
exports._reduceArray = _reduceArray;
//# sourceMappingURL=index.js.map