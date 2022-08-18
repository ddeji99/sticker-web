import Footer from "../Footer";
import styled from "styled-components";



const Loginbox = styled.div`
    width: 100%;
    background-color: ${(props) => props.theme.bgColor};
    display: flex;
    height: 100vh;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    font-family: 'AppleSDGothicNeo', 'Noto Sans KR', sans-serif;
    
`;

const Wrapper = styled.div`
  max-width: 350px;
  width: 100%;
  display: flex;
  justify-content: center;
  @media (pointer:coarse) {
    display: flex;
    justify-content: center;
    max-width: none;
    width: 80vw;
    margin-bottom: 30vh;
  }
`;

function AuthLayout({ children }) {
    return (
        <Loginbox>
            <Wrapper>{children}</Wrapper>
        </Loginbox>
    );
}

export default AuthLayout;