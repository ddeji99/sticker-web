import { gql } from "@apollo/client";




 export const STOREFEMALE_QUERY = gql`
     query storefemale($cursor: Int) {
        storefemale(cursor: $cursor) {
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