/* Minify scripts */

'use strict';

const Path = require('path');
const FileSystem = require('fs');
const minify = require('@node-minify/core');

const uglifyJS = require('@node-minify/uglify-js');
const cleanCSS = require('@node-minify/clean-css');

console.log("Minifying Bundle...");

minify({
	compressor: uglifyJS,
	input: Path.resolve(__dirname, "js", "bundle.js"),
	output: Path.resolve(__dirname, "js", "bundle.min.js"),
	callback: function (err, min) {
		if (err) {
			console.error(err);
			console.log("ERROR: Could not parse javascript file bundle.js | See above for details.");
			process.exit(1);
		}
	}
});

console.log("Minifying stylesheet files...");

const files = FileSystem.readdirSync(Path.resolve(__dirname, "style"));

for (let file of files) {
	if ((/\.css$/).test(file) && !((/\.min\.css$/).test(file))) {
		let newfile = file.substr(0, file.length - 4) + ".min.css";
		minify({
			compressor: cleanCSS,
			input: Path.resolve(__dirname, "style", file),
			output: Path.resolve(__dirname, "style", newfile),
			callback: function (err, min) {
				if (err) {
                    console.error(err);
					console.log("ERROR: Could not parse stylesheet file: " + file + " | See above for details.");
					process.exit(1);
				}
			}
        });
	}
}
