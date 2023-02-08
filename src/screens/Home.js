import { gql, useQuery, useReactiveVar } from "@apollo/client";
import { logUserOut } from "../apollo";
import styled, { keyframes } from "styled-components";
import useLoggedInUser from "../hooks/useLoggedInUser";
import { isLoggedInVar } from "../apollo";
import { Link, useNavigate, useMatch } from "react-router-dom";
import ItemCard from "../components/Aircloset/ItemCard"
import Slider from "react-slick";
import Carousel from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Header from "../components/Header";
import { AnimatePresence, motion } from "framer-motion";
import React, { useCallback, useEffect, useState, useRef } from "react";
import avatar1 from "../img/maleavatar.png";
import avatar2 from "../img/femaleavatar.png";
import defaultavatar from "../img/profile_logo.png"
import { SEEBESTFEED_QUERY } from "../Documents/Query/Feedcategory/SEEBESTFEED_QUERY";
import { SEEBESTITEM_QUERY } from "../Documents/Query/SEEBESTITEM_QUERY";
import Footer from "../components/Footer";
import SubNavbar from "../components/SubNavbar";
import EachItem from "../components/Aircloset/EachItem";
import Masonry, {ResponsiveMasonry} from "react-responsive-masonry";
import MobileMainBanner from "../components/Shared/MobileMainBanner";


import Bbannerimg1 from "../img/Bbannerimg1.jpg";
import Bbannerimg2 from "../img/Bbannerimg2.jpg";
import Bbannerimg3 from "../img/Bbannerimg3.jpg";
import Bbannerimg4 from "../img/Bbannerimg4.jpg";
import Bbannerimg5 from "../img/Bbannerimg5.jpg";
import Bbannerimg6 from "../img/Bbannerimg6.jpg";
import Bbannerimg7 from "../img/Bbannerimg7.jpg";

import Thumbimg1 from "../img/topbtn01.jpg";
import Thumbimg2 from "../img/topbtn02.jpg";
import Thumbimg3 from "../img/topbtn03.jpg";
import Thumbimg4 from "../img/topbtn04.jpg";
import Thumbimg5 from "../img/topbtn05.jpg";

import MinibaanerImg1 from "../img/M_1.png";
import MinibaanerImg2 from "../img/M_2.png";
import MinibaanerImg3 from "../img/M_3.png";
import MinibaanerImg4 from "../img/M_4.png";
import MinibaanerImg5 from "../img/M_5.png";




const Maindiv = styled.div`
  min-width: 370px;
  box-sizing: border-box;
  height: min-content; /* 3985px */
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  padding: 60px 0px 0px 0px;
  background-color: #ffffff;
  overflow: hidden;
  align-content: center;
  flex-wrap: nowrap;

  .divider {
    height: 20px;
    width: 100vw;
    margin: 15px 0;
    background-color: rgb(178 195 255 / 30%);
  }

  .MoreItem {
    width: 70px !important;
    display: flex !important;
    justify-content: center;
    border-radius: 12px;
    font-size: 14px;
    letter-spacing: -.14px;   

    border: 1px solid #d3d3d3;
    color: rgba(34,34,34,.8); 
    background-color: #fff6;     

    padding: 10px 30px;
    margin: auto auto;
    &:hover{
      color: #0239FF;
      border: 1px solid #0239FF;
    }
  }

  @media all and (max-width:767px) {
    padding: 10px 0 0 0;

  }
`;
// 아이템 더보기 버튼 포함

// ----메인 페이지 배너 섹션 시작---- //
const TopNav = styled.div`
    background-color: #fff;
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-bottom: 60px;
    
  @media all and (max-width:767px) {
    flex-direction: column;

  }
`;

const MainSliderArea = styled.div`
  width: 802px;
  height: 300px;
  margin-right: 20px;
  overflow: hidden;
  border-radius: 20px;
  box-shadow: 0 5px 15px rgb(0 0 0 / 15%);


  @media all and (max-width:767px) {
    display: none !important;
  }

`;

  const StyledSlider = styled(Slider)`
    width: 100%;
    height: 100%;

    .slick-current{
      z-index: 2 !important;
      img{
        width: 100%;
        object-fit: fill;
      }
    }

    @media all and (max-width:767px) {
      display: none;
    }

  `;

  const ThumbSlider = styled(Carousel)`
    @media all and (max-width:767px) {
      display: none;
    }

    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    .slick-list{
      width: 655px;
      height: 90px;
      box-sizing: border-box;
      position: absolute;
      bottom: 3px;
      left: -50px;
      font-size: 0;
      z-index: 2;
      display: flex;
      align-items: center;
    }

    .slick-slide{
      width: 50px !important;
      margin-left: 15px;
      filter: grayscale(100%);
      border: 2px solid #ffffff00 !important;

    }

    .slick-slide::before {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      border: 2px solid #fffff00 !important;
      background: rgb(0 0 0 / 49%);
      -webkit-box-sizing: border-box;
      box-sizing: border-box;
      
      border-radius: 10px;
    }

    .slick-track{
      width: 560px;
      cursor: pointer;
    }
    
    .slick-center{
      box-sizing: border-box;
      filter: grayscale(0%);
      border-radius: 10px;
      border: 2px solid #fff !important;
      transition-property: transform;
      transition-duration: 0.3s;

      ::before {
        display: none;
      }
    }

  `;

  const BenefitBanner = styled.div`

  `;

  const WarnBanner = styled.div`
      box-sizing: border-box;
      width: 70px;
      height: 70px;
      border-radius: 10px;
      overflow: hidden;

  `;
// ----메인 페이지 배너 섹션 끝---- //


// ----메인 페이지 5가지 메인 버튼 섹션 시작---- //
const Learnmore = styled.div`
  width: 422px;
  height: 300px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-content: space-between;

    a{
      box-sizing: border-box;
      box-shadow: 0 5px 15px rgb(0 0 0 / 15%);
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      align-items: center;
      overflow: hidden;
      cursor: pointer;
      border-radius: 18px;
    }

    .lastchild{    
      margin-top: -65px;
    }

    ::before{
      content: "";
      background: linear-gradient(to bottom, transparent 50%, rgba(0,0,0,0.75) 100%);
    }
  
  @media all and (max-width:767px) {
    width: 95vw;
    height: min-content;

    a{
      border-radius: 20px;
    }

  }
`;

const MainBannerBtn = styled.a`
  width: 100%;
  height: 150px;
  margin-bottom: 10px;
  position:relative;
  box-shadow: 0px 0px white !important;
  div{
    height: 65px;
  }
  img{
    width: 100%;
    position: absolute;
    object-fit: cover;
  }

  
  @media all and (max-width:767px) {
    height: 33.7vw;

  }
`;

const MiddleBannerBtn = styled.a`
  width: calc(100% / 3 - 6.6px);
  height: 140px;
  position:relative;
  box-shadow: 0;
  img{
    height : 100%;
    position: absolute;
  }

  
  @media all and (max-width:767px) {
    width: calc(95vw / 3 - 6.6px);
    img{
      width: 100%;
      object-fit: cover;
    }

  }

`;

const SmallBannerBtn = styled.a`
  width: calc(100% / 3 - 6.6px);
  height: 65px;
  position:relative;
  div{
    height: 50px;
    span{
      line-height: 26px;
    }
  }
  img{
    height : 100%;
    position: absolute;
  }

  @media all and (max-width:767px) {
    width: calc(95vw / 3 - 6.6px);
    img{
      width: 100%;
      object-fit: cover;
    }

  }
`;


const HbuttonText = styled.div`
  height: 120px;
  z-index: 2;
  justify-content: space-between;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin: 10px;
    span, p {
        width: 120px;
        margin: 0;
        color: #fff;
        letter-spacing: .25px;
        line-height: 30px;
        text-shadow: 0 2px 10px rgb(0 0 0 / 20%);
        z-index: 2;
    }

    span {
        font-size: 24px;
        font-weight: 600;
    }

    p {
        font-size: 16px;
        font-weight: 400;
    }

  @media all and (max-width:767px) {
    span {
      width: 100%;
      font-size: 22px;
      overflow: hidden;
      white-space: normal;
      text-overflow: ellipsis;
    }
    p {
        font-size: 14px;
    }

  }

`;
// ----메인 페이지 5가지 메인 버튼 섹션 끝---- //

// 피드 아이템 추천 섹션 시작
const RecommendContent = styled.div`
  width: 1244px;
  height: min-content; /* 685px */
  margin-bottom: 60px;

  @media all and (max-width:767px) {
    width: 100vw;
    padding: 0px;
    display: flex;
    flex-direction: column;
    align-items: center;

  }
`;

const TopFeed = styled.div`
  width: 1244px; /* 612px + 162*/
  height: min-content; /* 685px */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  margin-bottom: 50px;
  h2{
    font-size: 32px;
    font-weight: 700;
    color: transparent;
    background: linear-gradient(90deg,#0075ff 0%,#0034f6 55%,#a800ff 100%);
    background-clip: text;
    -webkit-background-clip: text;
    white-space: pre;
    font-family: "Noto Sans KR", sans-serif;
  }

  @media all and (max-width:767px) {
    width: 100vw;
    justify-content: center;
    align-items: center;

  }
`;

const TopItem = styled(motion.div)`
  width: 1244px; 
  height: min-content; /* 685px */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-end;

  position: relative;
  background: var(--white);
  border-radius: 8px;
  margin-bottom: 32px;
  padding: 20px 0 24px 0;

  .TopItemBody{
    display:flex;
    padding: 20px 0px;
  }
  h2{
    font-size: 32px;
    font-weight: 700;
    background: linear-gradient(90deg,#0034F6 0%,#f07bc5 55%,#ffa54d 80%);
    background-clip: text;
    -webkit-background-clip: text;
    color: transparent;
    white-space: pre;
    font-family: "Noto Sans KR", sans-serif;
  }

  @media all and (max-width:767px) {
    width: 95vw;
    padding: 0px;
    display: flex;
    justify-content: center;
    align-items: center;
    .TopItemBody{
      width: 95vw;
      padding: 0px;
      flex-direction: column;
      align-items: center;
    }

  }
`;

const BestContentText = styled.div`
  box-sizing: border-box;
  width: 1244px;
  height: min-content; /* 29px */
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  overflow: hidden;
  position: relative;
  align-content: center;
  flex-wrap: nowrap;

  margin-bottom: 20px;

  border-bottom: 3px solid transparent;

  background-img: linear-gradient(90deg,#0034F6 0%,#f07bc5 55%,#ffa54d 80%);
  background-origin: border-box;
  background-clip: content-box, border-box;

  a{
    cursor: pointer;
    &:hover {
      color: #0239FF;
      underline: 1px solid;
      transition: all 0.5s;
    }
  }
  
  @media all and (max-width:767px) {
    width: 95vw;
    flex-direction: column;
  }
`;

const BestItem = styled.div`
  width: 1244px;
  height: auto;
  padding-left: 24px;
  position: relative;

  .ItemMesonry {
    gap: 10px !important;
  }
  .ItemMesonry > div {
    gap: 40px !important;
    align-items: center;
  }

  @media all and (max-width:767px) {
    width: 95vw;
    height: min-content;
    padding-left: 0px;

    .ItemMesonry {
      gap: 10px !important;
    }
    .ItemMesonry > div {
      gap: 10px !important;
    }
  }
`;


const BestFeed = styled(Slider)`
  width: 100vw; 
  height: min-content;
  background-color: rgb(178 195 255 / 10%);
  padding: 0 calc(50vw - 1224px);
  display: flex;
  justify-content: center;

  .slick-list {
    width: 1244px;
    min-width: 1244px;
    overflow: hidden;
    padding: 15px 20px;
  }

  .slick-next, .slick-prev {
    width: 60px;
    height: 45px;
    position: absolute;
    line-height: 1;
    top: -35px;
    background-color: white;
    border: 1px solid rgb(194 194 194 / 30%);


    &:hover{
      fill: #0239FF;
      background-color: rgb(227 233 255);
      transition-property: background-color;
      transition-duration: 0.3s;

    }
  }
  
  .slick-prev {        
    left: calc(50vw - -480px);
    border-radius: 25px 0px 0px 25px;
      svg{    
        left: 13px;
        top: 10px;
        position: absolute;
        -webkit-transform: scaleX(-1);
        transform: scaleX(-1);
      }
  }
  .slick-next {
    right: calc(50vw - 600px);
    border-radius: 0px 25px 25px 0px;

      svg{        
        left: 23px;
        top: 10px;
        position: absolute;
      }
  }
  .slick-next::before, .slick-prev::before {
    display: none;
  }

  @media all and (max-width:767px) {
    width: 100vw;
    height: 520px;
    
    .slick-list {
      width: auto; 
      min-width: auto;
      padding: 20px 20vw !important;
    }

    .slick-center{
      opacity: 1;
      transition:  all 0.2s;
      transition-timing-function: ease-in;
      z-index: 2 !important;
      position: relative;

      .ItemGroup{
        opacity: 1;
        transition: all 0.5s cubic-bezier(0.25, 0.25, 0.75, 0.75);
        transition-timing-function: ease-in;
      }
    }
    
    .slick-slide:not(.slick-active) { 
      opacity: 0.33;
      transform: scale(0.9);
      transition:  all 0.2s;
      transition-timing-function: ease-in;

      .ItemGroup{
        opacity: 0;
        transform: translateX(-20px);
        transition: all 0.5s cubic-bezier(0.25, 0.25, 0.75, 0.75);
        transition-timing-function: ease-in;
      }
    }
    .slick-prev {    
      left: calc(50vw - 50%);
      background-image: linear-gradient(to right,rgb(229 229 229 / 30%) ,#ffffff00);
    }
    .slick-next {    
      right: calc(50vw - 50%);
      background-image: linear-gradient(to left,rgb(229 229 229 / 30%) ,#ffffff00);
    }

    .slick-next, .slick-prev {
      width: 74px;
      height: 100%;
      position: absolute;
      line-height: 1;
      top: 50%;
      background-color: #ffffff00;
      border: none;
      border-radius: 0px;
      fill: #fff;
      &:hover{
        fill: #0239FF;
        background-color: #ffffff00;
      }
      svg {
        top: 50%;
      }
    }
  }

`;
const Pre = styled.div`
  width: 30px;
  height: 30px;
  position: absolute;
  z-index: 3;
`;

const NextTo = styled.div`
  width: 30px;
  height: 30px;
  position: absolute;
  z-index: 3;
`;
// ----피드 아이템 추천 섹션 끝---- //

// ----상황별 추천 섹션 ---------- //



// const TPOContent = styled.div`
//   width: 1244px;
//   height: 1244px;
//   margin-bottom: 60px;
//   border: 1px solid #000;
// `;



// -------------------------------- //
const MiniSlider = styled(Slider)`
width: 2000px;
height: 120px;
object-fit: cover;


margin-bottom: 80px;

`;

const Minibaaner = styled.img`
`;



// ----핀컨테이너 시 ----//
const ItemContainer = styled.div`  
.Fog{
  width: 100%;
  height: 500px;
  top: 335px;
  background: linear-gradient(1deg,#ffffff 0%, #ffffff00 80%);
  z-index: 2;
}

`;

const ContainerText = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding: 30px 10px;

    h2 {
      font-size: 32px;
      font-weight: 700;
      background: linear-gradient(90deg,#0034F6 0%,#f07bc5 55%,#ffa54d 80%);
      background-clip: text;
      -webkit-background-clip: text;
      color: transparent;
      white-space: pre;
      font-family: "Noto Sans KR", sans-serif;
    }

    a {
      cursor: pointer;
      &:hover {
        color: #0239FF;
        underline: 1px solid;
      }
`;

const Pincontainer = styled.div`
  width: 1244px;
  height: auto;
  .ItemCardBody{
    margin-bottom: 40px;
  }
  @media all and (max-width:767px) {
    width: 97vw;
  }
`;


function Home() {
 
 const LoggedInUser = useLoggedInUser();
 const isLoggedIn = useReactiveVar(isLoggedInVar);
 const navigate = useNavigate();
 const Detailpathmatch = useMatch("/feed/:id");
 const lookmatch = useMatch("/lookdetail");
 const { data: seebestfeedData, loading: seeFeedLoading } = useQuery(SEEBESTFEED_QUERY);
 const { data: seebestitemdata } = useQuery(SEEBESTITEM_QUERY);
 
 var settings = {
  infinite: true,
  autoplay: true,
  waitForAnimate: false,
  speed: 500,
  pauseOnHover : true,
  nextArrow : 
    <NextTo>
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
        <path d="M5 3l3.057-3 11.943 12-11.943 12-3.057-3 9-9z"/>
      </svg>
    </NextTo>,
  prevArrow :
    <Pre>
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
        <path  d="M5 3l3.057-3 11.943 12-11.943 12-3.057-3 9-9z"/>
      </svg>
    </Pre>
  };
  const [selectedCarouselIndex, setSelectedCarouselIndex] = useState(0);

  const [nav1, setNav1] = useState();
  const [nav2, setNav2] = useState();
  const slider1 = useRef(null);
  const slider2 = useRef(null);

  useEffect(() => {
    slider2.current.slickGoTo(selectedCarouselIndex);
  }, [selectedCarouselIndex]);

  const ThumbMap = [
    { id: 0,
      src: require("../img/Thumbimg1.jpg") },
    { id: 1,
      src: require("../img/Thumbimg2.jpg") },
    { id: 2,
      src: require("../img/Thumbimg3.jpg") },
    { id: 3,
      src: require("../img/Thumbimg4.jpg") },
    { id: 4,
      src: require("../img/Thumbimg5.jpg") },
    { id: 5,
      src: require("../img/Thumbimg6.jpg") },
    { id: 6,
      src: require("../img/Thumbimg7.jpg") }
  ];

  useEffect(() => {
    setNav1(slider1.current);
    setNav2(slider2.current);
  }, []);
  

  //if(seeFeedLoading) return <Loader />

  return (
    
    
    <Maindiv>

        
      <Header />
      <SubNavbar/>
      
 
      
      <TopNav>
            <MobileMainBanner/>
            <MainSliderArea>
              <StyledSlider 
              Arrows={false}
              asNavFor={nav2} 
              ref={slider1}
              infinite = {true}
              autoplay = {false}
              waitForAnimate = {false}
              pauseOnHover={true}
              fade={true}
              >
                  <BenefitBanner>
                    <a href="https://blog.naver.com/sticker_platform/222980870551">
                      <img src={Bbannerimg1}  />
                    </a>
                  </BenefitBanner>
                  <BenefitBanner>
                    <a href="https://blog.naver.com/sticker_platform/222980894416">
                      <img src={Bbannerimg2} />
                    </a>
                  </BenefitBanner>
                  <BenefitBanner>
                    <a href="https://blog.naver.com/sticker_platform/222980898568">
                      <img src={Bbannerimg3} />
                    </a>
                  </BenefitBanner>
                  <BenefitBanner  >
                    <a href="https://blog.naver.com/sticker_platform/222980897347">
                      <img src={Bbannerimg4}  />
                    </a>
                  </BenefitBanner>
                  <BenefitBanner  >
                    <a href="https://blog.naver.com/sticker_platform/222980898974">
                      <img src={Bbannerimg5}  />
                    </a>
                  </BenefitBanner>
                  <BenefitBanner  >
                    <a href="https://blog.naver.com/sticker_platform/222980898193">
                      <img src={Bbannerimg6} />
                    </a>
                  </BenefitBanner>
                  <BenefitBanner >
                    <a href="https://blog.naver.com/sticker_platform/222980897962">
                      <img src={Bbannerimg7}  />
                    </a>
                  </BenefitBanner>
              </StyledSlider>

              <ThumbSlider
                autoplay = {true}
                speed = {300}
                asNavFor={nav1}
                ref={slider2}
                slidesToShow={7}
                swipeToSlide={true}
                centerMode={true}
                focusOnSelect={true}
                pauseOnHover={true}
                waitForAnimate={false}
              >
                {ThumbMap.map((list, i) => (
                  <WarnBanner key={i} onMouseEnter={() => setSelectedCarouselIndex(list.id)}>
                    <div>{list.id}</div>
                    <img src={list.src} />
                  </WarnBanner>
                ))}
              </ThumbSlider>
            </MainSliderArea>
            <Learnmore>
              
              <MainBannerBtn href="/items" >
                <HbuttonText>
                <span>Store &gt;</span>
                <p>스티커 스토어</p>
                </HbuttonText>
                <img src={Thumbimg1}/>
              </MainBannerBtn>

              <SmallBannerBtn href="/fitting" >
                <HbuttonText>
                <span>Try on &gt;</span>
                <p>피팅하기</p>
                </HbuttonText>
                <img src={Thumbimg4}/>
              </SmallBannerBtn>

              <MiddleBannerBtn href="/feeds" >
                <HbuttonText>
                <span>Trending OutFit's &gt;</span>
                <p>인기피드</p>
                </HbuttonText>
                <img src={Thumbimg3}/>
              </MiddleBannerBtn>
              
              <MiddleBannerBtn className="" href="https://blog.naver.com/PostList.naver?blogId=sticker_platform&from=postList&categoryNo=11" >
                <HbuttonText>
                <span>Explore Styles &gt;</span>
                <p>매거진</p>
                </HbuttonText>
                <img src={Thumbimg2}/>
              </MiddleBannerBtn>

              <SmallBannerBtn className="lastchild" href="https://www.second.sticker.ooo/checklist" >
                <HbuttonText>
                <span>Check List &gt;</span>
                </HbuttonText>
                <img src={Thumbimg5}/>
              </SmallBannerBtn>

            </Learnmore> 
        </TopNav>

        <RecommendContent>
            <TopFeed>
              <BestContentText>
                <h2>#지금 바로. 월간 인기피드</h2>
              </BestContentText>

              <BestFeed {...settings}
                slidesToShow={4}
                lazyLoad ={true}
                swipeToSlide={true}
                touchThreshold={20}
                autoplaySpeed = {600000}
                waitForAnimate = {true}
                pauseOnFocus = {false}
                pauseOnHover = {true}
                
                responsive = {
                  [{ breakpoint: 768, 
                      settings: {	
                        infinite: false,
                        autoplay: false,
                        slidesToScroll: 1,
                        lazyLoad: true,
                        speed: 400,
                        cssEase: "cubic-bezier(.72,.38,.32,.74)",
                        slidesToShow: 1,
                        centerMode: true,
                        centerPadding: "110px",
                        waitForAnimate: false,
                        touchMove : true,
                      } 
                    }]}

              >
                {seebestfeedData?.seebestFeed.feeds.map((feed) => feed.Look.map((Look) =>  (
                  <ItemCard
                  key={feed?.id}
                  lookimg={Look.comboImage}
                  category={feed.category}
                  totalComments={feed.commentNumber}
                  gender={feed.user.gender}
                  isLiked={feed.isLiked}
                  totalLikes={feed.totalLikes}
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
                
                
                
                </BestFeed>
            </TopFeed>
            <Link to={`/feeds`} className="MoreItem"><p>더보기 </p></Link>

            <TopItem>
              <BestContentText>
                <h2>내 아이템. 내 스타일</h2>
              </BestContentText>
              <div className="TopItemBody">
                <BestItem>
                  <ResponsiveMasonry
                        columnsCountBreakPoints={{767: 3, 768: 6}} gutter="10px" 
                    >
                    <Masonry className="ItemMesonry">
                    {seebestitemdata?.seebestitem?.items.map((item) => ( <EachItem key={item.id}  item={item}  />) )} 
                         
                      
                     
                         <></>
                      
                    </Masonry>
                  </ResponsiveMasonry>
                </BestItem>
              </div>
              
            </TopItem>
            <Link to={`/items`} className="MoreItem"> 더보기 </Link>

        </RecommendContent>

        <MiniSlider {...settings}
            >
                <Minibaaner src={MinibaanerImg1}></Minibaaner>
                <Minibaaner src={MinibaanerImg2}></Minibaaner>
                <Minibaaner src={MinibaanerImg3}></Minibaaner>
                <Minibaaner src={MinibaanerImg4}></Minibaaner>
                <Minibaaner src={MinibaanerImg5}></Minibaaner>

        </MiniSlider>




     
    
    
     <Footer />
      </Maindiv>
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