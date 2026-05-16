import { gql } from "@apollo/client";

// ==============================
// STUDENT FLOW
// ==============================

// Step 1: Get Years
export const GET_YEARS = gql`
  query GetYears {
    getYears
  }
`;

// Step 2: Get Classes
export const GET_CLASSES = gql`
  query GetClasses($year: String!) {
    getClasses(year: $year)
  }
`;

// Step 3: Get File (MAIN)
export const GET_RESULT_FILE = gql`
  query GetResultFile($year: String!, $className: String!) {
    getResultFileByClass(year: $year, className: $className) {
      fileName
      filePath
      year
      className
      heading
    }
  }
`;

// ==============================
// ADMIN SIDE
// ==============================

export const GET_RESULT_FILES = gql`
  query GetResultFiles {
    getResultFiles {
      id
      fileName
      filePath
      year
      className
      heading
      uploadedAt
    }
  }
`;

export const GET_PDFS = gql`
  query GetPdfs {
    getPdfs {
      id
      fileName
      title
      className
      level
      year
      pages
      price
      uploadedAt
    }
  }
`;

export const GET_Orders = gql`
  query GetOrders {
    getOrders {
      id
      amount
      razorpayOrderId
      razorpayPaymentId
      createdAt
      fileUrl
      status
}
}
`;
export const GET_CONTACTS = gql`
  query GetContacts {
    getContacts {
      id
      name
      email
      subject
      message
      createdAt
    }
  }
`;

// ======================
// GET BOOKS
// ======================
export const GET_BOOKS = gql`
  query GetBooks {
    getBooks {
      id
      title
      description
      className
      level
      price
      createdAt
    }
  }
`;


// ======================
// CREATE BOOK
// ======================
export const CREATE_BOOK = gql`
  mutation CreateBook(
    $title: String!
    $description: String
    $className: String!
    $level: String
    $price: Float!
  ) {
    createBook(
      title: $title
      description: $description
      className: $className
      level: $level
      price: $price
    ) {
      id
      title
      price
    }
  }
`;


// ======================
// CREATE BOOK ORDER
// ======================
export const CREATE_BOOK_ORDER = gql`
  mutation CreateBookOrder(
    $bookId: ID!
    $studentName: String!
    $mobile: String!
    $email: String!
    $address: String!
    $pincode: String!
    $amount: Float!
    $razorpayPaymentId: String
  ) {
    createBookOrder(
      bookId: $bookId
      studentName: $studentName
      mobile: $mobile
      email: $email
      address: $address
      pincode: $pincode
      amount: $amount
      razorpayPaymentId: $razorpayPaymentId
    ) {
      id
      status
      amount
    }
  }
`;


// ======================
// GET BOOK ORDERS
// ======================
export const GET_BOOK_ORDERS = gql`
  query GetBookOrders {
    getBookOrders {
      id
      studentName
      mobile
      email
      address
      pincode
      amount
      status
      razorpayPaymentId
      createdAt

      book {
        id
        title
        className
        level
        price
      }
    }
  }
`;