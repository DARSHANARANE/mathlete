import dotenv from "dotenv";
dotenv.config(); // ✅ MUST BE FIRST

import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";

import connectDB from "./config/db.js";
import typeDefs from "./schema/typeDefs.js";
import resolvers from "./schema/resolvers.js";
import authMiddleware from "./middleware/auth.js";
import uploadRoute from "./routes/upload.js";

const app = express();

app.use(cors());
app.use(bodyParser.json());

// 🔥 CONNECT DB AFTER ENV LOAD
await connectDB();

app.use("/upload", uploadRoute);

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
      return { user };
    },
  })
);

app.listen(5000, () => {
  console.log("🚀 Server running on http://localhost:5000/graphql");
});