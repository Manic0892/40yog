cd ./dev/tools
./bake.sh
cd ../..
mv ./dev/game.min.js ./built
cp -r ./dev/media ./built/
cp -r ./dev/lib_extern ./built