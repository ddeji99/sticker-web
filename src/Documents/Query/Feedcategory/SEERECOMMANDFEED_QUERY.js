import { gql } from "@apollo/client";





export const SEERECOMMANDFEED_QUERY = gql`
query seerecommandFeed($cursor: Int) {
   seerecommandFeed(cursor: $cursor) {
      ok
      message
      lastfeedId
      feeds {
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