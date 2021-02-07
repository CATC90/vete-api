const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const { graphqlExpress, graphiqlExpress } = require('apollo-server-express');
const { buildContext } = require("graphql-passport");

const { makeExecutableSchema } = require('graphql-tools');
const init = require('./src/app');

const models = require('./src/models');
const typeDefs = require('./src/schemas');
const resolvers = require('./src/resolvers');

const schema = makeExecutableSchema({
  typeDefs,
  resolvers
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

app.use('/graphql', bodyParser.json(), graphqlExpress({
        context: (req,res) => buildContext({req, res, ...models}), 
        graphiql: true,
        schema
    })
);

app.use('/graphiql', graphiqlExpress({
  endpointURL: '/graphql'
}));

/**
 * Make it secure
 * Test it with mongodb-memory-server
 */
