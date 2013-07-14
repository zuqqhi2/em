# Read csv file
ARGF.each do |log|
	log.chomp!
	if log[0,1] == "#"
		next
	end
	user_id, action_id, event_id, rate = log.split(',')

	puts "#{event_id}\t#{user_id}\t#{rate}"
end
