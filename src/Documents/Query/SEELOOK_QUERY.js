import { gql } from "@apollo/client";



export const SEELOOK_QUERY = gql`
  query seeLook($lookid: Int!)  {
    seeLook(lookid: $lookid) {
      ok
      message
      look {
        id
        title
        comboImage
        totalPrice
        item {
            id
            title
            size
            category
            laundryinfo
            detail
            color
            price
            image
            mimage
            category
        }
      }
      
    }
  }
`;