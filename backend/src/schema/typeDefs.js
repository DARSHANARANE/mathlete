import { gql } from "graphql-tag";

const typeDefs = gql`
  # =========================
  # REQUIRED FOR FILE UPLOAD
  # =========================
  scalar Upload

  # =========================
  # USER
  # =========================
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
  # PDF
  # =========================
  type Pdf {
    id: ID!
    fileName: String!
    filePath: String!
    title: String
    className: String
    level: String
    year: String
    pages: Int
    price: Float
    uploadedAt: String
  }

  # =========================
  # BOOK
  # =========================
  type Book {
    id: ID!
    title: String!
    description: String
    className: String!
    level: String
    price: Float!
    createdAt: String
  }

  # =========================
  # BOOK ORDER
  # =========================
  type BookOrder {
    id: ID!
    studentName: String!
    mobile: String!
    email: String!
    address: String!
    pincode: String!
    amount: Float!
    razorpayPaymentId: String
    status: String
    createdAt: String
    book: Book
  }

  # =========================
  # CONTACT
  # =========================
  type Contact {
    id: ID!
    name: String!
    email: String!
    subject: String
    message: String!
    status: String
    createdAt: String
  }

  # =========================
  # ORDER
  # =========================
  type Order {
    id: ID!
    amount: Float
    razorpayOrderId: String
    razorpayPaymentId: String
    createdAt: String
    fileUrl: String
    status: String
  }

  # =========================
  # QUERY
  # =========================
  type Query {
    hello: String

    adminData: String

    # =====================
    # RESULT FILES
    # =====================
    getResultFiles: [ResultFile]

    getYears: [String]

    getClasses(year: String): [String]

    getResultFileByClass(
      year: String!
      className: String!
    ): ResultFile

    # =====================
    # PDF
    # =====================
    getPdfs: [Pdf]

    getPdf(id: ID!): Pdf

    # =====================
    # ORDERS
    # =====================
    getOrders: [Order]

    # =====================
    # CONTACTS
    # =====================
    getContacts: [Contact]

    # =====================
    # BOOKS
    # =====================
    getBooks: [Book]

    # =====================
    # BOOK ORDERS
    # =====================
    getBookOrders: [BookOrder]
  }

  # =========================
  # MUTATION
  # =========================
  type Mutation {
    # =====================
    # LOGIN
    # =====================
    login(
      email: String!
      password: String!
    ): AuthResponse

    # =====================
    # RESULT FILE
    # =====================
    deleteResultFile(id: ID!): Boolean

    # =====================
    # PDF
    # =====================
    uploadPdf(
      file: Upload!
      title: String
      className: String
      year: String
      pages: Int
      price: Float!
    ): Pdf

    deletePdf(id: ID!): Boolean

    # =====================
    # CONTACT
    # =====================
    createContact(
      name: String!
      email: String!
      subject: String
      message: String!
    ): Contact

    # =====================
    # CREATE BOOK
    # =====================
    createBook(
      title: String!
      description: String
      className: String!
      level: String
      price: Float!
    ): Book

    # =====================
    # CREATE BOOK ORDER
    # =====================
    createBookOrder(
      bookId: ID!
      studentName: String!
      mobile: String!
      email: String!
      address: String!
      pincode: String!
      amount: Float!
      razorpayPaymentId: String
    ): BookOrder
  }
`;

export default typeDefs;