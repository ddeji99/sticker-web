import styled, { keyframes } from "styled-components";
import React, { useState, useRef } from 'react';
import { useMutation } from "@apollo/client";
import { TOGGLECARTITEM_MUTATION } from "../../Documents/Mutation/TOGGLECARTITEM_MUTATION";



const jelly = keyframes`
  from {
  transform: scale(1, 1);
  }

  30% {
  transform: scale(1.25, 0.75);
  }

  40% {
  transform: scale(0.75, 1.25);
  }

  50% {
  transform: scale(1.15, 0.85);
  }

  65% {
  transform: scale(0.95, 1.05);
  }

  75% {
  transform: scale(1.05, 0.95);
  }

  to {
  transform: scale(1, 1);
  }
`;

const Collect = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 2;
  cursor: pointer;
  animation: ${jelly} 0.6s ease;
  svg{
    width: 19.622px;
    height: 35px; 
    fill: #999;
  }
  ::before {
    width: 100px;
    height: 10px;
    display: none;
    background: rgb(0 0 0);
    border: 2px solid #fff !important;
    content: '';


    &:hover {
      display: flex;
      
    }
  }
  .CollectBody {
    width: 32px;
    height: 32px;
    fill: ${props => props.fill};
    position: relative;
    animation: ${jelly} 0.6s ease;
    @media all and (max-width:767px) {
      height: 23px;
    }
  }

  .CollectMarker {
    fill: #28CD41;
    position: absolute;
    width: 16px !important;
    height: 20px !important;
    top: 31px;
    right: 3px;
    animation: ${jelly} 0.6s ease;
    z-index: 2;
    @media all and (max-width:767px) {
      top: 35px;
      right: 26px;
    }
  }

  &:hover {
    .LikeBody {
      fill: #0239ff;
    }
    span{
      color: #0239ff;
    }
  }
  @media all and (max-width:767px) {
    height: 32px;
    justify-content: center
  }
`;

const SAVEspan = styled.span`
  font-size: 14px;
  padding-top: 3px;
  font-weight: bold;
  color: ${props => props.color} !important;

  @media all and (max-width:767px) {
      line-height: 11px;
      font-size: 11px;
      margin-top: 0px;
      z-index: 3;
  }
`;





function CartIcon ({ id, iscart, totalCarts }) {
  

      
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
        <Collect className="Collect" onClick={() => handleTogglecartItem(iscart)}> 
    {iscart === true ? (
      <div>
        <svg xmlns="http://www.w3.org/2000/svg" className="CollectMarker" viewBox="0 0 8.357 8.353">
          <path d="M4.177,8.353A4.176,4.176,0,1,1,8.357,4.177,4.181,4.181,0,0,1,4.177,8.353Zm-1.764-4.4a.684.684,0,0,0-.492,1.167L2.984,6.355a.865.865,0,0,0,.66.337.808.808,0,0,0,.649-.356L6.53,3.024a.748.748,0,0,0,.151-.444.686.686,0,0,0-.707-.66.709.709,0,0,0-.611.391l-1.718,2.7L2.931,4.2A.658.658,0,0,0,2.413,3.952Z"
          />
        </svg>
        <svg xmlns="http://www.w3.org/2000/svg" className="CollectBody" viewBox="0 0 19.622 35">
          <path d="M1775.7,720.551h0Z" 
          transform="translate(-1758.625 -685.551)" fill={'#0239ff'} />

          <path d="M1716.753,529.2H1713.4v-1.269a4.772,4.772,0,1,0-6.29-3.649.906.906,0,0,0,1.159.705.926.926,0,0,0,.622-1.047,2.961,2.961,0,1,1,3.446,2.406.906.906,0,0,0-.746.891v2.869a.905.905,0,0,0,.905.905h4.254c2,0,2.923.942,2.923,2.965v11.888a.9.9,0,1,0,1.809,0V533.976C1721.487,530.941,1719.763,529.2,1716.753,529.2Z" 
          transform="translate(-1701.866 -518.659)" fill={'#0239ff'} />

          <path d="M1695.925,600.281a.9.9,0,0,0-.9.9h0v-.005c0,.926-.514.926-.734.926-.3,0-.536-.145-1.583-1.164l-4.922-4.862a1.044,1.044,0,0,0-.708-.324,1.065,1.065,0,0,0-.8.309l-4.93,4.875c-1.043,1.017-1.288,1.171-1.59,1.171-.22,0-.734,0-.734-.926V584.237c0-2.023.929-2.965,2.924-2.965a.9.9,0,0,0,.857-.6.908.908,0,0,0-.857-1.206c-3.009,0-4.734,1.741-4.734,4.777v16.948a2.5,2.5,0,0,0,2.547,2.735c1.074,0,1.717-.578,2.856-1.69l4.408-4.357h0l4.416,4.365c1.134,1.1,1.776,1.681,2.848,1.682,1.889,0,2.545-1.271,2.545-2.735h0A.9.9,0,0,0,1695.925,600.281Z" 
          transform="translate(-1677.207 -568.92)" fill={'#0239ff'} />
        </svg>
      </div>
      ) : (
      <div>
        <svg xmlns="http://www.w3.org/2000/svg" className="CollectBody" viewBox="0 0 19.622 35">
          <path d="M1775.7,720.551h0Z" transform="translate(-1758.625 -685.551)" />
          <path d="M1716.753,529.2H1713.4v-1.269a4.772,4.772,0,1,0-6.29-3.649.906.906,0,0,0,1.159.705.926.926,0,0,0,.622-1.047,2.961,2.961,0,1,1,3.446,2.406.906.906,0,0,0-.746.891v2.869a.905.905,0,0,0,.905.905h4.254c2,0,2.923.942,2.923,2.965v11.888a.9.9,0,1,0,1.809,0V533.976C1721.487,530.941,1719.763,529.2,1716.753,529.2Z" transform="translate(-1701.866 -518.659)"/>
          <path d="M1695.925,600.281a.9.9,0,0,0-.9.9h0v-.005c0,.926-.514.926-.734.926-.3,0-.536-.145-1.583-1.164l-4.922-4.862a1.044,1.044,0,0,0-.708-.324,1.065,1.065,0,0,0-.8.309l-4.93,4.875c-1.043,1.017-1.288,1.171-1.59,1.171-.22,0-.734,0-.734-.926V584.237c0-2.023.929-2.965,2.924-2.965a.9.9,0,0,0,.857-.6.908.908,0,0,0-.857-1.206c-3.009,0-4.734,1.741-4.734,4.777v16.948a2.5,2.5,0,0,0,2.547,2.735c1.074,0,1.717-.578,2.856-1.69l4.408-4.357h0l4.416,4.365c1.134,1.1,1.776,1.681,2.848,1.682,1.889,0,2.545-1.271,2.545-2.735h0A.9.9,0,0,0,1695.925,600.281Z" transform="translate(-1677.207 -568.92)" />
        </svg>
      </div>
      )
    }
    <SAVEspan color={iscart === true ? '#0239ff' : '#999'}>
        {totalCarts?.toLocaleString("ko-KR")}
    </SAVEspan>

    </Collect>
    )

      
    
  
    
}

export default CartIcon;