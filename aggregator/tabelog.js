#!/usr/bin/env node

var request = require("request");
var cheerio = require("cheerio");

var requestUrl = "http://www.google.com";

request({url: requestUrl}, function(error, response, body)
{
	if (!error && response.statusCode == 200) {
		$ = cheerio.load(body);

		var url = response.request.href;
		var title = $("title").text();

		console.log(url);
		console.log(title);
	} else {
		console.log(response.statusCode);
	}
});		
