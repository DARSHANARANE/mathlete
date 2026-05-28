import { gql } from "@apollo/client";

export const LOGIN = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        name
        email
      }
    }
  }
`;

export const DELETE_RESULT_FILE = gql`
  mutation DeleteResultFile($id: ID!) {
    deleteResultFile(id: $id)
  }
`;

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

export const CREATE_CONTACT = gql`
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
// CREATE RAZORPAY ORDER
// ==============================

export const CREATE_RAZORPAY_ORDER = gql`
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

        orderId

        razorpayOrderId

        razorpayPaymentId

        amount
      }
    }
  `;

// ==============================
// VERIFY BOOK PAYMENT
// ==============================

export const VERIFY_BOOK_PAYMENT = gql`
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
      razorpay_order_id: $razorpay_order_id
      razorpay_payment_id: $razorpay_payment_id
      razorpay_signature: $razorpay_signature
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
export const DELETE_BOOK = gql`
  mutation DeleteBook($id: ID!) {
    deleteBook(id: $id)
  }
`;