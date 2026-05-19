import "./config/env.js";


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


// ======================
// CORS
// ======================

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      process.env.FRONTEND_URL,
    ],
    credentials: true,
  })
);

app.use(bodyParser.json());


// ======================
// Connect DB
// ======================

await connectDB();


// ======================
// Path Fix
// ======================

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


// ======================
// Static Uploads
// ======================

app.use(
  "/uploads/result",
  express.static(path.join(__dirname, "../uploads/result"))
);


// ======================
// Upload Routes
// ======================

app.use("/api/upload", uploadRoute);


// ======================
// Health Check Route
// ======================

app.get("/", (req, res) => {
  res.send("API Running...");
});

app.get("/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Server healthy",
  });
});


// ======================
// Apollo Server
// ======================

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

await server.start();

app.use(
  "/graphql",
  express.json(),
  expressMiddleware(server, {
    context: async ({ req }) => {
      const user = await authMiddleware(req);
      return { user };
    },
  })
);

// ======================
// GLOBAL ERROR HANDLER
// ======================
app.use((err, req, res, next) => {
  console.error("Unhandled server error:", err);

  res.status(err?.status || 500).json({
    error: err?.message || "Internal Server Error",
  });
});

// ======================
// PORT
// ======================

const PORT = process.env.PORT || 5000;

const serverInstance = app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});

serverInstance.on("error", (err) => {
  if (err.code === "EADDRINUSE") {
    console.error(`Port ${PORT} is already in use. Stop the other process or set a different PORT in .env.`);
    process.exit(1);
  }

  console.error("Server error:", err);
});