import { gql } from "@apollo/client";


export const SEEBOTTOMITEMS_QUERY = gql`
query seeBottomitems($cursor: Int) {
   seeBottomitems(cursor: $cursor) {
      ok
      message
      lastitemid
      item {
       id
       category
       title
       price
       laundryinfo
       image
       mimage
       color
       size
       brand
       createAt
       updateAt
       iscart
       totalCarts
      }
   }
}

`;