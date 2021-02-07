module.exports = {
    Token: {
        user: async (parent, _, { Veterinary }) => {
            const veterinary = await Veterinary.findOne({ _id: parent.user, _enabled: true });
            return veterinary;
        }
    },
    Query: {
        login: async (parent, { email, password }, ctx ) => {
            const { user: data } = await ctx.authenticate("local-signin", {
                email,
                password
              });   
            ctx.login(data.user);
            return data;
        }
    }
}