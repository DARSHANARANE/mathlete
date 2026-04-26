import express from "express";
import cors from "cors";

import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";

import typeDefs from "./schema/typeDefs.js";
import resolvers from "./schema/resolvers.js";
import authMiddleware from "./middleware/auth.js";
import uploadRoutes from "./routes/upload.js";

const app = express();

// middlewares
app.use(cors());
app.use(express.json());

// ✅ Serve uploaded files (IMPORTANT)
app.use("/uploads", express.static("uploads"));

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
    expressMiddleware(server, {
      context: async ({ req }) => {
        const user = await authMiddleware(req);
        return { req, user };
      },
    })
  );

  console.log("🚀 GraphQL ready at http://localhost:5000/graphql");
};

// REST routes
app.use("/api/upload", uploadRoutes);

await startServer();

export default app;