import { useEffect } from "react";
import { SEEME_QUERY } from "../Documents/Query/SEEME_QUERY";
import { isLoggedInVar } from "../apollo";
import { ApolloClient, useApolloClient, useReactiveVar, useQuery } from "@apollo/client";




const useLoggedInUser = () => {
    const client = useApolloClient();
    const isLoggedIn = useReactiveVar(isLoggedInVar);
    const { data: seeMeData } = useQuery(SEEME_QUERY,{ skip: isLoggedIn === false });
  
    useEffect(() => {
      if (seeMeData?.seeMe.user === null) {
        isLoggedInVar(false);
      }
    }, [seeMeData, client]);
  
    return seeMeData?.seeMe.user;
  };
  
  export default useLoggedInUser;