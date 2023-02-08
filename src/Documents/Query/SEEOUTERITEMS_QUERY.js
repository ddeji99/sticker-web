import { gql } from "@apollo/client";


export const SEEOUTERITEMS_QUERY = gql`
query seeOuteritems($cursor: Int) {
   seeOuteritems(cursor: $cursor) {
      ok
      message
      lastitemid
      item {
       id
       category
       title
       price
       image
       mimage
       laundryinfo
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