var chai = require('chai');
chai.use(require('chai-string'));
chai.use(require('chai-files'));
var file = require('chai-files').file;
var expect = require('chai').expect;
var should = require('chai').should;

var itunesMusic = require('../index');
var getItunesPath = itunesMusic.getItunesPath;
var _getUserHome = itunesMusic._getUserHome;




describe('#getItunesPath - using promises', () => {
    it('should return a string pointing to an .xml file', () => {
        return getItunesPath().then((result) => expect(result).to.have.string('.xml'))
    })
    it('should be a file that exists', () => {
        return getItunesPath().then((result) => expect(file(result)).to.exist)
    })
});

describe('#getItunesPath - using callbacks', () => {
    it('should return a string pointing to an .xml file', (done) => {
        getItunesPath((err, result) => {
            expect(result).to.have.string('.xml')
            done()
        })
    })
    it('should be a file that exists', (done) => {
        getItunesPath((err, result) => {
            expect(file(result)).to.exist
            done()
        })
    })
});


describe('#_getUserHome', () => {
    it('should return a string', () => expect(_getUserHome()).to.be.a('string'));
});
