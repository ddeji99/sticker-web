import styled, { keyframes } from "styled-components";
import React, {useCallback, useState, useEffect, useRef, Component } from 'react';
import Slider from "react-slick";

import MBanner01 from "../../img/MobileBannerImg/MBanner01.jpg";
import MBanner02 from "../../img/MobileBannerImg/MBanner02.jpg";
import MBanner03 from "../../img/MobileBannerImg/MBanner03.jpg";
import MBanner04 from "../../img/MobileBannerImg/MBanner04.jpg";
import MBanner05 from "../../img/MobileBannerImg/MBanner05.jpg";
import MBanner06 from "../../img/MobileBannerImg/MBanner06.jpg";



const BannerBody = styled.div`
  display: none;

  @media all and (max-width:767px) {
    display: inline-block;
    background-color: #666;
    margin-bottom: 24px;
  }
`;

const MainSliderArea = styled.div`
  width: 100vw;
  height: 100vw;
  position: relative;
  overflow: hidden;
`;

const BannerSlider = styled(Slider)`
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 2;
`;
    
  const BannerCard = styled.div`
    width: 100vw;
    height: 100vw;
    display:flex;
    align-items: flex-end;
    position: relative;
  `;
    
    const CardInfo = styled.div`
      position:absolute;
      bottom: 0px;
      width: 95vw;
      height: 185px;
      margin: 0 0;
      overflow: hidden;
      padding: 25px 2.5vw;
      background-image: linear-gradient(to top,#0037ff3d ,#ffffff00);
  

      h1, span {
          color: #fff;
          letter-spacing: .25px;
          line-height: 30px;
          text-shadow: 0 2px 10px rgb(0 0 0 / 20%);
      }

      h1 {
          height: 160px;
          line-height: 70px;
          font-size: 48px;
          font-weight: 600;
          border-bottom: 1px solid #fff;
          margin-bottom: 5px;
      }

      span {
          font-size: 16px;
          font-weight: 400;
      }

    `;

const BannerImgSlider = styled(Slider)`
  position: absolute;
  width: 100%;
  height: 100%;
`;

  const BigImg = styled.div`
    width: 100vw;
    height: 100vw;
    img{
      width: 100vw;
      object-fit: cover;
    }
  `;

    


function MobileMainBanner() {
  
  const [nav1, setNav1] = useState();
  const [nav2, setNav2] = useState();
  const slider1 = useRef(null);
  const slider2 = useRef(null);
  
  useEffect(() => {
    setNav1(slider1.current);
    setNav2(slider2.current);
  }, []);

  return (
  
      <BannerBody>
        <MainSliderArea>
          <BannerSlider className="BannerSlider"
                asNavFor={nav2} 
                ref={slider1}
                slidesToShow={1}
                lazyLoad ={false}
                swipeToSlide={true}
                touchThreshold={100}
                infinite = {true}
                >
                
              <BannerCard >
                <CardInfo>
                  <h1>Winter-Spring 아우터 피드</h1>
                  <span>올 겨울부터 봄까지 유저들의 픽!</span>
                </CardInfo>
              </BannerCard>
                
              <BannerCard>
                <CardInfo>
                  <h1>Fur Trend</h1>
                  <span>러블리하게 완성하는 따뜻한 겨울</span>
                </CardInfo>
              </BannerCard>
                
                <BannerCard>
                  <CardInfo>
                    <h1>Standard Collection</h1>
                    <span>어떤 스타일에도. 기본에 충실한 아이템</span>
                  </CardInfo>
                </BannerCard>
                
                <BannerCard>
                  <CardInfo>
                    <h1>룩으로 구매하면 무조건. 무료 반품</h1>
                    <span>맘놓고 구경하세요. 사이즈는 입어보고 반품.</span>
                  </CardInfo>
                </BannerCard>
                
                <BannerCard>
                  <CardInfo>
                    <h1>Knit 인기 피드</h1>
                    <span>올 겨울도. 내년 가을도. 유저들의 픽!</span>
                  </CardInfo>
                </BannerCard>

                <BannerCard>
                  <CardInfo>
                    <h1>화려한 조명사이, 돋보이는 코디</h1>
                    <span>과감한 스타일. 스타일링만 해보ㅘ요</span>
                  </CardInfo>
                </BannerCard>
          </BannerSlider>
          
          <BannerImgSlider className="BannerImgSlider"
                asNavFor={nav1}
                ref={slider2}
                slidesToShow={1}
                touchThreshold={100}
                infinite = {true}
                fade = {true}
              >
              <BigImg >
                    <img src={MBanner01}/>
              </BigImg>
              
              <BigImg >
                    <img src={MBanner02}/>
              </BigImg>
              
              <BigImg >
                    <img src={MBanner03}/>
              </BigImg>

              <BigImg >
                    <img src={MBanner04}/>
              </BigImg>

              <BigImg >
                    <img src={MBanner05}/>
              </BigImg>

              <BigImg >
                    <img src={MBanner06}/>
              </BigImg>

          </BannerImgSlider>
        </MainSliderArea>
      </BannerBody>
    );
}

export default MobileMainBanner;