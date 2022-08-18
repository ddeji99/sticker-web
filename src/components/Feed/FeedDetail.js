import styled from "styled-components";
import { AnimatePresence, motion, Variants } from "framer-motion";
import { Link, useNavigate, useMatch } from "react-router-dom";
import Avatar from "../Shared/Avatar";
import Nickname from "../Shared/Nickname";
import CreatedAt from "../Shared/CreatedAt";
import { useEffect, useState } from "react";
import Input from "../Auth/Input";
import Tag from "../../img/Tag.png";
import { useMutation, useQuery, useLazyQuery } from "@apollo/client";
import useLoggedInUser from "../../hooks/useLoggedInUser";
import { useForm } from "react-hook-form";
import { DELETECOMMENT_MUTATION } from "../../Documents/Mutation/DELETECOMMENT_MUTATION";
import { SEECOMMENT_QUERY } from "../../Documents/Query/SEECOMMENT_QUERY";
import { CREATECOMMENT_MUTATION } from "../../Documents/Mutation/CREATECOMMENT_MUTATION";
import gql from "graphql-tag";
import LookDetail from "./LookDetail";


const modalVariants = {

    start: { opacity: 0, scale: 0.71 },
    end: { opacity: 1, scale: 1, transition: { 
      default: {
        duration: 0.5,
        ease: [0, 0.71, 0.2, 1.01]
      },
      scale: {
        type: "spring",
        damping: 9,
        stiffness: 90,
        restDelta: 0.001
      } } },
      
    exit: { opacity: 0, scale: 1, transition: { duration: 0.5 } },
  };

  const CommentsVariants = {
    open: {
      y: 50,
      opacity: 1,
      transition: {
        y: { stiffness: 1000, velocity: -100 }
      }
    },
    closed: {
      y: 50,
      opacity: 0,
      transition: {
        y: { stiffness: 1000 }
      }
    }
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

const DetailFeedBox = styled(motion.div)`
width: 50vw;
height: calc(50vw - 19vw);
min-width: 1000px;
min-height: 550px;
border-radius: 35px;
background-color: #fff;

display: flex;
flex-direction: row;
justify-content: space-between;


z-index: 120;
position: fixed;
padding: 10px;
top: 13vh;
left:0;
right:0;
margin-left:auto;
margin-right:auto;
overflow:hidden;
@media screen and (max-width: 1000px) {
    width: 95vw;
    height: 90vh;
    top: 5vh; 
    display: flex;
    flex-wrap: wrap;      
    flex-direction: column;
    justify-content: space-between;
}
`;

const LookBox = styled.div`
height: calc(50vw - 19vw);
min-height: 550px;
box-shadow: 5px 5px 10px #d9d9d9;
border-radius: 27px;
@media screen and (max-width: 1000px) {
    width: 40vw;
    height: fit-content;
}
`;

const InfoBox = styled.div`
margin-left: 20px;
height: 500px;
min-height: 550px;
width: 300px;
padding: 0 2% 0 2%;
@media screen and (max-width: 1000px) {
    width: calc(45vw + 40px);
    height: 49vh !important;
    font-size: 40px;
}
`;

const CommentBox = styled.div`
height: calc(50vw - 19vw);
min-height: 550px;
width: 350px;
border-radius: 27px;
overflow: hidden;
border-color: lightgrey;
border-style: solid;
border-right-width: 1px;

::-webkit-scrollbar{
    display: none;
}
@media screen and (max-width: 1000px) {    
    width: 87vw;
    height: calc(98vw + 80vh) !important;
    min-height: 0;
    margin-left: -93vw;
    margin-top: calc(88vw + 1vh);
    overflow: scroll;
    font-size: 50px;
    border-right-width: 0px;
}
`;

const Lookimg = styled.img`
cursor: pointer;
height: 100%;
overflow: hidden;
border-radius: 27px;
margin-left:auto;
margin-right:auto;
@media screen and (max-width: 1000px) {
    width:100%;
    height: auto !important;
}
`;


const MyProfile = styled.div`
font-weight: bold;
font-weight: bold;
display: flex;
justify-content: flex-start;
align-items: center;
align-content: center;
margin-top: 10px;
overflow: hidden;
`;
const MyProfileJ = styled.div`
width: auto;
display: flex;
flex-direction: column; 
font-size: 70px;
span {
    padding: 10px 15px;
}
`;

const TitleBox = styled.div`
margin: 20px 0 10px 0;
font-size: 30px;
font-weight: bold;
padding-top: 10px;
@media screen and (max-width: 1000px) {
    margin: 20px 0 20px 0;
    font-size: 50px;
    line-height: 50px;
}
`;

const CaptionBox = styled.div`
margin: 10px 0 10px 0;
padding-bottom: 10px;
height: calc(100% - 460px);
line-height: 25px;
overflow: hidden;


-webkit-line-clamp: 4;
-webkit-box-orient: vertical;
text-overflow: ellipsis;
display: -webkit-box;

@media screen and (max-width: 1000px) {
    height: 195px;
    line-height: 50px;
    margin: 5px 0 1.2vh 0;
}
`;

const ItemBox = styled.div`
display: flex;
flex-direction: column;
align-items: center;
@media screen and (max-width: 1000px) {
    align-items: flex-start;
}
`;

const Iteminfo = styled.div`
font-size: 20px;  
font-family: 'Jost';
font-weight: 500;  
display: flex;
align-items: center;
@media (pointer:coarse) {
    font-size: 40px;    
    display: flex;
    align-items: flex-start;
    margin-bottom: 20px;
}
`;

const Tagimg = styled.img`
width: 20px;
margin-right: 7px;
@media screen and (max-width: 1000px) {
    width: 60px;
    margin-bottom: -29px;
    margin-top: -8px;
}
`;

const Itemlist = styled.div`
display: flex;
margin-top: 10px;
@media screen and (max-width: 1000px) {
    width: 100%;
    flex-wrap: wrap;
}
`;

const Listitem = styled(motion.img)`
height: 70px;
width: 70px;
cursor: pointer;
object-fit: cover;
margin: 0 10px 0 10px;
overflow:hidden; 
@media screen and (max-width: 1000px) {
width: 33%;
height: 8vh;
margin: 5px 0 1vh 0;
}
`;

const Itemdetail = styled.span`

`;

const DetailBox = styled(motion.div)`
display: flex;
flex-direction: row-reverse;
border: 1px solid ;

margin-top: 10px;
background: rgba( 255,255,255,0.6 );
backdrop-filter: blur( 30px );
border: 1px solid rgba( 255,255,255, 1 );
border-radius: 25px;
box-shadow: 10px 10px 50px #d9d9d9;

padding: 10px;

position: relative;
z-index: 1;

@media screen and (max-width: 1000px) {
width: 95vw;
height: 45vh;
margin: 0 auto 0 -44vw;
backdrop-filter: blur( 20px );
flex-direction: column-reverse;
align-items: center;
overflow:scroll;
}
`;

const Detailimg = styled.img`
height: 150px;
width: 140px;
object-fit: contain;
@media screen and (max-width: 1000px) {
height: auto;
width: 100%;
}
`;

const Detailinfo = styled.div`
height: 150px;
padding-left: 5px;
line-height: 1.2; 
@media screen and (max-width: 1000px) {
height: 100%;
width: 100%;
display: flex;
}
`;

const Infotext = styled.span`
display: block;
font-family: 'Jost';
font-weight: 500;  
@media screen and (max-width: 1000px) {
    margin: 30px 2px 0 2px;
    font-size: 50px;
    width: 100%;
    text-align: center;
    border-width: 0 2px 0 2px;
    border-style: solid;
    border-color: lightgrey;
}
`;

const Commentslist = styled(motion.ul)`
border-bottom: 1px solid ;
height: 100%;
padding:10px;
overflow:scroll;
::-webkit-scrollbar {
    display: none;
  }

`;

const Comments  = styled(motion.div)`
width: 90%;
padding: 5px;
background: #eee;

// -webkit-border-radius: 45px;
// -moz-border-radius: 40px;
border-radius: 40px;

display:flex;
margin-bottom: 15px;

line-height: 20px;
position: relative;

&:before {
content: "";
position: absolute;
bottom: 0;
left: -7px;
height: 40px;
width: 20px;
background: #eee;
border-bottom-right-radius: 15px;
z-index:-1;
}

&:after {
content: "";
position: absolute;
bottom: 0;
left: -10px;
width: 10px;
height: 40px;
background: white;
border-bottom-right-radius: 10px;
z-index:-1;
}

@media screen and (max-width: 1000px) {
line-height: 50px;
width: 80vw;
margin-bottom: 15px;

-webkit-border-radius: 66px;
-moz-border-radius: 66px;
border-radius: 66px;
&:before {
    content: "";
    position: absolute;
    bottom: 0;
    left: -12px;
    height: 66px;
    width: 40px;
    background: #eee;
    border-bottom-right-radius: 33px;
    z-index:-1;
}

&:after {
    content: "";
    position: absolute;
    bottom: 0;
    left: -40px;
    height: 66px;
    width: 40px;
    background: white;
    border-bottom-right-radius: 15px;
    z-index:-1;
  }
}

`;
const AOhagisila = styled.div`
display:flex;
flex-direction: column;

span{
    font-size: 14px;
    width: 220px;
    word-break: break-all;
    line-height: 1.3; 
}



div {
    padding:0;
}


@media screen and (max-width: 1000px) {
span{
    font-size: 30px;
    width: 200px;
    word-break: break-all;
    line-height: 1.2; 
}
}
`;
const CommentForm = styled.div`
display: flex;
align-content: center;
width: auto;
height: auto;
margin-top:-101px;
padding: 20px 0 0.1px 5px;
background: rgba( 255,255,255,0.6 );
backdrop-filter: blur( 3px );
border-radius: 26px;

@media screen and (max-width: 1000px) {
backdrop-filter: blur( 8px );
margin-top: -146px;
}
`;

const InputSub = styled(Input)`
height: 35px;
width: 225px;

@media screen and (max-width: 1000px) {
height: 3.5vh;
width: 70vw;
font-size: 30px;
}
`;

const CommentInputForm = styled.form`
display: flex;
@media screen and (max-width: 1000px) {
    height: 10vh;
    width: 95vw;
    margin-top: -27px;
}
`;

const Button = styled.input`
height: 40px;
width: 40px;
margin-left: 5px;
border-radius: 100px;
color: #fff;
background-color:#1875FF;
cursor: pointer;

&:hover{
    background-color:#0046ff;
}

@media screen and (max-width: 1000px) {
    height: 100px;
    width: 100px;
    border-radius: 100px;
    font-size: 35px;
}
`;

const AvatarM = styled.img`
width: 50px;
height: 50px;
border: 1px solid #DBDBDB;
border-radius: 50%;
margin: 10px;
@media screen and (max-width: 1000px) {
    width: 100px;
    height: 100px;
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








function FeedDetail({ id, useravatar, usernickname, lookimg, lookitems, title, caption, createdAt, lookid  }) {
    const [ isopen, setisopen ] = useState(lookitems[0]);
    const loggedInUser = useLoggedInUser();
    const navigate = useNavigate();
    const { data: seeCommentdata } = useQuery(SEECOMMENT_QUERY, { variables: { feedid: id } });
    const [seeCommentLazyQuery, { loading: seeCommentsLoading }] = useLazyQuery(SEECOMMENT_QUERY);
    const handleCloseModal = () => {
        navigate(-1);
      };
      const lookdetail = (lookid,usernickname) => {
        navigate(`look/${lookid}`);
    }

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
            seeCommentLazyQuery({ variables: { feedid: id } });
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
                seeCommentLazyQuery({ variables: { feedid: id } });
              }
        },
      });

      const onValid = () => {
        if (id) {
          const { payload } = getValues();
          createCommentMutation({ variables: { feedid: id, payload: payload } });
        }
      };

      const handleDeleteComment = (commentid) => {
        if(window.confirm("댓글을 삭제하시겠습니까?")) {
            deleteCommentMutation({ variables: { commentid: commentid } });
        } else {

        }
      };

    return (
        <div>
         <ModalLikeBackground onClick={handleCloseModal}></ModalLikeBackground>


         <AnimatePresence>
           
          <DetailFeedBox variants={modalVariants} initial="start" animate="end" exit="exit">

            <LookBox>
                <Lookimg onClick={() => lookdetail(lookid,usernickname)} src={lookimg} />
            </LookBox>

            <InfoBox>


                <MyProfile>
                    <Avatar size="5vh" Avatarurl={useravatar} />
                    <MyProfileJ>
                    <Link to={`/profile/${usernickname}`}>
                    <Nickname nickname= {usernickname} size="2.5vh" textDecoration={"true"} />
                    </Link>
                    <CreatedAt style={{wordBreak: "keep-all"}} createAt={createdAt} />
                    </MyProfileJ>
                </MyProfile>
                <TitleBox>{title}</TitleBox>
                <CaptionBox>{caption}</CaptionBox>

                <ItemBox>

                   <Iteminfo>
                    <Tagimg src={Tag} />
                    Item Info
                   </Iteminfo>

                   <Itemlist>
                    {lookitems.map((item, i) => 
                     <Listitem key={i} initial={false}
                     animate
                     style={ { borderTop: lookitems[i] === isopen ? "2px solid red" : "none"}}
                     onClick={() => setisopen(lookitems[i])} 
                     src={item.image} /> )}
                   </Itemlist>

                   <AnimatePresence initial={false}>
                   {isopen  && ( <DetailBox 
                      key="content"
                      initial={{ y: 50, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: -50, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      whileHover={{ scale: 1.5, y: -50}}
                      >
                        <Detailimg src={isopen.image} />
                        <Detailinfo>
                           <Infotext>{isopen.title}</Infotext>
                           <Infotext>{isopen.size}</Infotext>
                           <Infotext>{isopen.color}</Infotext>
                           <Infotext>{isopen.price}</Infotext>
                        </Detailinfo>
                   </DetailBox>
                   )}
                   </AnimatePresence>
                  

                </ItemBox>


            </InfoBox>

            <CommentBox>
                <Commentslist>
                    {seeCommentdata?.seeComment.comments?.map((comment) =>  (
                        <Comments key={comment?.id} variants={CommentsVariants}                      
                        whileHover={{ scale: 1.03 }}>
                         <AvatarM src={comment?.user.avatar} />
                         <AOhagisila>
                             <Link to={`/profile/${comment?.user.nickname}`} >
                             <Nickname nickname= {comment?.user.nickname} size="15px" textDecoration={"true"} />
                             </Link>
                                 <span>
                                  {comment?.payload}
                                 </span>                              
                                 <CreatedAt style={{wordBreak: "keep-all"}} createAt={comment?.createAt} />
                                 {comment?.user.isMe && ( <DeleteB onClick={() => handleDeleteComment(comment?.id)} type="button" >삭제</DeleteB> )} 
                         </AOhagisila>
                       </Comments>
                    ))}
                    <p style={{height: "110px"}}></p>
                </Commentslist>

                <CommentForm>

                    <CommentInputForm onSubmit={handleSubmit(onValid)}>
                        <InputSub {...register("payload", { required: "댓글을 입력해주세요.", minLength: 1 })} minLength={1} type="text" placeholder="댓글 달기..." />
                        <Button onClick={handleSubmit(onValid)} type="submit" disabled={!isValid} value={"게시"} />
                    </CommentInputForm>

                </CommentForm>
            </CommentBox>

          </DetailFeedBox>
         </AnimatePresence>
        </div>
    )
}

export default FeedDetail;





/*
 <AnimatePresence initial={false}>
                   {isopen && ( <DetailBox 
                      key="content"
                      initial="collapsed"
                      animate="open"
                      exit="collapsed"
                      variants={{
                        open: { opacity: 1, height: "auto" },
                        collapsed: { opacity: 0, height: 0 }
                      }}
                      transition={{ duration: 0.8, ease: [0.04, 0.62, 0.23, 0.98] }}
                      >

                     {lookitems.map((item) =>
                     <div key={item.id}> 
                        <Detailimg src={item.image} />
                        <Detailinfo>
                           <Infotext>name:{item.title}</Infotext>
                           <Infotext>size:{item.size}</Infotext>
                           <Infotext>color:{item.color}</Infotext>
                           <Infotext>price:{item.price}</Infotext>
                        </Detailinfo>
                    </div> 
                     )}

                   </DetailBox>
                   )}
                   </AnimatePresence> */