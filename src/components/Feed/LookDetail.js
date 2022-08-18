import styled, { keyframes } from "styled-components";
import { AnimatePresence, motion, Variants } from "framer-motion";
import { Link, useNavigate, useMatch, useParams } from "react-router-dom";
import slook from "../../img/samplelook.png";
import { useState } from "react";
import Avatar from "../Shared/Avatar";
import Nickname from "../Shared/Nickname";
import Del from "../../img/del.png";
import Buy from "../../img/buy.png";
import Feed from "../../img/feed.png";
import Input from "../Auth/Input";
import useLoggedInUser from "../../hooks/useLoggedInUser";
import { useMutation, useLazyQuery } from "@apollo/client";
import { useForm } from "react-hook-form";
import { DELETELOOK_MUTATION } from "../../Documents/Mutation/DELETELOOK_MUTATION";
import { MAKINGFEED_MUTATION } from "../../Documents/Mutation/MAKINGFEED_MUTATION";
import { SEEPROFILE_QUERY } from "../../Documents/Query/SEEPROFILE_QUERY";


const shake3856 = keyframes`
0% {
    -webkit-transform: translate(0);
    transform: translate(0);
}

20% {
    -webkit-transform: translate(-1px, 1px);
    transform: translate(-1px, 1px);
}

40% {
    -webkit-transform: translate(-1px, -1px);
    transform: translate(-1px, -1px);
}

60% {
    -webkit-transform: translate(1px, 1px);
    transform: translate(1px, 1px);
}

80% {
    -webkit-transform: translate(1px, -1px);
    transform: translate(1px, -1px);
}

100% {
    -webkit-transform: translate(0);
    transform: translate(0);
}
`;

const modalVariants = {
    start: { opacity: 0, scale: 1 },
    end: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
    exit: { opacity: 0, scale: 1, transition: { duration: 0.5 } },
  };




const ModalLikeBackground = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 100;
    background-color: rgba(0, 0, 0, 0.6);
    backdrop-filter: blur( 10px );

`;

const DetailLookBox = styled(motion.div)`
    width: 30vh;
    height: 70vh;
    max-width: 350px;
    z-index: 120;

    position: fixed;
    left: 20%;
    top: 15%;

    text-align: center;    
    overflow: hidden;

    display: flex;
    flex-direction: column;
    align-items: center;
    flex:none;

    transition: all 0.3s;
    background-color: #fff;
    border-radius: 60px;

    @media (pointer:coarse) {
      width: 94vw !important;
      height: 80vh;
      max-width: none;
      left: 3vw;
      top: 3vh;
      border-radius: 12vw;
    }
`;

const Title = styled.div`
    width: calc(100% - 90px);
    height: 60px;
    font-size: 16px;
    font-weight: 500;
    line-height: 20px;
    margin: 25px 25px 29px 25px;
    padding: 10px 20px 10px 20px;

    border-radius: 215px;

    background: rgba( 255,255,255,0.6 );
    box-shadow: 10px 8px 30px 0 rgba( 0,0,0, 0.2 );
    backdrop-filter: blur( 5px );
    border: 2px solid rgba( 255,255,255, 1 );
    
    display: -webkit-box;
    overflow: hidden;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    text-overflow: ellipsis;
    word-break: keep-all;

    @media (pointer:coarse) {
      width: calc(100% - 90px);
      height: 20vw;
      font-size: 5vw;
      font-weight: 500;
      line-height: 8vw;
      margin: 25px 25px -29px 25px;
      padding: 10px 20px 10px 20px;
      -webkit-line-clamp: 2;
  
      border-radius: 215px;
    }
}

`;

const Detailimg = styled(motion.img)`
    height: 100%;
    margin-top: -100px;
    overflow: scroll;

    ::-webkit-scrollbar{
      display: none;
  }
`;

const Button = styled(motion.img)`
    top: calc(50% - 110px);
    left: calc(20% + 350px);

    position: fixed;
    z-index: 121;
    width: 64px;
    height: 64px;
    outline: none;
    cursor: pointer;
    border: 2px solid #ff5294;
    border-radius: 300px;
    box-shadow: 5px 5px 10px #d9d9d9;

    @media (pointer:coarse) {      
      top: 79.5vh;
      left: 15vw;
      width: 15vw;
      height: 15vw;
    }
`;

const Button2 = styled(motion.img)`
    top: 50%;
    left: calc(20% + 350px);

    position: fixed;
    z-index: 121;
    width: 64px;
    height: 64px;
    outline: none;
    cursor: pointer;
    border: 2px solid #00ff27;
    border-radius: 300px;
    box-shadow: 5px 5px 10px #d9d9d9;

    @media (pointer:coarse) {      
      top: 79.5vh;
      left: 42.5vw;
      width: 15vw;
      height: 15vw;
    }
`;

const Button3 = styled(motion.img)`
    top: calc(50% + 110px);
    left: calc(20% + 350px);

    position: fixed;
    z-index: 121;
    width: 64px;
    height: 64px;
    outline: none;
    cursor: pointer;
    border: 2px solid #fffd00;
    border-radius: 300px;
    box-shadow: 5px 5px 10px #d9d9d9;

    @media (pointer:coarse) {      
      top: 79.5vh;
      left: 70vw;
      width: 15vw;
      height: 15vw;
    }
`;

const UploadBox = styled(motion.div)`
    width: 30vw;
    min-width: 350px;

    border-radius: 60px;
    padding: 0 30px 0 30px;
    background-color: #fff;
    z-index: 130;
    display: flex;
    position: fixed;
    left: calc(20% + 350px);
    top: 15%;

    @media (pointer:coarse) {
      top: 25vh;
      left: 3vw;
      width: 87.7vw;
      min-width: none;
      height: 43vh !important;
      padding-top: 20vh;
      background: linear-gradient(180deg,#ffffff00,#ffffff47,#fffffffc,#ffffff);

    }
`;
const ButtonsGruop = styled.div`
    height: 164px;
    display:flex;
    align-items: flex-start;

    @media (pointer:coarse) {
      
    }
`;

const CanelButton = styled.button`
    width: 100%;
    height: 50px;
    margin: 10px;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    background: red;
    border: none;
    border-radius: 5px;
    box-shadow: 1px 1px 3px rgba(0,0,0,0.15);
    background: linear-gradient(180deg,#c7c7c7,#a7a7a7);
    transition: 200ms;
    &:hover {
      background: linear-gradient(0deg,#e62222,#ff3636);
        border-left: none;
        transform: translateX(0);
        transform: translateY(-3px); 
        animation: ${shake3856} 0.4s linear infinite both;
        box-shadow: 2px 4px 8px -3px rgba(10,250,200,0.7);
    }
    &:active {
        transform: translateY(3px); 
    }
    
    @media (pointer:coarse) {
      height: 5vh;
      border-radius: 1vh;      
    }
`;

const Reset = styled.div`
    transition: 200ms;
    transform: translateX(-30%);
    color: white;
    font-weight: bold;
    font-size: 16px;
    ${CanelButton}:hover & {
        color: transparent;
      }
    
      @media (pointer:coarse) {
        transform: translateX(-20%);
        font-size: 4vw; 
      }
`;

const ResetIcon = styled.div`
    fill: #eee;
    transition: 200ms;
    position: absolute;
    border-left: 1px solid #fff;
    transform: translateX(110%);
    height: 40px;
    width: 45px;
    display: flex;
    align-items: center;
    justify-content: center;
    ${CanelButton}:hover & {
        width: 148px;
        border-left: none;
        transform: translateX(0%);
      }
    ${CanelButton}:active {
        transform: scale(.8); 
    }
    
    @media (pointer:coarse) {
      border-left: 5px solid #fff;
      transform: translateX(200%);
      height: 4vh;
      width: 2.5vh;
    }
`;
const UploadButton = styled.button`
    background-color: #0095f6;
    width: 100%;
    height: 50px;
    margin: 10px;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    background: red;
    border: none;
    border-radius: 5px;
    box-shadow: 1px 1px 3px rgba(0,0,0,0.15);
    background: linear-gradient(180deg,#0095f6,#1875ff);
    transition: 200ms;
    color: white;
    font-weight: bold;
    font-size: 16px;

    &:hover {
      background: linear-gradient(180deg,#00caf6,#0088ff);
        border-left: none;
        transform: translateX(0);
        transform: translateY(-3px); 
        box-shadow: 2px 4px 8px -3px rgba(10,250,200,0.7);
    }
    @media (pointer:coarse) {
      height: 5vh;
      border-radius: 1vh;      
      font-size: 4vw; 
    }
`;

const RightBox = styled.div`
    width:100%;
    height: 100%;
    margin-bottom:60px;
    display: flex;
    flex-direction: column;
`;

const Userinfo = styled.div`
    width:100%;
    border-bottom: 1px solid #ddd;
    height: 70px;
    display: flex;
    align-items: center;
    align-content: center;
    span{
      font-size: 50px;
    }
    img{
      margin: 0 30px 60px 30px;
      box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.1);
      z-index:125;
    }
    @media (pointer:coarse) {
      span{
        display: none;
      }
      img{
        display: none;
      }
    }
`;

const Feedtitle = styled(Input)`
    width: 97%;
    height: 4vh;
    font-size: 30px;
    font-weight: bold;
    margin: 10px 0px 10px 0px;
    border: none !important;

    &:valid, &:focus {    
      background-color: rgba(255, 255, 255, 0.4) !important;
      backdrop-filter: blur( 10px );
      font-size: 3vh;
    }
    
`;

const Tlabel = styled.label`
    font-size: 2em;
    position: absolute;
    left: 77px;
    top: 70px;
    color: #c5c5c5;
    pointer-events: none;
    transform: translateY(1rem);
    transition: 150ms cubic-bezier(0.4,0,0.2,1);
    ${Feedtitle}:focus ~ & {
      transform: translateY(-40%) scale(0.8);
      background-color: #fff;
      padding: 0 .2em;
      color: #2196f3;
    }
    ${Feedtitle}:valid ~ & {
      transform: translateY(-40%) scale(0.8);
      background-color: #fff;
      padding: 0 .2em;
      color: #2196f3;
    }
    @media (pointer:coarse) {
      font-size: 3em;
      left: 4vw;
      top: 23vh;
      ${Feedtitle}:focus ~ & {
        transform: translateY(-40%) scale(0.7);
      }
      ${Feedtitle}:valid ~ & {
        transform: translateY(-40%) scale(0.7);
      }
    }
`;

const Feedcontent = styled.textarea`
    width: 99%;
    padding: 10px;
    font-size: 25px;
    font-weight: normal;
    font-family: inherit;
    border-top: 1px solid #ddd;
    border-bottom: 1px solid #ddd;
    height: 150px;
    @media (pointer:coarse) {
      height: 12vh;
      font-size: 2.5vh;
      border: none;
      background-color: rgba(255, 255, 255, 0.4) !important;
      backdrop-filter: blur( 10px );
      }
    }
`;

const Lookimgs = styled.div`
    display: flex;
`;

const Lookimg = styled.img`
    width: 33%;
    height: 150px;
    margin-left: 10px;
    margin-top: 10px;
    object-fit: contain;
    @media (pointer:coarse) {
      width: 30vw;
      height: 13.5vh;
      }

`;



function LookDetail({ lookitems, lookimg, title, id }) {
    const navigate = useNavigate();
    const handleCloseModal = () => {
        navigate(-1);
      };
      const [ edit, setedit ] = useState(false);
      const LoggedInUser = useLoggedInUser();
      const { nickname } = useParams();
      const {
        register,
        handleSubmit,
        getValues,
        setValue,
        formState: { isValid },
      } = useForm({ mode: "onChange" });
      const [seeProfilelazyquery] = useLazyQuery(SEEPROFILE_QUERY);
      const [deletelookmutation,  { data: deletelookdata, loading: deletelookloading }] = useMutation(DELETELOOK_MUTATION, {
        update: (cache, { data }) => {
          if (data?.deleteLook.ok === false) {
            return;
          }
          seeProfilelazyquery({ variables: { nickname: nickname } });
          handleCloseModal();
        }
      });

      const handleDeleteLook = () => {
        if(window.confirm("룩을 삭제하시겠습니까?")) {
          deletelookmutation({ variables: { lookid: id } });
      } else {

      }
    };

    const [makingfeedmutation, { loading: makingfeedloading }] = useMutation(MAKINGFEED_MUTATION, {
      update: (cache, { data }) => {
        if (data?.makingFeed.ok === false) {
          return;
        }

        cache.modify({
          id: `User:${LoggedInUser?.id}`,
          fields: {
            feeds: (feeds) => {
              const result = [{ __ref: `Feed:${data?.makingFeed.feed?.id}`}, ...feeds];
              return result;
            },
          },
        });
        navigate("/", alert("피드생성완료"))
      }
    });

    const onValid = () => {
      if (makingfeedloading === true) {
        return;
      }
      const { title, caption } = getValues();
      if(window.confirm("피드를 올리시겠습니까?")) {
        makingfeedmutation({ variables: { Lookid: id, title: title, caption: caption } });
    } else {

    }
    }

    const handlePerchase = (id) => {
      navigate(`/perchase/${id}`)
    };


        
      


    return (
      <div>
      <ModalLikeBackground onClick={handleCloseModal}></ModalLikeBackground>

       <AnimatePresence>
       
       <AnimatePresence initial={false}>
       { edit && (<UploadBox
         key="content"
         initial="collapsed"
         animate="open"
         exit="collapsed"
         variants={{
           open: { opacity: 1, height: "70vh" },
           collapsed: { opacity: 0, height: 0 }
         }}
         transition={{ duration: 0.8, ease: [0.04, 0.62, 0.23, 0.98] }}>
          <RightBox>

          <Userinfo>
                  <Avatar size="100px" Avatarurl={LoggedInUser?.avatar} />
                  <Nickname nickname= {"test"} size="15px" textDecoration={"true"} />
                 
          </Userinfo>
                  <form onSubmit={handleSubmit(onValid)}>
                    <Feedtitle {...register("title", { required: "내용을 입력해주세요."})}
                              name="title" 
                              type="text"/>
                    <Tlabel>게시글 제목</Tlabel>
                    <Feedcontent 
                         {...register("caption", { required: "내용을 입력해주세요."})}
                              placeholder=" 내용을 입력해주세요 "/>
                  </form>
                  <Lookimgs>
                    {lookitems?.map((item) => (
                      <Lookimg key={item.id} src={item.image} />
                    ))}
                   
                  </Lookimgs>

                  <ButtonsGruop>
                    <CanelButton onClick={() => setedit(!edit)}>
                    <Reset>뒤로돌아가기</Reset>
                    <ResetIcon >
                        <svg width="24" height="24" viewBox="0 0 24 24">
                            <path d="M24 20.188l-8.315-8.209 8.2-8.282-3.697-3.697-8.212 8.318-8.31-8.203-3.666 3.666 8.321 8.24-8.206 8.313 3.666 3.666 8.237-8.318 8.285 8.203z">
                            </path>
                        </svg>
                    </ResetIcon>
                    </CanelButton>
                    <UploadButton type="submit" onClick={handleSubmit(onValid)}>Upload</UploadButton>
                  </ButtonsGruop>

          </RightBox>
          
          
         </UploadBox>) }
        </AnimatePresence>

       {LoggedInUser && LoggedInUser?.nickname === nickname && (
        <Button key="b2" 

        whileHover={{ scale: 1.2 }}
        whileTap={{ scale: 1 }}
        onClick={()=> handleDeleteLook()}
        initial={{ opacity: 0, scale: 0 }} 
        animate={{opacity: 1, scale: 1}} 
        exit={{opacity: 0, scale: 2}} 
        transition={{ type: "spring", stiffness: 400, damping: 15 }}
        src={Del} />
       )}

       {LoggedInUser && LoggedInUser?.nickname === nickname && (
        <Button2 key="b1" 
        whileHover={{ scale: 1.2 }}
        whileTap={{ scale: 1 }}
        
        onClick={() => setedit(!edit)} 
        initial={{ opacity: 0, scale: 0 }} 
        animate={{opacity: 1, scale: 1}} 
        exit={{opacity: 0, scale: 2}} 
        transition={{ type: "spring", stiffness: 400, damping: 15 }}
        src={Feed} />
       )}

       <Button3 key="b3" 
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 1 }}
                onClick={() => handlePerchase(id) }
                initial={{ opacity: 0, scale: 0}} 
                animate={{opacity: 1, scale: 1}} 
                exit={{opacity: 0, scale: 2}} 
                transition={{ type: "spring", stiffness: 400, damping: 15 }}
                src={Buy} />

        <DetailLookBox key="img" variants={modalVariants} initial="start" animate="end" exit="exit">

          <Title>{title}
          </Title>
          <Detailimg src={lookimg}></Detailimg>
      
        </DetailLookBox>
       </AnimatePresence>
      </div>
  )
}

export default LookDetail;