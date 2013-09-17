#! /bin/sh

bundle exec sass style.sass > style.css
bundle exec sass style.sass -t compressed > style.min.css
./node_modules/coffee-script/bin/coffee -c script.coffee
./node_modules/uglify-js/bin/uglifyjs script.js > script.min.js
