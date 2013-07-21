# -*- coding: utf-8 -*-
=begin

=end

require 'mongo'
require 'active_support/all'
require 'yaml'
require 'logger'
require 'csv'

require File.expand_path(File.dirname(__FILE__) + '../../../lib/models/recommend_data.rb')

class PutEventRelationData
	def self.setup
		@@config = YAML::load(File.open(File.expand_path('../../../config/common.yml', __FILE__)))

		# Logger Setting
		@@app_logger = Logger.new(File.open(@@config['put_event_relation_to_recommend_datadb']['app_log_path'] + 'put_event_relation_to_recommend_datadb.log', 'a'))
		
		# Connection with mongoDB
		@recommend_data = RecommendData.new()
	end

	def self.process
		self.setup

		@@app_logger.info "#{Time.now.to_s} #{$PROGRAM_NAME} start."
		self.insert_event_relation
		@@app_logger.info "#{Time.now.to_s} #{$PROGRAM_NAME} end."

		return true
	end

	def self.insert_event_relation
		filename = File.join(@@config['put_event_relation_to_recommend_datadb']['input_file_dir'], "event_relation_data" + Time.now.strftime("%Y%m%d") + ".csv")

		CSV.open(filename, "r").each do |record|
			@recommend_data.select_collection('event_relation_' + sprintf("%02d", get_collection_number(record[0].to_i)))
			doc = {'event_id' => record[0], 'event_genre_id' => record[1], 'target_event_id' => record[2], 'target_event_genre_id' => record[3], 'distance' => record[4], 'timeslot' => record[5], 'created_time' => record[6], 'update_time' => record[7]} 
			@recommend_data.insert(doc)
		end
	end

	#
	# Get colleciton number (event_relation_xx)
  # @param : event_id
	#
	def self.get_collection_number(event_id)
		return event_id % @@config['recommend_data_db']['num_collections']
	end
end

PutEventRelationData.process
