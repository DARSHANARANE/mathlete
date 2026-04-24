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

  type Query {
    hello: String
    adminData: String
  }

  type Mutation {
    login(email: String!, password: String!): AuthResponse
  }
`;

export default typeDefs;