const mongoose = require('mongoose');
const { composeWithMongoose } = require('graphql-compose-mongoose');

const { Schema } = mongoose;

const PetSchema = new Schema({
    name: String,
    age: Number,
},
{ timestamps: true });

module.exports = {
    PetSchema: mongoose.model('Pet', PetSchema),
    PetGql: composeWithMongoose(mongoose.model('Pet', PetSchema))
}