const  { merge } = require('lodash');

const customerResolver = require('./customer');
const petResolver = require('./pet');
const productResolver = require('./product');
const tagResolver = require('./tag');
const veterinaryResolver = require('./veterinary');
const voucherResolver = require('./voucher');
const casesResolver = require('./cases');
const tokenResolver = require('./token');


const resolver = {};

module.exports = merge(
    tokenResolver,
    resolver, 
    casesResolver, 
    customerResolver, 
    petResolver, 
    productResolver, 
    tagResolver, 
    veterinaryResolver,
    voucherResolver);