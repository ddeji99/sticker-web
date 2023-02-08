import { gql } from "@apollo/client";




 export const STORETOP_QUERY = gql`
     query storetop($cursor: Int) {
        storetop(cursor: $cursor) {
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