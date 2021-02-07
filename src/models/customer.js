const mongoose = require('mongoose');

const { Schema } = mongoose;

const CustomerSchema = new Schema({
    name: String,
    lastName: String,
    secondLastName: String,
    fullName: String,
    email: String,
    age: { type: Number, validate: val => val < 100 },
    rut: String,
    pets: [{ type: Schema.Types.ObjectId, ref: 'Pet'}],
    _enabled: { type: Boolean, default: true }
},
{ timestamps: true });

CustomerSchema.pre('save', function(next){
    this.fullName = `${this.name} ${this.lastName} ${this.secondLastName}`
    next();
})

module.exports = mongoose.model('Customer', CustomerSchema);