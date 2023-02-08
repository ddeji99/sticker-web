import { gql } from "@apollo/client";



export const SEEPROFILE_QUERY = gql`
  query seeProfile($nickname: String!) {
    seeProfile(nickname: $nickname) {
      ok
      message
      user {
        id
        nickname
        isMe
        email
        gender
        avatar
        Feeds{
          id                   
          user {
            id
            nickname
            gender
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

        Looks {
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
                  image
                  mimage
                  laundryinfo
                  category
                  iscart
                  totalCarts
              }
        }

        
      }
      
    }
  }
`;