const customerSchema = require('./customer');
const petSchema = require('./pet');
const tagSchema = require('./tag');
const productSchema = require('./product');
const veterinarySchema = require('./veterinary');
const voucherSchema = require('./voucher');
const casesSchema = require('./cases');
const notesSchema = require('./notes');


module.exports = `
    type Query {
        _empty: String
    }
    type Mutation {
        _empty: String
    }
`.concat(
    notesSchema,
    casesSchema,
    customerSchema, 
    petSchema, 
    tagSchema, 
    productSchema, 
    veterinarySchema,
    voucherSchema
);