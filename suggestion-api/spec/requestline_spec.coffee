chai = require 'chai'
expect = chai.expect
chai.should()

Requestline = require('../models/requestline').Requestline

describe 'Requestline',->
	
	describe 'getParams',->
		before ->
			params =
				key1 : 'val1'
				key2 : 'val2'
		
			@requestline1 = new Requestline(params)

		it 'should return {key1:val1,key2:val2}', ->
			expected =
				'key1':'val1'
				'key2':'val2'
	
			@requestline1.getParams()['key1'].should.equal(expected['key1'])
			@requestline1.getParams()['key2'].should.equal(expected['key2'])

	describe 'validate',->
		before ->
			params =
				uid : 1
				timeslot : "13-14"

			@requestline2 = new Requestline(params)

		it 'should return true', ->
			@requestline2.validate().should.be.true
