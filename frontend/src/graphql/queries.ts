import { gql } from "@apollo/client";

// ==============================
// AUTH
// ==============================

export const LOGIN = gql`
  mutation Login(
    $email: String!
    $password: String!
  ) {
    login(
      email: $email
      password: $password
    ) {
      token

      user {
        name
        email
      }
    }
  }
`;

// ==============================
// RESULT FILE
// ==============================

export const DELETE_RESULT_FILE =
  gql`
    mutation DeleteResultFile(
      $id: ID!
    ) {
      deleteResultFile(id: $id)
    }
  `;

// ==============================
// PDF
// ==============================

export const UPLOAD_PDF = gql`
  mutation UploadPdf(
    $file: Upload!
    $title: String
    $className: String
    $level: String
    $year: String
    $pages: Int
    $price: Float!
  ) {
    uploadPdf(
      file: $file
      title: $title
      className: $className
      level: $level
      year: $year
      pages: $pages
      price: $price
    ) {
      id
      fileName
      pages
      price
      title
      level
    }
  }
`;

export const DELETE_PDF = gql`
  mutation DeletePdf($id: ID!) {
    deletePdf(id: $id)
  }
`;

// ==============================
// CONTACT
// ==============================

export const CREATE_CONTACT =
  gql`
    mutation CreateContact(
      $name: String!

      $email: String!

      $subject: String

      $message: String!
    ) {
      createContact(
        name: $name

        email: $email

        subject: $subject

        message: $message
      ) {
        id
      }
    }
  `;

// ==============================
// BOOK
// ==============================

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

// ==============================
// CREATE RAZORPAY ORDER
// ==============================

export const CREATE_RAZORPAY_ORDER =
  gql`
    mutation CreateRazorpayOrder(
      $amount: Int!
    ) {
      createRazorpayOrder(
        amount: $amount
      ) {
        id
        amount
        currency
      }
    }
  `;

// ==============================
// VERIFY PDF PAYMENT
// ==============================

export const VERIFY_PDF_PAYMENT =
  gql`
    mutation VerifyPdfPayment(
      $pdfId: ID!

      $amount: Float!

      $razorpay_order_id: String!

      $razorpay_payment_id: String!

      $razorpay_signature: String!
    ) {
      verifyPdfPayment(
        pdfId: $pdfId

        amount: $amount

        razorpay_order_id:
          $razorpay_order_id

        razorpay_payment_id:
          $razorpay_payment_id

        razorpay_signature:
          $razorpay_signature
      ) {
        success
        message
        downloadUrl
      }
    }
  `;

// ==============================
// VERIFY BOOK PAYMENT
// ==============================

export const VERIFY_BOOK_PAYMENT =
  gql`
    mutation VerifyBookPayment(
      $bookId: ID!

      $studentName: String!

      $mobile: String!

      $email: String!

      $address: String!

      $pincode: String!

      $amount: Float!

      $razorpay_order_id: String!

      $razorpay_payment_id: String!

      $razorpay_signature: String!
    ) {
      verifyBookPayment(
        bookId: $bookId

        studentName: $studentName

        mobile: $mobile

        email: $email

        address: $address

        pincode: $pincode

        amount: $amount

        razorpay_order_id:
          $razorpay_order_id

        razorpay_payment_id:
          $razorpay_payment_id

        razorpay_signature:
          $razorpay_signature
      ) {
        success

        message

        orderId

        razorpayOrderId

        razorpayPaymentId

        amount

        invoiceNumber
      }
    }
  `;

// ==============================
// STUDENT FLOW
// ==============================

export const GET_PDF_YEARS = gql`
  query GetPdfYears {
    getPdfYears
  }
`;

export const GET_RESULT_YEARS = gql`
  query GetResultYears {
    getResultYears
  }
`;

// GET CLASSES
export const GET_CLASSES = gql`
  query GetClasses(
    $year: String!
  ) {
    getClasses(year: $year)
  }
`;

// GET RESULT FILE
export const GET_RESULT_FILE =
  gql`
    query GetResultFile(
      $year: String!

      $className: String!
    ) {
      getResultFileByClass(
        year: $year

        className: $className
      ) {
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

export const GET_RESULT_FILES =
  gql`
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
      filePath
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

export const GET_ORDERS = gql`
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

// ==============================
// BOOKS
// ==============================

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

// ==============================
// BOOK ORDERS
// ==============================

export const GET_BOOK_ORDERS =
  gql`
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

        razorpayOrderId

        razorpayPaymentId

        invoiceNumber

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