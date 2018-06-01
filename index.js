const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
const config = require('./config');

//When the server is started up to listen onto port 8080, it will also connect to the database and load models
require('./server/models').connect(config.dbUri);

const app = express();

//Tell the app to look for static files in these directories
app.use(express.static('./server/static'));
app.use(express.static('./client/dist/'));

//tell the app to parse HTTP body messages
app.use(bodyParser.urlencoded({extended: false}));

//pass the passport middleware to use
app.use(passport.initialize());

//load passport strategies; the method we are using to authenticate
const localSignupStrategy = require('./server/passport/local-signup');
const localLoginStrategy = require('./server/passport/local-login');

passport.use('local-signup', localSignupStrategy);
passport.use('local-login', localLoginStrategy);

//pass the authentication checker middleware
const authCheckMiddleware = require('./server/middleware/auth-check');
app.use('/api', authCheckMiddleware);


//routes
const authRoutes = require('./server/routes/auth');
const apiRoutes = require('./server/routes/api');
app.use('/auth', authRoutes);
app.use('/api', apiRoutes);


//start the server
app.listen(8080, () => {
  console.log('Server is running on http://localhost:8080');
});
