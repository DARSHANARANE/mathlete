import { gql } from "graphql-tag";

const typeDefs = gql`
  # ✅ REQUIRED FOR FILE UPLOAD
  scalar Upload

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

  # =========================
  # RESULT FILE
  # =========================
  type ResultFile {
    id: ID!
    fileName: String!
    filePath: String
    year: String!
    className: String
    heading: String
    uploadedAt: String
  }

  # =========================
  # PDF (NEW FEATURE)
  # =========================
  type Pdf {
    id: ID!
    fileName: String!
    filePath: String!
    title: String
    className: String
    year: String
    pages: Int
    price: Float
    uploadedAt: String
  }
  type Contact {
    id: ID!
    name: String!
    email: String!
    subject: String
    message: String!
    status: String
    createdAt: String
  }
  type Query {
    hello: String
    adminData: String

    # Admin
    getResultFiles: [ResultFile]

    # Student Flow
    getYears: [String]
    getClasses(year: String): [String]

    getResultFileByClass(year: String!, className: String!): ResultFile

    # ✅ PDF
    getPdfs: [Pdf]
    getPdf(id: ID!): Pdf

    getOrders: [Order]
    getContacts: [Contact]
  }

  type Mutation {
    login(email: String!, password: String!): AuthResponse

    deleteResultFile(id: ID!): Boolean

    # ✅ PDF Upload
    uploadPdf(
      file: Upload!
      title: String
      className: String
      year: String
      pages: Int
      price: Float!
    ): Pdf

    # ✅ ADD THIS (IMPORTANT)
    deletePdf(id: ID!): Boolean
    
    createContact(
      name: String!
      email: String!
      subject: String
      message: String!
    ): Contact
  }

    type Order {
    id: ID!
    amount: Float
    razorpayOrderId: String
    razorpayPaymentId: String
    createdAt: String
    fileUrl: String
    status: String
  }

`;

export default typeDefs;