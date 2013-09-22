40yog
=====

####[Latest Build](http://40yog.manic0892.com)

This is a simple game made to both test the ImpactJS engine and to provide a launch point for a larger project.

###Build Instructions
Since this is built on ImpactJS, you need to own an ImpactJS license (http://impactjs.com) and download the core libraries to be able to build the game yourself.

After you've done so, run build.sh from the top level of the directory tree.  It will place a built version of the game's javascript in the "built" folder, along with the current media files.  Unfortunately, the index.html needs to be edited to be changed from loading the main game file and the core impact libraries to simply loading game.min.js, so you'll need to edit and copy it over by hand (or use the index.html already in the "built" directory).
