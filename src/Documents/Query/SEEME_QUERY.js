import { gql } from "@apollo/client";



export const SEEME_QUERY = gql`
  query seeMe {
    seeMe {
      ok
      message
      user {
        id
        nickname
        isMe
        gender
        avatar
      }
      
    }
  }
`;