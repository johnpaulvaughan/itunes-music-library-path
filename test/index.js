var chai = require('chai');
chai.use(require('chai-as-promised'));
chai.use(require('chai-files'));
var file = require('chai-files').file;
var expect = require('chai').expect;
var should = require('chai').should;

var itunesMusic = require('../index');
var getItunesPath = itunesMusic.getItunesPath;
var _getUserHome = itunesMusic._getUserHome;
var _buildPaths = itunesMusic._buildPaths;
var _validatePath = itunesMusic._validatePath;




describe('#getItunesPath', () => {
    it('should point to an XML file that exists', () => {
        return getItunesPath().then((result) => expect(file(result)).to.exist, (err) => {})
    })
    it('or return "unable to locate" error if file doesn\'t exist', () => {
        return getItunesPath().then((result) => {}, (err) => {
            return expect(getItunesPath()).to.be.rejectedWith('Unable to locate iTunes XML file')
        })
    })
})

describe('#_buildPaths', () => {
    it('should return an Array of two strings', () => expect(_buildPaths()).to.be.a('array').and.have.lengthOf(2));
})

describe('#_validatePath', () => {
    it('should return a string if exists', () => {
        let validpath = require('path').basename(__dirname) + "/iTunes Library.xml";
        return _validatePath(validpath).then((result) => expect(result).to.be.a('string'))
    })
    it('should throw "unable to locate" error if path does not exist', () => {
        let fakepath = require('path').basename(__dirname) + "/fake-file-name.xml";
        return expect(_validatePath(fakepath)).to.be.rejectedWith('Unable to locate iTunes XML file')
    })
})
