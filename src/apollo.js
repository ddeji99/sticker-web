import { ApolloClient, 
         HttpLink,
         InMemoryCache,
         makeVar,
         GraphQLRequest,
         NormalizedCacheObject,
         split
} from "@apollo/client";
import { useNavigate } from "react-router-dom";
import { WebSocketLink } from "@apollo/client/link/ws";
import { setContext } from "@apollo/client/link/context";
import { createUploadLink } from "apollo-upload-client";
import { getMainDefinition } from "@apollo/client/utilities";
import { onError } from "@apollo/client/link/error";
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { createClient } from 'graphql-ws';



const TOKEN_EXPIRED = 'jwt expired';
const TOKEN = "TOKEN";
const Show_Bottom = "Show-bottom";
const Show_Top = "Show-top";
const Show_Outer = "Show-outer";
const wear_Outer= "wear-outer";
const VSCARD = "VSCARD";


const httpLink = new HttpLink({ uri: "https://sticker--backend.herokuapp.com/graphql", /*redentials: 'omit',*/ credentials: 'include',  //'http://localhost:8000/graphql',"https://sticker--backend.herokuapp.com/graphql"
});

const uploadHttpLink = createUploadLink({
  uri:"https://sticker--backend.herokuapp.com/graphql", /*credentials: 'omit',*/credentials: 'include',  //'http://localhost:8000/graphql',"https://sticker--backend.herokuapp.com/graphql"'include'
  headers: {
    //'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true,
  }
});


const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      token: localStorage.getItem(TOKEN),
    },
  };
});

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    alert(`이용자 정보가 일치하지 않습니다.`);
    alert(`로그인을 시도해주세요.`);
    client.clearStore();
    localStorage.removeItem(TOKEN);
    window.location.href = '/login';
    //window.location.reload();

    console.log(`GraphQL Error`, graphQLErrors);
  }
  if(graphQLErrors?.[0].message === TOKEN_EXPIRED) {
    alert("로그인을 다시 시도해주세요.");
    window.location.href = '/login';
  }
  if (networkError) {
    alert("Network error")
    console.log(`Network Error`, networkError);
  }
});

const uploadHttpLinks = authLink.concat(errorLink).concat(uploadHttpLink);

const wsLink = new GraphQLWsLink(createClient({
  uri:"ws://sticker--backend.herokuapp.com/graphql",     //"ws://localhost:8000/graphql","ws://sticker--backend.herokuapp.com/graphql"
  options: {
    reconnect: true,
    connectionParams: () => ({
      token: localStorage.getItem(TOKEN),
    }),
  },
}));

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    const isSubscription = definition.kind === "OperationDefinition" && definition.operation === "subscription";
    return isSubscription;
  },
  wsLink,
  uploadHttpLinks
);




export const client = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache(),
  defaultOptions: {
    watchQuery: {
      fetchPolicy: "cache-and-network",
      errorPolicy: "ignore"
    },
    query: {
      fetchPolicy: "network-only",
      errorPolicy: "all",
    },
    mutate: {
      errorPolicy: "all",
    },
  },
});


export const isLoggedInVar = makeVar(Boolean(localStorage.getItem(TOKEN)));

export const logUserIn = (token) => {
  localStorage.setItem(TOKEN, token);
  isLoggedInVar(true);
};

export const logUserOut = (client) => {
  client.clearStore();
  localStorage.removeItem(TOKEN);
  window.location.reload();
};

export const darkModeVar = makeVar(false);


export const ShowTopVar = makeVar(Boolean(localStorage.getItem(Show_Top)==="enabled"));

export const enableShowTop = () => {
  localStorage.setItem(Show_Top, "enabled");
  ShowTopVar(true);
};

export const disableShowTop = () => {
  localStorage.removeItem(Show_Top, "disabled");
  ShowTopVar(false);
};

export const ShowBottomVar = makeVar(Boolean(localStorage.getItem(Show_Bottom)==="enabled"));

export const enableShowBottom = () => {
  localStorage.setItem(Show_Bottom, "enabled");
  ShowBottomVar(true);
};

export const disableShowBottom = () => {
  localStorage.removeItem(Show_Bottom, "disabled");
  ShowBottomVar(false);
};

export const ShowOuterVar = makeVar(Boolean(localStorage.getItem(Show_Outer)==="enabled"));

export const enableShowOuter = () => {
  localStorage.setItem(Show_Outer, "enabled");
  ShowOuterVar(true);
};

export const disableShowOuter = () => {
  localStorage.removeItem(Show_Outer, "disabled");
  ShowOuterVar(false);
};

export const wearOuterVar = makeVar(Boolean(localStorage.getItem(wear_Outer)==="enabled"));
export const wearOuter = () => {
  wearOuterVar(true);
};

export const wearTop = () => {
  wearOuterVar(false);
};


export const ShowAllVar = () => {
ShowTopVar(false);
ShowBottomVar(false);
};

export const ShowBottom = () => {
  ShowTopVar(false);
  ShowBottomVar(true);
};

export const ShowTop = () => {
  ShowTopVar(true);
  ShowBottomVar(false);
};

export const ShowOuter = () => {
  ShowTopVar(false);
  ShowBottomVar(false);
  ShowOuterVar(true);
}

