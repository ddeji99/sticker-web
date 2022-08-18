import { gql } from "@apollo/client";




export const BUYREQUEST_MUTATION = gql`
  mutation buyrequest($phonenum: String!, $lookid: Int!) {
    buyrequest(phonenum: $phonenum, lookid: $lookid) {
      ok
      message
    }
  }
`;