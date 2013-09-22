cd ./game/tools
./bake.sh
cd ../..
mv ./game/game.min.js ./built
cp -r ./game/media ./built/
cd ./built
mv game.min.js game.min.js.old
echo 'Further minifying...'
curl -X POST -s --data-urlencode 'input@game.min.js.old' http://javascript-minifier.com/raw > game.min.js
rm game.min.js.old