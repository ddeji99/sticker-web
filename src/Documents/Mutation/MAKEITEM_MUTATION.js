import { gql } from "@apollo/client";



export const MAKEITEM_MUTATION = gql`
    mutation makeitem($category: String!, $title: String!, $price: String!, $color: String!, $image: Upload!, $detail: String,
                      $size: String, $brand: String, $mimage: Upload!, $laundryinfo: String ){
        makeitem(category: $category, title: $title, price: $price, color: $color, image: $image, detail: $detail,
                  size: $size, brand: $brand, mimage: $mimage, laundryinfo: $laundryinfo ){
            ok
            message
            
        }
    }

`;