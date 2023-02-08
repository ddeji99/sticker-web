//import { gql, useReactiveVar } from "@apollo/client";
import styled from "styled-components";
import { Link, useNavigate, useMatch, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import Header from "../components/Header";
import { useMutation, useQuery, useLazyQuery } from "@apollo/client";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import React, { useState } from 'react';
import Footer from "../components/Footer";
import Avatar from "../components/Shared/Avatar";
import Nickname from "../components/Shared/Nickname";
import CreatedAt from "../components/Shared/CreatedAt";
import Input from "../components/Auth/Input"
import { SEEFEED_QUERY } from "../Documents/Query/SEEFEED_QUERY";
import useLoggedInUser from "../hooks/useLoggedInUser";
import { useForm } from "react-hook-form";
import { DELETECOMMENT_MUTATION } from "../Documents/Mutation/DELETECOMMENT_MUTATION";
import { SEECOMMENT_QUERY } from "../Documents/Query/SEECOMMENT_QUERY";
import { CREATECOMMENT_MUTATION } from "../Documents/Mutation/CREATECOMMENT_MUTATION";
import { SEEFEEDS_QUERY } from "../Documents/Query/SEEFEEDS_QUERY";
import gql from "graphql-tag";
import Masonry, {ResponsiveMasonry} from "react-responsive-masonry";
import LikeIcon from "../components/Feed/LikeIcon";
import ItemCard from "../components/Aircloset/ItemCard";
import SubNavbar from "../components/SubNavbar";
import EachItem from "../components/Aircloset/EachItem";
import avatar1 from "../img/maleavatar.png";
import avatar2 from "../img/femaleavatar.png";
import defaultavatar from "../img/profile_logo.png"
import Loader from "../components/Loader";








const Maindiv = styled.div`
  min-width: 370px;
  box-sizing: border-box;
  height: min-content; 
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  padding: 60px 0px 0px 0px;
  overflow: hidden;
  align-content: center;
  flex-wrap: nowrap;

  position: relative;

  @media all and (max-width:767px) {
    padding: 10px 0 0 0;
  }
`;

const DetailFeedBox = styled.div`
  width: 1244px;
  height: min-content;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 10px 0px 0px 0px;
  margin-bottom: 40px;
  @media all and (max-width:767px) {
    width: 95vw;
    padding: 0px;
    flex-wrap: wrap;
    justify-content: center;
  }
`;

const LookBox = styled.div`
  height: 600px;
  width: 269px;
  cursor: pointer;
  overflow: hidden;
  @media all and (max-width:767px) {
    height: min-content;
    width: 100%;
    text-align: center;
    display: flex;
    justify-content: center;
  }
`;
    const Lookimg = styled(motion.img)`
      height: 100%;
      @media all and (max-width:767px) {
        width: 40vw;
        object-fit: contain;
        max-height: 295px;
      }
    `;
    const ItemInfo_M = styled.div`
      height: min-content;
      display: none;
      @media all and (max-width:767px) {
        margin-right: 0px;
        padding: 2px;
      }
      @media all and (max-width:767px) {
        max-width: 195px;
        display: flex;
        flex-direction: column;
        display: flex;
        justify-content: space-between;
        -webkit-flex-direction: row;
        flex-wrap: wrap;

        .EachItemText{
          height: 46px;
          div{
            height: 36px;
          }
          h3{
            height: 15px;
          }
        }
        & > div{
            @media all and (max-width:767px) {
              width: calc(100% / 2 - 3px);
              max-width: 95px;
              height: min-content;
              margin-top: 4px;
              padding-right: 0px;
              border-radius: 8px;
              flex-direction: column;
              flex-wrap: nowrap;
              text-align: left;

              svg {
                  display: none;
              }
              
              &:hover {
                  background-color:#fff;
              }
          }
        }
        
        svg{
          display: list-item !important;
          width: 100%;
        }
        .ShareButton{
          width: calc(100% / 2);
          max-width: 95px;
          display: flex;
          flex-direction: column;
          align-items: flex-end;
        }
        button {
          width: calc(100% / 2 - 5px);
          border: none !important;
          outline: none !important;
          box-shadow: none !important;
          background-color: transparent !important;
          cursor: pointer;
          padding: 2px !important;
        }
    }
    `;


const InfoBox = styled.div`
  height: 600px;
  width: 560px;
  display: flex;
  flex-direction: column;
  @media all and (max-width:767px) {
    width: 95vw;
    height: max-content;
    overflow: visible;
  }
`;

    const ContentInfo = styled.div`
      box-sizing: border-box;
      width: auto;
      max-height: 222px;
      display: inline-flex;
      flex-direction: row;
      background-color:#fff;
      border-top-right-radius: 35px;
      border-top-left-radius: 35px;
      cursor: default;
      padding: 10px 61px 10px 11px;
      transition: all 0.3s;
      border: 1px solid rgb(194 194 194 / 30%);
      overflow: scroll;
      
      ::-webkit-scrollbar{
          display: none;
      }
      
      &:hover {
        background-color:#f5f5f5;
      }
      img{    
        width: 48px;
        height: 48px;
        margin-right: 12px;
        border: 1px solid #DBDBDB;
        border-radius: 50%;
      }
      @media all and (max-width:767px) {
        width: 95vw;
        padding: 5px;
        max-height: max-content;
        border: none;
        margin-top: -55px;
        background-color: transparent;
        overflow: visible;

        & > div {
          display: flex !important;
          flex-direction: column;
        }
        img{    
          width: 42px;
          height: 42px;
          margin-right: 6px;
          border: 1px solid #DBDBDB;
          border-radius: 50%;
        }
        &:hover {
          background-color: transparent;
        }
      }
    `;
      const MyProfile = styled.div`
        height: 54px;
        display: box;
        justify-content: center;
        flex-direction: column;
        align-items: flex-start;
        a, span{
          line-height: 20px;
        }
        a > span{
          font-weight: 700;
          color: #000;
        }
        span{
          font-weight: 400;
          color: #999;
          padding: 0px;
        }
        @media all and (max-width:767px) {
          height: 34px;
          width: 30vw;
          overflow: hidden;
          a, span{
            width: 40vw;
            line-height: 16px;
            overflow: hidden;
            text-overflow: ellipsis; 
          }
        }
      `;

      const TitleBox = styled.div`
        width: 100%;
        max-height: 47px;
        margin: 18px 0 8px 0;
        overflow: hidden;

        font-size: 18px;
        font-weight: bold;
        padding-top: 0px;
        line-height: 1.3;
        @media all and (max-width:767px) {
          width: 90vw;
          max-height: min-content;
          margin: 32px 0 0px -50px;
          font-weight: 500;
          line-height: 1.4;
          overflow: visible;
  
        }
      `;

      const CaptionBox = styled.div`
        width: 100%;  
        margin-bottom: 10px;
        padding-bottom: 10px;

        font-size: 14px;
        line-height: 1.6;
        font-weight: 400;
        word-wrap: break-word;
        text-overflow: ellipsis;
        display: -webkit-box;

        a {
          cursor: pointer;
          font-weight: 600;
          &:hover {
            color: #0239FF;
            underline: 1px solid;
          }
        }
        @media all and (max-width:767px) {
          width: 90vw;
          padding: 10px 5vw;
          margin: 8px 0 8px calc(-2.5vw - 55px);
          background-color: rgba(0,0,0,0.05);
        }
      `;
      

  const FeedInfo = styled.div`
    box-sizing: border-box;
    width: auto;
    height: 70px;
    margin-top: 13px;
    padding: 10px 22px;
    border: 1px solid rgb(194 194 194 / 30%);
    border-top: 0px solid;
    
    display: flex;
    justify-content: flex-start;
    align-items: center;
    background-color:#fff;
    border-bottom-right-radius: 22px;
    border-bottom-left-radius: 22px;
    transition: all 0.3s;   
    z-index:2;     

    .FeedLikeBody > span {
        font-size: 14px;
        color: rgb(83, 100, 113);
    }

    .FeedLike {
      width: 200px;
      height: auto;
      padding: 8px 20px;
      flex-direction: row;
      font-size: 16px !important;
      justify-content: space-between;
      svg{
        width: 32px;
        height: 32px;
      }
      span{
        font-weight: 600;
        font-size: 24px;
      }
    }

    &:hover {
      background-color:#f5f5f5;
    }
    @media all and (max-width:767px) {
      width: 50vw;
      height: min-content;
      align-items: flex-end;
      margin-left: auto;
      padding: 2px 10px;
      border-radius: 10px;
      border: 1px solid rgb(194 194 194 / 30%);
      margin-top: 13px;
  
      text-align: left;
      flex-direction: row;
      align-items: center;


      .FeedLike {
        width: auto;
        height: auto;
        flex-direction: column;
        padding: 0px 15px 0px 7px;
        border-right: 1px solid rgb(194 194 194 / 30%);
        span{
          font-size: 16px !important;
        }
      }
      &:nth-child(2){
        order: -1;
      }
      &:hover {
        background-color: transparent;
      }
    }
  `;
    
  const BuyBtn = styled.div`
    box-sizing: border-box;
    width: 100%;
    height: 100%;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    margin: 0px 42px;
    padding: 5px 15px;
    background-color: transparent;
    transition: all  0.5s;
    cursor: pointer;

    border-width: 0 1px;
    border-style: solid;
    border-color: rgb(194 194 194 / 30%);

    .title{    
        width: auto;
        font-size: 18px;
        font-weight: 600;
        letter-spacing: -.27px;
        line-height: 1.5;
    }

    &:hover {
        color: #fff !important;
        background-color: #0009ff;
        box-shadow: 0px 7px 25px #0239ff21;
    }
    @media all and (max-width:767px) {
      width: 100%;
      margin: 0px;
      padding: 8px 15px;
      line-height: 32px;
      border: none !important;
      order: 3;
      align-items: flex-start;
      .title{
          font-size: 14px;
      }
    }
  `;

      const BtnPrice = styled.div`
          p{
              display: inline-block;
              vertical-align: top;
              font-weight: 600;
              font-size: 18px;
          }
          p > span{
              display: inline-block;
              font-weight: 400;
          }
          span{
              display: block;
              font-size: 12px;
              font-weight: 400;
          }
          @media all and (max-width:767px) {
            margin-top:0px;
            line-height: 18px;
            p{
                font-weight: bold;
                font-size: 14px;
            }
            span{
                display: block;
                font-size: 12px;
                font-weight: 400;
            }
            span:first-child{
              display: none;
            }
          }
      
      `;

      const ShareLink = styled.div`
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-between;
        margin-right: 10px;
        
        .ShareButton{
          display: flex;
          flex-direction: row;
        }

        button {
          border: none !important;
          outline: none !important;
          box-shadow: none !important;
          background-color: transparent !important;
          cursor: pointer;
          padding: 1px 3px;
        }
        svg{
          width: 32px;
          height: 32px;
        }
        @media all and (max-width:767px) {
          display: none;
        }
      `;





  const ItemInfo = styled.div`
    width: auto;
    margin-top: 20px;
    display: flex;
    flex-direction: row;
    & > div{
      margin-right: 10px;
    }
    
    & > div:last-child{
      margin-right: 0px;
    }
    @media all and (max-width:767px) {
      display: none;
    }
  `;

const CommentBox = styled.div`
  height: 600px;
  width: 340px;
  overflow: hidden;
  position: relative;

  ::-webkit-scrollbar{
      display: none;
  }
  @media all and (max-width:767px) {
    height: max-content;
    width: 95vw;
    overflow: visible;
    display: flex;
    flex-direction: column;
  }
`;

  const Commentslist = styled(motion.ul)`
    height: 100%;
    overflow:scroll;
    position: relative;
      ::-webkit-scrollbar {
        display: none;
      }
    @media all and (max-width:767px) {
      overflow: visible;
      padding: 0px 12px;
      & > p{
        height:0px !important;
      }
    }
  `;

  const Comments  = styled.div`
    width: 95%;
    padding: 5px;
    display:flex;
    margin-bottom: 30px;
    line-height: 20px;
    border-radius: 26px;
    position: relative;
    
    ::before {    
      content: "";
      position: absolute;
      top: 55px;
      bottom: 0;
      left: 26px;
      width: 1px;
      height: auto;
      background-color: rgb(194 194 194 / 30%);
      }

    &:hover{
      background-color:#f5f5f5;
      ::before {    
        background-color: #fff;
        }
    }

    @media all and (max-width:767px) {
      margin-bottom: 15px;
      ::before {    
        display: none;
        }
    }

  `;

  const CommentsText = styled.div`
    width: 100%;
    display:flex;
    flex-direction: column;
    padding: 0 10px 0 0;
    cursor: default;

    a{
      height: 20px;
      display: flex;
      align-items: center; 
      justify-content: flex-start;
      margin-bottom: 7px;
      p{
        font-size:14px;
        word-break: keep-all;
        color: #606060;
        margin-left: 10px;
      }
      span{
        width: max-content;
        font-weight: 400;
        color: #606060;
        word-break: keep-all;
        line-height: 1.8
      }
    }
    span, p{
      font-size:14px;
      word-break: keep-all;
      font-weight: 400;
      overflow-wrap: anywhere;
    }
    & > div {
      a{
        height: auto;
        cursor: pointer;
        font-weight: 600;
        margin-bottom: 0px;
        &:hover{
          color: #0239ff;
        }
      }
    }
    @media all and (max-width:767px) {
      a{
        margin-bottom: 2px;
        span, p{
          font-size:12px;
        }
      }
    }

  `;
  const CommentForm = styled.div`
    display: flex;
    align-content: center;
    width: 100%;
    height: auto;
    background: rgba( 255,255,255,0.6 );
    backdrop-filter: blur( 3px );
    
    position: absolute;
    bottom: 0;
    svg{
      width: 24px;
      height: 24px;
    }
    @media all and (max-width:767px) {
      width: calc(100% - 20px);
      position: relative;
      align-items: center;
      order: -1;
      padding: 10px;
    }
  `;

  const InputSub = styled(Input)`
    height: 35px;
    width: 80%;
    placeholder:"댓글을 남겨주세요";
    @media all and (max-width:767px) {
      height: 35px;
      width: calc(100% - 15px);
      padding: 6px;
      font-size: 14px;
      margin-bottom: 0px;
    }

  `;

  const InputButton = styled.input`
    height: 42px;
    width: 42px;
    margin-left: 5px;
    border-radius: 100px;
    color: #fff;
    background-color:#1875FF;
    cursor: pointer;
    padding: 0px;
    &:hover{
        background-color:#0046ff;
    }
    @media all and (max-width:767px) {
      height: 43px;
      width: 43px;
      margin-left: -47px;
      border-radius: 100px;
    }
  `;

  const AvatarM = styled.img`
    width: 40px;
    height: 40px;
    border: 1px solid #DBDBDB;
    border-radius: 50%;
    margin-right: 16px;
  `;

  const MoreInfo = styled.div`
    display: flex;
    align-content: center;
    width: auto;
    height: 1000px;
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
    padding: 20px 40px;

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
    margin-right: auto;
    margin-left: auto;
  }
  .ItemMesonry > div{
    align-items: center;
  }
  @media all and (max-width:767px) {
    width: 97vw;
  }
`;
const DeleteB = styled.button`
width:20%;
font-size: 12px;
font-weight: bold;
cursor: pointer;
border: none;
outline: none;
background-color: transparent;
&:hover {
    text-decoration: underline;
}
`;
const CommentInputForm = styled.form`
display: flex;
align-content: center;
    width: 100%;
    height: auto;
    background: rgba( 255,255,255,0.6 );
    backdrop-filter: blur( 3px );
    
    position: absolute;
    bottom: 0;
    svg{
      width: 24px;
      height: 24px;
    }
@media all and (max-width:767px) {
    width: calc(100% - 20px);
    position: relative;
    align-items: center;
    order: -1;
    padding: 10px;
  }
`;







function FeedDetail({  }) {

    const  { id }  = useParams();
    const navigate = useNavigate();
    const loggedInUser = useLoggedInUser();
    const { data: seeCommentdata, loading:seecommentsloading } = useQuery(SEECOMMENT_QUERY, { variables: { feedid: parseInt(id) } });
    const [seeCommentLazyQuery, { loading: seeCommentsLoading }] = useLazyQuery(SEECOMMENT_QUERY);
    const { data: Feeddata} = useQuery(SEEFEED_QUERY,{ variables: { feedid: parseInt(id) }});
    const { data: seeFeedData, fetchMore, loading: seeFeedLoading } = useQuery(SEEFEEDS_QUERY);

    const {
        register,
        handleSubmit,
        getValues,
        setValue,
        formState: { isValid },
      } = useForm({ mode: "onChange", defaultValues: { payload: "" } });
      const [createCommentMutation] = useMutation(CREATECOMMENT_MUTATION, {
        update: (cache, { data }) => {
           if (data?.createComment.ok === false) {
            return;
           }

           const { payload } = getValues();
           setValue("payload", "");


           const seeMeFragmentType = cache.readFragment({
            id: "ROOT_QUERY",
            fragment: gql`
              fragment query on Query {
                seeMe {
                  user
                }
              }
            `,
          });
          const commentReference = cache.writeFragment({
            fragment: gql`
              fragment comment on Comment {
                id
                payload
                user
                isMine
                createAt
              }
            `,
            data: {
              __typename: "Comment",
              id: data?.createComment.id,
              payload: payload,
              user: seeMeFragmentType?.seeMe.user,
              isMine: true,
              createAt: String(Date.now()),
            },
          });
          cache.modify({
            id: `Feed:${id}`,
            fields: {
              comments: (comments) => [...comments, commentReference],
            },
          });
          if (seeCommentsLoading === false) {
            seeCommentLazyQuery({ variables: { feedid: parseInt(id) } });
          }


        },
      });

      const [deleteCommentMutation] = useMutation(DELETECOMMENT_MUTATION, {
        update: (cache, { data }) => {
            if (data?.deleteComment.ok === false) {
                return;
            }

            cache.evict({ id: `Comment:${data?.deleteComment.id}` });
            cache.gc();
            if (seeCommentsLoading === false) {
                seeCommentLazyQuery({ variables: { feedid: parseInt(id) } });
              }
        },
      });

      const onValid = () => {
        if (id) {
          const { payload } = getValues();
          createCommentMutation({ variables: { feedid: parseInt(id), payload: payload } });
        }
      };

      const handleDeleteComment = (commentid) => {
        if(window.confirm("댓글을 삭제하시겠습니까?")) {
            deleteCommentMutation({ variables: { commentid: commentid } });
        } else {

        }
      };

       // [기능 1/3]---- 외부 링크 공유---- //
    // 현재 주소를 클립보드에복사
    const CurruentUrlCopy = () => {
        navigator.clipboard.writeText(window.location.href);
        alert("클립보드에 복사되었습니다.");
      };
  
        // 현재 주소를 외부 공유
        const CurruentUrl = encodeURI(window.location.href);
  
        // Facebook
        const shareFacebook = () => {
          window.open("http://www.facebook.com/sharer/sharer.php?u=" + CurruentUrl);
        }
  
  
        // Twitter
        const shareTwitter = () => {
          const text = '패션 커뮤니티 커머스 스티커'
          window.open("https://twitter.com/intent/tweet?text=" + text + "&url=" +  CurruentUrl)
        }
      // [기능 1/3]---- 외부 링크 공유 끝 ---- //
  
    // [기능 2/3]---- 텍스트 내부 링크 인식 ---- //
      // 우리 댓글 내용이 텍트 값으로 넘어왔을때 웹주소를 인식하여 a태그로 감싸주는 기능 나머지는 p태그로 만들어짐
      const urlRegex = /(https?:\/\/[^\s]+)/g;
        // 링크를 감지하여 a 태그로 감싸기
      const replace = (content) => {
        const convertContent = content.replace(urlRegex, function (url) {
          return '📌 <a href="' + url + '" target="_blank">' + url + '</a>';
        })
  
        const htmlArr = [];
        convertContent.split('\n').forEach(function (text) {
          const textHtml = "<p>" + text + "</p>";
          htmlArr.push(textHtml)
        })
  
        return {__html: htmlArr.join("")};
      }
      // 우리 댓글 내용이 텍트 값으로 넘어왔을때 웹주소를 인식하여 a태그로 감싸주는 기능 나머지는 p태그로 만들어짐 //
    // [기능 2/3]---- 텍스트 내부 링크 인식 끝 ---- //
  
    // [기능 3/3]---- 모바일버전 댓글창 접기 ---- //
      const [open, setOpen] = React.useState(null);
  
      const handleOpen = () => {
          setOpen(!open);
        };
    // [기능 3/3]---- 모바일버전 댓글창 접기 끝 ---- //
    

    return (
        <>
        <Maindiv>
          <Header />
          <SubNavbar/>

          <DetailFeedBox>
                    {/* 모바일*/}
                        <LookBox >
                            {Feeddata?.seeFeed?.feed.Look.map((Look) => (
                                <Lookimg key={Look.id} src={Look.comboImage} whileHover={{scale: 1.02}}/>
                            ))}
                            <ItemInfo_M>
                            {Feeddata?.seeFeed?.feed.Look.map((look) => look.item.map((item) => (
                                <EachItem key={item.id} item={item} />
                            ) ) )}
                            <div className="ShareButton">
                                <button className="LinkCopy" onClick={CurruentUrlCopy}>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24.212 24.213">
                                    <path d="M12.1,24.23A12.178,12.178,0,0,0,24.212,12.123,12.192,12.192,0,0,0,12.1.018,12.181,12.181,0,0,0,0,12.123,12.184,12.184,0,0,0,12.1,24.23Z"/>
                                    <path d="M4.008,10.907A3.309,3.309,0,0,1,7.425,7.475h4.968a3.305,3.305,0,0,1,3.417,3.432,3.287,3.287,0,0,1-3.417,3.417H10.86a1.339,1.339,0,0,1-.292-1.372h1.768a1.937,1.937,0,0,0,2.043-2.045,1.956,1.956,0,0,0-2.043-2.061H7.5A1.963,1.963,0,0,0,5.45,10.907,1.94,1.94,0,0,0,7.5,12.952h.227a4.6,4.6,0,0,0,.063,1.372H7.425A3.286,3.286,0,0,1,4.008,10.907Zm4.374,2.527a3.289,3.289,0,0,1,3.407-3.417h1.542a1.292,1.292,0,0,1,.27,1.37H11.855a1.945,1.945,0,0,0-2.043,2.047A1.957,1.957,0,0,0,11.855,15.5h4.832a1.958,1.958,0,0,0,2.045-2.061,1.941,1.941,0,0,0-2.045-2.047h-.22a4.451,4.451,0,0,0-.061-1.37h.36a3.286,3.286,0,0,1,3.407,3.417,3.3,3.3,0,0,1-3.407,3.43H11.789A3.3,3.3,0,0,1,8.382,13.435Z" transform="translate(0 -0.018)" fill="#fff"/>
                                </svg>
                                </button>
                                <button onClick={shareFacebook}><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z" fill="#1877f2"/></svg></button>
                                <button onClick={shareTwitter}><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm6.066 9.645c.183 4.04-2.83 8.544-8.164 8.544-1.622 0-3.131-.476-4.402-1.291 1.524.18 3.045-.244 4.252-1.189-1.256-.023-2.317-.854-2.684-1.995.451.086.895.061 1.298-.049-1.381-.278-2.335-1.522-2.304-2.853.388.215.83.344 1.301.359-1.279-.855-1.641-2.544-.889-3.835 1.416 1.738 3.533 2.881 5.92 3.001-.419-1.796.944-3.527 2.799-3.527.825 0 1.572.349 2.096.907.654-.128 1.27-.368 1.824-.697-.215.671-.67 1.233-1.263 1.589.581-.07 1.135-.224 1.649-.453-.384.578-.87 1.084-1.433 1.489z" fill="#1d9bf0"/></svg></button>
                            </div>
                            </ItemInfo_M>
                        </LookBox>
                    {/*모바일 */}

                    <InfoBox>

                      <ContentInfo>
                       <Avatar Avatarurl={Feeddata?.seeFeed?.feed.user.avatar} />
                        <div>

                            <MyProfile>
                                <Link to={`/profile/${Feeddata?.seeFeed?.feed.user.nickname}`}>
                                <Nickname nickname= {`${Feeddata?.seeFeed?.feed.user.nickname}`} size="2.5vh" textDecoration={"true"} /> 
                                </Link>
                                <CreatedAt style={{wordBreak: "keep-all"}} createAt={Feeddata?.seeFeed?.feed.createAt} />
                            </MyProfile>

                             <TitleBox>{Feeddata?.seeFeed?.feed.title}</TitleBox>

                             <CaptionBox>
                                    <div dangerouslySetInnerHTML={replace(`${Feeddata?.seeFeed?.feed.caption}`)}></div>
                             </CaptionBox>

                        </div>
                
                      </ContentInfo>

                      <FeedInfo>
                        <LikeIcon id={Feeddata?.seeFeed?.feed.id} totalLikes={Feeddata?.seeFeed?.feed.totalLikes} isLiked={Feeddata?.seeFeed?.feed.isLiked} />
                        <BuyBtn>
                        {Feeddata?.seeFeed?.feed.Look.map((Look) => (
                            <Link key={Look.id} to={`/perchase/${Look.id}`}>
                            <strong className='title'>
                                바로구매
                            </strong>
                            <BtnPrice>
                                <p>
                                <span>코디가격</span> {Look.totalPrice.toLocaleString("ko-KR")} <span>원</span>
                                </p>
                            </BtnPrice>
                            </Link>
                        ))}
                        </BuyBtn> 

                        <ShareLink>
                            <div className="ShareButton">
                            <button className="LinkCopy" onClick={CurruentUrlCopy}>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24.212 24.213">
                                <path d="M12.1,24.23A12.178,12.178,0,0,0,24.212,12.123,12.192,12.192,0,0,0,12.1.018,12.181,12.181,0,0,0,0,12.123,12.184,12.184,0,0,0,12.1,24.23Z"/>
                                <path d="M4.008,10.907A3.309,3.309,0,0,1,7.425,7.475h4.968a3.305,3.305,0,0,1,3.417,3.432,3.287,3.287,0,0,1-3.417,3.417H10.86a1.339,1.339,0,0,1-.292-1.372h1.768a1.937,1.937,0,0,0,2.043-2.045,1.956,1.956,0,0,0-2.043-2.061H7.5A1.963,1.963,0,0,0,5.45,10.907,1.94,1.94,0,0,0,7.5,12.952h.227a4.6,4.6,0,0,0,.063,1.372H7.425A3.286,3.286,0,0,1,4.008,10.907Zm4.374,2.527a3.289,3.289,0,0,1,3.407-3.417h1.542a1.292,1.292,0,0,1,.27,1.37H11.855a1.945,1.945,0,0,0-2.043,2.047A1.957,1.957,0,0,0,11.855,15.5h4.832a1.958,1.958,0,0,0,2.045-2.061,1.941,1.941,0,0,0-2.045-2.047h-.22a4.451,4.451,0,0,0-.061-1.37h.36a3.286,3.286,0,0,1,3.407,3.417,3.3,3.3,0,0,1-3.407,3.43H11.789A3.3,3.3,0,0,1,8.382,13.435Z" transform="translate(0 -0.018)" fill="#fff"/>
                                </svg>
                            </button>
                            <button onClick={shareFacebook}><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z" fill="#1877f2"/></svg></button>
                            <button onClick={shareTwitter}><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm6.066 9.645c.183 4.04-2.83 8.544-8.164 8.544-1.622 0-3.131-.476-4.402-1.291 1.524.18 3.045-.244 4.252-1.189-1.256-.023-2.317-.854-2.684-1.995.451.086.895.061 1.298-.049-1.381-.278-2.335-1.522-2.304-2.853.388.215.83.344 1.301.359-1.279-.855-1.641-2.544-.889-3.835 1.416 1.738 3.533 2.881 5.92 3.001-.419-1.796.944-3.527 2.799-3.527.825 0 1.572.349 2.096.907.654-.128 1.27-.368 1.824-.697-.215.671-.67 1.233-1.263 1.589.581-.07 1.135-.224 1.649-.453-.384.578-.87 1.084-1.433 1.489z" fill="#1d9bf0"/></svg></button>
                            </div>
                        </ShareLink>

                       </FeedInfo>


                       <ItemInfo>
                            {Feeddata?.seeFeed?.feed.Look.map((Look) => Look.item.map((item) => (
                                <EachItem key={item.id} item={item} /> 
                            ) ) )}    
                       </ItemInfo>
            
                    </InfoBox>

                    <CommentBox>

                      <Commentslist>
                        {seeCommentdata?.seeComment.comments?.map((comment) => (
                            <Comments key={comment?.id}>
                                <AvatarM src={comment?.user.avatar} />
                                <CommentsText>
                                    <Link to={`/profile/${comment?.user.nickname}`}>
                                    <Nickname nickname= {comment?.user.nickname} size="15px" textDecoration={"true"} />
                                    <CreatedAt createAt={comment?.createAt} />
                                    </Link>
                                    <div dangerouslySetInnerHTML={replace(`${comment?.payload}`)}></div>
                                    {comment?.user.isMe && ( <DeleteB onClick={() => handleDeleteComment(comment?.id)} type="button" >🗑 삭제</DeleteB> )}
                                      
                                </CommentsText>
                            </Comments>
                        ))}
                        


                        <p style={{height: "110px"}}></p>
                      </Commentslist>  

                      <CommentForm onSubmit={handleSubmit(onValid)}>
                        
                        <InputSub {...register("payload", { required: "댓글을 입력해주세요.", minLength: 1 })} minLength={1} type="text" placeholder="댓글 달기..." /> 
                        <InputButton onClick={handleSubmit(onValid)} type="submit" disabled={!isValid} value={"게시"}  />
                        
                      </CommentForm>


                    </CommentBox>






          </DetailFeedBox>

          <ItemContainer>
            <ContainerText>
              <h2>최신피드</h2>
              <Link to={'#'}>더보기 ► </Link>
            </ContainerText>


          <Pincontainer>
            <ResponsiveMasonry
                  columnsCountBreakPoints={{767: 2, 768: 4}}
              >
              <Masonry className="ItemMesonry">


                 
              {seeFeedData?.seeFeeds?.feeds.map((feed) => feed.Look.map((Look) =>  (
                    <ItemCard
                    key={feed?.id}
                    lookimg={Look.comboImage}
                    avatar={feed.user.gender === "남자" ? avatar1 : feed.user.gender === "여자" ? avatar2 : defaultavatar}
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
        </ItemContainer>





        </Maindiv>
        </>
    )
}

export default FeedDetail;