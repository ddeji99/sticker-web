import { gql } from "@apollo/client";





export const SEERELATIONFEED_QUERY = gql`
     query seerelationFeed($itemid: Int!) {
        seerelationFeed(itemid: $itemid) {
           ok
           message
           Feeds {
            id                   
            user {
              id
              nickname
              gender
              avatar
            }            
             Look {
              id
              title
              comboImage
              totalPrice
              item {
                  id
                  category
                  title
                  size
                  detail
                  color
                  price
                  mimage
                  image
                  laundryinfo
                  iscart
                  totalCarts
              }
             }               
             title       
             caption    
             comments {
              id
              payload
              createAt
              isMine
              user {
                  id
                  nickname
                  gender
                  avatar
                  isMe
              }
             }
             isLiked
             totalLikes
             commentNumber
             category
             createAt     
             isMine     
            }
        }
     }

`;