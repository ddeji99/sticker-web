import { gql } from "@apollo/client";




export const TOGGLELIKEFEED_MUTATION = gql`
  mutation toggleLikeFeed($feedid: Int!) {
    toggleLikeFeed(feedid: $feedid) {
      ok
      message
      feedid
    }
  }
`;