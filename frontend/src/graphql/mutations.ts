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