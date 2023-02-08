import styled from "styled-components";

import Header from "../Header";

const Loginbox = styled.div`
    width: 100%;
    background-color: ${(props) => props.theme.bgColor};
    display: flex;
    height: 100vh;
    justify-content: flex-start;
    align-items: center;
    flex-direction: column;
    font-family: 'AppleSDGothicNeo', 'Noto Sans KR', sans-serif;
    @media all and (max-width:767px) {
      width: 100vw;
      margin: 0 auto;
      display: flex;
      justify-content: flex-start;
      max-width: none;
      overflow: scroll;
    }
    
`;

const Wrapper = styled.div`
  max-width: 350px;
  width: 100%;
  display: flex;
  justify-content: center;
  padding: 60px 0px 0px 0px;
  @media all and (max-width:767px) {
    width: 90vw;
    margin: auto auto;
    padding: 0px;
    display: flex;
    justify-content: center;
    max-width: none;
  }
`;

function AuthLayout({ children }) {
    return (
        <Loginbox>
          <Header/>
            <Wrapper>{children}</Wrapper>
        </Loginbox>
    );
}

export default AuthLayout;