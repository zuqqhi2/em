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
var command = require("commander");
var mongoose = require("mongoose");
var log4js = require('log4js');

//===============================================
// Logging Setting

log4js.configure({
	appenders: [{
		"type": "dateFile",
		"filename": "./logs/insert_tabelog_datas.log",
		"pattern": "-yyyy-MM-dd"
	}]
});
var logger = log4js.getLogger("dateFile");

//===============================================
// Load config file

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
queryParams.push("ResultSet=large");
queryParams.push("Key=" + apiKey);

// join
var requestUrl = requestBaseUrl + "?" + queryParams.join("&");

//===============================================
// DB setting

var db = mongoose.connect('mongodb://' + config.event_db.host + '/' + config.event_db.event_data,
	function (err) {
		if (err) {
			logger.error("Connection Fail. mongodb://" + config.event_db.host + "/" + config.event_db.event_data);
		} else {
			logger.info("Connection Success!");
		}
	}
);

var EventsSchema = new mongoose.Schema({
	event_id     : { type: Number, default: 0 },
	genre_id     : Number,
	title        : String,
	image        : String,
	description  : String,
	url          : String,
	station      : String,
	address      : String,
	business_hour: String,
	holiday      : String,
	latitude     : Number,
	longitude    : Number,
	created_time : { type: Date, default: Date.now },
	update_time  : { type: Date, default: Date.now }
});

EventsSchema.pre('save', function(next) {
    if(!this.isNew) return next();
 
    var model = this;
 
    model.db.db.executeDbCommand({
        findAndModify: 'current_event_id', // 'コマンド名': '対象のコレクション名'
        query: { name: model.collection.name }, // 検索オプション
        update: { $set: { name: model.collection.name }, $inc: { sequence: 1 } },
        new: true, // 更新したデータを受け取るかどうか
        upsert: true // 見つからなかったら挿入するかどうか
    }, function(err, data) {
        if(!err && data.documents[0].ok) {
            // model.id に取得した値をセット
            model.event_id = data.documents[0].value.sequence;
            next();
        } else {
            next(err || new Error(data.documents[0].errmsg));
        }
    });
});

var Events = db.model("events_001s", EventsSchema);

//===============================================
// Analyze response

logger.info("request url: " + requestUrl);
request({url: requestUrl}, function(error, response, body)
{
	if (!error && response.statusCode == 200) {
		logger.info("response statusCode : " + response.statusCode);

		$ = cheerio.load(body, {ignoreWhitespace: true, xmlMode: true});

		var url = response.request.href;
		var latest_id = 0;
		$("Item").each(function(i, xmlItem) {
			var data = {};
			data["genre_id"] = 1;
			data["title"] = $(xmlItem).children()[1]["children"][0]["data"];
			data["image"] = "";
			data["description"] = "";
			data["url"] = $(xmlItem).children()[2]["children"][0]["data"];
			data["station"] = $(xmlItem).children()[12]["children"][0]["data"];
			data["address"] = $(xmlItem).children()[13]["children"][0]["data"];
			data["business_hour"] = $(xmlItem).children()[15]["children"][0]["data"];
			data["holiday"] = $(xmlItem).children()[16]["children"][0]["data"];
			data["latitude"] = parseFloat($(xmlItem).children()[17]["children"][0]["data"]);
			data["longitude"] = parseFloat($(xmlItem).children()[18]["children"][0]["data"]);
			
			logger.info("Retrieve data: " + i);
			logger.info(data);
		
			/*
			var newPost = new Events(data);
			newPost.save(function(err) {
				if (err) {
					logger.error("insert error : " + data);
				}
			});
			*/
		});


		//var newPost = new Events({"event_id": 1, "title"
	} else {
		logger.error("response statusCode : " + response.statusCode);
	}
});
