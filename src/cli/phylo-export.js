#!/usr/bin/env node

const fs = require("fs"),
  phylotree = require("../../build/phylotree.js"),
  commander = require("commander"),
  _ = require("underscore"),
  moment = require("moment"),
  puppeteer = require("puppeteer"),
  winston = require("winston");

const http = require('http'),
      port = 3000;


const logger = winston.createLogger({
  level: "warn",
  transports: [
    new winston.transports.Console({
      format: winston.format.simple()
    })
  ]
});

/*
 * Exports phylogenetic tree to png or svg
 */

const default_format = 'svg';

commander
  .requiredOption("-n --newick <newick>", "Input newick file")
  .option(
    "-f --format <format>",
    "Specifies output format",
    default_format
  )

commander
  .on("--help", function() {
    console.log("");
    console.log("Examples:");
    console.log(
      'phylo-export -n test/data/MERS.txt'
    );
  })
  .parse(process.argv);


fs.readFile(commander.newick, (err, newick_data) => {

  let width = 800;
  let height = 800;
  let url = 'http://localhost:3000';

  const tree = new phylotree.phylotree(newick_data.toString());

  (async () => {
    const browser = await puppeteer.launch('http://localhost:8080');
    const page = await browser.newPage();
    await page.goto('https://google.com');
    await page.screenshot({path: 'example.png'});
    await browser.close();
  })();

  //const tree_render = tree.render("#tree_container", {
  //                      height:height, 
  //                      width:width,
  //                      'left-right-spacing': 'fit-to-size', 
  //                      'top-bottom-spacing': 'fit-to-size'
  //                    }); 



});
