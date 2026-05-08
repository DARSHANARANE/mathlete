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