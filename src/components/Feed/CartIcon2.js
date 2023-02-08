import styled, { keyframes } from "styled-components";
import React, { useState, useRef } from 'react';
import { useMutation } from "@apollo/client";
import { TOGGLECARTITEM_MUTATION } from "../../Documents/Mutation/TOGGLECARTITEM_MUTATION";



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
//BtnPrice span 3번쨰 0% 원래 100%임
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
                color: hsla(0,0%,0%,.8);
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





function CartIcon2 ({ id, iscart, totalCarts }) {
  

      
   const [togglecartItemMutation, { loading: togglecartItemLoading }] = useMutation(TOGGLECARTITEM_MUTATION, {
    update(cache, { data }) {
        if (data?.togglecartItem.ok === false) {
            return;
        }

        cache.modify({
            id: `Item:${id}`,
            fields: {
            iscart: (iscart) => !iscart,
            totalCarts: (totalCarts) => (iscart === true ? totalCarts - 1 : totalCarts + 1),
            },
        });
    },
    
   });


   const handleTogglecartItem = (iscart) => {
    if (togglecartItemLoading === true ) {
        return;
    }
    


      togglecartItemMutation({ variables: { itemid: id } });
   }




    return (

            <Collection onClick={() => handleTogglecartItem(iscart)} >
                <BtnBody>
                    <strong className='title' data-v-23bbaa82="">
                        나중에<br/>
                        입어 보기
                    </strong>
                    <BtnPrice>
                        <p>
                            옷장에 담아 놓을게요
                        </p>
                        <br/>
                        <span>
                            컴퓨터에서 피팅해볼 수 있어요!
                        </span>
                    </BtnPrice>
                </BtnBody>
            </Collection>
    

    )

      
    
  
    
}

export default CartIcon2;