import styled from "styled-components";
import react, { useState } from "react";
import Avatar from "../Shared/Avatar";
import Nickname from "../Shared/Nickname";
import { Link, useNavigate, useMatch } from "react-router-dom";
import { AnimatePresence, motion, Variants } from "framer-motion";
import CreatedAt from "../Shared/CreatedAt";
import FeedDetail from "../Feed/FeedDetail";
import LookDetail from "../Feed/LookDetail";
import LikeIcon from "../Feed/LikeIcon";
import CartIcon from "../Feed/CartIcon";
import FeedEtcTag from "../Shared/FeedEtcTag";

const ItemCardForm = styled.div`
    box-sizing: border-box;
    width: 286px;
    height: min-content; /* 600px */

    display: inline-flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    align-content: center;
    flex-wrap: nowrap;
    padding: 5px 5px 17px 5px;
    
    border-radius: 25px;
    background-color: #fff;
    transition-property: box-shadow;
    transition-duration: 0.5s;
    overflow: visible;

    &:hover {
        box-shadow: 0px 7px 25px #0239ff21;
    }


    /* 모바일 가로, 모바일 세로 (해상도 480px ~ 767px)*/ 
    @media all and (max-width:767px) {
        box-sizing: border-box;
        width: calc(97vw / 2);
        padding: 3px 0px;
        border-radius: 16px;
        
        &:hover {
            box-shadow: none;
        }
        .ItemGroup{
            width: calc(97vw / 2 - 32px);
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            -webkit-flex-direction: row;
            -ms-flex-direction: row;
            flex-direction: row;
            flex-wrap: wrap;

        }
    }

`;

const FeedContent = styled(motion.div)`
    box-sizing: border-box;
    min-width: 181px;
    width: 276px;
    height: 376px;
    overflow: hidden;
    position: relative;

    display: flex;
    justify-content: center;
    cursor: pointer;

    box-shadow: 0px 4px 15px rgb(0 0 0 / 8%);
    margin-bottom: 10px;

    border-radius: 19.5px;
    border: 1px solid rgb(194 194 194 / 30%);

    transition-property: box-shadow, border;
    transition-duration: 0.5s, 0.5s;

    &: hover {
        border: 1px solid #0239ff;
    }
    

    /* 모바일 가로, 모바일 세로 (해상도 480px ~ 767px)*/ 
    @media all and (max-width:767px) {
        width: 97%;
        height: 286px;
        border: 1px solid #f2f2f2;
        border-radius: 14px;

        box-shadow: none;
        margin-bottom: 6px;
        &: hover {
            border: 1px solid #f2f2f2;
        }
        
    }
    
`;
const FeedLookshape = styled(motion.div)`
    width: auto;
    height: 350px;
    overflow: hidden;
    padding: 2px;

    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;

    cursor:pointer;
    background-color: #fff;

    @media all and (max-width:767px) {
        width: 100%;
        height: 255px;
    

    }
`;

const FeedInfo = styled.div`
    width: 236px;
    height: min-content; /* 15px */
    padding: 0 12px;

    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;

    overflow: visible;
    z-index: 1;

    position: absolute;
    top: 284px;

    a{
        width: 80px;
        display: block;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }
    span{
        color: #999 !important;
        padding: 0;
    }

    @media all and (max-width:767px) {
        width: calc(100% - 30px);
        top: 2px;
            
        a{
            font-size: 10px;
        }
        span{
            font-size: 10px;
        }

    }
`;

const Feedtitle = styled.div`
    box-sizing: border-box;
    width: 268px;
    height: 68px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;

    padding: 9.5px 0px 9.5px 0px;
    -webkit-backdrop-filter: blur(20px);
    backdrop-filter: blur(34px);
    background-color: rgb(255 255 255 / 30%);
    border-radius: 17px;
    position: absolute;
    top: 304px;
    .FeedLike{
        padding-left: 15px;
        border-left: 1px solid #00000014;
    }
    @media all and (max-width:767px) {
        width: calc(100%);
        height: 60px;
        top: 226px;
        border-radius: 14px;
        justify-content: flex-end;
        .FeedLike{
            padding: 0px 10px 0px 5px;
            border-left: 1px solid #00000014;
            .LikeMarker {
                top: 10px;
                right: 6.5px;
        }
    }
`;
const ItemCardImg = styled.img`
    width: 202px;
    height: auto;
    border: none;
    @media all and (max-width:767px) {
        width: auto;
        height: 110%;
    
    }
`;

const FeedContentText = styled.div`
    width: 195px;
    height: 51px;
    overflow: visible;
    position: relative;

    display: flex;
    flex-direction: column;

    display: flex;
    flex-direction: column;
    justify-content: space-between;

    
    @media all and (max-width:767px) {
        width: calc(100% - 65px);
        height: auto;
        margin-right: 5px;

    }
`;

const TitleText1 = styled.div`
    height: auto; /* 19px */

    color: #222;
    font-size: 14px;
    line-height: 1.3;
    letter-spacing: -.07px;
    text-align: left;

    font-weight: 700;
    overflow:hidden;
    text-overflow:ellipsis;
    white-space:nowrap;

    @media all and (max-width:767px) {
        font-size: 13px;
        margin-bottom: 3px;

    }
`;

const ContentText1 = styled.div`
    height: 29px;
    
    overflow: hidden;
    white-space: normal;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    word-break: keep-all;  

    font-weight: 400;
    font-style: normal;
    font-family: "Noto Sans KR", sans-serif;
    color: #000000;
    font-size: 13px;
    letter-spacing: 0px;
    line-height: 15px;
    text-align: left;

    
    @media all and (max-width:767px) {
        height: 26px;
        line-height: 13px;
        font-size: 11px;
    }
`;

const AnotherUserItems = styled.div`
    width: 240px;
    height: 55px;

    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;

    margin-top: 10px;
    border-radius: 16px;

    transition-property: background-color;
    transition-duration: 0.3s;
    
    &: hover {
        background-color:#f5f5f5;
    }

    @media all and (max-width:767px) {
        width: calc(100% / 2 - 3px);
        height: 72px;
        margin-top: 4px;
        border-radius: 8px;
        flex-direction: column;
        flex-wrap: nowrap;
        a {
            width: -webkit-fill-available;
        }
        &:nth-child(3){
            width: calc(100%);
            order: -1;

            div {
                align-items: flex-start;
            }
        }

        .Collect {
            display: none;
        }
        
        &:hover {
            background-color:#fff;
        }
    }

`;

const AnotherUserItemFrame = styled.div`
    box-sizing: border-box;

    width: 55px;
    height: 55px;
    background-color: #ffffff;
    overflow: hidden;
    position: relative;
    border-radius: 15px;
    border: 1px solid #e2eeff;

    cursor: pointer;
    
    display: flex;
    justify-content: center;
    align-items: center;

    @media all and (max-width:767px) {
        width: 100%;
        height: 70px;
        border-radius: 8px;
        border: none;

    }
`;

const ItemImage = styled.img`
    width: 100%;
    height: auto;
    @media all and (max-width:767px) {
        width: 100%;
    }

`;

const AnotherUserItemInfo = styled.div`
    width: 140px;
    height: 37px; /* 48px */
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: flex-start;

    cursor: pointer;

    overflow: hidden;
    position: relative;
    padding: 0px;
    
    @media all and (max-width:767px) {
        width: calc(100% - 12px);
        height: 23px;
        margin-top: -31.2px;
        margin-left: 1.8px;
        background-color: rgba(34,34,37,0.3);
        border-radius: 6px;
        padding: 2px 4px;
    }
`;

const Itemtitle = styled.div`
    width: 140px;
    height: auto; /* 16px */
    position: relative;
    font-size: 13px;
    line-height: 1.2;
    text-align: left;
    font-weight: 400;
    color: rgba(0,0,0, 0.7);

    h3{
        width: 100%;
        display: block;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }

    @media all and (max-width:767px) {
        width: 100%;
        line-height: 1.1;
        font-size: 10px;
        font-weight: 400;
        color: rgba(255,255,255,0.7);
    }
`;

const Price = styled.div`
    width: 100%;
    height: 14px;
    overflow: hidden;
    position: relative;
    font-weight: 600;
    font-family: "Noto Sans KR", sans-serif;
    color: #000;
    font-size: 14px;
    letter-spacing: 0px;
    line-height: 15px;
    text-align: left;

    p{
        width: 100%;
    }
    span{
        margin-left: 2px;
        color: rgba(0,0,0, 0.7);
        font-size: 12px;
        font-weight: 400;
    }

    @media all and (max-width:767px) {
        font-weight: bold;
        font-size: 11px;
        line-height: 11px;
        
        p{
            width: min-content;
            display: flex;
            align-items: baseline;
            color: #ffffff;
        
        }
        span{
            font-size: 9px;
            font-weight: 300;
            color: rgba(255,255,255,0.7);
        }
    }
`;

const ItemTitletext = styled.h3`
`;

const Infotext = styled.p`
`;






function ItemCard ({ lookimg, avatar, nickname, TitleText, ContentText, comments, createdAt, id, lookitems, lookid, looktitle,
                     totalprice, totalLikes, isLiked, gender, category, totalComments
                     }) 
    {
        const navigate = useNavigate();
        const detail = (id) => {
            navigate(`/feed/${id}`);
        }
       

        return (
            <ItemCardForm className="ItemCardBody"> 
                <FeedContent 
                             whileHover={{ scale: 1.03 }}>
                    <FeedLookshape onClick={() => detail(id)} >
                        <ItemCardImg src={lookimg}/>
                    </FeedLookshape>
                    <FeedInfo>
                        <Link to={`/profile/${nickname}`}>
                        <Nickname nickname= {nickname}  textDecoration={"true"} />
                        </Link>
                        <CreatedAt createAt={createdAt}/>
                    </FeedInfo>
                    <Feedtitle whileHover={{ scale: 1.02 }}>
                        <FeedContentText onClick={() => detail(id)} >
                            <TitleText1>{TitleText}</TitleText1>
                            <ContentText1>{ContentText}</ContentText1>
                        </FeedContentText>

                        <LikeIcon id={id} isLiked={isLiked} totalLikes={totalLikes}/>

                    </Feedtitle>
                </FeedContent>
                
                <FeedEtcTag gender={gender} category={category} totalComments={totalComments} />
            
            <div className="ItemGroup">
                
                
            {lookitems?.map((item) => 
                <AnotherUserItems key={item.id}>
                    <Link to={`/items/${item.id}`}>
                        <AnotherUserItemFrame>
                            <ItemImage src={item.mimage}/>
                        </AnotherUserItemFrame>
                        </Link>
                        <Link to={`/items/${item.id}`}>
                        <AnotherUserItemInfo>
                            <Itemtitle>
                                <ItemTitletext>{item.title}</ItemTitletext>
                            </Itemtitle>
                            <Price>
                                <Infotext>{item.price.toLocaleString("ko-KR")}<span>원</span></Infotext>
                            </Price>
                        </AnotherUserItemInfo>
                        </Link>

                        {/* 아이템 콜렉트 버튼(북마크) */}
                        <CartIcon id={item.id} iscart={item.iscart} totalCarts={item.totalCarts} />
                        {/* 아이템 콜렉트 버튼(북마크) */}                   
                </AnotherUserItems>
                )} 
                

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