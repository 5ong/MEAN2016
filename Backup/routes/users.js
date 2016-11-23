var express = require('express');
var router = express.Router();

var User = require('../models/user');

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

router.post('/register',function(req,res,next){
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
	req.checkBody('name','Name field is required').notEmpty();
	req.checkBody('email','Email field is required').notEmpty();
	req.checkBody('email','Email not valis').isEmail();
	req.checkBody('username','Username field is required').notEmpty();
	req.checkBody('password','Password field is required').notEmpty();
	req.checkBody('password2','Password do not match').equals(req.body.password);

	//Check for errors
	var errors = req.validationErrors();

	if (errors){
		res.render('register',{
			errors: errors,
			name: name,
			email: email,
			username: username,
			password: password,
			password2: password2
		});
	} else {
		var newUser = new User({
			name: name,
			email: email,
			username: username,
			password: password,
			profileImage: profileImageName
		})

		//Create User
		User.createUser(newUser, function(err, user){
			if(err) throw err;
			console.log(user);
		})

		//Success Message
		req.flash('success', 'You are now registered and may log in');

		res.location('./');
		res.redirect('/');
	}

});

module.exports = router;
