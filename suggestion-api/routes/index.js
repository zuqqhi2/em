
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.json([{ author : 'Audrey Hepburn', text : "Nothing is impossible, the word itself says 'I'm possible'!"}]);
	//res.render('index', { title: 'Express' });
};
