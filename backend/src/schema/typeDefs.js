import { gql } from "graphql-tag";

const typeDefs = gql`
  type User {
    id: ID!
    name: String!
    email: String!
    role: String!
  }

  type AuthResponse {
    token: String!
    user: User!
  }

  # ✅ Result File (Main Data Source)
  type ResultFile {
    id: ID!
    fileName: String!
    filePath: String
    year: String!
    className: String
    heading: String
    uploadedAt: String
  }

  type Query {
    hello: String
    adminData: String

    # Admin
    getResultFiles: [ResultFile]

    # Student Flow
    getYears: [String]
    getClasses(year: String): [String]

    # ✅ NEW (MOST IMPORTANT)
    getResultFileByClass(year: String!, className: String!): ResultFile
  }

  type Mutation {
    login(email: String!, password: String!): AuthResponse
    deleteResultFile(id: ID!): Boolean
  }
`;

export default typeDefs;