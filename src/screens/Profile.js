import styled from "styled-components";
import Avatar from "../components/Shared/Avatar"
import Nickname from "../components/Shared/Nickname";
import useLoggedInUser from "../hooks/useLoggedInUser";
import { AnimatePresence, motion, Variants } from "framer-motion";
import { Link, NavigateFunction, useNavigate, PathMatch, useMatch, useParams } from "react-router-dom";
import { SEEPROFILE_QUERY } from "../Documents/Query/SEEPROFILE_QUERY";
import { useQuery, useLazyQuery } from "@apollo/client";
import Header from "../components/Header";
import LongCard from "../components/Aircloset/LongCard";
import ItemCard from "../components/Aircloset/ItemCard";
import avatar1 from "../img/maleavatar.png";
import avatar2 from "../img/femaleavatar.png";
import defaultavatar from "../img/profile_logo.png"
import { useEffect, useState } from "react";
import Footer from "../components/Footer";
import Loader from "../components/Loader";
import SubNavbar from "../components/SubNavbar";
import EachItem from "../components/Aircloset/EachItem";
import { SEEUSERCART_QUERY } from "../Documents/Query/SEEUSERCART_QUERY";
import { SEELIKEFEED_QUERY } from "../Documents/Query/SEELIKEFEED_QUERY";

import {ReactComponent as collect} from "../img/Tabs/profile/Collect.svg";
import {ReactComponent as feedlike} from "../img/Tabs/profile/FeedLike.svg";
import {ReactComponent as square} from "../img/Tabs/profile/square.svg";
import {ReactComponent as wand} from "../img/Tabs/profile/wand.svg";

import Masonry, {ResponsiveMasonry} from "react-responsive-masonry"





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
const ProfilekMap = [
  { label: "내 아이템",
    Icons: collect },
  { label: "좋아요한 피드",
    Icons: feedlike },
  { label: "내가 만든 피드",
    Icons: wand },
  { label: "내가 만든 룩",
    Icons: square },
];

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
  align-items: center;

  #profile{
    background-color: #0239ff !important;
    &, p{
      color: #fff !important;
    }
  }

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

const Myprofile = styled.div`
    width: 1244px;
    height: 200px;
    margin: 0 auto 0 auto;
    display: flex;
    align-items: center;
    border: 1px solid;
    border-radius: 22px;
    background-color: #f2f2f2;

    img{
        width: 200px;
        height: 200px;
    }
    @media all and (max-width:767px) {
        padding 2px 6px;
        width: 95vw;
    }
`;

const List = styled.div`
  width: 1244px;
  height: max-content-height;
  display: flex;
  margin: auto;
  justify-content: center;
  align-items: center;

  @media all and (max-width:767px) {
      width: 98vw;
      flex-direction: column;
  }
`;

const Pincontainer = styled.div`
  width: 1244px;
  height: auto;
  .ItemMesonry > div{
    align-items: center;
  }
  .LongCard{
    margin-bottom: 40px;
  }
  @media all and (max-width:767px) {
    width: 97vw;
  }
`;





function Profile() {
    const loggedInUser = useLoggedInUser();
    const { nickname } = useParams();
    const navigate = useNavigate();
    const [selectedTab, setSelectedTab] = useState("내 아이템");
   const { data: seeProfiledata, loading } = useQuery(SEEPROFILE_QUERY,{ variables: { nickname: nickname }});
   const { data: seeusercartdata } = useQuery(SEEUSERCART_QUERY,{ variables: { nickname: nickname }});
   const { data: seelikefeeddata } = useQuery(SEELIKEFEED_QUERY,{ variables: { nickname: nickname }});

   const [seeProfilelazyquery] = useLazyQuery(SEEPROFILE_QUERY);




   useEffect(() => {
    if (nickname === "undefined") {
      navigate("/",alert("로그인 해주세요"));
    }
  });
  if(loading) return <Loader />

    return (
      <Maindiv>
        
            <Header />
            <SubNavbar/>
            <Myprofile>
             <Avatar size="100px" Avatarurl={seeProfiledata?.seeProfile?.user?.avatar} />
             <Nickname nickname= {seeProfiledata?.seeProfile.user?.nickname} size="50px" textDecoration={"true"} />
            </Myprofile>

            <WindowNav>
                <nav>
                    <ul>
                    {ProfilekMap.map(({ label, Icons }) => (
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
                <ResultArea>
                    <AnimatePresence exitBeforeEnter>
                    <motion.div
                        key={selectedTab ? selectedTab : null}
                        initial={{ y: 10, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: -10, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                    >

                        {selectedTab === "내 아이템" ? 
                              ( <List>
                                  <Pincontainer>
                                      <ResponsiveMasonry
                                            columnsCountBreakPoints={{767: 2, 768: 6}}
                                        >
                                        <Masonry className="ItemMesonry">
                                            
                                              
                                              {seeusercartdata?.seeusercart?.item?.map((item) => ( <EachItem key={item.id} item={item} />) )}
                                            
                                          
                                          <></>
                                        </Masonry>
                                      </ResponsiveMasonry>
                                    </Pincontainer>
                                </List> ) 

                          : selectedTab === "내가 만든 피드" ?
                              ( <List>
                                <Pincontainer>
                                    <ResponsiveMasonry
                                          columnsCountBreakPoints={{767: 2, 768: 4}}
                                      >
                                      <Masonry className="ItemMesonry">
                                          
                                      {seeProfiledata?.seeProfile?.user.Feeds.map((feed) => feed.Look.map((Look) =>  (
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
                                  </Pincontainer>
                              </List> )
                          : selectedTab === "좋아요한 피드" ? 
                            ( <List>
                              <Pincontainer>
                                  <ResponsiveMasonry
                                        columnsCountBreakPoints={{767: 2, 768: 4}}
                                    >
                                    <Masonry className="ItemMesonry">
                                        
                                          
                                    {seelikefeeddata?.seelikefeed?.feed.map((feed) => feed.Look.map((Look) =>  (
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
                                </Pincontainer>
                            </List> )
                            : 
                            ( <List>
                              <Pincontainer>
                                  <ResponsiveMasonry
                                        columnsCountBreakPoints={{767: 2, 768: 4}}
                                    >
                                    <Masonry className="ItemMesonry">
                                        
                                          
                                    {seeProfiledata?.seeProfile?.user.Looks.map((Look) => (
                                        <LongCard 
                                        key={Look?.id} 
                                        lookimg={Look?.comboImage} 
                                        title={Look?.title} 
                                        {...Look} 
                                        lookitems={Look.item}
                                        totalprice={Look.totalPrice} 
                                        />
                                    ))}
                                        
                                      
                                      <></>
                                    </Masonry>
                                  </ResponsiveMasonry>
                                </Pincontainer>
                            </List> )
                                   
                        }

                      




                        </motion.div>
                        </AnimatePresence>
                    </ResultArea>
            </WindowNav>



                  


            <Footer />
        </Maindiv>
    )
}

export default Profile;