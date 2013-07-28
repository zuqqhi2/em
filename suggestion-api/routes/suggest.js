
/*
 * GET home page.
 */

exports.index = function(req, res){
	res.send({uid:req.params.uid});
	//res.send({uid:req.params.uid, timeslot:req.params.timeslot});
	//res.render('index', { title: 'Express'+req.params});
};

