# -*- coding: utf-8 -*-
require 'mongo'

connection = Mongo::Connection.new
db = connection.db('recommend_data')
collection = db.collection('event_relation_00')
rnd = Random.new(1234)

100.times.each{ |i|
	collection = db.collection('event_relation_' + sprintf("%02d", rnd.rand(100)))
	doc = {'event_id' => rnd.rand(1000).to_s, 'event_genre_id' => rnd.rand(1000).to_s, 'target_events' => {'target_event_id' => rnd.rand(100).to_s, 'target_event_genre_id' => rnd.rand(1000).to_s, 'distance' => rnd.rand(), 'timeslot' => Time.now.to_s + "&" + Time.now.to_s}, 'created_time' => Time.now.to_s, 'update_time' => Time.now.to_s}
	id = collection.insert(doc)
}
