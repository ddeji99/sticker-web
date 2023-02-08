import { gql } from "@apollo/client";




export const MAKINGFEED_MUTATION = gql`
  mutation makingFeed($Lookid: Int!, $title: String!, $caption: String!, $category: String) {
    makingFeed(Lookid: $Lookid, title: $title, caption: $caption, category: $category) {
      ok
      message
      feed {
        id
        title
        caption
        category
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
                category
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