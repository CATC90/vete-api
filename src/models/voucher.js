const mongoose = require('mongoose');

const { Schema } = mongoose;

const VoucherSchema = new Schema({
    veterinary: {required: true, type: Schema.Types.ObjectId, ref: 'Veterinary', description: 'Veterinary that take the voucher'},
    customer: {required: true, type: Schema.Types.ObjectId, ref: 'Customer', description: 'Customer that emit the voucher'},
    description: {required: true, type: String, description: 'Description of the transaction'},
    paidWith: {required: true, type: String, enum: ['debit', 'credit', 'cash']},
    products: [{
        quantity: {type: Number, description: 'Quantity of products transacted'},
        product: { type: Schema.Types.ObjectId, ref: 'Product'},
    }]
},
{ timestamps: true });

module.exports = mongoose.model('Voucher', VoucherSchema);