import styled from "styled-components";
import Logo from "../img/stickers_inc_logo.png";

const Footerspace = styled.div`
   min-width: 100%;

   background-color: #fff;
   position: relative;
   bottom : 0;

   font-size: 14px;
   line-height: 30px;
   font-weight: 500;

   display: flex;
   flex-wrap: wrap;
   justify-content: flex-start;
   padding: 0 10% 0 10%;

   @media (pointer:coarse) {
    font-size: 25px;
    line-height: 80px;
    padding: 0;
   }
   
    a{
        text-decoration: underline;
    }
    
   `;

const Footer2 = styled.div`
    width: 40%;
    text-align: left;
    padding: 2%;  
    

    `;

const Footer3 = styled.div`
    width: 50%;
    float: right;
    padding: 2%;
    padding-left: auto;

    @media (pointer:coarse) {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    flex-wrap: wrap;
    }

    `;

const Footer4 = styled.div`
    width: 76%;
    font-weight: 300;
    text-align: center;
    padding: 2%;  

    @media (pointer:coarse) {
    width: 100%;
    text-align: left;
    span{
        font-size: 15px;
        line-height: 80px;
    }
    }
    `;

const FooterLogo = styled.img`
    width: 188px;
    float: left;
    margin-right: 30px;
    @media (pointer:coarse) {
        height: 140px;
        width: auto;
        margin-right: 0px;
    }
`;

   const Footer = () => {
       return (
           <Footerspace>
            <Footer2>
                <span>주식회사 스티커스 (STICKER.inc)</span><br></br>

                <span>서울특별시 중구 퇴계로36길 2 동국대학교 충무로영상센터 본관 421호</span><br></br>

                <span>사업자등록번호 : 182-81-02385</span><br></br>

                <span>통신판매업신고 : -</span><br></br>

                <span>대표 및 개인정보관리책임자 : 최현섭(<a data-auto-recognition="true" href="mailto:cs_manager@sticker.ooo">cs_manager@sticker.ooo</a>) </span><br></br>

                <span>호스팅사업자 : (주)스티커스</span><br></br>

            </Footer2>
            <Footer3>

                <FooterLogo src={Logo}></FooterLogo><br></br>
                <span>고객센터전화 : 010-4494-6953</span><br></br>

                <span>(월 - 금 11AM ~ 6PM)<br ></br>
                Email : cs_manager@sticker.ooo</span><br></br>

            </Footer3>
            <Footer4>
                <span>스티커 내 아이템, 룩, 피팅데이터 등 스티커 자체 생성 콘텐츠는 스티커스 및 스티커스 계약업체에 저작권이 있습니다.&nbsp; <br></br>
                이러한 콘텐츠는 출처를 밝히고(스티커 표기 및 <a data-auto-recognition="true" href="http://www.sticker.ooo" target="_blank">www.sticker.ooo</a> 
                링크 포함 필수) 비상업적인 용도에서만 활용하실 수 있습니다.&nbsp;</span><br></br><br></br>
                
                <span>COPYRIGHT (C) STICKERS.inc ALL RIGHTS RESERVED.</span><br></br>
                
                <span>&nbsp;<a href="https://www.info.sticker.ooo/privacy"
                            target="_blank">개인정보처리방침</a>&nbsp;&nbsp;</span>
                <span>&nbsp;&nbsp;<a href="https://www.info.sticker.ooo/terms-of-use"
                                      target="_blank">​서비스 이용약관</a>&nbsp;</span>
            </Footer4>
           </Footerspace>
       );
   };

   export default Footer;