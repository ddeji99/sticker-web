import React, { useState } from 'react';
import { gql, useQuery, useReactiveVar } from "@apollo/client";
import styled, { keyframes } from "styled-components";
import useLoggedInUser from "../hooks/useLoggedInUser";
import ItemCard from "../components/Aircloset/ItemCard"
import Header from "../components/Header";
import { Link, useNavigate, useMatch } from "react-router-dom";
import { AnimatePresence, motion, Variants, useScroll } from "framer-motion";

import Footer from "../components/Footer";
import SubNavbar from '../components/SubNavbar';
import Masonry, {ResponsiveMasonry} from "react-responsive-masonry"

import { SEEFEEDS_QUERY } from '../Documents/Query/SEEFEEDS_QUERY';
import { SEERECOMMANDFEED_QUERY } from '../Documents/Query/Feedcategory/SEERECOMMANDFEED_QUERY';
import { SEEQUESTIONFEED_QUERY } from '../Documents/Query/Feedcategory/SEEQUESTIONFEED_QUERY';
import { SEEMALEFEED_QUERY } from '../Documents/Query/Feedcategory/SEEMALEFEED_QUERY';
import { SEEFEMALEFEED_QUERY } from '../Documents/Query/Feedcategory/SEEFEMALE_QUERY';

import {ReactComponent as male} from "../img/Tabs/man.svg";
import {ReactComponent as female} from "../img/Tabs/woman.svg";
import {ReactComponent as flame} from "../img/Tabs/Feed/flame.svg";
import {ReactComponent as newspaper} from "../img/Tabs/Feed/newspaper.svg";
import {ReactComponent as questionmark} from "../img/Tabs/Feed/questionmark.svg";



const WindowNav = styled.div`
    width: 1244px;
    height: max-content;
    border-radius: 10px;
    background: white;
    display: flex;
    flex-direction: column;
    padding: 0 20px;
    align-items: center;
    margin: 10px 0 ;

    ul,
    li {
    list-style: none;
    padding: 0;
    margin: 0;
    padding: 10px 12px 20px 12px;
    color: #6e6d7a;
    transition: all 200ms ease;
    font-size: 18px;
    }

    ul {
    display: flex;
    width: 1000px;
    }
    
    li {
        height: 24px;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 55px;
        width: 100%;
        padding: 10px 15px;
        position: relative;
        background: white;
        cursor: pointer;
        flex: 1;
        min-width: 0;
        user-select: none;
        margin: 0 10px;
        font-weight: 700;
        border: 1px solid rgb(194 194 194 / 30%);
        & > svg{
          width: 32px;
          height: 30px;
          margin-right: 15px;
        }
        &:hover {
          background: rgba(13,12,34,0.05);
          color: #0239ff !important;
          svg{
            fill: #0239ff !important;
          }
        }
      }

    .selected {
      background: #0239ff;
      color: #fff !important;
      & > svg{
          fill: #fff !important;
      }
    }

    .underline {
        width: 70%;
        position: absolute;
        bottom: -5px;
        left: 15%;
        right: 0;
        height: 3px;
        border-radius: 3px;
        background: #0239ff;
    }
    
    li button {
      width: 20px;
      height: 20px;
      border: 0;
      background: #fff;
      border-radius: 3px;
      display: flex;
      justify-content: center;
      align-items: center;
      stroke: #000;
      margin-left: 10px;
      cursor: pointer;
      flex-shrink: 0;
    }
    
    .background {
      position: absolute;
      top: 0;
      left: 0;
      bottom: 0;
      width: 300px;
      background: #fff;
    }
    
    .add-item {
      width: 30px;
      height: 30px;
      background: #eee;
      border-radius: 50%;
      border: 0;
      cursor: pointer;
      align-self: center;
    }
    
    .add-item:disabled {
      opacity: 0.4;
      cursor: default;
      pointer-events: none;
    }
    
    @media all and (max-width:767px) {
      width: 97vw;
      height: 100%;
      margin-top: 0px;
      margin-bottom: 10px;
      padding: 0;

      ul,
      li {    
        width: 650px;
        font-weight: 400;
        font-size: 11px;
        padding: 5px 0px 10px 0px;
      }
      nav{
        width: 97vw;
        overflow: scroll;
        ::-webkit-scrollbar {
          display: none; 
        }
      }
      
      li {
        padding: 5px 5px !important;
        margin: 0 10px;
        & > svg{
          width: 24px !important;
          height: 20px !important;
          margin-right: 5px;
        }
      }
      .selected {
        background: #0239ff;
        color: #fff !important;
        & > svg{
            fill: #fff !important;
        }
      }
`;

const ResultArea = styled(motion.div)`
    width: 1244px; 
    @media all and (max-width:767px) {
      width: 97vw;
    }
`;

const FeedMap = [
    { label: "최신피드",
      Icons: newspaper },
    { label: "추천피드",
      Icons: flame },
    { label: "질문피드",
      Icons: questionmark },
    { label: "여성",
      Icons: female },
    { label: "남성",
      Icons: male },
  ];

  const Pincontainer = styled.div`
  width: 1244px;
  
  .ItemMesonry > div{
    align-items: center;
  }
  .ItemCardBody{
    margin-bottom: 40px;
  }
  @media all and (max-width:767px) {
    width: 97vw;
  }
`;

const Maindiv = styled.div`
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
  
  #feeds{
    background-color: #0239ff !important;
    &, p{
      color: #fff !important;
    }
  }

  .MoreItem {
    border-radius: 12px;
    font-size: 14px;
    letter-spacing: -.14px;   

    border: 1px solid #d3d3d3;
    color: rgba(34,34,34,.8); 
    background-color: #fff6;     

    padding: 10px 30px;
    margin: 20px auto 0 auto;
    &:hover{
      color: #0239FF;
      border: 1px solid #0239FF;
    }
  }
  @media all and (max-width:767px) {
    padding: 10px 0 0 0;
  }
`;













function FeedMain() {

    const [selectedTab, setSelectedTab] = useState("최신피드");
    const { data: seefeedsdata } = useQuery(SEEFEEDS_QUERY);
    const { data: seerecommandfeeddata } = useQuery(SEERECOMMANDFEED_QUERY);
    const { data: seequestionfeeddata } = useQuery(SEEQUESTIONFEED_QUERY);
    const { data: seemalefeeddata } = useQuery(SEEMALEFEED_QUERY);
    const { data: seefemalefeeddata } = useQuery(SEEFEMALEFEED_QUERY);




    return (
        <Maindiv>
            <link
            rel="stylesheet"
            type="text/css"
            charSet="UTF-8"
            href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css"
          />
          <link
            rel="stylesheet"
            type="text/css"
            href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css"
          />
          <Header />
          <SubNavbar/>
            <div>
                <WindowNav>
                <nav>
                    <ul>
                    {FeedMap.map(({ label, Icons }) => (
                        <li
                        key={label}
                        className={label === selectedTab ? "selected" : ""}
                        onClick={() => setSelectedTab(label)}
                        >

                        <Icons/>
                        <p>{label}</p>

                        {label === selectedTab ? (
                            <motion.div className="underline" layoutId="underline" />
                        ) : null}
                        
                        </li>
                        ))}
                    </ul>
                </nav>
                </WindowNav>
                <ResultArea>
                    <AnimatePresence exitBeforeEnter>
                    <motion.div
                        key={selectedTab ? selectedTab : null}
                        initial={{ y: 10, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: -10, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                    >
                        {selectedTab === "최신피드" ?

                            
                                (<Pincontainer>
                                    <ResponsiveMasonry
                                        columnsCountBreakPoints={{767: 2, 768: 4}}
                                    >
                                    <Masonry className="ItemMesonry">
                                        
                                    {seefeedsdata?.seeFeeds.feeds.map((feed) => feed.Look.map((Look) =>  (
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
                                            
                                        <></>
                                    </Masonry>
                                    </ResponsiveMasonry>
                                </Pincontainer>)
                            : selectedTab === "추천피드" ?

                                (<Pincontainer>
                                    <ResponsiveMasonry
                                        columnsCountBreakPoints={{767: 2, 768: 4}}
                                    >
                                    <Masonry className="ItemMesonry">
                                        
                                    {seerecommandfeeddata?.seerecommandFeed.feeds.map((feed) => feed.Look.map((Look) =>  (
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
                                            
                                        <></>
                                    </Masonry>
                                    </ResponsiveMasonry>
                                </Pincontainer>)
                            : selectedTab === "질문피드" ?
                                (<Pincontainer>
                                    <ResponsiveMasonry
                                        columnsCountBreakPoints={{767: 2, 768: 4}}
                                    >
                                    <Masonry className="ItemMesonry">
                                        
                                    {seequestionfeeddata?.seequestionFeed.feeds.map((feed) => feed.Look.map((Look) =>  (
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
                                            
                                        <></>
                                    </Masonry>
                                    </ResponsiveMasonry>
                                </Pincontainer>)
                            : selectedTab === "여성" ?
                                (<Pincontainer>
                                    <ResponsiveMasonry
                                        columnsCountBreakPoints={{767: 2, 768: 4}}
                                    >
                                    <Masonry className="ItemMesonry">
                                        
                                    {seefemalefeeddata?.seefemaleFeed.feeds.map((feed) => feed.Look.map((Look) =>  (
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
                                            
                                        <></>
                                    </Masonry>
                                    </ResponsiveMasonry>
                                </Pincontainer>)
                            : 
                            (<Pincontainer>
                                <ResponsiveMasonry
                                    columnsCountBreakPoints={{767: 2, 768: 4}}
                                >
                                <Masonry className="ItemMesonry">
                                    
                                {seemalefeeddata?.seemaleFeed.feeds.map((feed) => feed.Look.map((Look) =>  (
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
                                        
                                    <></>
                                </Masonry>
                                </ResponsiveMasonry>
                            </Pincontainer>)
                        
                    
                    
                    
                    
                    
                    
                    
                    
                    
                        }               





                    </motion.div>
                    </AnimatePresence>
                </ResultArea>
            </div>

          <Footer />
        </Maindiv>
    )
}

export default FeedMain;