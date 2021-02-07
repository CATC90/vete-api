const mongoose = require('mongoose');

const { Schema } = mongoose;

const PetSchema = new Schema({
    name: { type: String, required: true },
    age: { type: Number, required: true },
    type: { type: String, enum: ["cat", "dog"], required: true},
    description: { type: String },
    _enabled: { type: Boolean, default: true },
    cases: [{ type: Schema.Types.ObjectId, ref: 'Cases' }] 
},
{ timestamps: true });

module.exports = mongoose.model('Pet', PetSchema);