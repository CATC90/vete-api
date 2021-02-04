const { VeterinaryGql } = require('../models/veterinary');

const VeterinaryQuery = {
    veterinaryById: VeterinaryGql.getResolver("findById")
};

const VeterinaryMutation = {
    veterinaryCreateOne: VeterinaryGql.getResolver("createOne")
};

module.exports = {
    VeterinaryQuery,
    VeterinaryMutation    
};