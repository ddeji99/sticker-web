import { gql } from "@apollo/client";




export const CREATECOMMENT_MUTATION = gql`
  mutation createComment($feedid: Int!, $payload: String!) {
    createComment(feedid: $feedid, payload: $payload) {
      ok
      message
      id
    }
  }
`;