module.exports = {
    Cases: {
        notes: async (parent, _, { Note }) => {
            const notes = await Note.find({ _id: { $in: parent.notes }, _enabled: true });
            return notes;
        }, 
    },
    Query: {
       findCasesByStatus: async (_, args, { Cases }) => {
           const founded = await Cases.find(({ status: args.status, _enabled: true }));
           return founded;
       },
       findCasesBetween: async (_, args, { Cases }) => {
           const founded = await Cases.find({
               createdAt: {
                    $gte: ISODate(args.from),
                    $lt: ISODate(args.to)
               },
               _enabled: true
           });
           return founded;
       } 
    },
    Mutation: {
        createCase: async (_, args, { req, Cases, Pet }) => {
            const createdCase = await Cases.create({ ...args.case, veterinary: req.user._id });
            const updatedPet = await Pet.findOneAndUpdate({_id: args.petID}, {
                $push: {
                    cases: createdCase._id
                }
            });
            return updatedPet;
        },
        updateCase: async (_, args, { Cases }) => {
            const updatedCase = await Cases.findOneAndUpdate({ _id: args.caseID }, args.update);
            return updatedCase;
        },
        addNote: async (_, args, { req, Cases, Note }) => {
            const note = await Note.create({...args.note, createdBy: req.user._id });

            return await Cases.findOneAndUpdate({ _id: args.caseID }, {
                $push: {
                    notes: note._id
                }
            })
        },
        deleteCase: async (_, args, { Cases }) => {
            const deleted = await Cases.findOneAndUpdate({ _id: args.caseID }, { _enabled: false })
        }
    }
}