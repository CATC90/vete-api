const customerSchema = require('./customer');
const petSchema = require('./pet');
const tagSchema = require('./tag');
const productSchema = require('./product');
const veterinarySchema = require('./veterinary');
const voucherSchema = require('./voucher');
const casesSchema = require('./cases');
const notesSchema = require('./notes');
const tokenSchema = require('./token');


module.exports = `
    scalar Object

    enum Models {
        Product
        Veterinary
        Cases
        Note
        Customer
        Pet
        Voucher
    }

    input PaginationInput {
        offset: Int
        page: Int
        limit: Int
        sort: Object
        populate: String
    }

    type PaginatedResult {
        docs: [Schemas]
        offset: Int!
        page: Int!
        limit: Int!
        hasNextPage: Boolean!
        hasPrevPage: Boolean!
        totalDocs: Int!
        prevPage: Int!
        pagingCounter: Int!
        nextPage: Int!
        totalPages: Int!
    }

    union Schemas = Product | Veterinary

    type Query {
        paginate(model: Models!, query: Object, pagination: PaginationInput): PaginatedResult!
    }

    type Mutation {
        _empty: String
    }
`.concat(
    tokenSchema,
    notesSchema,
    casesSchema,
    customerSchema, 
    petSchema, 
    tagSchema, 
    productSchema, 
    veterinarySchema,
    voucherSchema
);