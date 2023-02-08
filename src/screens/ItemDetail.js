import React, {useCallback, useState, useEffect, useRef } from 'react';
import styled from "styled-components";
import Header from "../components/Header";
import { Link, useNavigate, useMatch, useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { SEEITEM_QUERY } from '../Documents/Query/SEEITEM_QUERY';
import { SEERELATIONFEED_QUERY } from '../Documents/Query/SEERELATIONFEED_QUERY';

import OrderConditions from '../components/Shared/OrderConditions';
import Footer from "../components/Footer";
import SubNavbar from "../components/SubNavbar"
import CartIcon from '../components/Feed/CartIcon';
import CartIcon2 from '../components/Feed/CartIcon2';
import ItemCard from '../components/Aircloset/ItemCard';

import AboutThumb1 from "../img/fs_deliver.jpg";
import AboutThumb2 from "../img/df_deliver.jpg";
import AboutThumb3 from "../img/Cl_deliver.jpg";

import Masonry, {ResponsiveMasonry} from "react-responsive-masonry"






const Container = styled.div`
    overflow: hidden;
`;

const Wrapper = styled.div`    
    width: 1244px;

    position: relative;
    margin: 0 auto;
    padding-top: 60px;

    display: flex;
    flex-direction: column;
    align-content: center;
    align-items: center;
    font-family: "Noto Sans KR", sans-serif;

    .MobileInfo{
        display: none;
    }

    @media all and (max-width:767px) {
        width: 100%;
        padding-top: 15px;
        .MobileInfo{
            display: block;
            
            & > div{
                display: block;
            }
        }
    }

`;

const ItemContant = styled.div`
    width: 1244px;
    display: flex;
    margin-top: 20px;
    @media all and (max-width:767px) {
        width: 100%;
        height: max-content;
        margin-top: 0px;
        flex-direction: column;
        align-items: center;
    }
`;

const ItemDetail1 = styled.div` 
    width: 612px;
    
    padding:10px auto;

    .OutLink{
        display: flex;
        align-items: center;
        padding: 5px 10px;
        border-radius: 10px;
        background-color: #fff;
        box-shadow: 0 5px 15px rgb(0 0 0 / 5%);
        position: absolute;
        top: 15px;
        right: 15px;
        svg{
            width: 24px;
            height: 24px;
            margin-left: 5px;
            clip-rule: evenodd;
            fill-rule: evenodd;
            stroke-linejoin: round;
            stroke-miterlimit: 2; 
        }
    }
    @media all and (max-width:767px) {
        width: 95vw;
        margin-bottom: 30px;
        padding-bottom: 20px;
        border-bottom: 10px #f2f2f2 solid;

        .OutLink{
            padding: 5px 10px;
        }
    }
`;

const RelatedFeed = styled.div` 
    width: 632px;
    height: 1345px;
    padding-left: 20px;
    border-left: 1px solid #ebebeb;
    border-right: 1px solid #ebebeb;
    overflow: scroll;
    overflow-x: hidden;
    overflow-y: scroll;

    ::-webkit-scrollbar {
        display: none;
    }

    .RelatedFeedTitle{
        h2{
            display: inline-block;
            vertical-align: top;
            line-height: 19px;
            padding-top: 1px;
            margin-bottom: 9px;
            font-size: 18px;
            letter-spacing: -.27px;
            font-weight: 800;
            border-bottom: 2px solid #222;
        }
    
        p{
            margin-bottom: 10px;
            font-size: 14px;
            font-weight: 400;
            letter-spacing: -.15px;
            color: rgba(34,34,34,.5);
        }
    }

    @media all and (max-width:767px) {
        width: 97vw;
        padding-left: 0px;
        border-left: 0px solid #ebebeb;
        border-right: 0px solid #ebebeb;
        height: max-content;
        .RelatedFeedTitle{
            padding-left: 2.5vw;
        }
    }
`;

// ---- 좌측 아이템 이미지 슬라이더 섹션 ---- //
const TopDetail = styled.div`
    height: 580px;
    width: 580px;
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow: hidden;
    border-radius: 20px;
    position: relative;

    img {
        object-fit: contain;
        height: 100%;
    }

    @media all and (max-width:767px) {
        width: 100vw;
        height: auto;
        margin-left: -2.5vw;
        overflow: visible;
        aspect-ratio: 1/1;
    }
`;
    const DetailMainTitle = styled.div`
        width: 500px;
        height: 80px;
        padding: 10px 25px;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        background-color: #fff;
        border-radius: 10px;
        position:absolute;
        bottom: 15px;
        cursor: default;
        .Collect > span{
            font-size: 14px !important;
        }
        svg{
            width: 28px !important;
            height: auto !important;
        }

        @media all and (max-width:767px) {
            width: calc(95vw - 40px);
            padding: 10px 20px;
            bottom: -80px;
            box-shadow: 0 5px 15px rgb(0 0 0 / 5%);
        }
    `;

        const TitleBoxText = styled.div`
            height: 80px;
            font-family: "Noto Sans KR", sans-serif;
            a{    
                width: 420px;
                margin-bottom: 5px;

                display: block;
                text-overflow: ellipsis;
                display: -webkit-box;
                -webkit-line-clamp: 2;
                -webkit-box-orient: vertical;
                word-break: keep-all;
                overflow: hidden;

                line-height: 1.3;
                font-size: 18px;
                letter-spacing: -.27px;
                font-weight: 400;    
            }
            p, span {
                font-size: 22px;
                letter-spacing: -.27px;
                font-weight: bold;    
            }

            @media all and (max-width:767px) {
                margin-right: 10px;
                    a{    
                        width: 100%;  
                }
            }

        `;

// ---- 좌측 아이템 이미지 슬라이더 끝 ---- //


// ---- 좌측 아이템 텍스트 섹션 ---- //
const ColumTop = styled.div`
    width:580px;
    margin-top: 25px;

    @media all and (max-width:767px) {
        width: 95vw;
        margin-top: 120px;
    }
`;

    const DetailMainInfo = styled.div`
        width:520px;
        padding: 0px 30px;
        h3{

            line-height: 22px;
            padding: 0 0 10px 8px;
            font-size: 18px;
            font-weight: bold;
            letter-spacing: -.15px;
        }
        @media all and (max-width:767px) {
            width: calc(100% - 20px);
            padding: 0px 0px;
            margin: auto;
        }
    `;

    const TextInfo = styled.div`
        display: flex;
        min-height: 20px;
        padding-top: 10px;
        padding-bottom: 10px;
        border: 1px solid #ebebeb;
        border-width: 1px 0;
        margin-bottom: 40px;

        div{
            -webkit-box-flex: 1;
            flex: 1;
            padding: 0 12px;
            border-left: 1px solid #ebebeb;
        }
        span{
            word-break: break-word;
            line-height: 17px;
            font-size: 14px;
        }
        p{
            line-height: 14px;
            font-size: 12px;
            letter-spacing: -.33px;
            color: rgba(34,34,34,.5);
            margin-bottom: 4px;
        }
        @media all and (max-width:767px) {
            div{
                padding: 0 5px;
            }
        }
    `;
        const MainCategory = styled.div`
            border-left: 0px solid #fff !important;
            padding: 0;

        `;
        const MainColor = styled.div`
        `;
        const MainSize = styled.div`
        `;
        const LaundryInfo = styled.div`
        `;

        const ModelSize = styled.div`
            font-size: 14px;
            line-height: 1.5;
            font-weight: 400;
            padding: 0 12px;
            display: flex;
            margin-bottom: 10px;

            p{
                width: 100px;
                line-height: 14px;
                font-size: 12px;
                letter-spacing: -.33px;
                color: rgba(34,34,34,.5);
                margin-bottom: 4px;
            }
            span{
                width: 100%;
                display: block;
                text-overflow: ellipsis;
                display: -webkit-box;
                -webkit-line-clamp: 2;
                -webkit-box-orient: vertical;
                word-break: keep-all;
                overflow: hidden;
            }
            @media all and (max-width:767px) {
                flex-direction: column;
                padding: 0 5px;
            }
        `;
        const RealSize = styled.div`
            font-size: 14px;
            line-height: 1.5;
            font-weight: 400;
            padding: 0 12px;
            display: flex;

            p{
                width: 100px;
                font-size: 12px;
                letter-spacing: -.33px;
                color: rgba(34,34,34,.5);
            }
            span{
                width: 100%;
                display: block;
                text-overflow: ellipsis;
                display: -webkit-box;
                -webkit-line-clamp: 2;
                -webkit-box-orient: vertical;
                word-break: keep-all;
                overflow: hidden;
            }
            @media all and (max-width:767px) {
                flex-direction: column;
                padding: 0 5px;
            }
        `;

    const ItemAct = styled.div`
        width: 550px;
        margin: 40px auto 0 auto;
        display: flex;
        justify-content: space-between;
        @media all and (max-width:767px) {
            width: 95vw;
            flex-direction: column;
            & > div{
                width: 95vw;
                margin-bottom: 15px;
            }
        }
    `;

        const BuyBtn = styled.div`
        display: flex;
        width: 49.8%;
        height: 60px;
        `;

            const BtnBody = styled.a`    
                box-sizing: border-box;
                -webkit-tap-highlight-color: rgba(0,0,0,.1);
                text-decoration: none;
                position: relative;
                display: inline-flex;
                -webkit-box-flex: 1;
                flex: 1;
                -webkit-box-align: center;
                align-items: center;
                border-radius: 10px;
                color: #fff;
                background-color: #3674ff;
                transition: all  0.5s;
                cursor: pointer;

                ::before {    
                content: "";
                position: absolute;
                top: 5px;
                bottom: 0;
                left: 90px;
                width: 1px;
                height: 50px;
                background-color: hsla(0,0%,100%,.4);
                }

                .title{
                    width: 90px;
                    text-align: center;
                    font-size: 18px;
                    letter-spacing: -.27px;
                }
                &:hover {
                    background-color: #0009ff;
                    box-shadow: 0px 7px 25px #0239ff21;
                }
                @media all and (max-width:767px) {
                    padding: 0 2px;
                    box-shadow: 0 5px 15px rgb(0 0 0 / 8%);
                    ::before {    
                    left: 100px;
                    }
                }
            `;
            const BtnPrice = styled.div`
                margin-left: 10px;
                line-height: 15px;
                p{
                    display: inline-block;
                    vertical-align: top;
                    font-weight: 600;
                    font-size: 16px;
                }
                p > span{
                    display: inline-block;
                    font-weight: 400;
                }
                span{
                    display: block;
                    font-size: 12px;
                    font-weight: 400;
                    color: hsla(0,0%,100%,.8);
                }
                @media all and (max-width:767px) {
                    margin-left: 35px;
                    line-height: 18px;
                    p{
                        font-weight: bold;
                        font-size: 16px;
                    }
                    span{
                        display: block;
                        font-size: 14px;
                        font-weight: 400;
                    }
                }
            
            `;

        const Collection = styled.div`
            display: flex;
            width: 48%;
            height: 60px;
            a{
                border: 1px solid #ebebeb;
                border-radius: 10px;
                color: #333;
                background-color: #fff;

                ::before {    
                content: "";
                position: absolute;
                top: 5px;
                bottom: 0;
                left: 85px;
                width: 1px;
                height: 50px;
                background-color: rgba(34,34,34,.1);
                }
                .title{
                    width: 85px;
                }
            }
            span{
                display: block;
                font-size: 12px;
                font-weight: 400;
                color: hsla(0,0%,0%,.8);
                margin-top: 3px;
            }
            &:hover {
                a{
                    background-color: #f2f2f2;
                    transition-property: background-color;
                    transition-duration: 0.5s;
                }
            }
            @media all and (max-width:767px) {
                a{
                    ::before {
                    left: 99px;
                    }
                }
            }
        `;


const DeliveryInfo = styled.div`
    width: 520px;
    height: 200px;
    margin-top: 40px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 0 30px;
    & > div{
    border-bottom: 1px solid #f0f0f0;
    }
    img{
        width: 55px;    
        float: left;
        margin-right: 14px;
    }
    .OptionText{
        display: flex;
        flex-direction: column;

        line-height: 20px;
        font-size: 13px;
        letter-spacing: -.07px;
        letter-spacing: normal;
        color: rgba(34,34,34,.5);
            
        strong {
            font-weight: 600;
            color: black;
            margin-bottom: 2px;
        }
    }
    @media all and (max-width:767px) {
        width: 95vw;
        padding: 0 0px;
        margin-bottom: 70px;
        display: none;
    }
`;

    const FastOption = styled.div`
        width:100%;
        display: flex;
        align-items: center;
    
    `;
    const DefaultOption = styled.div`
        width:100%;
        display: flex;
        align-items: center;
        @media all and (max-width:767px) {
            margin-top: 20px;
        }
    `;      
    const CollectOption = styled.div`
        width:100%;
        display: flex;
        align-items: center;
        @media all and (max-width:767px) {
            margin-top: 20px;
        }
    `;

const ConditionArea = styled.div`
    width: 520px;   
    margin-top: 40px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 0 30px;
    @media all and (max-width:767px) {
        width: 95vw;
        padding: 0 0px;
        margin-top: 30px;
        display: none;
    }

`;
// ---- 페이지 추천 피드 섹션 ---- //

const Pincontainer = styled.div`
    width: 612px;
    .ItemCardBody{
      margin-bottom:55px;
    }
    @media all and (max-width:767px) {
        width: 97vw;
    }
`;














function ItemDetail({  }) {
    const  { id }  = useParams();
    const { data: seeitemdata } = useQuery(SEEITEM_QUERY, { variables: { id: parseInt(id) } });
    const { data: seerelationfeeddata } = useQuery(SEERELATIONFEED_QUERY, { variables: { itemid: parseInt(id) } });

    return (
        <Container>
            <Header />

            <Wrapper>

                <SubNavbar/>

                <ItemContant>
                    <ItemDetail1>

                        <TopDetail>
                                <img src={seeitemdata?.seeitem?.item?.mimage}/>
                                <a className="OutLink" href={seeitemdata?.seeitem?.item?.detail}>
                                    <strong>자세히 보기</strong>
                                    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m15.97 17.031c-1.479 1.238-3.384 1.985-5.461 1.985-4.697 0-8.509-3.812-8.509-8.508s3.812-8.508 8.509-8.508c4.695 0 8.508 3.812 8.508 8.508 0 2.078-.747 3.984-1.985 5.461l4.749 4.75c.146.146.219.338.219.531 0 .587-.537.75-.75.75-.192 0-.384-.073-.531-.22zm-5.461-13.53c-3.868 0-7.007 3.14-7.007 7.007s3.139 7.007 7.007 7.007c3.866 0 7.007-3.14 7.007-7.007s-3.141-7.007-7.007-7.007zm-.744 6.26h-2.5c-.414 0-.75.336-.75.75s.336.75.75.75h2.5v2.5c0 .414.336.75.75.75s.75-.336.75-.75v-2.5h2.5c.414 0 .75-.336.75-.75s-.336-.75-.75-.75h-2.5v-2.5c0-.414-.336-.75-.75-.75s-.75.336-.75.75z" fill-rule="nonzero"/></svg>
                                </a>
                                <DetailMainTitle>
                                    <TitleBoxText>
                                        <a className='title'>
                                            {seeitemdata?.seeitem?.item?.title}
                                            </a>
                                        <p>{seeitemdata?.seeitem?.item?.price.toLocaleString("ko-KR")} <span>원</span></p>
                                    </TitleBoxText>
                                    <CartIcon id={seeitemdata?.seeitem?.item?.id} iscart={seeitemdata?.seeitem?.item?.iscart} totalCarts={seeitemdata?.seeitem?.item?.totalCarts} />
                                </DetailMainTitle>

                        </TopDetail>

                            <ColumTop>
                                    <DetailMainInfo>
                                        <h3>상품 정보</h3>
                                        <TextInfo>
                                            <MainCategory>
                                                <p>Category</p>
                                                <span>{seeitemdata?.seeitem?.item?.category}</span>
                                            </MainCategory>
                                            <MainColor>
                                                <p>Color</p>
                                                <span>{seeitemdata?.seeitem?.item?.color}</span>
                                            </MainColor>
                                            <MainSize>
                                                <p>Size</p>
                                                <span>{seeitemdata?.seeitem?.item?.size}</span>
                                            </MainSize>
                                            <LaundryInfo>
                                                <p>LaundryInfo</p>
                                                <span>{seeitemdata?.seeitem?.item?.laundryinfo}</span>
                                            </LaundryInfo>
                                        </TextInfo>
                                    </DetailMainInfo>

                                    <ItemAct>
                                        <BuyBtn>
                                            <BtnBody onClick={() => window.open(`${seeitemdata?.seeitem?.item?.detail}`, "Popup","toolbar=no, location=no, statusbar=no, menubar=no, scrollbars=1, resizable=0, width=580, height=800, top=30")}>
                                                
                                                <strong className='title'>
                                                    구매하기
                                                </strong>
                                                <BtnPrice>
                                                    <p>
                                                    {seeitemdata?.seeitem?.item?.price.toLocaleString("ko-KR")} <span>원</span>
                                                    </p>
                                                    <br/>
                                                    <span>
                                                        바로 구매하기
                                                        (결제창이 열려요.)
                                                    </span>
                                                </BtnPrice>
                                            </BtnBody>

                                        </BuyBtn>
                                        
                                        <CartIcon2 id={seeitemdata?.seeitem?.item?.id} iscart={seeitemdata?.seeitem?.item?.iscart} totalCarts={seeitemdata?.seeitem?.item?.totalCarts} />
                                    </ItemAct>
                                </ColumTop>


                                <DeliveryInfo>
                                <FastOption>
                                    <img src={AboutThumb1}/>
                                    <div className="OptionText">
                                        <strong>전 상품 무료배송!</strong>
                                        <span>수량제한 없이 마음에 드는 상품이 있다면! 무료배송 받아보세요!</span>
                                    </div>
                                </FastOption>
                                <DefaultOption>
                                    <img src={AboutThumb2}/>
                                    <div className="OptionText">
                                        <strong>엄격한 다중 검수</strong>
                                        <span>주문하신 상품은 STICKER가 직접 철저한 기준아래 검품 후 발송됩니다.</span>
                                    </div>
                                </DefaultOption>
                                <CollectOption>
                                    <img src={AboutThumb3}/>
                                    <div className="OptionText">
                                        <strong>안전 배송 시스템</strong>
                                        <span>안전한 배송을 위해 본사에서 철저한 검품을 거쳐 다음날 발송됩니다.</span>
                                    </div>
                                </CollectOption> 
                            </DeliveryInfo>
                            <ConditionArea>
                                <OrderConditions/> 
                            </ConditionArea>








                    </ItemDetail1>

                    <RelatedFeed>
                        <div className='RelatedFeedTitle'>
                            <h2>RelatedFeed</h2>
                            <p>이 제품에 대한 유저들의 생각</p>
                        </div>
                        <Pincontainer>
                            <Masonry columnsCount={2} >
                            {seerelationfeeddata?.seerelationFeed?.Feeds.map((feed) => feed.Look.map((Look) =>  (
                                <ItemCard
                                key={feed?.id}
                                lookimg={Look.comboImage}
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
                        </Pincontainer>
                    </RelatedFeed>


                </ItemContant>

                <div className="MobileInfo">
                    <DeliveryInfo>
                        <FastOption>
                            <img src={AboutThumb1}/>
                            <div className="OptionText">
                                <strong>전 상품 무료배송!</strong>
                                <span>수량제한 없이 마음에 드는 상품이 있다면! 무료배송 받아보세요!</span>
                            </div>
                        </FastOption>
                        <DefaultOption>
                            <img src={AboutThumb2}/>
                            <div className="OptionText">
                                <strong>엄격한 다중 검수</strong>
                                <span>주문하신 상품은 STICKER가 직접 철저한 기준아래 검품 후 발송됩니다.</span>
                            </div>
                        </DefaultOption>
                        <CollectOption>
                            <img src={AboutThumb3}/>
                            <div className="OptionText">
                                <strong>안전 배송 시스템</strong>
                                <span>안전한 배송을 위해 본사에서 철저한 검품을 거쳐 다음날 발송됩니다.</span>
                            </div>
                        </CollectOption> 
                    </DeliveryInfo>
                    <ConditionArea>
                        <OrderConditions/> 
                    </ConditionArea>
                </div>











            </Wrapper>
            <Footer />










        </Container>
    )
}

export default ItemDetail;