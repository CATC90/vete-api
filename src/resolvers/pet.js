module.exports = {
    Pet: {
        cases: async (parent, _, { Cases }) => {
            const cases = await Cases.find({ _id: { $in: parent.cases }, _enabled: true });
            return cases;
        }
    }, 
    Query: {
        findPetById: async (parent, args, { Pet }) => {
            const found = await Pet.findOne({_id: args.id, _enabled: true});
            return found;
        },
        findPet: async (parent, args, { Pet }) => {
            const found = await Pet.findOne({ [args.field] : args.value, _enabled: true });
            return found;
        }
    },
    Mutation: {
        createPet:  async (parent, args, { Pet }) => {
            const created = await Pet.create(args.pet);
            return created;
        }
    }
}