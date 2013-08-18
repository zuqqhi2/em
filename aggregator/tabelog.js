#!/usr/bin/env node

/**
 * @description
 *      Get restaurant data from tabelog api and insert data to event.
 * @author hyde <zuqqhi2 at gmail.com>
 */
 
//===============================================
// Load Libraries

var cheerio = require("cheerio");
var request = require("request");
var yaml = require("yaml");
var fs = require("fs");
var command = require('commander');

/* Load config file */
var configData = fs.readFileSync("./config/config.yml","utf8");
var config = yaml.eval(configData); 

//===============================================
// Make request URL

var requestBaseUrl = config.tabelog_api.base_url;
var apiKey = config.tabelog_api.api_key;

// paramter
// parse command options and create help command automatically
command
    .version('1.0.0')
    .usage('[option]')
    .option('-p, --prefecture <String>', 'prefecture name (default japan)')
    .option('-n, --pagenum <n>', 'page number (max 60)', parseInt)
    .parse(process.argv);

var pageNumber = 1;
var prefecture = "japan";
if (command.prefecture) prefecture = command.prefecture;
if (command.pagenum)		pageNumber = command.pagenum;

var queryParams = new Array();
queryParams.push("Prefecture=" + prefecture);
queryParams.push("PageNum=" + pageNumber);
queryParams.push("Key=" + apiKey);

// join
var requestUrl = requestBaseUrl + "?" + queryParams.join("&");

//===============================================
// Analyze response

request({url: requestUrl}, function(error, response, body)
{
	if (!error && response.statusCode == 200) {
		$ = cheerio.load(body, {ignoreWhitespace: true, xmlMode: true});

		var url = response.request.href;
		$("RestaurantName").each(function(i, xmlItem) {
			console.log($(xmlItem).text());
		});
	} else {
		console.log(response.statusCode);
	}
});
