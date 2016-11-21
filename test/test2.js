var itunesMusic = require('../index');
var getItunesPath = itunesMusic.getItunesPath;
var _getUserHome = itunesMusic._getUserHome;



  return getItunesPath().then(function(result) {
  console.log(result)
}).catch( function(error) {
    console.log(error);
});
