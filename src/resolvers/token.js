const { combineResolvers } = require('graphql-resolvers');
const passport = require('passport');

module.exports = {
    Query: {
        login: async (parent, { email, password }, ctx ) => {
            const { user } = await ctx.authenticate("local-signin", {
                email,
                password
              });
            return user;
        }
    }
}