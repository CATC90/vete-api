module.exports = {
    Query: {
        findVeterinaryBy:  async (parent, args, { Veterinary }) => {
            const found = await Veterinary.find({ [args.field]: args.value, _enabled: true });
            return found;
        }
    },
    Mutation: {
        createVeterinary:  async (parent, args, { Veterinary }, mas) => {
            const created = await Veterinary.create(args.veterinary);
            return created;
        },
        updateVeterinary: async (parent, args, { Veterinary }) => {
            const updated = await Veterinary.findByIdAndUpdate({_id: args.id}, {...args.update, _enabled: true });
            return updated;
        },
        deleteVeterinary: async (parent, args, { Veterinary }) => {
            const deleted = await Veterinary.findByIdAndUpdate({ _id: args.id}, { _enabled: false });
            return true;
        }
    }
}