require File.expand_path(File.dirname(__FILE__) + '/db')

class RecommendData
	#
	# Make connection with mongodb
	#
	def initialize
		@conn = Mongo::Connection.new
		@recommend_datadb = @conn.db('recommend_data')
	end

	#
	# selection collection on recommend_data DB
	# @param name : collection name
  #
	def select_collection(name)
		@collection = @recommend_datadb.collection(name)
	end

	#
	# Get all document on the collection
	#
  def find
		if !defined?(@collection)
			return false
		else
			return @collection.find
		end
  end

	#
	# Insert doc to recommend_data
  # @param doc : document
	#
	def insert(doc)
		if !defined?(@collection)
			return false
		end

		if validate(doc)
			return @collection.insert(doc)
		end
	end

	#
	# validation for insert data
	# @param doc : document for insertion
	#
	def validate(doc)
		return true
	end
end 
