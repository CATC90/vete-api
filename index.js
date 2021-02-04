const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const { graphqlHTTP } = require('express-graphql');
const extensions = ({context}) => ({ runTime: Date.now() - context.startTime});
const schema = require('./src/schema-builder');

const app = express();

// Start the server
app.listen(3000, async () => {
  console.log('Go to http://localhost:3000/graphiql to run queries!');
  await mongoose.connect("mongodb://localhost:27017/vete-api", {
      useUnifiedTopology: true,
      useNewUrlParser: true
  }).then(() => console.log('BD successfully connected'));
});

mongoose.connection.on('error', console.error.bind(console, "BD connection error!"));

// The GraphQL endpoint
app.use('/graphql', bodyParser.json(), graphqlHTTP(request => ({
        context: {startTime: Date.now() }, 
        graphiql: true,
        schema,
        extensions 
    })
));

