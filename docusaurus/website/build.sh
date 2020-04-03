yarn docusaurus-build

rm -Rf ../../docs

mv ./build/lassie-ui ../../docs

rm -Rf ./build
