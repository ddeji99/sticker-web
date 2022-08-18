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







const Container = styled.div`

`;

const Mypage = styled.span`
right: 343px;
top: 200px;
z-index: -2;
font-family: 'Righteous',cursive;
font-weight: 900;
font-size: 150px;
letter-spacing: 15px;
color: #e8ebf3;
position: fixed;

@media (pointer:coarse) {
    right: 105px;
    top: 120px;
}

`;

const Myprofile = styled.div`
margin: 0 auto 0 auto;
padding 2vw;
width: 1200px;
height: 200px;
display: flex;
align-items: center;

// border: 1px solid;
img{
    width: 200px;
    height: 200px;
}
@media (pointer:coarse) {
    padding 2vh 6vw;
    width: 90vw;
  }
`;

const List = styled.div`
display: flex;
width: 90vw;
margin-bottom: 700px;
justify-content: center;

@media (pointer:coarse) {
    width: 98vw;
    flex-direction: column;
  }
`;

const Mycloset = styled.div`
width: 645px;
// border: 1px solid;

@media (pointer:coarse) {
    width: 90vw;
    height: 50vh;
  }
`;

const Myfeed = styled.div`
width: 645px;
// border: 1px solid;
`;

const Info = styled.span`
margin: 0 0 10px 50px;
font-weight: 900;
font-size: 40px;
letter-spacing: 15px;
@media (pointer:coarse) {
    white-space: nowrap;
    margin: 0 10vw 0 10vw;
    font-size: 4vh;
  }
`;

const Lookcontainer = styled.div`
width:100%;
height: 500px;
// border: 1px solid;
display: -webkit-box;
flex-wrap: wrap;

@media (pointer:coarse) {
    width: 98vw;
    height: 42vh;
    overflow:scroll;
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
  }
`;

const Feedcontainer = styled.div`
width:100%;
height: 500px;
// border: 1px solid;
display: flex;
flex-direction: column;
align-items: center;
@media (pointer:coarse) {
    width: 98vw;
  }
`;




function Profile() {
    const loggedInUser = useLoggedInUser();
    const { nickname } = useParams();
    const navigate = useNavigate();
   const { data: seeProfiledata, loading: seeProfileloading } = useQuery(SEEPROFILE_QUERY,{ variables: { nickname: nickname }});
   const [seeProfilelazyquery] = useLazyQuery(SEEPROFILE_QUERY);
   useEffect(() => {
    if (nickname == undefined) {
      navigate("/");
    }
  });

    return (
      <>
        <Container>
            <Header />

            <Mypage>my page</Mypage>
            <Myprofile>
             <Avatar size="100px" Avatarurl={seeProfiledata?.seeProfile.user?.avatar} />
             <Nickname nickname= {seeProfiledata?.seeProfile.user?.nickname} size="30px" textDecoration={"false"} />
            </Myprofile>
            <List>

                <Mycloset>

                    <Info>MY CLOSET</Info>

                    <Lookcontainer>
                     {seeProfiledata?.seeProfile.user.Looks.map((Look) => (
                         <LongCard key={Look?.id} lookimg={Look?.comboImage} title={Look?.title} {...Look} lookitems={Look.item} />
                     ))}
                    </Lookcontainer>

                </Mycloset>

                <Myfeed>

                    <Info>MY FEED</Info>

                    <Feedcontainer>
                        {seeProfiledata?.seeProfile.user.Feeds.map((feed) => feed.Look.map((Look) => (
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
                    </Feedcontainer>

                </Myfeed>

            </List>
            <Footer />

        </Container>
       
        </>
    )
}

export default Profile;