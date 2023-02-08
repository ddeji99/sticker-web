import { gql } from "@apollo/client";




 export const STOREOUTER_QUERY = gql`
     query storeouter($cursor: Int) {
        storeouter(cursor: $cursor) {
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