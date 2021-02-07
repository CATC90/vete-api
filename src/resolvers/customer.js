module.exports = {
    Customer: {
        pets: async (parent,_,{Pet}) => {
            const foundedPets = await Pet.find({ _id: { $in: parent.pets }, _enabled: true})
            return foundedPets; 
        }  
    },
    Query: {
        findCustomerById: async (parent, args, { Customer }) => {
            const found = await Customer.findOne({_id: args.id, _enabled: true});
            return found;
        },
        findCustomerByPet: async (parent, args, { Customer }) => {
            const found = await Customer.findOne({_id: args.id, _enabled: true});
            return found;
        },
        findCustomer: async (parent, args, { Customer }) => {
            const found = await Customer.findOne({ [args.field] : args.value, _enabled: true });
            return found;
        }
    },
    Mutation: {
        createCustomer:  async (parent, args, { Customer, Pet }) => {
            const { pets } = args.customer;

            const creatingPets = pets.map(pet => Pet.create(pet));
            const createdPets = await Promise.all(creatingPets);

            const created = await Customer.create({...args.customer, pets: createdPets});
            return created;
        },
        updateCustomer:  async (parent, args, { Customer }) => {
            const created = await Customer.findByIdAndUpdate(args.id, args.update);
            return created;
        },
        deleteCustomer:  async (parent, args, { Customer }) => {
            const created = await Customer.findByIdAndUpdate(args.id, { _enabled: false });
            return created;
        },
        addPet:  async (parent, args, { Customer, Pet }) => {
            const created = await Customer.findByIdAndUpdate(args.id, {
                $push: {
                    pet: args.petId
                }
            });
            return created;
        }
    }
}