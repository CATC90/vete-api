const passport = require('passport');
const passportAuth = require('./libs/auth/local-auth');

const startConfiguration = app => {
    app.on('middleware:after:session', function configPassport() {
        app.use(passport.initialize());
        app.use(passport.session());
    });
    
    passportAuth.config({
		"secret": "keyboard#cat"
	});
};

module.exports = startConfiguration;
