exports.render = function(req, res) {

	res.render('index', {
		title : 'MEAN Fitness',
		user: JSON.stringify(req.user)
	});
};