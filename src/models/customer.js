const mongoose = require('mongoose');
const { composeWithMongoose } = require('graphql-compose-mongoose');

const { Schema } = mongoose;

const CustomerSchema = new Schema({
    name: String,
    lastName: String,
    secondLastName: String,
    fullName: String,
    age: { type: Number, validate: val => val < 100 },
    rut: String,
    pet: { type: Schema.Types.ObjectId, ref: 'Pet'}
},
{ timestamps: true });

CustomerSchema.pre('save', function(next){
    this.fullName = `${this.name} ${this.lastName} ${this.secondLastName}`
    next();
})

module.exports = {
    CustomerSchema: mongoose.model('Customer', CustomerSchema),
    CustomerGql: composeWithMongoose(mongoose.model('Customer', CustomerSchema))
}