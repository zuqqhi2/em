// Generated by CoffeeScript 1.6.3
var EventRelation, db, mongoose;
mongoose = require('mongoose');
db = mongoose.connect('mongodb://localhost/recommend_data',
	function(err) {
		if (err) {
			console.log(err);
		} else {
			console.log('Connection Success!');
		}
	}
);

function validator(v) {
	return v.length > 0;
}

EventRelationSchema = new mongoose.Schema({
  event_id             : String,
  event_genre_id       : String,
  target_event_id      : String,
  target_event_genre_id: String,
  distance             : String,
  timeslot             : String,
  created_time         : String,
  update_time          : String
});

exports.EventRelation = db.model('event_relation_01s', EventRelationSchema);