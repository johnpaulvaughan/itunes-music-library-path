# iTunes Music Library Path
## Synopsis
This module retrieves the filepath to the user's local iTunes Music Library XML file. 


## Motivation
The purpose of this XML file is to make the local iTunes music library information available to external programs. In node, we can use the filepath to parse the XML and retrieve song data. This module simply returns the path, not the parsed data.<br>


##Installation
```bash
$ npm install @johnpaulvaughan/itunes-music-library-path --save
```

##Code Example
**To return a Promise:**
```javascript
let getItunesPath = require('itunes-music-library-path');

return getItunesPath().then((result) => console.log(result))
// -> C:\Users\JohnPaulVaughan\Music\iTunes\iTunes Music Library.xml
```

##How it works
Node gets the user's home directory, and then searches the usual iTunes path for both "iTunes Music Library.xml" and "iTunes Library.xml".<br>
If it finds that one of the files' exists, it returns a filepath to that file. If both files don't exist, it Promise.rejects() with an error instead.
A limitation of this module is if iTunes doesn't generate it's XML, or the XML is saved in a custom location, then it rejects with an Error. 
note: iTunes no longer creates the XML file automatically by default. The user has to turn on this feature from iTunes -> Preferences.