import { gql } from "@apollo/client";





export const SEEFEED_QUERY = gql`
query seeFeed($feedid: Int!) {
   seeFeed(feedid: $feedid) {
      ok
      message
      feed {
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
            laundryinfo
            image
            mimage
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