
/*
 * GET home page.
 */

exports.index = function(req, res){
  console.log("Query Parameters");
	console.log(req.query);

  console.log(req.query.uid);
	
	//res.json([{ author : 'Audrey Hepburn', text : "Nothing is impossible, the word itself says 'I'm possible'!"}]);
	res.render('index', { title: 'Express'});
};
