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
                title
                size
                detail
                color
                price
                image
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
              }
        }

        
      }
      
    }
  }
`;