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
    $year: String
    $pages: Int
    $price: Float!
  ) {
    uploadPdf(
      file: $file
      title: $title
      className: $className
      year: $year
      pages: $pages
      price: $price
    ) {
      id
      fileName
      pages
      price
      title
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