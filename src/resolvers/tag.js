module.exports = {
    Query: {
        getAllTags:  async (parent, args, { Tag }) => {
            const created = await Tag.find({});
            return created;
        }
    },
    Mutation: {
        createTag:  async (parent, args, { Tag }) => {
            const created = await Tag.create({ name: args.name });
            return created;
        },
        updateTag: async (parent, args, { Tag }) => {
            const updated = await Tag.findByIdAndUpdate({name: args.name}, {name: args.update});
            return updated;
        },
        deleteTag: async (parent, args, { Tag }) => {
            const deleted = await Tag.removeOne({ name: args.name});
            return true;
        }
    }
}