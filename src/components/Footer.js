import styled from "styled-components";
import Logo from "../img/stickers_inc_logo.png";
import SubNavbar from "./SubNavbar"

const Footerspace = styled.div`
   width: 1244px;


   background-color: #fff;
   position: relative;
   bottom : ;

   font-size: 14px;
   line-height: 30px;
   font-weight: 500;

   display: flex;
   flex-wrap: wrap;
   justify-content: center;
   padding: 0 10% 0 10%;
   svg{
    display: none;
   }

   @media all and (max-width:767px) {
    width: 100vw;
    overflow: hidden;
  }
`;

const Footer2 = styled.div`
    width: 40%;
    text-align: left;
    padding: 2%;  
    span{
        font-size: 12px;
        line-height: 1.1;
    }

    @media all and (max-width:767px) {
        width: 100vw;
        span{
            font-size: 12px !important;
            font-weight: 400 !important;
            line-height: 1.1 !important;
        }
    }

    `;

const Footer3 = styled.div`
    width: 50%;
    float: right;
    padding: 2%;
    padding-left: auto;

    @media all and (max-width:767px) {
        width: 100vw;
        display: flex;
        align-items: center;
        justify-content: flex-start;
        flex-wrap: wrap;
        text-align: center;
    }

    `;

const Footer4 = styled.div`
    width: 76%;
    font-weight: 300;
    text-align: center;
    padding: 2%;  
    span{
        font-size: 15px;
        line-height: 80px;
    }

    @media all and (max-width:767px) {
        width: 100%;
        text-align: left;
        margin-bottom: 60px;
            span{
                font-size: 12px;
                line-height: 1.1;
            }
    }
    `;

const FooterLogo = styled.img`
    width: 188px;
    float: left;
    margin-right: 30px;
    @media all and (max-width:767px) {
        height: 140px;
        width: auto;
        margin: 40px auto;
    }
`;

   const Footer = () => {
       return (
           <Footerspace>
            <SubNavbar/>
            <Footer2>
                <span>주식회사 스티커스 (STICKERS.inc)</span><br/>

                <span>서울특별시 중구 퇴계로36길 2 동국대학교 충무로영상센터 본관 421호</span><br/>

                <span>사업자등록번호 : 182-81-02385</span><br/>

                <span>통신판매업신고 : 2022-서울중구-1985</span><br/>

                <span>대표 및 개인정보관리책임자 : 최현섭 (<a data-auto-recognition="true" href="mailto:cs_manager@sticker.ooo">cs_manager@sticker.ooo</a>) </span><br/>

                <span>호스팅사업자 : (주)스티커스</span><br/>

            </Footer2>
            <Footer3>
                <FooterLogo src={Logo}></FooterLogo><br/>
                <span> 고객센터전화 : 010-4494-6953 </span><br/>
                <span> (월 - 금 11AM ~ 6PM) </span><br/>
                <span> Email : cs_manager@sticker.ooo </span><br/>
            </Footer3>
            <Footer4>
                <span>스티커 내 아이템, 룩, 피팅데이터 등 스티커 자체 생성 콘텐츠는 스티커스 및 스티커스 계약업체에 저작권이 있습니다.&nbsp; <br/>
                이러한 콘텐츠는 출처를 밝히고(스티커 표기 및 <a data-auto-recognition="true" href="http://www.sticker.ooo" target="_blank">www.sticker.ooo</a> 
                링크 포함 필수) 비상업적인 용도에서만 활용하실 수 있습니다.&nbsp;</span><br/><br/>
                
                <span>COPYRIGHT (C) STICKERS.inc ALL RIGHTS RESERVED.</span><br/>
                
                <span>&nbsp;<a href="https://www.second.sticker.ooo/privacy"
                            target="_blank">개인정보처리방침</a>&nbsp;&nbsp;</span>
                <span>&nbsp;&nbsp;<a href="https://www.second.sticker.ooo/terms-of-use"
                                      target="_blank">​서비스 이용약관</a>&nbsp;</span>
            </Footer4>
           </Footerspace>
       );
   };

   export default Footer;