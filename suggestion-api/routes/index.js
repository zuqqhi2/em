require('jquery');
var Step = require('step');
var requestline = require('../libs/requestline');
var UserEventSim = require('../libs/user_event_similarites').UserEventSim;

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

/**
 * Entry point
 */
exports.index = function(req, res){
	var reqline = new requestline['Requestline'](req.query);
  console.log("Query Parameters");
	console.log(reqline.getParams());

	var uid = parseInt(reqline.getParams()['uid']);
	var tslot = reqline.getParams()['timeslot'];

	// If request line has syntax error, error message should be shown
	if (!reqline.validate()) {
			res.json({ error : { type : 1, message : "Query Syntax Error"}});
	} else {
		// Get recommended data
		UserEventSim.find({user_id:uid,timeslot:tslot},
											{"_id":0,"event_id":1,"genre_id":1,"title":1,"description":1,"imageurl":1})
								.sort({similarity: -1})
								.execFind(function(err,items){
			
			console.log(items);
		
			var formatted_items = {"response_type":1, "recommend_events":items};

			res.json(formatted_items);
		});
	}
	//res.render('index', { title: 'Express'});
};
