import { gql } from "@apollo/client";



export const SEETOPITEMS_QUERY = gql`
     query seeTopitems($cursor: Int) {
        seeTopitems(cursor: $cursor) {
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