import { gql } from "@apollo/client";




export const TOGGLECARTITEM_MUTATION = gql`
  mutation togglecartItem($itemid: Int!) {
    togglecartItem(itemid: $itemid) {
      ok
      message
      itemid
    }
  }
`;