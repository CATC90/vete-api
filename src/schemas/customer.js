const { CustomerGql } = require('../models/Customer');

const CustomerQuery = {
    customerById: CustomerGql.getResolver("findById")
};

const CustomerMutation = {
    customerCreateOne: CustomerGql.getResolver("createOne")
};

module.exports = {
    CustomerQuery,
    CustomerMutation    
};