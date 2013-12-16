40yog
=====

####[Latest Build](http://40yog.manic-studios.com)

This is a simple game made to both test the ImpactJS engine and to provide a launch point for a larger project.

###Build Instructions
Since this is built on ImpactJS, you need to own an ImpactJS license (http://impactjs.com) and download the core libraries and tools to be able to build the game yourself.

After you've done so, run one of the build scripts from the top level of the directory tree.  It will place a built version of the game's javascript in the "built" folder, along with the current media files.  Unfortunately, the index.html needs to be edited to be changed from loading the main game file and the core impact libraries to simply loading game.min.js, so you'll need to edit and copy it over by hand (or use the index.html already in the "built" directory).

####Build Scripts
The build scripts are [build.sh](build.sh), [build_node.sh](build_node.sh), and [build_simple.sh](build_simple.sh).  All three require the ImpactJS build tools, available after purchasing a license.  build.sh requires http://javascript-minifier.com/ and its API to be online, but gives the smallest output file.  build_node.sh requires Node.JS and [UglifyJS2](https://github.com/mishoo/UglifyJS2) to be installed, and gives a decently small output file.  build_simple.sh doesn't require anything except the aforementioned ImpactJS build tools, and gives the largest output file.

###Assets
All assets that are used by the game are included in dev/media, but the project files for these assets, as well as unused assets, can be found in [40yog_wkshp](https://github.com/Manic0892/40yog_wkshp).
