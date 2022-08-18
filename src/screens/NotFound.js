import styled from "styled-components";
import { Link, useLocation, Location } from "react-router-dom";
import Image from "../img/404_page.png"


const Container = styled.div`
  width: 100vw;
  height: 95vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  h1{
    font-size: 30px;
    margin: 50px;
  }
  a{
    font-size: 30px;
    font-weight: 800;
    letter-spacing: 10px;
    textDecoration: underline;
  }
`;


const ImageR = styled.img`
width: 60vw;
border-radius: 5vw;
box-shadow: 5vw 5vw 10vw #d9d9d9;
`;

function NotFound() {
    return (
        <Container>
            <ImageR src={Image}  alt="Not Found"></ImageR>
            <h1>페이지를 찾을수 없어요....</h1>
            <Link to={"/"} style={{display: "flex"}}>
                <a>되돌아가기</a>
            </Link>
        </Container>
    );
}
export default NotFound;