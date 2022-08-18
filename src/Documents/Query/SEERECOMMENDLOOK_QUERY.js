import { gql } from "@apollo/client";



export const SEERECOMMENDLOOK_QUERY = gql`
  query seerecommendlook {
    seerecommendlook {
      ok
      message
      Look {
        id
        title
        comboImage
        totalPrice
        item {
            id
            title
            size
            detail
            color
            price
            image
            category
        }
      }
      
    }
  }
`;