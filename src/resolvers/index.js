const  { merge } = require('lodash');

const customerResolver = require('./customer');
const petResolver = require('./pet');
const productResolver = require('./product');
const tagResolver = require('./tag');
const veterinaryResolver = require('./veterinary');
const voucherResolver = require('./voucher');
const casesResolver = require('./cases');
const tokenResolver = require('./token');
const notesResolver = require('./notes');
const replaceOperatorSyntax = require('../libs/mongoose-utils/syntax');

const mapModel = {
    products: 'Product',
    veterinaries: 'Veterinary',
    vouchers: 'Voucher',
    tags: 'Tag',
    customers: 'Customer',
    cases: 'Cases',
    notes: 'Note'
}

const defaults = {
    page:1,
    limit:10
};

const generalResolvers = {
    Schemas: {
        __resolveType: ({constructor}) => {
            return mapModel[constructor.collection.name];
          }
    },
    Query: {
        paginate: async (_, {model, query = {}, pagination}, ctx ) => {
            const json = replaceOperatorSyntax(query);
            const options = {...defaults, ...pagination}
            const result = await ctx[model].paginate(json, options);

            return result;
        }
    }
};

module.exports = merge(
    generalResolvers, 
    tokenResolver,
    notesResolver,
    casesResolver, 
    customerResolver, 
    petResolver, 
    productResolver, 
    tagResolver, 
    veterinaryResolver,
    voucherResolver);