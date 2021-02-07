const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const { graphqlExpress, graphiqlExpress } = require('apollo-server-express');
const { buildContext } = require("graphql-passport");

const { makeExecutableSchema, addSchemaLevelResolver } = require('graphql-tools');
const init = require('./src/app');

const models = require('./src/models');
const typeDefs = require('./src/schemas');
const resolvers = require('./src/resolvers');
const { ensureAuthenticated } = require('./src/libs/auth/local-auth');

const freePaths = [
  "login"
]

const schema = makeExecutableSchema({
  typeDefs,
  resolvers
})

const realSchema = addSchemaLevelResolver(schema, (root, args, context, { fieldName }) => {
  const isFreePath = freePaths.includes(fieldName);
  return isFreePath ? null : ensureAuthenticated(context.req);
})

const app = express();
init(app);

// Start the server
app.listen(3001, async () => {
  console.log('Go to http://localhost:3001/graphiql to run queries!');
  await mongoose.connect("mongodb://localhost:27017/vete-api", {
      useUnifiedTopology: true,
      useNewUrlParser: true
  }).then(() => console.log('BD successfully connected'));
});

mongoose.connection.on('error', console.error.bind(console, "BD connection error!"));

app.use('/graphql', bodyParser.json(), graphqlExpress(req => ({
        context: () => buildContext({req, ...models}), 
        graphiql: true,
        schema: realSchema,
    }))
);

app.use('/graphiql', graphiqlExpress({
  endpointURL: '/graphql'
}));

/**
 * Make it secure
 * Test it with mongodb-memory-server
 */
