./build_simple.sh
cd ./built/lib
mv game.min.js game.min.js.old
echo 'Further minifying...  Requires UglifyJS2 (https://github.com/mishoo/UglifyJS2)'
uglifyjs game.min.js.old --screw-ie8 --stats -o game.min.js
rm game.min.js.old