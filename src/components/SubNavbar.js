import styled from "styled-components";
import { Link } from "react-router-dom";
import useLoggedInUser from "../hooks/useLoggedInUser";



const TopCategory = styled.div`
  box-sizing: border-box;
  width: 1244px;
  height: 60px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  overflow: hidden;
  position: relative;
  margin-bottom: 10px;
  a{
    box-sizing: border-box;
    width: auto;
    white-space: pre;
    position: relative;
    font-weight: 700;
    font-family: "Noto Sans KR", sans-serif;
    color: #000;
    font-size: 16px;
    letter-spacing: -.1px;
    line-height: 1.2;
    cursor: pointer;
    padding: 5px 15px;
    border-radius: 35px;
    border: 1px solid rgb(194 194 194 / 30%);

    &:hover{
      color: #0239FF;
      background-color: rgb(178 195 255 / 30%);
      border-radius: 24px;
      transition-property: background-color;
      transition-duration: 0.3s;

    }

    p{    
      font-size: 14px;
      font-weight: 400;
      letter-spacing: -.21px;
      color: rgba(34,34,34,.5);

    }
  }
  
  @media all and (max-width:767px) {
    box-sizing: border-box;
    width: 95vw;
    height: 75px;
    flex-direction: column-reverse;
    flex-wrap: wrap;
    align-items: flex-end;
    a {
      font-size: 12px;
      margin-right: 10px;
      background-color: rgba(0,0,0,0.05);
      border-radius: 24px;
      padding: 7px 13px;
      border-radius: 35px;
      border: none;

      p{    
        font-size: 9px;
      }


    ::-webkit-scrollbar {
        display: none;
    }
  }
`;

const CategoryNav = styled.div`
  width: 800px; /* 543px */
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  overflow: hidden;
  position: relative;

  @media all and (max-width:767px) {
    width: 95vw;
    overflow: scroll;
    #fitting{
      display: none;
    }
    ::-webkit-scrollbar {
        display: none;
    }
  }

`;

const Outlink = styled.div`
  box-sizing: border-box;
  width: auto; /* 280px */
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  overflow: hidden;
  position: relative;
  border-radius: 35px;
  border: 1px solid rgb(194 194 194 / 30%);

  svg{
    display: none;
  }

  a{
    border-radius: 0px;
    border: none;
    border-right: 1px solid rgb(194 194 194 / 30%);

    &:last-child {
      border-right: none;
    }
    &:hover{
      color: #0239FF;
      background-color: rgb(178 195 255 / 30%);
      border-radius: 0px;
      transition-property: background-color;
      transition-duration: 0.3s;

    }
  }

  @media all and (max-width:767px) {    
    width: 100%;
    height: min-content;
    overflow: scroll;
    border: none;
    border-radius: 0px;
    justify-content: center;
    svg{
      display: inline-block;
    }
    svg > a{
      display: inline-block !important;
    }
    a {
      margin-right: 0px;
      display: none;

    ::-webkit-scrollbar {
        display: none;
    }
  }
`;

const SubNavbar = () => {

    const loggedInUser = useLoggedInUser();

    return (
      <TopCategory>
        <CategoryNav>
          <Link id="fitting" to={"/fitting"}>Fitting Session
            <p> 피팅하러 가기</p></Link>
          <Link id="items" to={"/items"}>Item Session
            <p> 스토어</p></Link>
          <a href="https://blog.naver.com/PostList.naver?blogId=sticker_platform&from=postList&categoryNo=11" >Explore Styles
            <p> 매거진</p></a>
          <Link id="feeds" to={"/feeds"}>Essential Styles
            <p> 인기피드</p></Link>
          <Link id="profile" to={`/profile/${loggedInUser?.nickname}`}>OPEN Drawer
            <p> 내 옷장</p></Link>
        </CategoryNav>
        <Outlink>
          <svg xmlns="http://www.w3.org/2000/svg" height="24.58" viewBox="0 0 271.524 34.58">
            <path d="M372.588,1.22V7.734H358.641v6.44h13.428v5.991H358.641V26.6h13.947V33.12H352.411V1.22Z" transform="translate(-148.724 -0.515)" fill="#0034f6"/>
            <path d="M11.211,33.206a13.945,13.945,0,0,1-4.056-.592,15.013,15.013,0,0,1-3.691-1.687H3.51a13.855,13.855,0,0,1-2.188-1.685Q.366,28.33,0,27.92l4.74-4.375a6.486,6.486,0,0,0,1.025.979,12.442,12.442,0,0,0,1.618,1.094,11.932,11.932,0,0,0,1.914.888,5.546,5.546,0,0,0,1.914.365,6.771,6.771,0,0,0,1.55-.183,4.752,4.752,0,0,0,1.412-.57,3.2,3.2,0,0,0,1.049-1.025,2.9,2.9,0,0,0,.409-1.595,1.613,1.613,0,0,0-.25-.8,3.661,3.661,0,0,0-.865-.933A10.263,10.263,0,0,0,12.807,20.7a28.182,28.182,0,0,0-2.736-1.208,35.229,35.229,0,0,1-3.555-1.572,12.306,12.306,0,0,1-2.848-1.984,8.138,8.138,0,0,1-1.868-2.6A8.094,8.094,0,0,1,1.14,9.964,9.243,9.243,0,0,1,1.869,6.3,8.628,8.628,0,0,1,3.943,3.334a9.622,9.622,0,0,1,3.236-1.96,11.946,11.946,0,0,1,6.79-.387,20.937,20.937,0,0,1,2.712.821A17.813,17.813,0,0,1,19.163,2.97,11.641,11.641,0,0,1,21.1,4.314L17.181,9.236q-.867-.591-1.777-1.095a14.412,14.412,0,0,0-1.777-.774A5.961,5.961,0,0,0,11.575,7a5.133,5.133,0,0,0-2.985.752A2.487,2.487,0,0,0,7.52,9.919a1.913,1.913,0,0,0,.387,1.163,4.052,4.052,0,0,0,1.049.957,9.331,9.331,0,0,0,1.526.8q.865.367,1.823.684a33.611,33.611,0,0,1,4.6,2.12,12.929,12.929,0,0,1,3.008,2.278,7.193,7.193,0,0,1,1.617,2.6,9.2,9.2,0,0,1,.479,3.03,8.9,8.9,0,0,1-.82,3.782A9.434,9.434,0,0,1,18.935,30.4a10.663,10.663,0,0,1-3.418,2.05,12.041,12.041,0,0,1-4.307.752" transform="translate(0 -0.282)" fill="#0034f6"/>
            <path d="M92.611,7.554h-8.75V33.12H77.527V7.554H68.686V1.22H92.611Z" transform="translate(-28.987 -0.515)" fill="#0034f6"/>
            <rect width="6.29" height="31.9" transform="translate(83.725 0.195)" fill="#0034f6"/>
            <path d="M280.822,22.866V33.119h-6.288V1.219h6.288V13.3L291.667,1.219h8.522l-13.306,14.9,14.217,17h-8.248l-10.208-12.3" transform="translate(-115.858 -0.515)" fill="#0034f6"/>
            <path d="M450.413,33.12h-7.748l-8.659-12.167h-3.827V33.12H423.89V1.22h12.9a9.372,9.372,0,0,1,3.783.774,10.069,10.069,0,0,1,3.121,2.119,10.393,10.393,0,0,1,2.142,3.122,9.252,9.252,0,0,1,.8,3.829,9.724,9.724,0,0,1-1.55,5.4A9.388,9.388,0,0,1,441.024,20ZM435.6,14.664a5.055,5.055,0,0,0,3.555-1.071,3.367,3.367,0,0,0,1.139-2.529,3.226,3.226,0,0,0-1.139-2.484A5.2,5.2,0,0,0,435.6,7.554h-5.423v7.11Z" transform="translate(-178.889 -0.515)" fill="#0034f6"/>
            <path d="M205.579,46.355a16.941,16.941,0,0,1-16.922-16.922V27.9L215.41,42.984l-1.2.811a15.122,15.122,0,0,1-8.632,2.56" transform="translate(-79.616 -11.775)" fill="#0034f6"/>
            <path d="M231.089,27.728a4.223,4.223,0,0,0-4.083,3,6.792,6.792,0,0,1-1.367,2.576l-.7.819,8.6,4.963.464-.709a18.381,18.381,0,0,0,3.016-9.755v-.9Zm1.852,8.949-5.3-3.06a8.7,8.7,0,0,0,1.088-2.4,2.427,2.427,0,0,1,2.361-1.7h4.1a17.044,17.044,0,0,1-2.25,7.159" transform="translate(-94.928 -11.702)" fill="#0034f6"/>
            <path d="M214.824,2.267a16.927,16.927,0,0,0-24,7.935l-.317.732,8.965,5.176.318-1.1A6.839,6.839,0,0,1,209.779,11l.776.449L215.6,2.715Zm-4.947,6.775a8.631,8.631,0,0,0-11.418,4.415l-5.652-3.264a15.138,15.138,0,0,1,20.332-6.8Z" transform="translate(-80.399)" fill="#0034f6"/>
          </svg>


          <a href="https://www.second.sticker.ooo/company">Stickers.inc
            <p> 스티커스 소개</p></a>
          <a href="https://www.second.sticker.ooo/account/my-orders">Delivery
            <p> 배송문의</p></a>
          <a href="https://www.second.sticker.ooo/promotions">Promotions
            <p> 이달의 혜택</p></a>
        </Outlink>
        
      </TopCategory>
    );
};


export default SubNavbar;