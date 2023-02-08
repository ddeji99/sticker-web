import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { AnimatePresence, motion, Variants } from "framer-motion";
import CartIcon from "../Feed/CartIcon";

const ItemBody = styled(motion.div)`    
  width: 180px;
  height: min-content; /* 179px */
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  background-color: rgb(255, 255, 255);

  position: relative;

  @media all and (max-width:767px) {
    width: 100%;
    a {
        width: 100%;
    }
  }
`;

const ImageMain = styled.div`
    width: 180px;
    height: 180px;
    position: relative;
    overflow: hidden;
    border-radius: 22px;
    box-shadow: rgb(0 0 0 / 4%) 0px 4px 8px;

    @media all and (max-width:767px) {
        width: 100%;
        height: auto;
        aspect-ratio: 1 / 1;
        border-radius: 10px;
    }
`;

const ItemAct = styled.div`
    box-sizing: border-box; 
    width: 180px;
    height: min-content; /* 49px */
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding: 15px;
    overflow: visible;
    position: relative;
    align-content: center;
    flex-wrap: nowrap;

    @media all and (max-width:767px) {
        width: 100%;
        height: 70px;
        padding: 5px 5px;
    }
`;

const ItemInfo = styled.div`
    width: 170px;
    height: 65px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-start;
    overflow: visible;
    position: relative;
    margin-right: 8px;
    
    h3 {    
        white-space: pre-wrap;
        word-wrap: break-word;
        word-break: break-word;
        position: relative;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        font-size: 14px;
        line-height: 1.4;
        font-weight: 400;
    }
    
    p{
        font-size: 16px;
        line-height: 1.4;
        font-weight: 600;

    }

    @media all and (max-width:767px) {
        width: 100%;
        height: 55px;
    
        h3 {
            color: #666;
            font-size: 13px;
            line-height: 1.2;
            font-weight: 400;
            margin-bottom: 2px;
        }    
        p{
            font-size: 14px;
            line-height: 1.4;
            font-weight: 500;
    
        }
    }
`;

const ItemCollectBody = styled.div`
    height: 65px;
    min-width: 40px;

    position: absolute;
    right: 4px;
    top: 4px;

    background-color: #00000024;
    border-radius: 20px;

    z-index: 2;
    display: flex;
    flex-direction: column-reverse;
    justify-content: center;
    align-items: center;
    
    &:hover {
        display: inline-flex;
        background-color: #0037ff33;
    }
    path, span {
        fill: #fff;
        color: #fff !important;
    }
    @media all and (max-width:767px) {
        display: none;
    }
`;

const ItemImage = styled(motion.img)`
    width: 180px;
    height: 180px;
    
    @media all and (max-width:767px) {
        width: 100%;
        height: auto;
    }
`;

const Title = styled.h3`
`;

const Price = styled.p`
`;


function EachItem ({ item }) {




    return (
        <ItemBody className="EachItemBody">
                <ImageMain className="EachItemMain">
                    <ItemCollectBody>
                        {/* 아이템 콜렉트 버튼(북마크) */}
                        <CartIcon id={item.id} iscart={item.iscart} totalCarts={item.totalCarts} />
                        {/* 아이템 콜렉트 버튼(북마크) */}
                    </ItemCollectBody>
                    <Link to={`/items/${item.id}`}>
                    <ItemImage
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 1 }}
                            src={item.mimage}/>
                    </Link>
                </ImageMain>
                <ItemAct className="EachItemText">
                    <ItemInfo>
                        <Title>{item.title}</Title>
                        <Price>{item.price.toLocaleString("ko-KR")}<span>원</span></Price>
                    </ItemInfo>
                </ItemAct>
            </ItemBody>
    )
}

export default EachItem;