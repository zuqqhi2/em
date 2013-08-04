mongoose = require('mongoose')
db = mongoose.connect('mongodb://localhost/recommend_data')

validator: (v) ->
	return v.length > 0

EventRelation = new mongoose.Schema({
	event_id                 : { type: Number, min: 0, max: 65536 },
	event_genre_id           : { type: Number, min: 0, max: 65536 },
	target_event_id          : { type: Number, min: 0, max: 65536 },
	target_event_genre_id    : { type: Number, min: 0, max: 65536 },
	distance                 : { type: Number },
	timeslot                 : { type: String, validate: [validator, "Empty Error"] },
	created_time             : { type: Date, default: Date.now },
	update_time              : { type: Date, default: Date.now }
})

exports.EventRelation = db.model('EventRelation', EventRelation)
