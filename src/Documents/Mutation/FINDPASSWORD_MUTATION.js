import { gql } from "@apollo/client";




export const FINDPASSWORD_MUTATION = gql`
  mutation findpassword($email: String!) {
    findpassword(email: $email) {
      ok
      message
    }
  }
`;