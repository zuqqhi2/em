
/*
 * GET home page.
 */

require('jquery');
var Step = require('step');
var requestline = require('../libs/requestline');
var mongo = require('../libs/recommend_data');
var EventRelation = mongo.EventRelation;

function sort_items(items){
	var result = new Array();
	// copy
	for (var key in items) {
		var element = {};
		element["event_id"] = key;
		element["genre_id"] = items[key]["genre_id"];
		element["similarity"] = items[key]["similarity"];
		result.push(element);
	}
	// sort
	for (var i = 0; i < items.length-1; i++) {
		for (var j = i+1; j < items.length; j++) {
			if (result[i]["similarity"] < result[j]["similarity"]) {
				var tmp = result[i];
				result[i] = result[j];
				result[j] = tmp;
			}
		}
	}
	return result;
}

function clone(obj) {
	var f = function(){};
	f.prototype = obj;
	return new f;
}

exports.index = function(req, res){
	var reqline = new requestline['Requestline'](req.query);
  console.log("Query Parameters");
	console.log(reqline.getParams());

	var action_log = new Array();
	action_log.push(599);
	action_log.push(600);

	var items_tmp = {};
	EventRelation.find({timeslot:reqline.getParams()['timeslot']}, function(err, items) {
		var sim = 0.0;
		var totalsim = 0.0;

		for (var i = 0; i < items.length; i++) {
			if (parseInt(items[i]["target_event_id"]) in items_tmp) {
				items_tmp[parseInt(items[i]["target_event_id"])]["similarity"] += parseFloat(items[i]["distance"]);
			} else {
				items_tmp[parseInt(items[i]["target_event_id"])] = {};
				items_tmp[parseInt(items[i]["target_event_id"])]["genre_id"] = parseInt(items[i]["target_event_genre_id"]);
				items_tmp[parseInt(items[i]["target_event_id"])]["similarity"] = parseFloat(items[i]["distance"]);
			}
		}
	
		var recommended_items = sort_items(items_tmp);  

		if (reqline.validate()) {
			res.json(recommended_items);
		} else {
			res.json({ error : { type : "Qeury Syntax Error", message : "Query Syntax Error"}});
		}
	});
	//res.render('index', { title: 'Express'});
};
