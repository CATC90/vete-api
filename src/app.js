const passport = require('passport');
const passportAuth = require('./libs/auth/local-auth');
const connectMongo = require('./libs/mongoose-utils/config');
const { logger, connectWinston } = require('./libs/logger');

const startConfiguration = async app => {
    try{
        await connectMongo().then(connectWinston);
        
        app.on('middleware:after:session', function configPassport() {
            app.use(passport.initialize());
        });
        
        passportAuth.config({
            "secret": "keyboard#cat"
        });
    }catch(err){
        logger.error('Configuration error: ', err);
    }
};

module.exports = startConfiguration;
