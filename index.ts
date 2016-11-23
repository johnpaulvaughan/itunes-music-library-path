import * as path from 'path'
import * as fs from 'fs'
import * as os from 'os'

/**
 * return a path to the local 'iTunes Music Library.xml'. Sometimes named 'iTunes Library.xml' depending on the iTunes version
 *
 * @param  null
 * @return Promise (of a String)
 */

export function getItunesPath():Promise<string> {
	let xmlArray: Array<string> = _buildPaths();
	return _validatePath(xmlArray[1])
		//.catch((e) => _validatePath(xmlArray[2])
		)
}


/**
 * return an array containing the two likely iTunes XML filepaths.
 *
 * @param  null
 * @return Array<string>
 */
export function _buildPaths(): Array<string> {
	let home: string = os.homedir()
	let path1: string = path.resolve(home + '/Music/iTunes/iTunes Library.xml');
	let path2: string = path.resolve(home + '/Music/iTunes/iTunes Music Library.xml');
	return [path1, path2]
}


/**
 * Checks to ensure that the filepath actually exists
 *
 * @param  String
 * @return Promise<string>
 */
export function _validatePath(iXmlPath: string):Promise<string> {
	return new Promise((resolve, reject) => {
		fs.access(iXmlPath, (err) => {
			if (!err) resolve(iXmlPath)
			else reject(new Error('Unable to locate iTunes XML file'))
		})
	})
}