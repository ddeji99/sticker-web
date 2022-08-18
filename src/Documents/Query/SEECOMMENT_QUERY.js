import { gql } from "@apollo/client";




export const SEECOMMENT_QUERY = gql`
  query seeComment($feedid: Int!, $cursor: Int) {
    seeComment(feedid: $feedid, cursor: $cursor) {
        ok
        message
        comments {
          id
          payload
          user {
            id
            nickname
            avatar
            isMe
          }
          isMine
          createAt
        }
      }
    }
`;