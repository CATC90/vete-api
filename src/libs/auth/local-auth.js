/* eslint-disable no-underscore-dangle */
const passport = require('passport');
const { GraphQLLocalStrategy } = require("graphql-passport");
const jwt = require('jsonwebtoken');

const { Veterinary: User, Token } = require('../../models');
const { comparePassword } = require('./password-utils');


const EXPIRED_TIME = 60 * 15;

const config = conf => {
  const { secret } = conf;

  passport.use('local-signin', new GraphQLLocalStrategy(async (email, password, done) => {
        try {
          const user = await User.findOne({ email, _enabled: true });
          if (!user) {
            return done(null, false);
          }

          const samePassword = await comparePassword(password, user.password);
          if (!samePassword) {
            return done(null, false, { success: false, status: 'Incorrect Password' });
          }

          const token = jwt.sign({ id: user._id }, secret, {
            expiresIn: EXPIRED_TIME
          });

          const createdToken = await Token.findOneAndUpdate(
            { user: user._id }, 
            { user: user._id, token }, 
            { upsert: true });

          return done(null, createdToken);
        } catch (err) {
          return done(err, false);
        }
      }
    ));
};


const hasValidToken = async (req) => {
  try {
    const token = req.headers.authorization.replace('Bearer ', '');
    const tokenData = await Token.findOne({ token }).populate('user');

    if (!tokenData) {
      return false;
    }

    req.authInfo = {
      token: tokenData.token
    };
    req.user = tokenData.user.toJSON();

    return true;
  } catch (e) {
    return false;
  }
};

const ensureAuthenticated = async (req) => {
    const validToken = await hasValidToken(req);
    if (validToken) {
      return true;
    }
    throw new Error('Unauthorized');
  };

module.exports = { config, ensureAuthenticated };
