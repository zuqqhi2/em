# -*- coding: utf-8 -*-
=begin

=end

require 'mongo'
require 'active_support/all'
require 'yaml'
require 'logger'

require File.expand_path(File.dirname(__FILE__) + '../../../lib/models/action_log.rb')

class GetUserActionLogs
	def self.setup
		@@config = YAML::load(File.open(File.expand_path('../../../config/common.yml', __FILE__)))

		# Logger Setting
		@@app_logger = Logger.new(File.open(@@config['get_user_action_logs']['app_log_path'] + 'get_user_action_logs.log', 'a'))
		
		# Connection with mongoDB
		@action_log = UserActionLogs.new()
		#@conn = Mongo::Connection.new
		#@userdb = @conn.db('action_log')
		#@collection = @userdb.collection('current_00')
	end

	def self.process
		self.setup

		@@app_logger.info "#{Time.now.to_s} get_user_action_logs.rb start."
		self.output_action_log_csv
		@@app_logger.info "#{Time.now.to_s} get_user_action_logs.rb end."

		return true
	end

	def self.output_action_log_csv
		filename = File.join(@@config['get_user_action_logs']['output_dir'], "user_action_log" + Time.now.strftime("%Y%m%d") + ".csv")
		writer = File.open(filename, "w")

		0.upto(@@config['action_log_db']['num_collections']-1).each{ |i|
			records_count = 0
			@action_log.select_collection('current_' + sprintf("%02d", i))
			#@collection = @userdb.collection('current_' + sprintf("%02d", i))
			#@collection.find.each{ |records|
			@action_log.find.each{ |records|
				records_count += 1
				writer.write records.values_at("user_id", "action_id", "action_type", "timeslot").join(",")
				writer.write "\n"
			}
			@@app_logger.info "#{Time.now.to_s} current_#{sprintf("%02d", i)} : #{records_count} records"
		}
		writer.close()

	end
end

GetUserActionLogs.process

# Memo
#connection = Mongo::Connection.new('localhost'27017);
