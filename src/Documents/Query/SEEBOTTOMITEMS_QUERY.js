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
       image
       color
       size
       brand
       createAt
       updateAt
      }
   }
}

`;