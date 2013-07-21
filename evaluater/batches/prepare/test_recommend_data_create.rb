# -*- coding: utf-8 -*-
require 'csv'

filename = "/home/hidetomo/em/evaluater/csv/event_relation_data" + Time.now.strftime("%Y%m%d") + ".csv"
writer = File.open(filename, "w")
rnd = Random.new(1234)

100.times.each{ |i|
	writer.write [rnd.rand(1000).to_s, rnd.rand(1000).to_s, rnd.rand(1000).to_s, rnd.rand(1000).to_s, rnd.rand(), Time.now.to_s + "&" + Time.now.to_s, Time.now.to_s, Time.now.to_s].join(",")
	writer.write("\n")
}

writer.close()
