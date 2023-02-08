import { gql } from "@apollo/client";




 export const STOREMALE_QUERY = gql`
     query storemale($cursor: Int) {
        storemale(cursor: $cursor) {
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