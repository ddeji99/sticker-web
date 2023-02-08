import styled, { keyframes } from "styled-components";
import { AnimatePresence, motion, Variants } from "framer-motion";
import { Link, useNavigate, useMatch, useParams } from "react-router-dom";
import { useState } from "react";
import Avatar from "../Shared/Avatar";
import Nickname from "../Shared/Nickname";
import Del from "../../img/del.svg";
import Buy from "../../img/buy.svg";
import Feed from "../../img/feed.svg";
import Input from "../Auth/Input";
import useLoggedInUser from "../../hooks/useLoggedInUser";
import { useMutation, useLazyQuery } from "@apollo/client";
import { useForm } from "react-hook-form";
import { DELETELOOK_MUTATION } from "../../Documents/Mutation/DELETELOOK_MUTATION";
import { MAKINGFEED_MUTATION } from "../../Documents/Mutation/MAKINGFEED_MUTATION";
import { SEEPROFILE_QUERY } from "../../Documents/Query/SEEPROFILE_QUERY";
import EachItem from "../Aircloset/EachItem";
import FormError from "../Auth/FormError";








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
    width: 1244px;
    height: 600px;
    z-index: 120;

    position: fixed;
    left: calc(50% - 622px);
    top: 5%;

    text-align: center;    
    overflow: hidden;

    display: flex;
    flex-direction: row;
    align-items: flex-start;
    flex:none;

    transition: all 0.3s;
    background-color: #fff;
    border-radius: 60px;

    @media all and (max-width:767px) {
      width: 97vw !important;
      height: 80vh;
      max-width: none;
      left: 1.5vw;
      top: 3vh;
      border-radius: 60px;
    }
`;

const Detailimg = styled(motion.img)`
    width: 270px;

    ::-webkit-scrollbar{
      display: none;
  }
  @media all and (max-width:767px) {
    width: 44vw !important;
  }
`;


const Lookimgs = styled.div`
  width: 380px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 25px 25px;
    & > p{
      width: calc(100% - 40px);
      margin-bottom: 20px;
      text-align: left;
      padding: 0px 20px 10px 20px;
      font-weight: 700;
      border-bottom: 1px solid #f2f2f2;
      span{
        font-weight: 400;
      }
    }
    .ItemGroup{
      width: 96%;
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      align-items: center;
      justify-content: space-between;
      .EachItemBody{
        margin-bottom: 5px;
      }
      .EachItemMain{
        height: 90px;
        & > div{
          display: none;
        }
      }
      .EachItemText{
        padding: 8px;
      }

    }
    @media all and (max-width:767px) {
      width: calc(97vw - 16px) !important;
      height: 65vh !important;
      position: absolute;
      margin: 8px 8px;
      justify-content: space-between;
      align-items: flex-end;
      & > p{
        text-align: right;
        margin-bottom: auto;
        border-bottom: 0px solid #f2f2f2;
      }

      .ItemGroup{
        width: 100% !important;
        height: 190px !important;
        display: flex;
        flex-direction: row;
        flex-wrap: nowrap;
        align-items: center;
        justify-content: flex-start;
        overflow: scroll;
        .EachItemBody{
          width: 120px;
          margin-right: 20px;
          background-color: transparent;
        }
        .EachItemMain{
          height: 120px;
          & > div{
            display: none;
          }
        }
        .EachItemText{
          margin-top: -5px;
          padding: 8px;
        }
  
      }
    }
  
 `;

const Title = styled.div`
    box-sizing: border-box;
    width: 100%;
    height: 50px;
    font-size: 18px;
    font-weight: 700;
    line-height: 20px;
    padding: 0px 20px 10px 20px;
    margin: 10px 25px;

    background: rgba( 255,255,255,0.6 );
    backdrop-filter: blur( 5px );
    text-align: left;
    h3{
      white-space: pre-wrap;
      word-wrap: break-word;
      word-break: break-word;
      position: relative;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
    }

    @media all and (max-width:767px) {
      width: 50vw;
      height: 120px;
      padding: 10px 10px 10px 0px;
      margin: 38px 0px;
      text-align: LEFT;
      font-size: 14px;
      h3{
      -webkit-line-clamp: 4;
      }
}

 `;

const ModifyButtons = styled.div`
  bottom: 25px;
  left: calc(50% - 337px);
  width: 382px;
  height: 64px;
  position: absolute;
  z-index: 121;
  display: flex;
  justify-content: space-between;
  @media all and (max-width:767px) {
    bottom: 15px;
    left: calc(50% - 170px);
    width: 340px;
  }
 `;

const Button = styled(motion.img)`
    width: calc(382px / 3 - 50px);  
    height: 32px;
    padding: 16px;
    outline: none;
    cursor: pointer;
    border: 1px solid rgb(194 194 194 / 30%);
    border-radius: 300px;
    box-shadow: 0px 4px 15px rgb(0 0 0 / 8%);

    @media all and (max-width:767px) {    
      top: 79.5vh;
      left: 15vw;
    }
 `;

const Button2 = styled(motion.img)`
    width: calc(382px / 3 - 50px);
    height: 32px;
    padding: 16px;
    outline: none;
    cursor: pointer;
    border: 1px solid rgb(194 194 194 / 30%);
    border-radius: 300px;
    box-shadow: 0px 4px 15px rgb(0 0 0 / 8%);

    @media all and (max-width:767px) {
      top: 79.5vh;
      left: 42.5vw;
    }
`;

const Button3 = styled(motion.img)`
    width: calc(382px / 3 - 50px);
    height: 32px;
    padding: 16px;
    outline: none;
    cursor: pointer;
    border: 1px solid rgb(194 194 194 / 30%);
    border-radius: 300px;
    box-shadow: 0px 4px 15px rgb(0 0 0 / 8%);

    @media all and (max-width:767px) {
      top: 79.5vh;
      left: 70vw;
    }
   `;



const UploadBox = styled(motion.div)`
    width: 437px;
    height: 540px !important;
    left: calc(50% + 85px);
    top: 5%;
    border-radius: 38px;
    padding: 20px 30px 0 30px;
    margin: 20px;
    background-color: #fff;
    z-index: 121;
    display: flex;
    position: fixed;

    @media all and (max-width:767px) {
      top: 36vh;
      left: 1.5VW;
      width: 97vw;
      min-width: none;
      height: 45vh !important;
      padding: 20px 0px 0 0px;
      margin: 0px;
      border-radius: 60px;
      background-color: #fff;
    }

    }
`;

const RightBox = styled.div`
    width:100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    & > form > span{
      margin-left: calc(100% - 260px);
      font-size: 14px !important;
    }
    @media all and (max-width:767px) {
      padding: 20px;
      
    }
`;

const ButtonsGruop = styled.div`
    height: 164px;
    display:flex;
    align-items: flex-start;

    @media all and (max-width:767px) {
      
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
    
    @media all and (max-width:767px) {
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
    
    @media all and (max-width:767px) {
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
    
    @media all and (max-width:767px) {
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
    @media all and (max-width:767px) {
      height: 5vh;
      border-radius: 1vh;      
      font-size: 4vw; 
    }
`;

const Feedtitle = styled(Input)`
    box-sizing: border-box;
    width: 100%;
    height: 40px;
    font-size: 18px;
    font-weight: bold;
    margin: 5px 0 15px 0;

    &:focus {
      outline: none;
      border: 1.5px solid #1875FF;
      background-color: #fff !important;
    }
    &:valid {
      outline: none;
      border: 1.5px solid #1875FF;
      background-color: #fff !important;
    }
    
    @media all and (max-width:767px) {
      background-color: #ffffff26;
      backdrop-filter: blur( 10px );
      border: 1px solid #1875FF;
    }
`;

const Tlabel = styled.label`
    font-size: 18px;
    position: absolute;
    left: 77px;
    top: 78px;
    color: #c5c5c5;
    pointer-events: none;
    transform: translateY(-40px);
    transition: 150ms cubic-bezier(0.4,0,0.2,1);
    ${Feedtitle}:focus ~ & {
      transform: translateY(-60px) translateX(10px) scale(0.8);
      background-color: #fff;
      padding: 0 .2em;
      color: #2196f3;
    }
    ${Feedtitle}:valid ~ & {
      transform: translateY(-60px) translateX(10px) scale(0.8);
      background-color: #fff;
      padding: 0 .2em;
      color: #2196f3;
    }

    @media all and (max-width:767px) {
      font-size: 14px;
      left: 35px;
      color: #666;
      transform: translateY(-20px) translateX(0);
      ${Feedtitle}:focus ~ & {
        transform: translateY(-44px) translateX(185px) scale(1);
      }
      ${Feedtitle}:valid ~ & {
        transform: translateY(-44px) translateX(185px) scale(1);
      }
    }
`;

const Feedcontent = styled.textarea`
    box-sizing: border-box;
    width: 100%;
    height: 260px;
    padding: 10px;
    font-size: 16px;
    font-weight: normal;
    font-family: inherit;
    border-radius: 22px;
    border: none;
    margin: 5px 0 15px 0;
    &:focus {
      outline: none;
      border: 1.5px solid #1875FF;
      background-color: #fff !important;
    }
    &:valid {
      outline: none;
      border: 1.5px solid #1875FF;
      background-color: #fff !important;
    }
    @media all and (max-width:767px) {
      height: 12vh;
      font-size: 14px;
      border: none;
      border: 1px solid #1875FF;
      background-color: rgba(255, 255, 255, 0.4) !important;
      backdrop-filter: blur( 10px );
      }
    }
`;

const SelectG = styled.select`
  width: 100%;
  height: 40px;
  margin: 10px 0 27px auto;
  padding: 0 40.5px 0 41.5px;
  border-radius: 300px;
  &:focus {
    outline: none;
    border: 1.5px solid #1875FF;
    background-color: #fff !important;
  }
  &:valid {
    outline: none;
    border: 1.5px solid #1875FF;
    background-color: #fff !important;
  }

  @media all and (max-width:767px) {
    font-size: 14px;
    height: 44px;
    margin: -72px 0 25px auto;
    border: 1px solid #1875FF;
  }
`;



function LookDetail({ lookitems, lookimg, title, id, totalprice  }) {
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
        formState: { isValid, errors },
        setError,
        clearErrors,
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
      const { title, caption, category } = getValues();
      if(window.confirm("피드를 올리시겠습니까?")) {
        makingfeedmutation({ variables: { Lookid: id, title: title, caption: caption, category: category  } });
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
           open: { opacity: 1, height: "600px" },
           collapsed: { opacity: 0, height: 0 }
         }}
         transition={{ duration: 0.8, ease: [0.04, 0.62, 0.23, 0.98] }}>
          <RightBox>

          
                  <form onSubmit={handleSubmit(onValid)}>
                    <FormError message={errors?.title?.message} />
                    <Feedtitle {...register("title", { required: "이번 스타일의 이름은 무엇인가요?"})}
                              required=" "
                              hasError={Boolean(errors?.title?.message)} 
                              name="title" 
                              type="text"/>
                    <Tlabel>게시글 제목</Tlabel>

                    <FormError message={errors?.caption?.message} />

                    <Feedcontent 
                         {...register("caption", { required: "어떤 스타일 인가요?"})}
                              required=" "
                              hasError={Boolean(errors?.caption?.message)}
                              placeholder=" 내용을 입력해주세요 "/>

                     <FormError message={errors?.category?.message} />         
                    <SelectG {...register("category", {
                                          required: "어떤종류의 피드인가요?",
                                    })}
                                    >
                                      <optgroup label="category">
                                      <option value="recommand">"난 이게 좋아요!" 추천 게시글💡</option>
                                      <option value="question">"도와주세요!" 질문 게시글🧐</option>
                                      </optgroup>
                                    </SelectG>



                  </form>

                  

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



       




        <DetailLookBox key="img" variants={modalVariants} initial="start" animate="end" exit="exit">

            <Detailimg src={lookimg}></Detailimg>
                
                <Lookimgs>
                <Title>
                  <h3>{title}</h3>
                </Title>
                <p><span>총 </span>{totalprice}<span>원</span></p>
                  <div className="ItemGroup">
                  {lookitems?.map((item) => 
                     <EachItem key={item.id} item={item} />
                  )}
                                
                  </div>
                </Lookimgs>

                <ModifyButtons>

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



                </ModifyButtons>

          
          

        </DetailLookBox>
       </AnimatePresence>
      </div>
  )
}

export default LookDetail;