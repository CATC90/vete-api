const { SchemaComposer } = require('graphql-compose');

const schemaComposer = new SchemaComposer();

const { queries, mutation } = require('./relations')

schemaComposer.Query.addFields(queries);

schemaComposer.Mutation.addFields(mutation);

module.exports = schemaComposer.buildSchema();