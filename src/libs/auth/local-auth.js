/* eslint-disable no-underscore-dangle */
const passport = require('passport');
const { GraphQLLocalStrategy } = require("graphql-passport");
const jwt = require('jsonwebtoken');

const { Veterinary: User, Token } = require('../../models');
const { comparePassword } = require('./password-utils');


const EXPIRED_TIME = 60 * 15;

const config = conf => {
  const { secret } = conf;

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser(async (id, done) => {
    const user = await User.findOne({ _id: id, _enabled: true });
    done(null, user);
  });

  passport.use('local-signin', new GraphQLLocalStrategy( async (email, password, done) => {
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

const findByToken = async ({ headers }) => {
  const token = headers.authorization.replace('Bearer ', '');
  const tokenData = await Token.findOne({ token });
  return tokenData;
};

const hasValidToken = async req => {
  try {
    const tokenData = await findByToken(req);

    if (!tokenData) {
      return false;
    }

    req.authInfo = {
      token: tokenData.token
    };
    req.user = tokenData.user;

    return true;
  } catch (e) {
    return false;
  }
};

const setUserCompany = async ({ user }) => {
  const userData = await User.findById(user);
  return userData?.company;
};

const ensureAuthenticated = () => {
  return async (req, res, next) => {
    const validToken = await hasValidToken(req);
    if (validToken || req.isAuthenticated()) {
      return next();
    }
    return res.status(status.UNAUTHORIZED).end();
  };
};

const initialize = () => {
  passport.initialize();
};

const session = () => {
  passport.session();
};

module.exports = { config, ensureAuthenticated, initialize, session };
