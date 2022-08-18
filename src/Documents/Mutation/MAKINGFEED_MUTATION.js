import { gql } from "@apollo/client";




export const MAKINGFEED_MUTATION = gql`
  mutation makingFeed($Lookid: Int!, $title: String!, $caption: String!) {
    makingFeed(Lookid: $Lookid, title: $title, caption: $caption) {
      ok
      message
      feed {
        id
        title
        caption
        createAt
        user {
            id
            gender
            isMe
            nickname
            avatar
        }
        Look {
            id
            title
            comboImage
            totalPrice
            item {
                id
                image
                detail
                price
                size
                color
            }
        }
      }
    }
  }
`;