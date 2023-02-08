import { gql } from "@apollo/client";


export const SEEBESTITEM_QUERY = gql`
query seebestitem($cursor: Int) {
   seebestitem(cursor: $cursor) {
      ok
      message
      lastitemid
      items {
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