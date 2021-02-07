const mongoose = require('mongoose');

const { Schema } = mongoose;

const ProductSchema = new Schema({
    name: { type: String, description: 'Name of the product'},
    type: { type: String, enum: ['supplies', 'services'], required: true },
    price: {type: Number, required: true, validate: val => val >= 100 },
    discount: {type: Number, validate: val => val >= 0 && val <= 90, default: 0 },
    tags: [{type: Schema.Types.ObjectId, ref: 'Tag'}]
},
{ timestamps: true });

module.exports = mongoose.model('Product', ProductSchema);