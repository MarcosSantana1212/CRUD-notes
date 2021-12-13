const usersCtrl = {};
const User = require('../models/User');
const passport = require('passport');

usersCtrl.renderSignUpForm = (req, res) => {
    res.render('users/signup');
};

usersCtrl.signUp = async(req,res) => {

    const errors = []; //alerts messages
    const { name, email, password, confirm_password } = req.body;

  if (password != confirm_password) {
    errors.push({ text: "Passwords do not match." });
  };
  if (password.length < 4) {
    errors.push({ text: "Passwords must be at least 4 characters." });
  };
  if (errors.length > 0) {
    res.render("users/signup", {
      errors,
      name,
      email,
      password,
      confirm_password,
    });

  } else 
   {
        // Look for email coincidence
        const emailUser = await User.findOne({ email: email });
        if (emailUser) {
          req.flash("error_msg", "email is already taken.");
          res.redirect("/users/signup");

        } else {
        // Saving a New User
        const newUser = new User({ name:name, email:email, password:password });
        newUser.password = await newUser.encryptPassword(password);
        await newUser.save();
        req.flash("success_msg", "You are registered.");
        res.redirect("/users/signin");
        }
    };
};

usersCtrl.renderSigninForm = (req, res) => {
    res.render('users/signin');
}

usersCtrl.signin = passport.authenticate('local',{
  failureRedirect:'/users/signin',
  successRedirect:'/notes',
  failureFlash: true

});

usersCtrl.logout = (req,res) => {
    req.logout();
    req.flash("success_msg", "You are logged out now.");
    res.redirect("/users/signin");
};

module.exports = usersCtrl;