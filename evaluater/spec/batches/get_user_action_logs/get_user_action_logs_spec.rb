require_relative '../../spec_helper'
require_relative '../../../batches/get_user_action_logs/get_user_action_logs'

describe GetUserActionLogs do

	describe '.setup' do
		before :each do
			fake_config = {'get_user_action_logs' => {'output_dir' => './csv', 'app_log_dir' => './logs'}}
			YAML.stub(:load).and_return(fake_config)
		end
	end

	describe '.process' do
		it 'should get true' do
			GetUserActionLogs.process().should == true
		end		

		it 'should exist file user_action_logYYYYMMDD.csv' do
			filename=GetUserActionLogs.class_eval("@@config")['get_user_action_logs']['output_dir']+"user_action_log"+Date.today.strftime("%Y%m%d")+".csv"
			File.exist?(filename).should == true
		end
	end
end
