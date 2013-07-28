class Requestline
	constructor: (params) ->
		@params = params
		@validator =
			"uid" : /^[0-9]+$/
			"timeslot" : /^[0-2][0-9]-[0-2][0-9]$/

	getParams: ->
		return @params

	validate: ->
		for key, value of @params
			if key of @validator and @validator[key].test(value) == false
				return false

		return true

exports.Requestline = Requestline
