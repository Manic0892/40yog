./build_simple.sh
cd ./built/lib
mv game.min.js game.min.js.old
echo 'Minifying further... Rquires that http://javascript-minifier.com is up.'
curl -X POST -s --data-urlencode 'input@game.min.js.old' http://javascript-minifier.com/raw > game.min.js
rm game.min.js.old