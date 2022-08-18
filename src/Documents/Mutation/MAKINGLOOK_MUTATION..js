import { gql } from "@apollo/client";



export const MAKINGLOOK_MUTATION = gql`
    mutation makingLook($Topid: Int, $Btmid: Int, $Outerid: Int, $title: String!, $totalPrice: String, $lookimg: Upload){
        makingLook(Topid: $Topid, Btmid: $Btmid, Outerid: $Outerid, title: $title, totalPrice: $totalPrice, lookimg: $lookimg){
            ok
            message
            look {
                id
                title
                comboImage
                totalPrice
                item {
                    id
                    image
                    detail
                    price
                    size
                    color
                }
            }
        }
    }

`;