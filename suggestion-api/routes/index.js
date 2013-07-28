
/*
 * GET home page.
 */

var requestline = require('../libs/requestline');

exports.index = function(req, res){
	var reqline = new requestline['Requestline'](req.query);
  console.log("Query Parameters");
	console.log(reqline.getParams());
  
	if (reqline.validate()) {
		res.json([{ author : 'Audrey Hepburn', text : "Nothing is impossible, the word itself says 'I'm possible'!"}]);
	} else {
		res.json({ error : { type : "Qeury Syntax Error", message : "Query Syntax Error"}});
	}
	//res.render('index', { title: 'Express'});
};
