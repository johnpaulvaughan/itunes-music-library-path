import * as path from 'path'
import * as fs from 'fs'
import * as os from 'os'
let Promise = require('bluebird')
import * as promiseIt from '@johnpaulvaughan/promise-it-exists'

/**
 * return a path to the local iTunes XML. Rejects if not found.
 *
 * @param  null
 * @return Promise<string>
 */

export function getItunesPath(): Promise<string> {
	let xmlArray: Array<string> = _buildPaths()
	return _reduceArray(xmlArray).then((result) => {
		return result
	})
}

/**
 * return an array containing the two most likely iTunes XML filepaths.
 *
 * @param  null
 * @return Array<string>
 */
export function _buildPaths(): Array<string> {
	let home: string = os.homedir()
	let path1: string = path.resolve(home + '/Music/iTunes/iTunes Music Library.xml')
	let path2: string = path.resolve(home + '/Music/iTunes/iTunes Library.xml')
	return [path1, path1]
}


/**
 * reduce an array of paths down to one valid path. 
 *
 * @param  Array<string>
 * @return Promise<string>
 */
export function _reduceArray(xmlArray: Array<string>): Promise<string> {
	return new Promise((resolve, reject) => {

		let funcArray:Array<any> = []
		xmlArray.forEach((item) => funcArray.push(promiseIt.exists(item)))

		return Promise.some(funcArray, 1).spread(function(success) {
			resolve(success)
		}).catch(Promise.AggregateError, (err) => {
			reject(new Error('Unable to locate valid file from Array'))
		})

	})
}

