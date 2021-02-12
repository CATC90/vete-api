module.exports = {
    Mutation: {
       updateNote: async (_, args, { Note }) => {
           const newNote = await Note.findOneAndUpdate(
               { _id: args.id, _enabled: true }, 
               { ...args.update });
           return newNote;
       },
       deleteNote: async(_, args, { Note }) => {
           const deleted = await Note.findOneAndUpdate({ _id: args.id }, { _enabled: false });
           return true;
       } 
    }
}