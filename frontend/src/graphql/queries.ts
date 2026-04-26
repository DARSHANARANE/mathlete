import { gql } from "@apollo/client";

// ==============================
// STUDENT RESULTS (FRONT SIDE)
// ==============================
export const GET_STUDENT_RESULTS = gql`
  query GetStudentResults($class: String, $year: String) {
    getStudentResults(class: $class, year: $year) {
      id
      studentName
      rollNumber
      class
      schoolName
      score
      rank
      meritTitle
      year
    }
  }
`;


// ==============================
// RESULT FILES (ADMIN SIDE)
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

export const GET_YEARS = gql`
  query GetYears {
    getYears
  }
`;

export const GET_CLASSES = gql`
  query GetClasses($year: String) {
    getClasses(year: $year)
  }
`;