const express = require('express');
const validator = require('validator');
const passport = require('passport');

const router = new express.Router();

//Validate the sign up format
//An object is returned as the result of after the validation:
//The object contains a boolean validation result, error tips, and a global message for the whole form

function validateSignupForm(payload) {
  const errors = {};
  console.log(payload.email);
  let isFormValid = true;
  let message = '';

  if(!payload || typeof payload.email !== 'string' || !validator.isEmail(payload.email)) {
    isFormValid = false;
    errors.email = 'Please provide a correct email address';
  }

  if(!payload || typeof payload.password !== 'string' || payload.password.trim().length < 8) {
    isFormValid = false;
    errors.password = 'Password must have at least 8 characters.';
    //You can check for URL encoding as well in these fields or check if the password met the specification rules instead of just the length.
    //Overall, other password rules can be enforced and checked here
  }

  if(!payload || typeof payload.name !== 'string' || payload.name.trim().length === 0) {
    isFormValid = false;
    errors.name = 'Please provide your name';
  }

  if(!isFormValid) {
    message= 'Check the form for errors.';
  }

  return {
    success: isFormValid,
    message,
    errors
  };
}

function validateLoginForm(payload) {
  const errors = {};
  let isFormValid = true;
  let message = '';

  if(!payload || typeof payload.email !== 'string' || payload.email.trim().length === 0) {
    isFormValid = false;
    errors.email = 'Please provide your email address';
  }

  if(!payload || typeof payload.password !== 'string' || payload.password.trim().length === 0) {
    isFormValid = false;
    errors.password = 'Please provide your password';
  }

  if(!isFormValid) {
    message = 'Check the form for errors.';
  }

  return {
    success: isFormValid,
    errors,
    message
  };
}

//if the post request is coming from the location /signup
router.post('/signup', (req, res, next) => {
  const validationResult = validateSignupForm(req.body);

  //if the validation is not successful
  if(!validationResult.success) {
    return res.status(400).json({
      success: validationResult.success,
      message: validationResult.message,
      errors: validationResult.errors
    });
  }

  return passport.authenticate('local-signup', (err) => {
  if (err) {
    if (err.name === 'MongoError' && err.code === 11000) {
      // the 11000 Mongo code is for a duplication email error
      // the 409 HTTP status code is for conflict error
      return res.status(409).json({
        success: false,
        message: 'Check the form for errors.',
        errors: {
          email: 'This email is already taken.'
        }
      });
    }

    return res.status(400).json({
      success: false,
      message: 'Could not process the form.'
    });
  }

  return res.status(200).json({
    success: true,
    message: 'You have successfully signed up! Now you should be able to log in.'
  });
})(req, res, next);
  //return res.status(200).end();
});

//If the post request is coming from a location /login, take in the payload which is the req.body
//the res would be the object that is returned from the function which has the success, errors, and message key that we created
router.post('/login', (req, res, next) => {
  const validationResult = validateLoginForm(req.body);

  //if the validation is not successful
  if(!validationResult.success) {
    return res.status(400).json({
      success: validationResult.success,
      message: validationResult.message,
      errors: validationResult.errors
    });
  }

  //return res.status(200).end();

  return passport.authenticate('local-login', (err, token, userData) => {
    if(err) {
      if(err.name === 'IncorrectCredentialsError') {
        return res.status(400).json({
          success: false,
          message: err.message
        });
      }

      return res.status(400).json({
        success: false,
        message: 'code not process the form.'
      });
    }

    return res.json({
      success: true,
      message: "You have successfully logged in.",
      token,
      user: userData
    });
  })(req, res, next);
});


module.exports = router;
