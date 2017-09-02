const fs = require("fs-extra");
const path = require("path");
const browserify = require('browserify');
const liveServer = require("live-server");
const watch = require("watch");

const liveServerParams = {
    port: 8080,
    host: "0.0.0.0",
    root: "./",
    open: false,
    wait: 1000,
    logLevel: 2
};

const browserifyParams = {
    entries: './src/Monogatari.js', // entry point
    paths: './src',
    standalone: 'Monogatari' // wrap with UMD
};

const compile = () => {
    console.log("Running compile...".bgWhite.black);
    browserify(browserifyParams).bundle(function (err, buf) {
        if (err) {
            console.log(err);
        } else {
            fs.emptyDirSync('./dist');
            fs.writeFileSync('./dist/monogatari.js', buf);
            fs.copySync('./dist', './dist/latest');
            console.log("Done creating ./dist/monogatari.js file.".bgWhite.black);
        }
    });
};

const args = process.argv.slice(2);

if (args[0] === "watch") {
    liveServer.start(liveServerParams);
    watch.watchTree("./src", function (f, curr, prev) {
        if (typeof f == "object" && prev === null && curr === null) {
            compile();
        } else if (curr.nlink === 0) { // f was deleted
            compile();
        } else if (prev === null) { // f was created
            compile();
        } else { // f was changed
            compile();
        }
    });
} else {
    compile();
}