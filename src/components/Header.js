import styled, { keyframes } from "styled-components";
import Logo from "../img/Logo.svg";
import Avatar from "./Shared/Avatar";
import useLoggedInUser from "../hooks/useLoggedInUser";
import { useEffect, useRef, useState } from "react";
import { Link, useLocation, Location } from "react-router-dom";
import { ApolloClient, useApolloClient, useReactiveVar } from "@apollo/client";
import { logUserOut, isLoggedInVar } from "../apollo";
import avatar1 from "../img/maleavatar.png";
import avatar2 from "../img/femaleavatar.png";
import defaultavatar from "../img/profile_logo.png"
import LogoSmall2 from "../img/ms-icon2.png"
import LogoBlue from "../img/logo.png"





const HeaderSpace = styled.header `
  box-sizing: border-box;
  width: 100%;
  height: 52px;
  top: 0;
  position: fixed;
  z-index: 10;

  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  -webkit-backdrop-filter: blur(22px);
  backdrop-filter: blur(22px);
  background-color: rgba(255, 255, 255, 0.72);
  border-bottom: 1px solid rgba(255, 255, 255, 0.16);

  /* 모바일 가로, 모바일 세로 (해상도 480px ~ 767px)*/ 
  @media all and (max-width:767px) {
    min-width: 370px;
    width: 100%;
    top: auto !important;
    background-color: #fff;

    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    transition: transform 0.2s, -webkit-transform 0.2s;


    &.visible {
      bottom: 0;
      height: 65px;
      box-shadow: 0 -4px 14px 0 rgb(26 41 69 / 5%);
      transition: bottom 0.2s ease-out;
    }
    
    &.hidden {
      /* display: none; */
      bottom: -73px;
      transition: bottom 0.2s ease-out;
    }
  }
`;

const Asd = styled.div`
  width: 1244px;
  height: 52px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;


  @media all and (max-width:767px) {
    width: 90%;
    height: 60px;
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
  }

  .ToTop{
    display: none;

    @media all and (max-width:767px) {
      width: 50px;
      display: flex;
      justify-content: center;
      flex-direction: column;
      align-items: center;
    
      p {
        display: inline-block;
        margin: 7px 0 2px;
        font-size: 9px;
        line-height: 1;
        vertical-align: top;
      }
    }
  }
`;

const HeaderLogo = styled.div`    
  img{
    height: 35px;
  }
  .SmallLogo{
    display: none;
  }

  @media all and (max-width:767px) {
    .BigLogo{
      display: none;
    }
    .SmallLogo{
      height: 40px;
      margin-bottom: 15px;
      background-color: #0034f6;
      padding: 5px;
      border-radius: 40px;
      display: flex;
    }
  }
`;

const TrandingFeedBtn = styled.div`
  display: none;

  @media all and (max-width:767px) {
    width: 50px;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;

    a {
    display: flex;
    flex-direction: column;
    align-items: center;
    }

    p {
      display: inline-block;
      margin: 7px 0 2px;
      font-size: 9px;
      line-height: 1;
      vertical-align: top;
    }
  }
`;


const AvatarLogo = styled.img`    
  width: 30px;
  height: 30px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);

  border: 2px solid #f2f2f2;
  border-radius: 50%;
  linear-gradient(to right, red 0%,  orange 100%);
  background-origin: border-box;
  background-clip: content-box, border-box;

  &:hover {
    border: 2px solid #0239ff;
    }
  
  @media all and (max-width:767px) {
    display: none;
  }
`;

const LoginNav = styled.nav`
  display: flex;
  align-items: center;
  justify-content: space-between;
  a {
    color: inherit;
    display: flex;
  }
  svg {
    display: none;
  }
  @media all and (max-width:767px) {
    width: 50px;
    display: flex;
    justify-content: center;

    svg {
      display: flex;
      height: 60px;
    }

    img {
      display: none;
    }

  }
`;

const LoginLink = styled(Link)`
  text-transform: uppercase;
  letter-spacing: 5px;
  font-weight: 500;
  color: #000;
  border: none;
  transition: all 0.3s ease 0s;
  cursor: pointer;
  outline: none;

  &:hover {
    color: #002EF5;
  }

  span {
  }
  @media all and (max-width:767px) {
    width: 50px;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    svg{
      margin-left: -7px;
      :nth-child(2){
        fill: #28CD41;
      }
    }
  
    span {
      display: inline-block;
      margin: 7px 0 2px;
      font-size: 9px;
      letter-spacing: 0px;
      line-height: 1;
      vertical-align: top;
    }
  }
`;

const SignupLink = styled(Link)`
  text-transform: uppercase;
  letter-spacing: 5px;
  font-weight: 500;
  color: #000;
  border: none;
  transition: all 0.3s ease 0s;
  cursor: pointer;
  outline: none;

  &:hover {
    color: #002EF5;
  }
  

  span {
  }

  @media all and (max-width:767px) {
    display: none;
  }
`;

const LogoutNav = styled.nav`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  font-size: 13px;
  a {
    color: inherit;
    &:last-child {
      margin-left: 25px;
    }
  }
  svg{
    display: none;
  }
  
  @media all and (max-width:767px) {
    svg{
      display: flex;
    }
  }
`;

const Logout = styled.span`
  width: 100px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  font-size: 13px;
  a {
    color: inherit;
    &:last-child {
      margin-left: 25px;
    }
  }

  @media all and (max-width:767px) {
    display: none;
  }

`;


const Header = () => {
  const [position, setPosition] = useState(window.pageYOffset)
    const [visible, setVisible] = useState(true) 
    useEffect(()=> {
        const handleScroll = () => {
          let moving = window.pageYOffset
          
          setVisible(position > moving);
          setPosition(moving)
        };
        window.addEventListener("scroll", handleScroll);
        return(() => {
          window.removeEventListener("scroll", handleScroll);
        })
    })
    const cls = visible ? "visible" : "hidden";

    const moveToTop = () => (document.documentElement.scrollTop = 0);





    const loggedInUser = useLoggedInUser();
    const location = useLocation();
    const client = useApolloClient();
    const isLoggedIn = useReactiveVar(isLoggedInVar);




    return (
      <HeaderSpace className={cls}>
        <Asd>
          <TrandingFeedBtn>
                  <Link to={"/feeds"} style={{display: "flex"}}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="19.993" height="39.255" viewBox="0 0 19.993 39.255">
                    <path d="M249.185,4873.982H235.164c-1.786,0-2.986-1-2.986-2.482v-2.576c0-1.486,1.2-2.483,2.986-2.483h14.021c1.786,0,2.986,1,2.986,2.483v2.576h-1.255v-2.576c0-.906-.894-1.229-1.731-1.229H235.164c-.406,0-1.731.09-1.731,1.229v2.576c0,.9.894,1.228,1.731,1.228h14.021Z" transform="translate(-232.178 -4847.078)" fill="#282828"/>
                    <path d="M243.738,4945.049h2.383a.925.925,0,0,0,.989-.914v-2.462a.926.926,0,0,0-.989-.93h-2.383a.886.886,0,0,0-.935.93v2.462A.884.884,0,0,0,243.738,4945.049Z" transform="translate(-241.47 -4912.056)" fill="#282828"/>
                    <path d="M243.738,4994.943h2.383a.929.929,0,0,0,.989-.935v-2.441a.926.926,0,0,0-.989-.931h-2.383a.886.886,0,0,0-.935.931v2.441A.889.889,0,0,0,243.738,4994.943Z" transform="translate(-241.47 -4955.688)" fill="#282828"/>
                    <g transform="translate(7.525 29.783)">
                      <path d="M302.926,4951.593H293.2a1.057,1.057,0,1,1,0-2.113h9.727a1.057,1.057,0,1,1,0,2.113Z" transform="translate(-292.142 -4949.479)" fill="#282828"/>
                    </g>
                    <g transform="translate(7.525 36.045)">
                      <path d="M302.926,5001.488H293.2a1.057,1.057,0,1,1,0-2.113h9.727a1.057,1.057,0,1,1,0,2.113Z" transform="translate(-292.142 -4999.375)" fill="#282828"/>
                    </g>
                    <g transform="translate(3.421)">
                      <rect width="13.149" height="18.757" transform="translate(0)" fill="rgba(40,40,40,0)"/>
                      <path d="M265.7,4729.4c4.126,0,6.891-2.812,6.891-7.092,0-7.127-6.043-10.166-10.515-10.166-.537,0-.812.183-.812.514a.7.7,0,0,0,.2.44,7.157,7.157,0,0,1,2.008,4.175,2.251,2.251,0,0,1-.471,1.412l.3-.077a2.828,2.828,0,0,0-2.218-1.85.282.282,0,0,0-.284.316c0,.221.058.723.058,1.1,0,2.19-1.418,3.056-1.418,5.9C259.445,4727.285,261.9,4729.4,265.7,4729.4Zm.095-2.322a2.1,2.1,0,0,1-2.326-2.108c0-1.32.923-1.8,1.061-2.646.01-.068.054-.088.106-.044a3.409,3.409,0,0,1,.826,1.122,4.226,4.226,0,0,0,.4-2.919c-.008-.062.035-.1.1-.073a4.4,4.4,0,0,1,2.5,3.867A2.57,2.57,0,0,1,265.8,4727.08Z" transform="translate(-259.445 -4712.145)" fill="rgba(40,40,40,0.85)"/>
                    </g>
                  </svg>
                  <p>인기피드</p>
                  </Link>
                </TrandingFeedBtn>
                <TrandingFeedBtn>
                  <Link to={"/items"} style={{display: "flex"}}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="20.158" height="37.446" viewBox="0 0 20.158 37.446">
                    <path d="M672.288,4737.963h6.756a1.935,1.935,0,0,0,1.98-2.12l.084-6.784,1.418.351a1.048,1.048,0,0,0,1.392-.946l.571-2.685a1.359,1.359,0,0,0-.8-1.678l-4.572-2.117a.95.95,0,0,0-.946-.006,5.027,5.027,0,0,1-5.015,0,.95.95,0,0,0-.946.006l-4.565,2.117a1.36,1.36,0,0,0-.806,1.678l.575,2.685a1.045,1.045,0,0,0,1.392.946l1.418-.351.085,6.784A1.927,1.927,0,0,0,672.288,4737.963Z" transform="translate(-665.586 -4721.855)" fill="#282828"/>
                    <g transform="translate(0 17.966)">
                      <path d="M754.893,4959.664h-4.116a2.151,2.151,0,0,1-2.242-2.207V4953.2a2.164,2.164,0,0,1,2.242-2.233h4.116a2.211,2.211,0,0,1,2.336,2.233v4.253h-1.255V4953.2a.984.984,0,0,0-1.081-.979h-4.116a.9.9,0,0,0-.987.979v4.253a.9.9,0,0,0,.987.952h4.116Z" transform="translate(-737.07 -4940.184)" fill="#282828"/>
                      <path d="M754.893,4873.7h-4.116a2.151,2.151,0,0,1-2.242-2.207v-4.253a2.164,2.164,0,0,1,2.242-2.234h4.116a2.211,2.211,0,0,1,2.336,2.234v4.253h-1.255v-4.253a.983.983,0,0,0-1.081-.979h-4.116a.9.9,0,0,0-.987.979v4.253a.9.9,0,0,0,.987.951h4.116Z" transform="translate(-737.07 -4865.009)" fill="#282828"/>
                      <path d="M663.535,4959.664h-4.116a2.151,2.151,0,0,1-2.242-2.207V4953.2a2.164,2.164,0,0,1,2.242-2.233h4.116a2.211,2.211,0,0,1,2.335,2.233v4.253h-1.255V4953.2a.984.984,0,0,0-1.081-.979h-4.116a.9.9,0,0,0-.987.979v4.253a.9.9,0,0,0,.987.952h4.116Z" transform="translate(-657.177 -4940.184)" fill="#282828"/>
                      <path d="M663.535,4873.7h-4.116a2.151,2.151,0,0,1-2.242-2.207v-4.253a2.164,2.164,0,0,1,2.242-2.234h4.116a2.211,2.211,0,0,1,2.335,2.234v4.253h-1.255v-4.253a.982.982,0,0,0-1.081-.979h-4.116a.9.9,0,0,0-.987.979v4.253a.9.9,0,0,0,.987.951h4.116Z" transform="translate(-657.177 -4865.009)" fill="#282828"/>
                    </g>
                  </svg>
                  <p>스토어</p>
                  </Link>
                </TrandingFeedBtn>



        

          <Link to={"/"} style={{display: "flex"}}>
            <HeaderLogo>
              <img className="BigLogo" src={LogoBlue}/>
              <img className="SmallLogo" src={LogoSmall2}/>
            </HeaderLogo>
          </Link>


          <div className="ToTop" onClick={moveToTop}>
            <svg xmlns="http://www.w3.org/2000/svg" width="33.974" height="33.962" viewBox="0 0 33.974 33.962">
              <path d="M1160.714,4733.237a16.981,16.981,0,1,0,16.981,16.98A17.051,17.051,0,0,0,1160.714,4733.237Zm0,1.323a15.664,15.664,0,1,1-15.67,15.657A15.651,15.651,0,0,1,1160.714,4734.561Z" transform="translate(-1143.721 -4733.237)" fill="#282828"/>
              <path d="M1231.2,4793.2a.61.61,0,0,0-.442.21l-6.146,6.108a.811.811,0,0,0-.3.572.56.56,0,0,0,.592.569.625.625,0,0,0,.517-.234l2.1-2.107,3.162-3.273-.078,3.231v13.239a.576.576,0,0,0,.6.593.561.561,0,0,0,.587-.593v-13.239l-.066-3.236,3.24,3.334,2.01,2.051a.593.593,0,0,0,.512.234.561.561,0,0,0,.6-.594.811.811,0,0,0-.234-.48l-6.2-6.175A.663.663,0,0,0,1231.2,4793.2Z" transform="translate(-1214.198 -4785.679)" fill="rgba(0,52,246,0.85)"/>
            </svg>
            <p>맨 위로</p>
          </div>





      {isLoggedIn === true ? (
          <LoginNav>

              <Link to={`/profile/${loggedInUser?.nickname}`}>
              <svg xmlns="http://www.w3.org/2000/svg" width="40.441" height="34.299" viewBox="0 0 40.441 34.299">
                <path d="M1663.007,4767.028a17,17,0,1,0-16.976-17.841,6.2,6.2,0,0,1,1.352-.132,15.669,15.669,0,1,1,27.063,11.678c-1.325-2.278-5.622-5.019-11.444-5.019a17.3,17.3,0,0,0-5.446.862,9.288,9.288,0,0,1,.287,2.342,9.863,9.863,0,0,1-2.316,6.355A16.746,16.746,0,0,0,1663.007,4767.028Zm0-14.312c3.316,0,5.859-2.833,5.859-6.522a5.88,5.88,0,1,0-11.719,0C1657.16,4749.878,1659.686,4752.707,1663,4752.716Z" transform="translate(-1639.563 -4733.034)" fill="#282828"/>
                <path d="M1602.865,4872.939a8.371,8.371,0,1,0,8.371,8.371A8.423,8.423,0,0,0,1602.865,4872.939Zm4.29,5.769-4.766,6.574a.71.71,0,0,1-.607.316.827.827,0,0,1-.617-.288l-2.793-3.051a.9.9,0,0,1-.22-.568.731.731,0,0,1,.755-.742.884.884,0,0,1,.62.3l2.207,2.381,4.226-5.81a.762.762,0,0,1,.632-.336.736.736,0,0,1,.73.738A.822.822,0,0,1,1607.156,4878.708Z" transform="translate(-1594.495 -4855.382)" fill="#0034f6"/>
              </svg>
              {loggedInUser?.gender === "남자" ? <Avatar Avatarurl={avatar1} /> : loggedInUser?.gender === "여자" ? <Avatar Avatarurl={avatar2} /> :  <Avatar Avatarurl={defaultavatar} /> }
              </Link>

              <Logout onClick={() => logUserOut(client)} style={{ cursor: "pointer" }} >로그아웃</Logout>
          </LoginNav>
      ) : (
          <LogoutNav>
            <LoginLink to={"/login"} id={'login'}>
              <svg xmlns="http://www.w3.org/2000/svg" width="40.57" height="34.408" viewBox="0 0 40.57 34.408">
                <path d="M2113.251,4766.264a17.052,17.052,0,1,0-17.03-17.9,6.262,6.262,0,0,1,1.356-.135,15.719,15.719,0,1,1,27.15,11.716c-1.329-2.286-5.639-5.034-11.48-5.034a17.343,17.343,0,0,0-5.463.864,9.339,9.339,0,0,1,.287,2.35,9.894,9.894,0,0,1-2.323,6.375A16.8,16.8,0,0,0,2113.251,4766.264Zm0-14.358c3.326,0,5.878-2.842,5.878-6.545a5.9,5.9,0,1,0-11.756,0C2107.386,4749.058,2109.92,4751.9,2113.247,4751.906Z" transform="translate(-2089.733 -4732.161)" fill="#282828"/>
                <path d="M2052.917,4872.513a8.4,8.4,0,1,0,8.4,8.4A8.45,8.45,0,0,0,2052.917,4872.513Zm4.658,9.145h-3.91v3.922a.748.748,0,1,1-1.5,0v-3.922h-3.922a.748.748,0,1,1,0-1.5h3.922v-3.91a.748.748,0,1,1,1.5,0v3.91h3.91a.748.748,0,0,1,0,1.5Z" transform="translate(-2044.52 -4854.9)" fill="#0239ff"/>
              </svg>
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