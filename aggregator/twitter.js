#!/usr/bin/env node

var	util = require('util'),
	twitter = require('twitter');

var	count = 0,
	lastc = 0;

function tweet(data) {
	count++;
	if ( typeof data === 'string' )
		util.puts(data);
	else if ( data.text && data.user && data.user.screen_name )
		util.puts('"' + data.text + '" -- ' + data.user.screen_name);
	else if ( data.message )
		util.puts('ERROR: ' + util.inspect(data));
	else
		util.puts(util.inspect(data));
}

function memrep() {
	var rep = process.memoryUsage();
	rep.tweets = count - lastc;
	lastc = count;
	console.log(JSON.stringify(rep));
	// next report in 60 seconds
	setTimeout(memrep, 60000);
}

var twit = new twitter({
	consumer_key: '1ioMJmBY6HyiTsM6O1e4Hw',
	consumer_secret: 'Yxhleaz5lQaXvPDGY5cIKVSd0FLdQShPQ58pRz1dybs',
	access_token_key: '254048569-V0SeeItkiETnfIR4bDMXshaIsrJHiatPluogo0f1',
	access_token_secret: 'TX0FJhQu8dSCNuTnGSTvW4cKUVPILythsQ2LUV42q6A'
})
.stream('statuses/sample', function(stream) {
	stream.on('data', tweet);
	// first report in 15 seconds
	setTimeout(memrep, 15000);
})
