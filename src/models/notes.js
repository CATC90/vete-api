const mongoose = require('mongoose');

const { Schema } = mongoose;

const NoteSchema = new Schema({
    name: { type: String, required: true },
    text: { type: String, require: true },
    createdBy: { type: Schema.Types.ObjectId, ref: 'Veterinary', required: true },
    medias: [
        {
            type: { type: String, enum: ["gif", "mp4", "png", "jpeg"], required: true },
            link: { type: String, required: true }
        }
    ]
},
{ timestamps: true });

module.exports = mongoose.model('Note', NoteSchema);