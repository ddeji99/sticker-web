import { BrowserRouter, Route } from "react-router-dom";
import Login from "./screens/Login";
import NotFound from "./screens/NotFound";
import Home from "./screens/Home";
import { Routes } from "react-router-dom";
import { ApolloProvider, useReactiveVar } from "@apollo/client";
import { darkModeVar } from "./apollo";
import SignUp from "./screens/SignUp";
import { isLoggedInVar } from "./apollo";
import { client } from "./apollo";
import { ThemeProvider } from "styled-components";
import { GlobalStyles } from "./styles";
import { darkTheme } from "./styles";
import { lightTheme } from "./styles";
import routes from "./routes";
import Findpassword from "./screens/Findpassword";  
import Fitting from "./screens/Fitting";
import { AnimatePresence } from "framer-motion";
import Profile from "./screens/Profile"
import Perchase from "./screens/Perchase";
import FeedDetail from "./screens/FeedDetail";
import ItemDetail from "./screens/ItemDetail"
import ItemMain from "./screens/ItemMain";
import FeedMain from "./screens/FeedMain";
import Additem from "./screens/Additem";






function App() {
  const isLoggedIn = useReactiveVar(isLoggedInVar);
  const darkMode = useReactiveVar(darkModeVar);
  return (
  <ApolloProvider client={client}>
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <GlobalStyles />
      <AnimatePresence>
    <BrowserRouter>
      <Routes>
      <Route path="profile/:nickname" element={<Profile />} >
        <Route path="look/:id" element={<Profile />} />
      </Route>
      <Route path="/perchase/:id" element={<Perchase />} />
      <Route path="/findpassword" element={<Findpassword />} />
      <Route path="/" element={<Home />}>
        
        <Route path="look/:id" element={<Home />} />
      </Route>
      <Route path="add" element={<Additem />} />
      <Route path="feeds" element={<FeedMain />} />
      <Route path="items" element={<ItemMain />} />
      <Route path="feed/:id" element={<FeedDetail />} />
      <Route path="items/:id" element={<ItemDetail />} />
      <Route path="/fitting" element={<Fitting />}/>
      <Route path="/login" element={<Login />} />
      <Route path={routes.signUp} element={<SignUp />} />
      <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
    </AnimatePresence>
    </ThemeProvider>
    </ApolloProvider>
  )
}

export default App;
