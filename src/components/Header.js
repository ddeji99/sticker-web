import styled, { keyframes } from "styled-components";
import Logo from "../img/Logo.svg";
import Nickname from "./Shared/Nickname";
import Avatar from "./Shared/Avatar";
import useLoggedInUser from "../hooks/useLoggedInUser";
import { useForm } from "react-hook-form";
import { useEffect, useRef, useState } from "react";
import { Link, useLocation, Location } from "react-router-dom";
import { ApolloClient, useApolloClient, useReactiveVar } from "@apollo/client";
import { logUserOut, isLoggedInVar } from "../apollo";
import avatar1 from "../img/maleavatar.png";
import avatar2 from "../img/femaleavatar.png";
import defaultavatar from "../img/profile_logo.png"




const AVTR = keyframes`     
    from {
      transform: rotate(0deg);
    }

    to {
      transform: rotate(360deg);
    }
`;

const HeaderSpace = styled.header`  
  width: 100%;
  min-width: 740px;
  height: 85px;

  @media (pointer:coarse) {
    height: 8.5vh;
  }

`;

const Asd = styled.div`
  width: 100%;
  min-width: 740px;
  position: fixed;
  top: 0;
  height: 72px;
  background-color: hsla(0,0%,100%,.8);
  backdrop-filter: blur(7px);
  box-shadow: 0 1px 1vh 0 rgb(0 0 0 / 15%);

  display: flex; 
  justify-content: space-between;
  align-items: center;
  z-index: 15;
  @media (pointer:coarse) {
    height: 7vh;
  }
`;

const HeaderLogo = styled.img`    
  margin-left: 5vw;
  width: 70%;
  @media (pointer:coarse) {
    margin-left: 2vw;
    width: 50vw;
  }
`;
const AvatarLogo = styled.img`    
  width: 50px;
  height: 50px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);

  border: 3px solid transparent;
  border-radius: 50%;
  background-image: linear-gradient(#fff, #fff), 
  linear-gradient(to right, red 0%,  orange 100%);
  background-origin: border-box;
  background-clip: content-box, border-box;

  &:hover {
    transform: translateX(-15px) translateY(12px)scale(1.5);
    border: 3px solid #00FF27;
    border-radius: 28px;
    }
    @media (pointer:coarse) {
    width: 5vh;
    height: 5vh;
  }
`;

const LoginNav = styled.nav`
  width: 280px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 24px;
  a {
    color: inherit;
    display: flex;
  }
  @media (pointer:coarse) {
    margin-right: 4vw;
  }
`;

const LoginLink = styled(Link)`
  min-width: 120px;
  padding: 1vh 1vw;
  text-transform: uppercase;
  letter-spacing: 5px;
  font-weight: 500;
  color: #000;
  background-color: #fff;
  border: none;
  border-radius: 7px;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease 0s;
  cursor: pointer;
  outline: none;

  &:hover {
    background-color: #1875FF;
    box-shadow: 0px 5px 6px rgba(0, 0, 0, 0.2);
    color: #fff;
    transform: translateY(3px);
  }

  &:active {
    transform: translateY(-1px);
  }

  span {
    margin-left: 2.5px;
    font-size: 0.8em;
    font-weight: bold;
    display: flex;
    justify-content: space-around;
  }
  @media (pointer:coarse) {
    span {
      margin-left: 2.5px;
      font-size: 1.5em;
      font-weight: bold;
      display: flex;
      justify-content: space-around;
    }
  }
`;

const SignupLink = styled(Link)`
  min-width: 150px;
  padding: 1vh 1vw;
  text-transform: uppercase;
  letter-spacing: 5px;
  font-weight: 500;
  color: #000;
  background-color: #fff;
  border: none;
  border-radius: 7px;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease 0s;
  cursor: pointer;
  outline: none;

  &:hover {
    background-color: #1875FF;
    box-shadow: 0px 5px 6px rgba(0, 0, 0, 0.2);
    color: #fff;
    transform: translateY(3px);
  }
  
  &:active {
    transform: translateY(-1px);
  }

  span {
    margin-left: 2.5px;
    font-size: 0.8em;
    font-weight: bold;
    display: flex;
    justify-content: space-around;
  }
  @media (pointer:coarse) {
    white-space: nowrap;
    span {
      margin-left: 2.5px;
      padding: none;
      font-size: 1.5em;
      font-weight: bold;
      display: flex;
      justify-content: space-around;
    }
`;

const LogoutNav = styled.nav`
  width: 15vw;
  margin-right: 11vw;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  font-size: 22px;
  a {
    color: inherit;
    &:last-child {
      margin-left: 25px;
    }
  }
`;

const Logout = styled.span`
  width: 100px;
  margin-right: 6vw;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  font-size: 22px;
  a {
    color: inherit;
    &:last-child {
      margin-left: 25px;
    }
  }
  @media (pointer:coarse) {
    font-size: 1.5vh;
    font-weight: 900;
    margin-right: 4vw;
  }

`;


const Header = () => {

    const loggedInUser = useLoggedInUser();
    const location = useLocation();
    const client = useApolloClient();
    const isLoggedIn = useReactiveVar(isLoggedInVar);
    return (
      <HeaderSpace>
      <Asd>
      <Link to={"/"} style={{display: "flex"}}>
      <HeaderLogo src={Logo}></HeaderLogo>
      </Link>
      {isLoggedIn === true ? (
          <LoginNav>
            <Link to={`/profile/${loggedInUser?.nickname}`}>
              {loggedInUser?.gender === "남자" ? <Avatar size="30px" Avatarurl={avatar1} /> : loggedInUser?.gender === "여자" ? <Avatar size="30px" Avatarurl={avatar2} /> :  <Avatar size="30px" Avatarurl={defaultavatar} /> }
            </Link>
            <Logout onClick={() => logUserOut(client)} style={{ cursor: "pointer" }} >로그아웃</Logout>
          </LoginNav>
      ) : (
          <LogoutNav>
          <LoginLink to={"/login"}>
            <span>로그인</span>
          </LoginLink>
          <SignupLink to={"/sign-up"}>
            <span>회원가입</span>
          </SignupLink>
        </LogoutNav>  
      )}
      </Asd>
    </HeaderSpace>
);
};


export default Header;