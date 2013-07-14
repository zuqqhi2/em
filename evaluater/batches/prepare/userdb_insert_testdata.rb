# -*- coding: utf-8 -*-
require 'mongo'

connection = Mongo::Connection.new
db = connection.db('action_log')
collection = db.collection('current_00')
rnd = Random.new(1234)

100.times.each{ |i|
	collection = db.collection('current_' + sprintf("%02d", rnd.rand(100)))
	doc = {'user_id' => rnd.rand(1000).to_s, 'action_id' => rnd.rand(1000).to_s, 'action_type' => rnd.rand(100).to_s, 'timeslot' => Time.now.to_s + "&" + Time.now.to_s, 'created_time' => Time.now.to_s, 'update_time' => Time.now.to_s}
	id = collection.insert(doc)
}
