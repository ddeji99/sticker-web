import { gql, useQuery, useReactiveVar } from "@apollo/client";
import { logUserOut } from "../apollo";
import styled, { keyframes } from "styled-components";
import useLoggedInUser from "../hooks/useLoggedInUser";
import { isLoggedInVar } from "../apollo";
import { Link, useNavigate, useMatch } from "react-router-dom";
import LongCard2 from "../components/Aircloset/LongCard2"
import ItemCard from "../components/Aircloset/ItemCard"
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Header from "../components/Header";
import { AnimatePresence, motion } from "framer-motion";
import FeedDetail from "../components/Feed/FeedDetail";
import LookDetail from "../components/Feed/LookDetail";
import { SEEFEEDS_QUERY } from "../Documents/Query/SEEFEEDS_QUERY";
import React, { useCallback, useEffect, useState } from "react";
import avatar1 from "../img/maleavatar.png";
import avatar2 from "../img/femaleavatar.png";
import defaultavatar from "../img/profile_logo.png"
import slook from "../img/samplelook.png"
import { SEERECOMMENDLOOK_QUERY } from "../Documents/Query/SEERECOMMENDLOOK_QUERY";
import Footer from "../components/Footer";
import Loader from "../components/Loader";





const modalVariants = {
  start: { opacity: 0, scale: 1, y: -100 },
  end: { opacity: 1, scale: 1, transition: { duration: 0.5, ease:"easeIn" }, y: 0 },
  exit: { opacity: 0, scale: 1, transition: { duration: 0.5, ease:"easeIn" } },
};

const LookOrItem = styled.div`
    width:90vw;
    min-width: 740px;
    margin: 0 auto 0 auto;
    padding: 1vw 0 25px 15vw;
    display: flex;

    
    font-family: 'Montserrat',sans-serif;
    font-size: 45px;
    font-weight: 900;
    font-style: italic;
    letter-spacing: 3px;
    transition: all 0.6s;
    @media (pointer:coarse) {
      font-size: 5vh;
      font-weight: 900;
    }
`;

const Learnmore = styled.button`
position: relative;
display: inline-block;
cursor: pointer;
outline: none;
border: 0;
vertical-align: middle;
text-decoration: none;
background: transparent;
padding: 0;
font-size: 30px;
font-family: inherit;
width: 450px;
height: 60px;

border: none;
&:hover{
    border-top-color: #1300ff;
}

@media (pointer:coarse) {
    width: 300px;
    height: 85px;
}
`;

const Circle = styled.span`
transition: all 0.25s cubic-bezier(0.65, 0, 0.076, 1);
position: relative;
display: block;
margin: 0;
width: 60px;
height: 60px;
background: #282936;
border-radius: 500px;
${Learnmore}:hover &{
        width: 100%;
        background: #1875ff;
}
@media (pointer:coarse) {
    width: 85px;
    height: 85px;
    width: 100%;
    background: #1875ff;
}
`;

const Arrow = styled.span`
transition: all 0.25s cubic-bezier(0.65, 0, 0.076, 1);
position: absolute;
top: 0;
bottom: 0;
margin: auto;
background: #fff;
left: 0.66rem;
width: 1.125rem;
height: 0.125rem;
background: none;
${Learnmore}:hover &{
    background: #fff;
    transform: translate(1rem, 0);
}
&::before {
    position: absolute;
    content: "";
    top: -0.30rem;
    right: 0.0625rem;
    width: 0.625rem;
    height: 0.625rem;
    border-top: 0.125rem solid #fff;
    border-right: 0.125rem solid #fff;
    transform: rotate(45deg);
   }
`;

const ButtonText = styled.span`
transition: all 0.45s cubic-bezier(0.65, 0, 0.076, 1);
position: absolute;
top: 0;
left: 0;
right: 0;
bottom: 0;
color: #282936;
font-weight: 700;
text-align: center;
text-transform: uppercase;
${Learnmore}:hover &{
    color: #fff;
}
span{
  position: absolute;
  top: 55px;
  left: 0;
  right: 0;
  bottom: 0;
  margin-top: -20px;
  font-size: 18px;
  font-weight: 300;
  letter-spacing: 1px;
}
@media (pointer:coarse) {
    font-size: 30px;
    font-weight: 300;
    letter-spacing: 9px;
    word-break: keep-all;
    color: #fff;
    margin: 0;
    padding: 0;
    span{
      display none;
    }
}
`;

const CFD = keyframes`     
    from{
    }
    to {
      transform: skewX(0deg);
`;

const CardForm = styled.a`
width: 180px;
height: 400px;
margin: 15px;
margin: 15px 15px 15px 0;
border-radius: 27px;
overflow: hidden;
flex:none;
box-shadow: 5px 5px 10px #bebebe,
             -5px -5px 10px #ffffff;
 @media (pointer:coarse) {
  display:none;
}
`;

const CardFormDiv = styled.div`
    position: relative;
    width: 180px;
    height: 400px;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: 0.5s;
    z-index: 0;

    &::before {
    content: ' ';
    position: absolute;
    z-index: -2;
    top: 10;
    left: 30;
    width: 57%;
    height: 90%;
    text-decoration: none;
    transform: skewX(15deg);
    background: #fff;
    border-radius: 8px;
    transition: transform 0.6s cubic-bezier(0.68, -0.6, 0.32, 1.6);
    background: linear-gradient(315deg,#2194FF,#00FF27);
    ${CardForm}:hover & {
      transform: skewX(0deg) scaleX(1.3);
      }
    }

    &::after {
    content: '';
    position: absolute;
    z-index: -2;
    top: 0;
    left: 30;
    width: 80%;
    height: 100%;
    background: #fff;
    border-radius: 8px;
    transform: skewX(15deg);
    transition: transform 0.6s cubic-bezier(0.68, -0.6, 0.32, 1.6);
    filter: blur(30px);
    background: linear-gradient(315deg,#00A7FF,#00FF27);
    ${CardForm}:hover & {
      transform: skewX(0deg) scaleX(1.3);
    }
    }
`;
const CardFormSpan = styled.span`
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    pointer-events: none;
    transition: all 0.3s;
    z-index: 1;

    &::before {
    content: '';
    position: absolute;
    width: 0;
    height: 0;
    background: rgba( 255, 255, 255, 0.01 );
    box-shadow: 0 8px 32px 0 rgba( 31, 38, 135, 0.37 );
    backdrop-filter: blur( 4px );
    -webkit-backdrop-filter: blur( 4px );
    border-radius: 10px;
    border: 1px solid rgba( 255, 255, 255, 0.18 );

    transition: 0.8s;

    top: 8px;
    left: 40px;
    width: 50px;
    height: 50px;

    z-index: 1;
    ${CardForm}:hover & {
      transform: translateX(-30px);
      }
    }
    
    &::after {
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    background: rgba( 255, 255, 255, 0.01 );
    box-shadow: 0 8px 32px 0 rgba( 31, 38, 135, 0.37 );
    backdrop-filter: blur( 4px );
    -webkit-backdrop-filter: blur( 4px );
    border-radius: 10px;
    border: 1px solid rgba( 255, 255, 255, 0.18 );
    transition: 0.5s;
    animation-delay: -1s;  
    bottom: 10px;
    right: 40px;
    width: 55px;
    height: 55px;
    z-index: 1;
    ${CardForm}:hover & {
      transform: translateX(28px);
      }
    }
`;
const CardFormContent = styled.div`
    position: relative;
    width: 190px;
    height: 254px;
    padding: 20px 40px;

    background: rgba( 255, 255, 255, 0.05 );
    box-shadow: 0 8px 32px 0 rgba( 31, 38, 135, 0.37 );
    backdrop-filter: blur( 5.5px );
    -webkit-backdrop-filter: blur( 5.5px );
    border-radius: 10px;
    border: 1px solid rgba( 255, 255, 255, 0.4 );

    z-index: 0;
    transform: 0.5s;
    color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: all 0.6s;
    ${CardForm}:hover & {
      border: 5px solid rgba( 255, 255, 255, 0.8 );
      }
`;
const CardFormContenth2 = styled.h2`
    font-family: 'Montserrat',sans-serif;
    font-size: 30px;
    font-weight: 900;
    font-style: italic;
    letter-spacing: 3px;
    font-size: 30px;
    color: #fff;
    margin-bottom: 10px;
    z-index: 1;
    margin-left: 2.5px;
    transition: transform 0.6s cubic-bezier(0.68, -0.6, 0.32, 1.6);
    ${CardForm}:hover & {
      transform: scale(1.3) rotate(30deg);
      }
`;

const ItemContainer = styled.div`
width: 95vw;
min-width: 740px;
overflow: hidden;
margin-left: auto;
margin-right: auto;
display: flex;
flex-direction: row;
flex-wrap: wrap;
justify-content: center;
`;

const TopNav = styled.div`
width:100vw;
min-width: 740px;
height: 440px;

padding: 0.5vw 0 25px 0;
margin: 0 auto 0 auto;

display: flex;
justify-content: center;
border-radius: 12px;
@media (pointer:coarse) {
  height: 43vh;
  margin: none;
}
`;
const Maindiv = styled(motion.div)`
overflow: hidden;
width: 100%;
min-width: 1000px;
`;

const StyledSlider = styled(Slider)`
  width: 78vw;
  min-width: 490px;
  height: auto;
  background: #fff;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 30px 50px -12px inset, rgba(0, 0, 0, 0.3) 0px 18px 26px -18px inset;
  border-radius: 15px;
  overflow: hidden;
  .slick-list {
    @media (pointer:coarse) {
      height: 43vh;
    }
  }
  .slick-track {
  }
  .slick-arrow {
    color: black;
    background: #000;
    margin-top: 230px;
    border-radius: 15px;
  }
  @media (pointer:coarse) {
    width: 100vw;
    height: 43vh;
    box-shadow: none;
    border-radius: 0px;
    border-bottom: 3px solid #1875ff;
  }
`;


function Home() {
 
 const LoggedInUser = useLoggedInUser();
 const isLoggedIn = useReactiveVar(isLoggedInVar);
 const navigate = useNavigate();
 const Detailpathmatch = useMatch("/feed/:id");
 const lookmatch = useMatch("/lookdetail");
 const { data: seeFeedData, fetchMore, loading } = useQuery(SEEFEEDS_QUERY);
 const { data: seerecommendlookdata } = useQuery(SEERECOMMENDLOOK_QUERY);
 var settings = {
  infinite: true,
  autoplay : true,
  speed: 2000,
  autoplaySpeed: 10000,
  pauseOnHover : true,
  slidesToShow: 5,
  slidesToScroll: 3,
  slidesPerRow: 1,
  variableWidth: true,
  waitForAnimate: true,
  responsive: [
    {
        breakpoint: 1840,
        settings: {
            slidesToShow: 5.5,
            slidesToScroll: 3
        }
    },
    {
        breakpoint: 1435,
        settings: {
          accessibility: true,
            draggable: true,
            speed: 1000,
            autoplaySpeed: 50000,
            slidesToShow: 1,
            slidesToScroll: 2,
        }
    }
    ]
  };

  const handleScroll = useCallback(async () => {
    const scrollTop = document.documentElement.scrollTop;
    const innerHeight = window.innerHeight;
    const scrollHeight = document.body.scrollHeight;

    if (seeFeedData?.seeFeeds.lastfeedid === null) {
      return;
    }
    if (scrollTop + innerHeight >= scrollHeight) {
      await fetchMore({ variables: { cursor: seeFeedData?.seeFeeds.lastfeedid } });
    }
  }, [fetchMore, seeFeedData?.seeFeeds.lastfeedid]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  useEffect(() => {
    document.body.style.overflow = "auto";
  }, []);

  if(loading) return <Loader />

  return (
    <>
    
    <AnimatePresence>{lookmatch && lookmatch.pathname === "/lookdetail" && <LookDetail />}</AnimatePresence>
    <Maindiv variants={modalVariants} initial="start" animate="end" exit="exit">

      <link
        rel="stylesheet"
        type="text/css"
        charSet="UTF-8"
        href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css"
        crossOrigin=""
      />
      <link
        rel="stylesheet"
        type="text/css"
        href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css"
        crossOrigin=""
      />
        
      <Header />
      
 
      
     <TopNav>
     <CardForm href="/fitting">
     <CardFormDiv>
          <CardFormSpan></CardFormSpan>
          <CardFormContent>
            <CardFormContenth2>FITTING!</CardFormContenth2>
          </CardFormContent>
        </CardFormDiv>
     </CardForm>
     <StyledSlider {...settings}>
      {seerecommendlookdata?.seerecommendlook?.Look?.map((look) => (
        <LongCard2 key={look.id} id={look.id} lookimg={look.comboImage} title={look.title} lookitems={look.item} />
      ) )}
      </StyledSlider>
     </TopNav>

     <LookOrItem>
      <Learnmore>
          <a href="https://www.second.sticker.ooo/items"
              target="_blank">
          <Circle>
              <Arrow></Arrow>
          </Circle>
          <ButtonText>                                
              뭘 입혀볼지 모르겠다면?<br></br>
              <span>아이템만 따로 모아보세요!</span>
          </ButtonText>
          </a>
      </Learnmore> 
     </LookOrItem>


    
     <ItemContainer>
       {seeFeedData?.seeFeeds?.feeds.map((feed) => feed.Look.map((Look) =>  (
         <ItemCard
         key={feed?.id}
         lookimg={Look.comboImage}
         avatar={feed.user.gender === "남자" ? avatar1 : feed.user.gender === "여자" ? avatar2 : defaultavatar}
         nickname={feed.user.nickname}
         TitleText={feed.title}
         ContentText={feed.caption}
         comments={feed.comments}
         lookitems={Look.item}
         totalprice = {Look.totalPrice}
         createdAt={feed.createAt }
         lookid={Look.id}
         looktitle={Look.title}
         {...feed}
          />
       )))}
     </ItemContainer>
     <Footer />
      </Maindiv>
      </>
  );
}    
  export default Home;




  /*{data?.seeFeeds?.map((Feed) => Feed.Look.map((Look) => (
    <PhotoContainer key={Feed.id}>
    <PhotoHeader>
      <Username>{Feed.user.nickname}</Username>
      <Username>{Feed.user.age}</Username>
      
    </PhotoHeader>
    <PhotoFile src={Look.item[1].image} />
    <PhotoFile src={Look.item[2].image} />
    <PhotoFile src={Look.item[0].image} />
    <PhotoData>
    <Username>{Look.Lookbio}</Username>
    </PhotoData>
  </PhotoContainer>
)))}*/