import { gql } from "@apollo/client";




export const DELETELOOK_MUTATION = gql`
  mutation deleteLook($lookid: Int!) {
    deleteLook(lookid: $lookid) {
      ok
      message
      look {
        id
        title
        totalPrice
        comboImage
        item {
           id
           title
           price
           detail
           image
           color
           size
        }
      }
    }
  }
`;