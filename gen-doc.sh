rm -rf doc;
./node_modules/.bin/typedoc --excludeExternals --externalPattern "**/node_modules/**" --ignoreCompilerErrors --mode "file" --out "./doc" "./src";
rm doc/README.md;
