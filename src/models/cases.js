const mongoose = require('mongoose');

const { Schema } = mongoose;

const CasesSchema = new Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    veterinary: { type: Schema.Types.ObjectId, ref: 'Veterinary', required: true },
    diagnosis: { type: String, require: true },
    status: { type: String, enum: ["inProgress", "finished"], default: "inProgress" },
    result: { type: String },
    notes: [{ type: Schema.Types.ObjectId, ref: 'Note' }] 
},
{ timestamps: true });

module.exports = mongoose.model('Cases', CasesSchema);