import styled from "styled-components";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, Variants } from "framer-motion";



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