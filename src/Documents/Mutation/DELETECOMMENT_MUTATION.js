import { gql } from "@apollo/client";




export const DELETECOMMENT_MUTATION = gql`
  mutation deleteComment($commentid: Int!) {
    deleteComment(commentid: $commentid) {
      ok
      message
      id
    }
  }
`;