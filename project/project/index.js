const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const connectDB = require('./config/db');
const {ApolloServer} = require('apollo-server-express');
const typeDefs = require('./graphql/typeDefs');
const resolvers = require('./graphql/resolvers');



const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(cors());


connectDB();

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({req}) => ({req}),
    introspection: true,
    playground: true,
})

server.applyMiddleware({app});

app.listen(5900,() => {
    console.log("apollo server is running on Port 5900");
})