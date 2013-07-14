# Read mapper's output
eventlog = Hash.new {|h,k| h[k] = Hash.new { |h,k| h[k] = 0 }}
ARGF.each do |log|
	log.chomp!
	event_id, user_id, rate = log.split(/\t/)
	eventlog[event_id][user_id] += rate.to_i
end

# Euclid Distance
event_dist = Hash.new {|h,k| h[k] = Hash.new { |h,k| h[k] = 0.0 }}
for event1 in eventlog.keys
	for event2 in eventlog.keys
		if event1 == event2
			next
		end

		sum = 0.0
		eventlog[event1].each do |user_id, rate|
			sum += (eventlog[event1][user_id] - eventlog[event2][user_id]) * (eventlog[event1][user_id] - eventlog[event2][user_id])
		end
		event_dist[event1][event2] = 1.0/(1.0+sum)
		puts "#{event1}\t#{event2}\t#{event_dist[event1][event2]}"
	end	
end

