import styled, { keyframes } from "styled-components";
import { useReactiveVar } from "@apollo/client/react";
import { ShowTopVar, ShowBottomVar, ShowOuterVar, wearOuterVar, wearOuter, wearTop} from "../apollo"
import { SEETOPITEMS_QUERY } from "../Documents/Query/SEETOPITEMS_QUERY";
import { SEEBOTTOMITEMS_QUERY } from "../Documents/Query/SEEBOTTOMITEMS_QUERY";
import { SEEOUTERITEMS_QUERY } from "../Documents/Query/SEEOUTERITEMS_QUERY";
import Category from "../components/Fitting/CategoryButton";
import { useQuery, useMutation } from "@apollo/client";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import Zoomimg from "../components/Fitting/Zoomimg"
import ZoomimgBottom from "../components/Fitting/ZoomimgBottom"
import ZoomimgTop from "../components/Fitting/ZoomimgTop"
import ZoomimgOuter from "../components/Fitting/ZoomimgOuter"
import React, { useCallback, useEffect, useState } from "react";
import Loader from "../components/Loader";
import a from "../img/top_defult.png"
import b from "../img/bottom_defult.png"
import Mark from "../img/dnd_mark.gif"
import { useForm, useWatch } from "react-hook-form"; 
import { Link, useNavigate, NavigateFunction } from "react-router-dom";
import { MAKINGLOOK_MUTATION } from "../Documents/Mutation/MAKINGLOOK_MUTATION.";
import html2canvas from "html2canvas";
import Header from "../components/Header";
import useLoggedInUser from "../hooks/useLoggedInUser";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

/////predeclare
const bounce = keyframes`
  0% {
    opacity: 0;
  }
  30% {
    opacity: 0;
  }
  60% {
    opacity: 1;
  }

  100% {
    opacity: 0;
    transform: translateY(227px);
  }
`;

const rotate624 = keyframes`
  0% {
    transform: rotate(0deg) translate3d(0, 0, 0);
  }

  25% {
    transform: rotate(2deg) translate3d(0, 0, 0);
  }

  50% {
    transform: rotate(-2deg) translate3d(0, 0, 0);
  }

  75% {
    transform: rotate(1deg) translate3d(0, 0, 0);
  }

  100% {
    transform: rotate(0deg) translate3d(0, 0, 0);
  }
`;

const storm1261 = keyframes`
  0% {
    transform: translate3d(0, 0, 0) translateZ(0);
  }

  25% {
    transform: translate3d(8px, 0, 0) translateZ(0);
  }

  50% {
    transform: translate3d(-6px, 0, 0) translateZ(0);
  }

  75% {
    transform: translate3d(4px, 0, 0) translateZ(0);
  }

  100% {
    transform: translate3d(0, 0, 0) translateZ(0);
  }
  `;
  

////style start

const Submitbox = styled.div`
position: relative;
display: flex;
flex-direction: row;
justify-content: space-between;
`;
const IG = styled.div`
width: 91.5vh;
padding-left: 18px;
padding-right: 18px;
display: flex;
align-items: center;
`;

const PriceBar = styled.input`
width: 19%;
height: 5vh;
padding-left: 2.5%;
border: none;
border-radius: 1rem;
background: linear-gradient(#44aefc,#026bff);
color: #fff;
font-size: 3vh;
font-family: sans-serif;
text-align: left;
  &:focus {
  background: linear-gradient(#44aefc,#026bff);
  outline: 1px solid #4faefc;
 }

`;

const TitleInput = styled.input`
width: 33.5%;
height: 5vh;
padding-left: 2%;
margin-left: 1.8%;
border: solid 1.5px #9e9e9e;
border-radius: 1rem;
background: none;
color: #000;
transition: border 150ms cubic-bezier(0.4,0,0.2,1);

${(props) => (props.hasError ? "tomato" : "rgb(219, 219, 219)" )};

&:focus {
  outline: none;
  border: 1.5px solid #1a73e8;
}
&:valid {
  outline: none;
  border: 1.5px solid #1a73e8;
}
`;
const PriceBarInfo = styled.span`
  left: 15.5%;
  top: 50%px;
  position: absolute;
  font-size: 15px;
  color: #fff;
`;


const LookbioInput = styled.input`
width: 58%;
height: 5vh;
padding-left: 2%;

margin-left: 1.5%;
border: solid 1.5px #9e9e9e;
border-radius: 1rem;
background: none;
color: #000;
transition: border 150ms cubic-bezier(0.4,0,0.2,1);

${(props) => (props.hasError ? "tomato" : "rgb(219, 219, 219)" )};
&:focus {
  outline: none;
  border: 1.5px solid #9e9e9e;
}
&:valid {
  outline: none;
  border: 1.5px solid #1a73e8;
}
`;

const Tlabel = styled.label`
font-size: 1.1em;
  position: absolute;
  left: 27.5%;
  top: -2.5%;
color: #c5c5c5;
pointer-events: none;
transform: translateY(1rem);
transition: 150ms cubic-bezier(0.4,0,0.2,1);
${TitleInput}:focus ~ & {
  transform: translateY(-25%) scale(0.9);
  background-color: #fafafa;
  padding: 0 .2em;
  color: #2196f3;
}
${TitleInput}:valid ~ & {
  transform: translateY(-25%) scale(0.9);
  background-color: #fafafa;
  padding: 0 .2em;
  color: #2196f3;
}
`;
const Llabel = styled.label`
font-size: 1.1em;
position: absolute;
left: 51.5%;
top: -4%;
color: #c5c5c5;
pointer-events: none;
transform: translateY(1rem);
transition: 150ms cubic-bezier(0.4,0,0.2,1);
${LookbioInput}:focus ~ & {
  transform: translateY(-50%) scale(0.9);
  background-color: #fff;
  padding: 0 .2em;
  color: #2196f3;
}
${LookbioInput}:valid ~ & {
}
`;

const SaveButton = styled.button`
width: 96.5vh;
height: 9vh;
vertical-align: middle;
margin-top 25px;

outline: none;
text-decoration: none;
display: flex;
justify-content: center;
align-items: center;
cursor: pointer;
text-transform: uppercase;
background-color: #fff;
border: 1px solid #1a73e8;
border-radius: 30px;
color: #1d89ff;
font-weight: 400;
font-family: inherit;
z-index: 0;
transition: all 0.3s cubic-bezier(0.02, 0.01, 0.47, 1);

`;

// 저장버튼업데이트//
const SAVEspan = styled.span`
.button {
 --width: 96.5vh;
 --height: 9vh;
 --tooltip-height: 35px;
 --tooltip-width: 290px;
 --gap-between-tooltip-to-button: calc(var(--tooltip-height) + 3px);
 --button-color: #1163ff;
 --tooltip-color: #666;
 width: var(--width);
 height: var(--height);
 background: var(--button-color);
 position: relative;
 text-align: center;
 border-radius: 1em;
 transition: background 0.3s;
}

.button::before {
 position: absolute;
 content: attr(data-tooltip);
 width: var(--tooltip-width);
 height: var(--tooltip-height);
 background-color: var(--tooltip-color);
 font-size: 0.9rem;
 color: #fff;
 border-radius: .25em;
 line-height: var(--tooltip-height);
 bottom: calc(var(--height) + var(--gap-between-tooltip-to-button) + 10px);
 left: calc(50% - var(--tooltip-width) / 2);
}

.button::after {
 position: absolute;
 content: '';
 width: 0;
 height: 0;
 border: 10px solid transparent;
 border-top-color: var(--tooltip-color);
 left: calc(50% - 10px);
 bottom: calc(var(--height) + var(--gap-between-tooltip-to-button) - 10px);
}

.button::after,.button::before {
 opacity: 0;
 visibility: hidden;
 transition: all 0.5s;
}

.text {
 display: flex;
 align-items: center;
 justify-content: center;
 font-size: 40px;
 letter-spacing: 10px;
}

.button-wrapper,.text,.icon {
 overflow: hidden;
 position: absolute;
 width: 100%;
 height: 100%;
 left: 0;
 color: #fff;
}

.text {
 top: 0
}

.text,.icon {
 transition: top 0.5s;
}

.icon {
 color: #fff;
 top: 100%;
 display: flex;
 align-items: center;
 justify-content: center;
}

.button:hover {
 background: #6c18ff;
}

.button:hover .text {
 top: -100%;
}

.button:hover .icon {
 top: 0;
}

.button:hover:before,.button:hover:after {
 opacity: 1;
 visibility: visible;
}

.button:hover:after {
 bottom: calc(var(--height) + var(--gap-between-tooltip-to-button) - 20px);
}

.button:hover:before {
 bottom: calc(var(--height) + var(--gap-between-tooltip-to-button));
}

`;

//////----최현섭작품----/width: 38vh;height: 85vh;/추가/////
const LeftBoard = styled.div`
width: 40vh;
height: 89vh;
margin-right: 50px;
background: #ffffff;
box-shadow: 0 20px 30px rgb(32 33 36 / 18%);
border-radius: 30px;
`;


//////----최현섭작품----overflow: hidden;/추가///
const CardWrapper= styled.div`
width: 160px;
height: 255px;
overflow: hidden;
margin-left: 18px;
margin-top: 5px;
padding-bottom: 6px;
display: flex;
flex-direction: column;
align-items: center;

border-radius: 10px;
background: linear-gradient(145deg, #ffffff, #f5f5f5);

box-shadow: rgba(0, 0, 0, 0.4) 0px 2px 4px,
            rgba(0, 0, 0, 0.3) 0px 7px 13px -3px,
            rgba(0, 0, 0, 0.2) 0px -3px 0px inset;

&:hover {
    transform: translateY(40px) scale(1.3);
    transition: transform 0.9s cubic-bezier(.68,0,0,1.38);
    z-index: 100;
}
`;

//////----최현섭작품----width: inherit;/추가///
const Outerdiv = styled.div`
border-radius: 30px;
margin-top: 0.5vh;
position: absolute;
width: inherit;
z-index: ${(props) => 
    props.canwearouter
    ? 3
    : 2

};
`;

//////----최현섭작품----width: inherit;/추가///
const Topdiv = styled.div`
border-radius: 30px;
margin-top: 0.5vh;
position: absolute;
width: inherit;
z-index: ${(props) => 
    props.canwearouter
    ? 2
    : 3
};
`;

//////----최현섭작품----width: inherit;/추가///
const BottomDiv = styled.div`
border-radius: 30px;
position: absolute;
margin-top: -5vh;
z-index:1;
top: 40vh;
width: inherit;
`;

const ItemWrapper = styled.div`

`;

const RightBoardWr = styled.div`
`;

const LeftBoardWr = styled.div`
display: flex;
justify-content: center;


`;

const ChangeButtonA = styled.button`
margin-top: 50px;
padding-left: 15px;
display: flex;
align-items: center;
justify-content: flex-start;
outline: none;
cursor: pointer;
width: 150px;
height: 50px;
border-radius: 30px;
border: 1px solid #8F9092;
transition: all 0.2s ease;
font-family: "Source Sans Pro", sans-serif;
font-size: 14px;
font-weight: 600;
color: #606060;
text-shadow: 0 1px #fff;
text-aline: left;
color: #606060;


&:hover {
  color: #2196f3;
  box-shadow: 0 4px 3px 1px #FCFCFC, 0 6px 8px #D6D7D9, 0 -4px 4px #CECFD1, 0 -6px 4px #FEFEFE, inset 0 0 3px 3px #CECFD1;
}

&:active {
  box-shadow: 0 4px 3px 1px #FCFCFC, 0 6px 8px #D6D7D9, 0 -4px 4px #CECFD1, 0 -6px 4px #FEFEFE, inset 0 0 5px 3px #999, inset 0 0 30px #aaa;
}
&:focus {
  z-index: -2;
  transform: translateX(-2px);
  color: #2196f3;
  box-shadow: 0 4px 3px 1px #FCFCFC, 0 6px 8px #D6D7D9, 0 -4px 4px #CECFD1, 0 -6px 4px #FEFEFE, inset 0 0 5px 3px #999, inset 0 0 30px #aaa;
}
`;


/* hover */

const ChangeButton = styled.span`
width: 110px;
height: 17px;
`;


const Grap = styled.div`
background-color: rgba( 255, 255, 255, 0 );
color: #d2d4d5;
height: 10px;
text-align: center;
}
${CardWrapper}:hover & {
    transition: 0.5s ease-in;
    height: 30px;

    background: rgba( 0, 100, 255, 0.5 );
    box-shadow: 0 2px 4px 0 rgba( 31, 38, 135, 0.37 );
    backdrop-filter: blur( 2.5px );
    -webkit-backdrop-filter: blur( 2.5px );
    border: 0px;
    color: #fff;
  }
`;
const GrapMark = styled.div`
font-size: 12px;
padding-top: 10px;
color: #fff;
${CardWrapper}:hover & {
  height: 27px;
  margin-left: auto;
  margin-bottom: -10px;
  background-image: url(${Mark});
  background-size: 15px;
  color: #444;
}

`;



const InfoWrapper = styled.div`
width: 160px;
height: 65px;
margin-top: -69px;

border-radius: 8px;
background: rgba( 255, 255, 255, 0.3 );
backdrop-filter: blur( 5px );
border: 1px solid rgba( 255, 255, 255, 0.5 );

margin-left: auto;
margin-right: auto;

${CardWrapper}:hover & {
    transition: 0.5s ease-out;
    background: rgba( 255, 255, 255, 0 );
    backdrop-filter: none;
    border: 0px;
  }

display: ${(props) => 
    props.isDragging
    ? "none"
    : null

};
`;
const Info = styled.div`
padding-left: 15px;
padding-top: 4px;
padding-bottom: 4px;
font-weight: 400;
font-size: 15px;
letter-spacing: 2px;
line-height: 17px;
color: #000;
${CardWrapper}:hover & {
    transition: 0.5s ease-out;
    transform: translateY(-33px);
  }
`;


const Wr = styled.div`
background-color: #f7f9fa;

border-radius: 30px;
box-shadow: inset 2px 2px 6px #d2d4d5,
            inset -2px -2px 6px #ffffff;

display: flex;
flex-direction: row;
flex-wrap: wrap;
width: 96.5vh;
height: 63.5vh;
overflow-x: hidden;
transition: all 250ms;

${CardWrapper}:hover {
  background-color: #000;
}
::-webkit-scrollbar{
  width: 30px;
}
::-webkit-scrollbar-thumb{
  height: 55px;
	border-radius: 15px;
  box-shadow: 3px 3px 6px 0px rgb(145 192 255 / 70%),
              inset -12px -12px 16px 0px rgb(145 192 255 / 70%),
              inset 0px 11px 28px 0px rgb(145 192 255 / 70%);
  background: #fff;
}

::-webkit-scrollbar-track{
  width: 10px;
	-webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
	background-color: #F5F5F5;
}
`;

const WrJunior = styled.div`
  width: 30px;
  height: 30px;
	border-radius: 15px;
  background-color: #fff;
  box-shadow: 3px 3px 6px 0px rgb(255 0 111 / 70%),
              inset -12px -12px 16px 0px rgb(255 255 255 / 70%),
              inset 0px 11px 28px 0px rgb(255 0 111 / 70%);
  opacity: 0.5;
  rihgt: 5px;
  margin-left: auto;
  margin-bottom: -30px;
  animation: ${bounce} 3s cubic-bezier(.49,0,.49,1.49) infinite alternate;
`;


const Area = styled.div`
flex-grow: 1;
border-radius: 30px;
`;


const TwoBoardWrapper = styled.div`
margin-top: 12px;
width: 100%;
`;



//////style end

function Fitting() {
  const dataURLtoBlob = (dataurl) => {
    var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
        bstr = window.atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
    while(n--){
        u8arr[n] = bstr.charCodeAt(n);
    }
    return new Blob([u8arr], {type:mime});
}
    const LoggedInUser = useLoggedInUser();
    const ShowTop = useReactiveVar(ShowTopVar);
    const ShowBottom = useReactiveVar(ShowBottomVar);
    const ShowOuter = useReactiveVar(ShowOuterVar);
    const iswearouter = useReactiveVar(wearOuterVar);
    const navigate = useNavigate();
    const { register, handleSubmit, getValues, setError, clearErrors, formState: { errors, isValid}, watch } = useForm({ mode: "onChange"});
    const onCompleted = (DAta) => {
         const { makingLook: { ok, message }, } = DAta;
            if(ok === false) {
                return (setError("makingLookResult", { message }),
                        navigate(window.location.reload(),  alert(errors?.makingLookResult?.message))  );             
            }
            if(ok === true) {
            navigate(`/profile/${LoggedInUser.nickname}`, alert("룩저장완료"));
            }
            if(loading) {
              return <Loader />
            }
        
    }
    const [ makingLook, ] = useMutation(MAKINGLOOK_MUTATION,{
      /*  context: {
            headers: {
              'apollo-require-preflight': true,
            },
          },*/
        onCompleted,    
    });
    let Topitem = {price:"0",image:a};
    let Bottomitem = {price:"0", image:b};
    let Outeritem = {price:"0", image:""};
    const {data: seeTopitemsdata, fetchMore, loading} = useQuery(SEETOPITEMS_QUERY);
    const {data: seeBottomitemsdata} = useQuery(SEEBOTTOMITEMS_QUERY);
    const {data: seeOuteritemsdata} = useQuery(SEEOUTERITEMS_QUERY);
    let ListTopitem = seeTopitemsdata?.seeTopitems.item;

    let ListBottomitem = seeBottomitemsdata?.seeBottomitems.item;

    let ListOuteritem = seeOuteritemsdata?.seeOuteritems.item;

    console.log({ListTopitem,ListBottomitem,ListOuteritem});
    //console.log(boxState);
    const Lookitems = { Topitem, Bottomitem, Outeritem }; 
    let Lookprice = "0"
    const [totalprice, settotalprice] = useState({Lookprice});
    const [boxState, setBoxState] = useState({Lookitems,ListTopitem,ListBottomitem,ListOuteritem});
    useEffect(() => {
        if(Lookprice) {
            settotalprice({Lookprice});
        }
    },[Lookprice]);
    useEffect(()=> {
        if(ListTopitem && ListBottomitem && ListOuteritem) {
            setBoxState({Lookitems,ListTopitem,ListBottomitem,ListOuteritem});
        }
    },[ListTopitem, ListBottomitem, ListOuteritem]);
    const onDragEnd = useCallback((DropResult) => {
       console.log(DropResult); 
           
        const { destination, source } = DropResult;
        if(!destination) return;
        if(destination.droppableId === source.droppableId) return;
        if(destination.droppableId !== source.droppableId && destination.droppableId === "Topitem"){
           const sourceBoard = [...boxState.ListTopitem];
           const removeObj = sourceBoard[source.index];
           //const oldDesObj = {...boxState.Lookitems.Topitem}
           const destinationObj = {...boxState.Lookitems[destination.droppableId]};
           const NewsourceBoard = Array.from(sourceBoard);
           NewsourceBoard.splice(source.index, 1, destinationObj)
           const Newdestination = Object.assign(destinationObj, removeObj);
           const NewLookitems = {
                   ...boxState.Lookitems,
                      Topitem:Newdestination,    
           }
           const ListBoard = NewsourceBoard;

           const Topprice = NewLookitems?.Topitem.price;
           const Bottomprice = NewLookitems?.Bottomitem.price;
           const Outerprice = NewLookitems?.Outeritem.price;
           const thrprice = parseInt(Topprice?.replace(/[^0-9]/g,"")) + parseInt(Bottomprice?.replace(/[^0-9]/g,"")) + parseInt(Outerprice?.replace(/[^0-9]/g,""))
           const total = `${thrprice}`


            setBoxState({Lookitems:NewLookitems,ListTopitem:ListBoard,ListBottomitem,ListOuteritem});
            settotalprice({Lookprice:total});
            console.log({Lookitems:NewLookitems,ListTopitem:ListBoard,ListBottomitem,ListOuteritem});
            console.log({Lookprice:total});
        }
        else if (destination.droppableId !== source.droppableId && destination.droppableId === "Bottomitem") {
           const sourceBoard = [...boxState.ListBottomitem];
           const removeObj = sourceBoard[source.index];
           const destinationObj = {...boxState.Lookitems[destination.droppableId]};
           const NewsourceBoard = Array.from(sourceBoard);
           NewsourceBoard.splice(source.index, 1, destinationObj);
           const Newdestination = Object.assign(destinationObj, removeObj);
           const NewLookitems = {
                   ...boxState.Lookitems,
                      Bottomitem: Newdestination,    
           }
           const ListBoard = NewsourceBoard;

           const Topprice = NewLookitems?.Topitem.price;
           const Bottomprice = NewLookitems?.Bottomitem.price;
           const Outerprice = NewLookitems?.Outeritem.price;
           const thrprice = parseInt(Topprice?.replace(/[^0-9]/g,"")) + parseInt(Bottomprice?.replace(/[^0-9]/g,"")) + parseInt(Outerprice?.replace(/[^0-9]/g,""))
           const total = `${thrprice}`


            setBoxState({Lookitems:NewLookitems,ListTopitem,ListBottomitem:ListBoard,ListOuteritem});
            settotalprice({Lookprice:total});
            console.log({Lookitems:NewLookitems,ListTopitem,ListBottomitem:ListBoard,ListOuteritem});
        }
        else if (destination.droppableId !== source.droppableId && destination.droppableId === "Outeritem") {
            const sourceBoard = [...boxState.ListOuteritem];
            const removeObj = sourceBoard[source.index];
            const destinationObj = {...boxState.Lookitems[destination.droppableId]};
            const NewsourceBoard = Array.from(sourceBoard);
            NewsourceBoard.splice(source.index, 1, destinationObj);
            const Newdestination = Object.assign(destinationObj, removeObj);
            const NewLookitems = {
                    ...boxState.Lookitems,
                       Outeritem: Newdestination,    
            }
            const ListBoard = NewsourceBoard;

            const Topprice = NewLookitems?.Topitem.price;
           const Bottomprice = NewLookitems?.Bottomitem.price;
           const Outerprice = NewLookitems?.Outeritem.price;
           const thrprice = parseInt(Topprice?.replace(/[^0-9]/g,"")) + parseInt(Bottomprice?.replace(/[^0-9]/g,"")) + parseInt(Outerprice?.replace(/[^0-9]/g,""))
           const total = `${thrprice}`
 
 
             setBoxState({Lookitems:NewLookitems,ListTopitem,ListBottomitem,ListOuteritem:ListBoard});
             settotalprice({Lookprice:total});
             console.log({Lookitems:NewLookitems,ListTopitem,ListBottomitem,ListOuteritem:ListBoard});
         }
        else return alert("드래그실패");
    },[boxState]
    );
    const handleScroll = useCallback(async () => {
        const scrollTop = document.body.scrollTop;
        const innerHeight = window.innerHeight;
        const scrollHeight = document.body.scrollHeight;

        if (seeTopitemsdata?.seeTopitems.lastitemid || seeBottomitemsdata?.seeBottomitems.lastitemid || seeOuteritemsdata?.seeOuteritems.lastitemid=== null ) {
            return;
        }
        if (scrollTop + innerHeight >= scrollHeight) {
            await fetchMore({ variables: { cursor: seeBottomitemsdata?.seeBottomitems.lastitemid} });
            await fetchMore({ variables: { cursor: seeTopitemsdata?.seeTopitems.lastitemid} });
            await fetchMore({ variables: { cursor: seeOuteritemsdata?.seeOuteritems.lastitemid} });
        }
    }, [fetchMore,seeBottomitemsdata?.seeBottomitems.lastitemid, seeTopitemsdata?.seeTopitems.lastitemid,seeOuteritemsdata?.seeOuteritems.lastitemid]);

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
      }, [handleScroll]);
      
      //////----최현섭작품----display/justifyContent/추가///
      useEffect(() => {
        document.body.style.overflow           = "auto";  
        document.body.style.display            = "flex";  
        document.body.style.justifyContent    = "center";

      }, []);
      //////----최현섭작품----///////
      if(loading) return <Loader />

      const onValid = () => {
        toast('🦄 저장중입니다 기다려 주세요!', {
          position: "top-right",
          autoClose: 8000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          });
        let img = null;
        const Border =document.getElementById("cap");
        const a = document.getElementById("a");
        const b = document.getElementById("b");
        const c = document.getElementById("c");
        Border.style.border = "none";
        Border.style.backgroundColor = "none";
        a.style.border = "none";
        b.style.border = "none";
        c.style.border = "none";       
        html2canvas(document.getElementById("cap"),{ 
            logging: true,
            useCORS: true,
            useOverflow: true,
            allowTaint: true,
            scale: 4,
            }).then((canvas) =>{ 
            img = canvas.toDataURL("image/png", 1.0); 
            const blob = dataURLtoBlob(img);
            const photo = new File([blob], "Look.png", {
                type: "image/png",
                lastModified: Date.now()
            });
           /* const fd = new FormData(document.getElementById("asd"));
            fd.set("Look", blob, "Look.png");     
            const photo = document.forms["asd"]["Look"].files[0];*/
            const title  = getValues("title");
            makingLook({ variables: { Topid:boxState?.Lookitems.Topitem.id, Btmid:boxState?.Lookitems.Bottomitem.id, Outerid:boxState?.Lookitems.Outeritem.id, title, totalPrice:`${totalprice.Lookprice}원`, lookimg:photo  }});      
        });
        

        //const title  = getValues("title");
        
       // makingLook({ variables: { Topid:boxState?.Lookitems.Topitem.id, Btmid:boxState?.Lookitems.Bottomitem.id, Outerid:boxState?.Lookitems.Outeritem.id, title, totalPrice:totalprice.Lookprice, lookimg:imgurl  }});
      }
    
    return (
      <TwoBoardWrapper>
        <Header />
        <DragDropContext onDragEnd={onDragEnd}>
            <div style={{display: "flex", justifyContent: "center", height: "900px"}}> 
            <LeftBoardWr>
            <ChangeButton>
            <ChangeButtonA onClick={wearTop}>상의입히기</ChangeButtonA>
            <ChangeButtonA onClick={wearOuter}>아우터입히기</ChangeButtonA>
            </ChangeButton>
                <LeftBoard id="cap">
                <Outerdiv canwearouter={iswearouter}>  
                <Droppable type="OUTER"  droppableId={Object.keys(boxState?.Lookitems)[2]}>
                    {(provided, snapshot) => (
                        <Area id="a" ref={provided.innerRef} {...provided.droppableProps}>  
                                               
                           <div style={{display: "flex", justifyContent: "center"}} >
                             <Draggable key={boxState?.Lookitems?.Outeritem.id + 1}  draggableId={boxState?.Lookitems?.Outeritem.id + "1"} index= {0} >
                                 {(provided, snapshot) =>(
                                 <div 
                                   ref={provided.innerRef}
                                   {...provided.draggableProps}
                                   style={boxState?.Lookitems?.Outeritem.id === 1 ? {display: "none"} : null}
                                 >
                                    <span style={{display: "none"}} {...provided.dragHandleProps} >drag</span>
                                    <ZoomimgOuter image={boxState?.Lookitems?.Outeritem.image}/>
                                    <InfoWrapper style={{display: "none"}} isDragging={snapshot.isDragging}  >
                                    <Info>{boxState?.Lookitems?.Outeritem.category}<br/>{boxState?.Lookitems?.Outeritem.price}<br/>{boxState?.Lookitems?.Outeritem.brand} </Info>
                                    </InfoWrapper>
                                 </div> 
                                 )}           
                              </Draggable>        
                            </div>                            
                            {provided.placeholder}
                        </Area>
                    )}
                 </Droppable>
                 </Outerdiv> 
                 <Topdiv  canwearouter={iswearouter}>
                 <Droppable type="TOP"  droppableId={Object.keys(boxState?.Lookitems)[0]}>
                    {(provided, snapshot) => (
                        <Area id="b" ref={provided.innerRef} {...provided.droppableProps}>

                            <div style={{display: "flex", justifyContent: "center"}} >
                             <Draggable key={boxState?.Lookitems?.Topitem.id + 1}  draggableId={boxState?.Lookitems?.Topitem.id + "1"} index= {0} >
                                 {(provided, snapshot) =>(
                                 <div 
                                   ref={provided.innerRef}
                                   {...provided.draggableProps}
                                   style={boxState?.Lookitems?.Topitem.id === 1 ? {display: "none"} : null}
                                 >
                                    <span style={{display: "none"}} {...provided.dragHandleProps} >drag</span>
                                    <ZoomimgTop image={boxState?.Lookitems?.Topitem.image}/>
                                    <InfoWrapper style={{display: "none"}} isDragging={snapshot.isDragging}  >
                                    <Info>{boxState?.Lookitems?.Topitem.category}<br/>{boxState?.Lookitems?.Topitem.price}<br/>{boxState?.Lookitems?.Topitem.brand} </Info>
                                    </InfoWrapper>
                                 </div> 
                                 )}
           
                              </Draggable>
        
                            </div>
                            
                            {provided.placeholder}
                        </Area>
                    )}
                 </Droppable>
                 </Topdiv>
                 <BottomDiv>
                 <Droppable type="BOTTOM" droppableId={Object.keys(boxState.Lookitems)[1]}>
                    {(provided, snapshot) => (
                        <Area id="c" ref={provided.innerRef} {...provided.droppableProps}>

                            <div style={{display: "flex", justifyContent: "center"}} >
                             <Draggable key={boxState?.Lookitems?.Bottomitem.id + 1}  draggableId={boxState?.Lookitems?.Bottomitem.id + "1"} index={0} >
                                 {(provided, snapshot) =>(
                                 <div 
                                   ref={provided.innerRef}
                                   {...provided.draggableProps}
                                   style={boxState?.Lookitems?.Bottomitem.id === 1 ? {display: "none"} : null}
                                 >
                                    <span style={{display: "none"}} {...provided.dragHandleProps} >drag</span>
                                    <ZoomimgBottom image={boxState?.Lookitems?.Bottomitem.image} style={{height: "47px"}}/>
                                    <InfoWrapper style={{display: "none"}} isDragging={snapshot.isDragging}  >
                                    <Info>{boxState?.Lookitems?.Bottomitem.category}<br/>{boxState?.Lookitems?.Bottomitem.price}<br/>{boxState?.Lookitems?.Bottomitem.brand} </Info>
                                    </InfoWrapper>
                                 </div> 
                                 )}
           
                              </Draggable>
        
                            </div>
                            
                            {provided.placeholder}  
                        </Area>
                    )}
                 </Droppable>
                 </BottomDiv>

                </LeftBoard>
                </LeftBoardWr>





                <RightBoardWr>
                  <WrJunior>
                    <div></div>                    
                  </WrJunior>
                <Category />
              { ShowTop ? (
                <Wr>
                <Droppable type="TOP" droppableId={Object.keys(boxState)[1]}>
                    {(provided, info) => (
                        <Wr ref={provided.innerRef} {...provided.droppableProps}>
                            {boxState?.ListTopitem?.map((item, index) => (
/* //////----최현섭작품----CardWrapper및 /display: "flex", justifyContent: "center"추가/// */
                                <CardWrapper key={item?.id}>
                                <div style={{display: "flex", justifyContent: "center"}} key={item?.id} >

                                 <Draggable key={item?.id} draggableId={item?.id + ""} index={index} >
                                 {(provided, snapshot) =>(
                                     <div 
                                       style={{display: "flex", justifyContent: "center"}}
                                       ref={provided.innerRef}
                                       {...provided.draggableProps}
                                       >
                                         <Grap style={snapshot.isDragging ? {display: "none"} : null} {...provided.dragHandleProps}><GrapMark>이곳을 잡아 드래그 해주세요</GrapMark></Grap>
                                         <Zoomimg image={item?.image}/>
                                         <InfoWrapper isDragging={snapshot.isDragging}  >
                                         <Info>{item.title}<br/>{item.price}<br/>{item.brand} </Info>
                                         </InfoWrapper>
                                    </div> 
                                 )}                   
                                 </Draggable>                
                                </div>
                                </CardWrapper>
                             ))}
                                {provided.placeholder}
                        </Wr>
                    )}
        
                </Droppable>
                </Wr>
              ) : ShowBottom ? (
                <Wr>
                <Droppable type="BOTTOM" droppableId={Object.keys(boxState)[2]}>
                    {(provided, info) => (
                        <Wr ref={provided.innerRef} {...provided.droppableProps}>
                            {boxState?.ListBottomitem?.map((item, index) => (
/* //////----최현섭작품----CardWrapper및 /display: "flex", justifyContent: "center"추가/// */
                                <CardWrapper key={item?.id}>
                                <div style={{display: "flex", justifyContent: "center"}} key={item?.id} >
                                 <Draggable key={item?.id} draggableId={item?.id + ""} index={index} >
                                 {(provided, snapshot) =>(
                                     <div 
                                       ref={provided.innerRef}
                                       {...provided.draggableProps}                      
                                    >
                                         <Grap style={snapshot.isDragging ? {display: "none"} : null} {...provided.dragHandleProps}><GrapMark>이곳을 잡아 드래그 해주세요</GrapMark></Grap>
                                         <Zoomimg image={item.image}/>
                                         <InfoWrapper isDragging={snapshot.isDragging}  >
                                         <Info>{item.title}<br/>{item.price}<br/>{item.brand} </Info>
                                         </InfoWrapper>
                                    </div> 
                                )}                   
                                </Draggable>                
                                </div>
                                </CardWrapper>
                             ))}
                                {provided.placeholder}
                        </Wr>
                    )}        
                </Droppable>
                </Wr>
              ) : ShowOuter ? (
                //아우터 데이터 띄우기 onDragEnd만들고 leftboard에서 outer 만들고 겹치기 구현 아우터 상의 z-index값바꾸는 버튼 2개만들기 
                //그리고 htmlcanvas랑 피드만드는 로직으로 피팅페이지 마무리
                <Wr>
                <Droppable type="OUTER" droppableId={Object.keys(boxState)[3]}>
                    {(provided, info) => (
                        <Wr ref={provided.innerRef} {...provided.droppableProps}>
                            {boxState?.ListOuteritem?.map((item, index) => (
/* //////----최현섭작품----CardWrapper및 /display: "flex", justifyContent: "center"추가/// */
                                <CardWrapper key={item?.id}>
                                <div style={{display: "flex", justifyContent: "center"}} key={item?.id} >
                                 <Draggable key={item?.id} draggableId={item?.id + ""} index={index} >
                                 {(provided, snapshot) =>(
                                     <div 
                                       ref={provided.innerRef}
                                       {...provided.draggableProps}                      
                                    >
                                         <Grap style={snapshot.isDragging ? {display: "none"} : null} {...provided.dragHandleProps}><GrapMark>이곳을 잡아 드래그 해주세요</GrapMark></Grap>
                                         <Zoomimg image={item.image}/>
                                         <InfoWrapper isDragging={snapshot.isDragging}  >
                                         <Info>{item.title}<br/>{item.price}<br/>{item.brand} </Info>
                                         </InfoWrapper>
                                    </div> 
                                 )}                   
                                 </Draggable>                
                                </div>
                                </CardWrapper>
                             ))}
                                {provided.placeholder}
                        </Wr>
                    )}        
                </Droppable>
                </Wr>
                
              ) : (
                <Wr>
                <Droppable type="TOP" droppableId={Object.keys(boxState)[1]}>
                    {(provided, info) => (
                        <Wr ref={provided.innerRef} {...provided.droppableProps}>
                            {boxState?.ListTopitem?.map((item, index) => (
/* //////----최현섭작품----CardWrapper및 /display: "flex", justifyContent: "center"추가/// */
                                <CardWrapper key={item?.id}>
                                <div style={{display: "flex", justifyContent: "center"}} key={item?.id} >
                                 <Draggable key={item?.id} draggableId={item?.id + ""} index={index} >
                                 {(provided, snapshot) =>(
                                     <div 
                                       ref={provided.innerRef}
                                       {...provided.draggableProps}                      
                                    >
                                         <Grap style={snapshot.isDragging ? {display: "none"} : null} {...provided.dragHandleProps}><GrapMark>이곳을 잡아 드래그 해주세요</GrapMark></Grap>
                                         <Zoomimg image={item.image}/>
                                         <InfoWrapper isDragging={snapshot.isDragging}  >
                                         <Info>{item.title}<br/>{item.price}<br/>{item.brand} </Info>
                                         </InfoWrapper>
                                    </div> 
                                 )}                   
                                 </Draggable>                
                                </div>
                                </CardWrapper>
                             ))}
                                {provided.placeholder}
                        </Wr>
                    )}        
                </Droppable>
                </Wr>
              )}
              <br />
              <ToastContainer />
              
              <Submitbox>
                <form id="asd" name="asd" onSubmit={handleSubmit(onValid)}>
                <IG>
                  <PriceBar {...register("totalPrice")} name="totalPrice" value={parseInt(totalprice.Lookprice).toLocaleString()} type="text" readOnly={true}/>
                  <PriceBarInfo>원</PriceBarInfo>
                  <TitleInput {...register("title",{
                                required:"룩이름을 입력하세요",
                                minLength: {
                                  value: 2,
                                  message:"2글자 이상은 입력해주세요."
                                }
                            })}
                                hasError={Boolean(errors?.email?.message)}
                                required=" "
                                name="title" 
                                type="text" 
                                         />
                      <Tlabel>룩의 이름은?</Tlabel>
                </IG>
                <input  {...register("Topid")} name="Topid" type="hidden" value={boxState?.Lookitems.Topitem.id || ""} required />
                <input  {...register("Btmid")} name="Btmid" type="hidden" value={boxState?.Lookitems.Bottomitem.id || ""} required />
                <input  {...register("Outerid")} name="Outerid" type="hidden" value={boxState?.Lookitems.Outeritem.id || "" } required /> 
                <SaveButton type="submit" value="SAVE">
                  <SAVEspan>
                  <div className="button" data-tooltip="클릭후 10초만 기다려 주세요">
                    <div className="button-wrapper">
                      <div className="text">저장하기</div>
                        <span className="icon">
                          <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" width="2em" height="2em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15V3m0 12l-4-4m4 4l4-4M2 17l.621 2.485A2 2 0 0 0 4.561 21h14.878a2 2 0 0 0 1.94-1.515L22 17"></path></svg>
                        </span>
                      </div>
                    </div>
                  </SAVEspan>
                </SaveButton>
                </form>
              </Submitbox>
              </RightBoardWr>






           </div>
           </DragDropContext>
           </TwoBoardWrapper>
    
    )


}
//export default DraggableCard;
export default React.memo(Fitting);





