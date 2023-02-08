import { gql } from "@apollo/client";





export const SEELIKEFEED_QUERY = gql`
query seelikefeed($cursor: Int, $nickname: String) {
   seelikefeed(cursor: $cursor, nickname: $nickname) {
      ok
      message
      lastfeedId
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
            title
            size
            detail
            color
            price
            category
            laundryinfo
            mimage
            image
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