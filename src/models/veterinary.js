const mongoose = require('mongoose');
const { composeWithMongoose } = require('graphql-compose-mongoose');

const { Schema } = mongoose;

const VeterinarySchema = new Schema({
    name: String,
    lastName: String,
    secondLastName: String,
    age: Number,
    rut: String
},
{ timestamps: true });

module.exports = {
    VeterinarySchema: mongoose.model('veterinary', VeterinarySchema),
    VeterinaryGql: composeWithMongoose(mongoose.model('veterinary', VeterinarySchema))
}