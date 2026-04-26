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

  # ✅ UPDATED
  type ResultFile {
    id: ID!
    fileName: String!
    filePath: String
    year: String!
    className: String      # ✅ NEW
    heading: String        # ✅ NEW
    uploadedAt: String
  }

  type StudentResult {
    id: ID!
    studentName: String!
    rollNumber: String!
    class: String!
    schoolName: String!
    score: Int!
    rank: Int!
    meritTitle: String!
    year: String!
  }

  type Query {
    hello: String
    adminData: String

    getResultFiles: [ResultFile]
    getStudentResults(class: String, year: String): [StudentResult]

    getYears: [String]
    getClasses(year: String): [String]
  }

  # ✅ MERGED PROPERLY
  type Mutation {
    login(email: String!, password: String!): AuthResponse
    deleteResultFile(id: ID!): Boolean
  }
`;

export default typeDefs;