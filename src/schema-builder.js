const { SchemaComposer } = require('graphql-compose');

const schemaComposer = new SchemaComposer();

const { VeterinaryQuery, VeterinaryMutation } = require('./schemas/veterinary');
const { CustomerQuery, CustomerMutation } = require('./schemas/customer');
const { PetQuery, PetMutation } = require('./schemas/pet');

schemaComposer.Query.addFields({
    ...PetQuery,
    ...VeterinaryQuery,
    ...CustomerQuery,
})

schemaComposer.Mutation.addFields({
    ...PetMutation,
    ...VeterinaryMutation,
    ...CustomerMutation,
})

module.exports = schemaComposer.buildSchema();