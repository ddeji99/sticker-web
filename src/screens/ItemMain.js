import styled, { keyframes } from "styled-components";
import { useQuery } from "@apollo/client";
import React, { useState, useCallback, useEffect } from 'react';
import Header from "../components/Header";
import SubNavbar from "../components/SubNavbar";
import Footer from "../components/Footer";
import EachItem from "../components/Aircloset/EachItem";
import { Link, useNavigate, useMatch } from "react-router-dom";
import { AnimatePresence, motion, Variants, useScroll } from "framer-motion";
import Masonry, {ResponsiveMasonry} from "react-responsive-masonry"
import { STORETOP_QUERY } from "../Documents/Query/STORETOP_QUERY";
import { STOREBOTTOM_QUERY } from "../Documents/Query/STOREBOTTOM_QUERY";
import { STOREOUTER_QUERY } from "../Documents/Query/STOREOUTER_QUERY";
import { STOREMALE_QUERY } from "../Documents/Query/STOREMALE_QUERY";
import { STOREFEMALE_QUERY } from "../Documents/Query/STOREFEMALE_QUERY";

import {ReactComponent as top} from "../img/Tabs/Item/shirt.svg";
import {ReactComponent as bottom} from "../img/Tabs/Item/pants.svg";
import {ReactComponent as outer} from "../img/Tabs/Item/jacket.svg";
import {ReactComponent as male} from "../img/Tabs/man.svg";
import {ReactComponent as female} from "../img/Tabs/woman.svg";





const Maindiv = styled.div`
  box-sizing: border-box;
  height: min-content; /* 3985px */
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  padding: 60px 0px 0px 0px;
  background-color: #ffffff;
  overflow: hidden;
  align-content: center;
  flex-wrap: nowrap;

  #items{
    background-color: #0239ff !important;
    &, p{
      color: #fff !important;
    }
  }
  @media all and (max-width:767px) {
    padding: 10px 0 0 0;

  }
`;

const Pincontainer = styled.div`
  width: 1244px;
  height: auto;
  .ItemMesonry {
    gap: 10px !important;
  }
  .ItemMesonry > div {
    gap: 20px !important;
  }
  @media all and (max-width:767px) {
    width: 97vw;
  }
`;

const WindowNav = styled.div`
    width: 1244px;
    height: max-content;
    border-radius: 10px;
    background: white;
    display: flex;
    flex-direction: column;
    padding: 0 20px;
    align-items: center;
    margin: 10px 0 ;

    ul,
    li {
    list-style: none;
    padding: 0;
    margin: 0;
    padding: 10px 12px 20px 12px;
    color: #6e6d7a;
    transition: all 200ms ease;
    font-size: 18px;
    }

    ul {
    display: flex;
    width: 1000px;
    }
    
    li {
        height: 24px;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 55px;
        width: 100%;
        padding: 10px 15px;
        position: relative;
        background: white;
        cursor: pointer;
        flex: 1;
        min-width: 0;
        user-select: none;
        margin: 0 10px;
        font-weight: 700;
        border: 1px solid rgb(194 194 194 / 30%);
        & > svg{
          width: 32px;
          height: 30px;
          margin-right: 15px;
        }
        &:hover {
          background: rgba(13,12,34,0.05);
          color: #0239ff !important;
          svg{
            fill: #0239ff !important;
          }
        }
      }

    .selected {
      background: #0239ff;
      color: #fff !important;
      & > svg{
          fill: #fff !important;
      }
    }

    .underline {
        width: 70%;
        position: absolute;
        bottom: -5px;
        left: 15%;
        right: 0;
        height: 3px;
        border-radius: 3px;
        background: #0239ff;
    }
    
    li button {
      width: 20px;
      height: 20px;
      border: 0;
      background: #fff;
      border-radius: 3px;
      display: flex;
      justify-content: center;
      align-items: center;
      stroke: #000;
      margin-left: 10px;
      cursor: pointer;
      flex-shrink: 0;
    }
    
    .background {
      position: absolute;
      top: 0;
      left: 0;
      bottom: 0;
      width: 300px;
      background: #fff;
    }
    
    .add-item {
      width: 30px;
      height: 30px;
      background: #eee;
      border-radius: 50%;
      border: 0;
      cursor: pointer;
      align-self: center;
    }
    
    .add-item:disabled {
      opacity: 0.4;
      cursor: default;
      pointer-events: none;
    }
    
    @media all and (max-width:767px) {
      width: 97vw;
      height: 100%;
      margin-top: 0px;
      margin-bottom: 10px;
      padding: 0;

      ul,
      li {    
        width: 650px;
        font-weight: 400;
        font-size: 11px;
        padding: 5px 0px 10px 0px;
      }
      nav{
        width: 97vw;
        overflow: scroll;
        ::-webkit-scrollbar {
          display: none; 
        }
      }
      
      li {
        padding: 5px 5px !important;
        margin: 0 10px;
        & > svg{
          width: 24px !important;
          height: 20px !important;
          margin-right: 5px;
        }
      }
      .selected {
        background: #0239ff;
        color: #fff !important;
        & > svg{
            fill: #fff !important;
        }
      }
`;

const ResultArea = styled(motion.div)`
    width: 1244px; 
    @media all and (max-width:767px) {
      width: 97vw;
    }
`;

const ItemMap = [
    { label: "상의",
      Icons: top },
    { label: "하의",
      Icons: bottom },
    { label: "아우터",
      Icons: outer },
    { label: "여성",
      Icons: female },
    { label: "남성",
      Icons: male },
  ];










function ItemMain () {
    
    const { data: storetopdata } = useQuery(STORETOP_QUERY);
    const { data: storebottomdata } = useQuery(STOREBOTTOM_QUERY);
    const { data: storeouterdata } = useQuery(STOREOUTER_QUERY);
    const { data: storemaledata } = useQuery(STOREMALE_QUERY);
    const { data: storefemaledata } = useQuery(STOREFEMALE_QUERY);
    const [selectedTab, setSelectedTab] = useState('상의');
    









    return (
        <Maindiv>
          <link
            rel="stylesheet"
            type="text/css"
            charSet="UTF-8"
            href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css"
          />
          <link
            rel="stylesheet"
            type="text/css"
            href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css"
          />
          <Header />
          <SubNavbar/>






          <WindowNav>
      <nav>
          <ul>
          {ItemMap.map(({ label, Icons }) => (
              <li
              key={label}
              className={label === selectedTab ? "selected" : ""}
              onClick={() => setSelectedTab(label)}
              >

              <Icons/>
              <p>{label}</p>

              {label === selectedTab ? (
                  <motion.div className="underline" layoutId="underline" />
              ) : null}
              
              </li>
            ))}
          </ul>
      </nav>
      <ResultArea>
          <AnimatePresence exitBeforeEnter>
          <motion.div
              key={selectedTab ? selectedTab : null}
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -10, opacity: 0 }}
              transition={{ duration: 0.2 }}
          >



      {selectedTab === "상의" ? 
           ( <Pincontainer>
              <ResponsiveMasonry
                    columnsCountBreakPoints={{767: 2, 768: 6}}
                >
                <Masonry className="ItemMesonry">
                    
                       
                       {storetopdata?.storetop?.item.map((item) => ( <EachItem key={item.id} item={item} />) )}
                    
                   
                  <></>
                </Masonry>
              </ResponsiveMasonry>
            </Pincontainer> ) 

            : selectedTab === "하의" ?
            ( <Pincontainer>
                <ResponsiveMasonry
                      columnsCountBreakPoints={{767: 2, 768: 6}}
                  >
                  <Masonry className="ItemMesonry">
                      
                         {storebottomdata?.storebottom?.item.map((item) => ( <EachItem key={item.id}  item={item}  />) )} 
                         
                      
                     
                    <></>
                  </Masonry>
                </ResponsiveMasonry>
              </Pincontainer> )
            : selectedTab === "아우터" ? 
            ( <Pincontainer>
                <ResponsiveMasonry
                      columnsCountBreakPoints={{767: 2, 768: 6}}
                  >
                  <Masonry className="ItemMesonry">
                      
                         {storeouterdata?.storeouter?.item.map((item) => ( <EachItem key={item.id}  item={item}  />) )} 
                         
                      
                     
                    <></>
                  </Masonry>
                </ResponsiveMasonry>
              </Pincontainer> )
            : selectedTab === "남성" ?
            ( <Pincontainer>
                <ResponsiveMasonry
                      columnsCountBreakPoints={{767: 2, 768: 6}}
                  >
                  <Masonry className="ItemMesonry">
                      
                         {storemaledata?.storemale?.item.map((item) => ( <EachItem key={item.id}  item={item}  />) )} 
                         
                      
                     
                    <></>
                  </Masonry>
                </ResponsiveMasonry>
              </Pincontainer> )
            : selectedTab === "여성" ?
            ( <Pincontainer>
                <ResponsiveMasonry
                      columnsCountBreakPoints={{767: 2, 768: 6}}
                  >
                  <Masonry className="ItemMesonry">
                      
                         {storefemaledata?.storefemale?.item.map((item) => ( <EachItem key={item.id}  item={item}  />) )} 
                         
                      
                     
                    <></>
                  </Masonry>
                </ResponsiveMasonry>
              </Pincontainer> )
            :
            ( <Pincontainer>
                <ResponsiveMasonry
                      columnsCountBreakPoints={{767: 2, 768: 6}}
                  >
                  <Masonry className="ItemMesonry">
                      
                         
                         {storetopdata?.storetop?.item.map((item) => ( <EachItem key={item.id} item={item} />) )}
                      
                     
                    <></>
                  </Masonry>
                </ResponsiveMasonry>
              </Pincontainer> ) 

     }



            </motion.div>
          </AnimatePresence>
      </ResultArea>
    </WindowNav>





        <Footer />

      </Maindiv>
    )
}

export default ItemMain;




