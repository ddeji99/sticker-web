import styled from "styled-components";
import react, { useState } from "react";
import Avatar from "../Shared/Avatar";
import Nickname from "../Shared/Nickname";
import { Link, useNavigate, useMatch } from "react-router-dom";
import { AnimatePresence, motion, Variants } from "framer-motion";
import CreatedAt from "../Shared/CreatedAt";
import FeedDetail from "../Feed/FeedDetail";
import LookDetail from "../Feed/LookDetail";


const ItemCardForm = styled.div`
    width: 28.6vw;
    min-width: 560px;
    height: 400px;
    margin: 10px;
    border-radius: 6px;
    background-color: #fff;
    box-shadow: rgba(0, 0, 0, 0.2) 0px 2px 4px,
            rgba(0, 0, 0, 0.15) 0px 7px 10px -3px,
            rgba(0, 0, 0, 0.1) 0px -2px 0px inset;
    float: left;
    display: flex;
    justify-content: flex-start;
    padding: 3px;
    font-weight: 400;

    @media (pointer:coarse) {
        border-radius: 24px;
        width: 97vw;
        height: 800px;
    }
`;
const ItemCardImg = styled.img`
    cursor:pointer;
    height: 100%;
    width: auto;
    border-radius: 45px;
    margin-right: 20px;
    transition: fill 0.2s ease ,transform 0.2s ease;
    
    &:hover{
        box-shadow: 0 8px 50px #23232333;
        transform: translateY(-15px);
    }
    @media (pointer:coarse) {
        box-shadow: 0 10px 15px #23232333;
        border-radius: 22px;
    }
`;


const MyProfile = styled.div`
    width: 10vw;
    min-width: 330px;
    margin-top: 8px;
    padding-bottom: 8px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    align-content: center;

    border-bottom: 1px solid #d8dbe4;

    @media (pointer:coarse) {
        min-width: 490px;
    }
`;

const TitleText1 = styled.div`
    font-size: 1.5em;
    font-weight: bold;
    margin-top: 8px;
    margin-left: 15px;

    @media (pointer:coarse) {
        font-size: 2.8em;
        margin-top: 20px;
        margin-bottom: 20px;
    }
`;

const ContentText1 = styled.div`
    height: 35px;
    overflow: hidden;
        
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    font-weight: 300;
    font-size: 1.1em;
    text-overflow: ellipsis;

    margin: 7px 10px 7px 20px;
    padding: 3px 0 0 0;
    display: -webkit-box;

    @media (pointer:coarse) {
        font-size: 2.2em;
        max-height: 500px !important;
        height: 105px;
        -webkit-line-clamp: 3;
    }
`;

const AnotherUserProfile = styled.div`
    width:80%;
    font-size: 1.5em;
    font-weight: bold;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    align-content: center;
    margin: 10px 0 0 20px;
    padding: 5px 0 5px 0 ;
    font-weight: normal;
    border-bottom: 1px solid #d8dbe4;

    @media (pointer:coarse) {
        width: 90%;
        margin: 50px 0 30px 20px;
        font-size: 2.2em;
        padding: 5px 0 15px 0 ;
    }
`;


const AnotherUserText1 = styled.div`
    width: 260px;
    font-size: 14px;
    font-weight: 100;
    display: block;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    
    @media (pointer:coarse){
        width: 400px;
        font-size: 30px;
    }
`;

const AnotherUserItems = styled.div`
    width: 100%;
    margin-top: 10px;
`;

const AnotherUserItemImg = styled.img`
    width: 110px;
    height: 158px;
    margin-right: 7px;

    @media (pointer:coarse){
        width: 167px;
        height: 240px;
    }
`;

const TotalPrice = styled.span`
    font-weight: 300;
    font-size: 1.5em;
    display: grid;
    text-align: center;
    font-family: 'Jost';
    font-weight: 500;

    @media (pointer:coarse) {
        height: 120px;
        align-items: center;
        font-weight: 300;
        font-size: 2.5em;
    }

`;

const QWE =styled.div`
font-size: 16px;
font-weight: 500;
@media (pointer:coarse) {
    font-size: 35px;
}
`;






function ItemCard ({ lookimg, avatar, nickname, TitleText, ContentText, comments, createdAt, id, lookitems, lookid, looktitle,
                     totalprice
                     }) 
    {
        const navigate = useNavigate();
        const detail = (id) => {
            navigate(`feed/${id}`);
        }
        const Detailpathmatch = useMatch("feed/:id");
        const Profilepathmatch = useMatch("profile/:nickname/feed/:id");
        const lookDetailpathmatch = useMatch("look/:id");
        const lookProfilepathmatch = useMatch("profile/:nickname/look/:id");

        return (
            <ItemCardForm>
               <AnimatePresence>
               {Detailpathmatch && Detailpathmatch.params.id === String(id) && (
                   <FeedDetail id={id} useravatar={avatar} usernickname={nickname} title={TitleText} lookimg={lookimg} lookitems={lookitems} caption={ContentText} createdAt={createdAt} lookid={lookid} />
               )}
                </AnimatePresence> 
                <AnimatePresence>
               {Profilepathmatch && Profilepathmatch.params.id === String(id) && (
                   <FeedDetail id={id} useravatar={avatar} usernickname={nickname} title={TitleText} lookimg={lookimg} lookitems={lookitems} caption={ContentText} createdAt={createdAt} lookid={lookid} />
               )}
                {lookDetailpathmatch && lookDetailpathmatch.params.id === String(lookid) && (
                   <LookDetail id={lookid} lookimg={lookimg} lookitems={lookitems} title={looktitle} />
               )}
               {lookProfilepathmatch && lookProfilepathmatch.params.id === String(lookid) && (
                   <LookDetail id={lookid} lookimg={lookimg} lookitems={lookitems} title={looktitle} />
               )}
                </AnimatePresence>   
            <ItemCardImg onClick={() => detail(id)} src={lookimg}></ItemCardImg>
            <div>
                <MyProfile>
                    <Avatar size="45px" Avatarurl={avatar} />
                    <Link to={`/profile/${nickname}`}>
                    <Nickname nickname= {nickname} size="3vh" textDecoration={"true"} />
                    </Link>
                    <CreatedAt createAt={createdAt}  />
                </MyProfile>

                <TitleText1>{TitleText}</TitleText1>
                <ContentText1>{ContentText}</ContentText1>

                
                    <AnotherUserProfile>
                    {comments?.length >= 1 && (
                        <>
                        <Avatar size="35px" Avatarurl={comments[0]?.user?.avatar} />
                        <QWE>
                          {comments[0]?.user?.nickname}
                          <AnotherUserText1>{comments[0]?.payload}</AnotherUserText1>
                        </QWE>
                        </>
                    )}
                </AnotherUserProfile>
                
                
                <AnotherUserItems>
                    {lookitems?.map((item) => <AnotherUserItemImg key={item.id} src={item.image} />  )}                    
                </AnotherUserItems>
            </div>
        </ItemCardForm>
        );
    
}

export default ItemCard;







/*
  <div style={{display: "flex"}}>
            <ItemCardForm>
                <ItemCardImg onClick={detail}  src={ItemCard_imgurl}></ItemCardImg>
                <div>
                    <MyProfile>
                        <Avatar size="45px" Avatarurl={Profile_imgurl} />
                        <Link to={`/lookdetail`}>
                        <Nickname nickname= {Profile_name} size="20px" textDecoration={"true"} />
                        </Link>
                    </MyProfile>

                    <TitleText1>{TitleText}</TitleText1>
                    <ContentText1>{ContentText}</ContentText1>

                    <AnotherUserProfile>
                        <Avatar size="35px" Avatarurl={AnotherUserProfile_imgurl} />
                        <div>
                            {AnotherUserName}
                            <AnotherUserText1>{AnotherUserText}</AnotherUserText1>
                        </div>
                    </AnotherUserProfile>
                    
                    <AnotherUserItems>
                        <AnotherUserItemImg src={AnotherUserItemImg_1}></AnotherUserItemImg>
                        <AnotherUserItemImg src={AnotherUserItemImg_2}></AnotherUserItemImg>
                        <AnotherUserItemImg src={AnotherUserItemImg_3}></AnotherUserItemImg>
                    </AnotherUserItems>

                    <TotalPrice>{totalprice}</TotalPrice>
                </div>
            </ItemCardForm>
          
            </div>
            */