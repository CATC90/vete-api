const mongoose = require('mongoose');

const { Schema } = mongoose;

const VeterinarySchema = new Schema({
    name: String,
    lastName: String,
    secondLastName: String,
    fullName: String,
    age: Number,
    rut: String,
    phone: String,
    email: String,
    socialNetworks: [
        {
            type: { type: String, enum: ["twitter", "facebook", "instagram", "youtube"] },
            link: { type: String } 
        }
    ],
    _enabled: { type: Boolean, default: true }
},
{ timestamps: true });

VeterinarySchema.pre('save', function(next){
    this.fullName = `${this.name} ${this.lastName} ${this.secondLastName}`
    next();
})


module.exports = mongoose.model('veterinary', VeterinarySchema);