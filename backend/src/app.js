import express from "express";
import cors from "cors";
import bodyParser from "body-parser";

import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";

import typeDefs from "./schema/typeDefs.js";
import resolvers from "./schema/resolvers.js";
import authMiddleware from "./middleware/auth.js";
const app = express();

// middlewares
app.use(cors());
app.use(express.json());

// test route
app.get("/", (req, res) => {
  res.send("API running 🚀");
});

// GraphQL setup
const startServer = async () => {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });

  await server.start();

  app.use(
    "/graphql",
    cors(),
    bodyParser.json(),
  expressMiddleware(server, {
  context: async ({ req }) => {
    const user = await authMiddleware(req);
    return { req, user };
  },
})
  );

  console.log("🚀 GraphQL ready at http://localhost:5000/graphql");
};

await startServer();

export default app;