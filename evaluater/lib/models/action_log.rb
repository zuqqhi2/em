require File.expand_path(File.dirname(__FILE__) + '/db')

class UserActionLogs
	#
	# Make connection with mongodb
	#
	def initialize
		@conn = Mongo::Connection.new
		@userdb = @conn.db('action_log')
	end

	#
	# selection collection on action_log DB
	# @param name : collection name
  #
	def select_collection(name)
		@collection = @userdb.collection(name)
	end

	#
	# Get all document on the collection
	#
  def find
		if defined?(@collection)
			return @collection.find
  	end
	end
end 
