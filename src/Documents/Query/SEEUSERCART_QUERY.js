import { gql } from "@apollo/client";




 export const SEEUSERCART_QUERY = gql`
     query seeusercart($cursor: Int, $nickname: String) {
        seeusercart(cursor: $cursor, nickname: $nickname) {
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