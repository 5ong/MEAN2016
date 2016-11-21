var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/register', function(req, res, next) {
  res.render('register',{
  	'title': 'Register'
  });
}); 

router.get('/login', function(req, res, next) {
  res.render('login',{
  	'title': 'Login'
  });

});

router.post('/users/register',function(req,res,next){
	//Get form value
	var name = req.body.name;
	var email = req.body.email;
	var username = req.body.username;
	var password = req.body.password;
	var password2 = req.body.password2;


	//Check for image field
	if(req.files.profileImage){
		console.log('Uploading File...');

		var profileImageOriginalName = req.files.profileImage.originalname;
		var profileImageName         = req.files.profileImage.name;
		var profileImageMime         = req.files.profileImage.mimetype;
		var profileImagePath         = req.files.profileImage.path;	
		var profileImageExt          = req.files.profileImage.extension;
		var profileImageSize         = req.files.profileImage.size;
	} else {
		//Set a default image
		var profileImageName = 'noimage.png';
	}

	// Form Validation
	req.checkBody('name')

});

module.exports = router;
