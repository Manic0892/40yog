cd ./dev/tools
./bake.sh
cd ../..
mv ./dev/game.min.js ./built/lib/game.min.js
cp -r ./dev/media ./built/
#cp -r ./dev/lib/utils ./built/lib
cd ./built
rm media/.gitignore
rm -r media/.git
cd ..