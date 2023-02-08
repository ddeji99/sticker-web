import { gql } from "@apollo/client";




 export const SEEITEM_QUERY = gql`
     query seeitem($id: Int) {
        seeitem(id: $id) {
           ok
           message
           item {
            id
            category
            detail
            title
            price
            image
            mimage
            laundryinfo
            color
            size
            iscart
            totalCarts
           }
        }
     }

`;
