const { PetGql } = require('../models/Pet');

const PetQuery = {
    petById: PetGql.getResolver("findById")
};

const PetMutation = {
    petCreateOne: PetGql.getResolver("createOne")
};

module.exports = {
    PetQuery,
    PetMutation    
};