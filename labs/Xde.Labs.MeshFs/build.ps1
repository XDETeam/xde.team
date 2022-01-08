docker run -v ${PSScriptRoot}:/mnt -v ${PSScriptRoot}/.build:/tmp --rm -it node:16 bash -c @"
cd /tmp;

[ -d "codemirror" ] || {
	git clone https://github.com/codemirror/codemirror.next.git codemirror;
	
	cd codemirror;
	
	git pull;

	npm install --force;

	node bin/cm.js install;
	node bin/cm.js build;

	npm i @codemirror/basic-setup @codemirror/lang-javascript
	npm i rollup @rollup/plugin-node-resolve uglify-js
};

cd codemirror;

cp /mnt/wwwroot/js/codemirror.config.js editor.js
node_modules/.bin/rollup editor.js -f iife -o editor.bundle.js -p @rollup/plugin-node-resolve
node_modules/.bin/uglifyjs editor.bundle.js -o editor.min.js --compress --mangle
cp editor.bundle.js /mnt/wwwroot/js/codemirror.js
cp editor.min.js /mnt/wwwroot/js/codemirror.min.js
"@
