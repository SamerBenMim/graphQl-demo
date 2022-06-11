import { GraphQLServer, PubSub } from "graphql-yoga";
import { Query } from "./resolvers/Query.mjs";
import { Mutation } from "./resolvers/Mutation.mjs";
import { Subscription } from "./resolvers/Subscription.mjs";
import { Todo } from "./resolvers/Todo.mjs";
import { User } from "./resolvers/User.mjs";

import { db } from "./db/db.mjs";
// ... or using `require()`
// const { GraphQLServer } = require('graphql-yoga')

// Définir le schéma de graphQl
// Notre contrat ce que nous offrons à travers notre serveur graphQl
const typeDefs = "src/schema/schema.graphql";
const pubsub = new PubSub();
// Implémentation de notre contrat
const resolvers = {
  Query,
  Mutation,
  Subscription,
  Todo,
  User,
};

const server = new GraphQLServer({
  typeDefs,
  resolvers,
  context: {
    db,
    pubsub,
  },
});

const t  = {
  "query": "query todos($limit: Int!) { id name }",
  "operationName": "getTodos",
  "variables": { "limit": "5" }
}

const options = {
  cors: {
    origin: "http://localhost:4200",
    credentials: true, 
  },
};
server.start(options, () =>
  console.log("Techwall Server is running on localhost:4000")
);
