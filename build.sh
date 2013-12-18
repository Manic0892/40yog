cd ./dev/tools
./bake.sh
cd ../..
mv ./dev/game.min.js ./built
cp -r ./dev/media ./built/
cd ./built
mv game.min.js game.min.js.old
echo 'Further minifying...'
curl -X POST -s --data-urlencode 'input@game.min.js.old' http://javascript-minifier.com/raw > game.min.js
INSIZE=$(du -b -h game.min.js.old)
OUTSIZE=$(du -b -h game.min.js)
INSIZE=${INSIZE%K*}"kb"
OUTSIZE=${OUTSIZE%K*}"kb"
echo "Minified: "$INSIZE" -> "$OUTSIZE
rm game.min.js.old