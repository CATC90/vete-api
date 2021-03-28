const mongoose = require('mongoose');
const isEmail = require('../libs/validators/isEmail');
const isPassword = require('../libs/validators/isPassword');
const { encryptPassword } = require('../libs/auth/password-utils');

const { Schema } = mongoose;

const VeterinarySchema = new Schema({
    name: String,
    lastName: String,
    secondLastName: String,
    fullName: String,
    age: Number,
    rut: String,
    phone: String,
    email: { type: String, required: true, validate: isEmail },
    password: { type: String, required: true, validate: isPassword },
    socialNetworks: [
        {
            type: { type: String, enum: ["twitter", "facebook", "instagram", "youtube"] },
            link: { type: String } 
        }
    ],
    _enabled: { type: Boolean, default: true }
},
{ timestamps: true });

VeterinarySchema.pre('save', async function(next){
    this.password = await encryptPassword(this.password)
    this.fullName = `${this.name} ${this.lastName} ${this.secondLastName}`
    next();
})

VeterinarySchema.index({ rut: 1 }, { unique: true})

module.exports = mongoose.model('Veterinary', VeterinarySchema);