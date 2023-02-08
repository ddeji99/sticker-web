import { gql } from "@apollo/client";




 export const SEEALLITEMS_QUERY = gql`
     query seeAllitems($cursor: Int) {
        seeAllitems(cursor: $cursor) {
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