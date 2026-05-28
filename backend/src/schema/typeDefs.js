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

    razorpayOrderId: String
    razorpayPaymentId: String

    invoiceNumber: String

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
  # PDF ORDER
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
  # RAZORPAY ORDER
  # =========================
  type RazorpayOrder {
    id: ID!
    amount: Int!
    currency: String!
  }

  # =========================
  # PDF PAYMENT RESPONSE
  # =========================
  type VerifyPdfPaymentResponse {
    success: Boolean!

    message: String!

    downloadUrl: String

    orderId: String

    razorpayOrderId: String

    razorpayPaymentId: String

    amount: Float
  }

  # =========================
  # BOOK PAYMENT RESPONSE
  # =========================
  type VerifyBookPaymentResponse {
    success: Boolean!

    message: String!

    orderId: String

    razorpayOrderId: String

    razorpayPaymentId: String

    amount: Float

    invoiceNumber: String
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

    # RESULT YEARS
    getResultYears: [String]

    # PDF YEARS
    getPdfYears: [String]

    getClasses(year: String): [String]

    getPdfs(
      level: String
    ): [Pdf]

    getResultFileByClass(
      year: String!
      className: String!
    ): ResultFile

    # =====================
    # PDF
    # =====================
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
    deleteResultFile(
      id: ID!
    ): Boolean

    # =====================
    # PDF
    # =====================
    uploadPdf(
      file: Upload!
      title: String
      className: String
      level: String
      year: String
      pages: Int
      price: Float!
    ): Pdf

    deletePdf(
      id: ID!
    ): Boolean

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
    # BOOK
    # =====================
    createBook(
      title: String!
      description: String
      className: String!
      level: String
      price: Float!
    ): Book
    
    deleteBook(id: ID!): Boolean!
    # =====================
    # COMMON RAZORPAY ORDER
    # =====================
    createRazorpayOrder(
      amount: Int!
    ): RazorpayOrder

    # =====================
    # VERIFY PDF PAYMENT
    # =====================
    verifyPdfPayment(
      pdfId: ID!

      amount: Float!

      razorpay_order_id: String!
      razorpay_payment_id: String!
      razorpay_signature: String!

    ): VerifyPdfPaymentResponse

    # =====================
    # VERIFY BOOK PAYMENT
    # =====================
    verifyBookPayment(
      bookId: ID!

      studentName: String!
      mobile: String!
      email: String!
      address: String!
      pincode: String!

      amount: Float!

      razorpay_order_id: String!
      razorpay_payment_id: String!
      razorpay_signature: String!

    ): VerifyBookPaymentResponse
  }
`;

export default typeDefs;