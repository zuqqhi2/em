require 'rubygems'
require 'mongo'
require 'yaml'
require 'logger'

# DB configuration
dbconfig = YAML::load(File.open(File.expand_path('../../../config/database.yml', __FILE__)))

# Establish Database Connection
#ActiveRecord::Base.establish_connection(dbconfig)

# DB logger
#ActiveRecord::Base.logger = Logger.new(File.open(dbconfig['log_path'].to_s + Time.now.strftime("%Y%m%d") + dbconfig['log_suffix'].to_s , 'a'))
