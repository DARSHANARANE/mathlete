import dotenv from "dotenv";
dotenv.config();

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

import path from "path";
import { fileURLToPath } from "url";

const app = express();

app.use(cors());
app.use(bodyParser.json());

// ✅ CONNECT DB
await connectDB();

// ✅ FIX PATH (VERY IMPORTANT)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ✅ SERVE FILES
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

// ✅ UPLOAD ROUTE (FINAL)
app.use("/api/upload", uploadRoute);

// ✅ GRAPHQL
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