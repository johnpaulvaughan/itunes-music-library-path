import * as path from 'path'
import * as fs from 'fs'

/**
 * return a path to the local itunes-music-library.xml.
 *
 * @param  null
 * @return {String (if using callbacks) or promise (if using promises)}
 */

export function getItunesPath(cb?) {
	return new Promise((resolve, reject) => {
		let ixmlpath: string = path.resolve(_getUserHome()+'/Music/iTunes/iTunes Music Library.xml');
		fs.access(ixmlpath, (err) => {
			if (!err) {
				if (cb) { cb(null, ixmlpath); } //return success callback
				resolve(ixmlpath); //or return success promise
			} else {
				let error = new Error('Unable to locate iTunes XML file');
				if (cb) { cb(error); } //return failure callback
				reject(error); //or return failure promise
			}
		})
	})
}


export function _getUserHome() {
	return process.env[(process.platform == 'win32') ? 'USERPROFILE' : 'HOME'];
}


