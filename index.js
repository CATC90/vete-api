const express = require('express');
const { graphqlExpress, graphiqlExpress } = require('apollo-server-express');
const { buildContext } = require("graphql-passport");
const { logger } = require('./src/libs/logger');

const { makeExecutableSchema, addSchemaLevelResolver } = require('graphql-tools');
const init = require('./src/app');

const models = require('./src/models');
const typeDefs = require('./src/schemas');
const resolvers = require('./src/resolvers');
const { ensureAuthenticated } = require('./src/libs/auth/local-auth');

const freePaths = [
  "login",
  "paginate",
  "createVeterinary"
]

const schema = makeExecutableSchema({
  typeDefs,
  resolvers
})

const realSchema = addSchemaLevelResolver(schema, async (root, args, context, { fieldName }) => {
  const isFreePath = freePaths.includes(fieldName)
  if( !isFreePath ){
    await ensureAuthenticated(context.req);
  }
  const { headers, body, params, query } = context.req;
  logger.info('Incoming request : ', { headers, body, params, query });
})

const app = express();
app.use(express.json());


// Start the server
app.listen(3001, async () => {
  await init(app);
  logger.info('Go to http://localhost:3001/graphiql to run queries!');
});

app.use('/graphql', graphqlExpress(req => ({
        context: () => buildContext({req, ...models}), 
        graphiql: true,
        schema: realSchema,
        formatError: err => {
          logger.error(err.message, err.stack);
          return err;
        }
    }))
);

app.use('/graphiql', graphiqlExpress({
  endpointURL: '/graphql'
}));
