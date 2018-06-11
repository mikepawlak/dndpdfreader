'use strict';

const prog = require('commander');
const pkg = require('./package.json');
const chldPr = require('child_process');
const path = require('path');

const parsePDF = require("./lib/pdf-parser.js");

prog
  .version(pkg.version)
  .description(pkg.description)
  .usage('[options] <command> [...]');

prog
  .command('view-block [path]')
  .description('create statblock from specified pdf and render to console')
  .action(path => {
    if (!path) {
      console.log('specify what pdf you want me to work with \n \"statblock view-block [path]\"');
      process.exit();
    }
    console.log("\n one moment...");
    parsePDF(path)
      .then((result) => {
        console.log('\n');
        console.log(result);
      })
      .catch(err => {
        console.log(err);
      });
  });

prog
  .command('text-block [pdfpath] [txt file path]')
  .description('create a textfile statblock')
  .action((pdfPath, txtPath) => {
    console.log("text");
  });

prog
  .command('browser-block [pdfpath]')
  .description('render a statblock to the browser')
  .action(path => {
    console.log("browser");
    console.log(__dirname));
    //chldPr.exec('google-chrome ./bin/view-markup.html');
  });

prog.parse(process.argv);
