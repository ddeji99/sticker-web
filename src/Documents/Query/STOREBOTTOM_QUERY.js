import { gql } from "@apollo/client";




 export const STOREBOTTOM_QUERY = gql`
     query storebottom($cursor: Int) {
        storebottom(cursor: $cursor) {
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