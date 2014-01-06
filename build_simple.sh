cd ./dev/tools
./bake.sh
cd ../..
mv ./dev/game.min.js ./built/lib
cp -r ./dev/media ./built/
cp -r ./dev/lib/utilities ./built/lib/utilities