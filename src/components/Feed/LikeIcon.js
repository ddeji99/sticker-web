import styled, { keyframes } from "styled-components";
import React, { useState, useRef } from 'react';
import { TOGGLELIKEFEED_MUTATION } from "../../Documents/Mutation/TOGGLELIKEFEED_MUATION";
import { useMutation } from "@apollo/client";






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

const Heart = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  justify-content: space-between;
  position: relative;
  transition: all 0.1s ease;
  animation: ${jelly} 0.6s ease;
  z-index: 2;

  .LikeBody {
    width: 32px;
    height: 32px;
    fill: ${props => props.fill};
    position: relative;
    animation: ${jelly} 0.6s ease;
    @media all and (max-width:767px) {
      height: 23px;
    }
  }

  .LikeMarker {
    fill: #28CD41;
    position: absolute;
    width: 16px !important;
    height: 20px !important;
    top: 15px;
    right: 1px;
    animation: ${jelly} 0.6s ease;
    z-index: 2;
    @media all and (max-width:767px) {
      top: 15px;
      right: 16.5px;
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
 
const LikeCount = styled.div`
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








function LikeIcon ({ id, isLiked, totalLikes }) {
  

      
   const [toggleLikeFeedMutation, { loading: toggleLikeFeedLoading }] = useMutation(TOGGLELIKEFEED_MUTATION, {
    update(cache, { data }) {
        if (data?.toggleLikeFeed.ok === false) {
            return;
        }

        cache.modify({
            id: `Feed:${id}`,
            fields: {
            isLiked: (isLiked) => !isLiked,
            totalLikes: (totalLikes) => (isLiked === true ? totalLikes - 1 : totalLikes + 1),
            },
        });
    },
    
   });


   const handleToggleLikeFeed = (isLiked) => {
    if (toggleLikeFeedLoading === true ) {
        return;
    }
    


      toggleLikeFeedMutation({ variables: { feedid: id } });
   }




    return (

      <Heart className="FeedLike" onClick={() => handleToggleLikeFeed(isLiked)}>
      {isLiked === true ? (
      <div>
        <svg xmlns="http://www.w3.org/2000/svg" className="LikeMarker" viewBox="0 0 8.357 8.353">
          <path d="M4.177,8.353A4.176,4.176,0,1,1,8.357,4.177,4.181,4.181,0,0,1,4.177,8.353Zm-1.764-4.4a.684.684,0,0,0-.492,1.167L2.984,6.355a.865.865,0,0,0,.66.337.808.808,0,0,0,.649-.356L6.53,3.024a.748.748,0,0,0,.151-.444.686.686,0,0,0-.707-.66.709.709,0,0,0-.611.391l-1.718,2.7L2.931,4.2A.658.658,0,0,0,2.413,3.952Z"
          />
        </svg>
        <svg xmlns="http://www.w3.org/2000/svg" className="LikeBody" viewBox="0 0 22.509 24.118">
          <path d="M0,16.383C0,20,2.364,22.974,5.17,22.974H8.741A10.773,10.773,0,0,0,13.7,24.118h1.5a14.765,14.765,0,0,0,3.27-.267A2.692,2.692,0,0,0,20.77,21.3a2.519,2.519,0,0,0-.157-.86,2.629,2.629,0,0,0,1.207-2.2,2.774,2.774,0,0,0-.3-1.292,2.663,2.663,0,0,0,.842-2.01,2.825,2.825,0,0,0-.388-1.464,2.706,2.706,0,0,0,.533-1.694A2.676,2.676,0,0,0,19.82,9.069H15.772c-.429,0-.691-.2-.691-.532,0-1.244,1.853-3.984,1.853-6.146A2.265,2.265,0,0,0,14.626,0c-.99,0-1.649.516-2.314,1.788A45.448,45.448,0,0,1,6.842,9.741H4.759C2.145,9.741,0,12.686,0,16.383Zm5.969-.026a8.739,8.739,0,0,1,2.023-5.9,53.515,53.515,0,0,0,5.536-8.051c.422-.848.7-1.061,1.142-1.061.553,0,.914.383.914,1.045,0,1.792-1.853,4.467-1.853,6.146a1.961,1.961,0,0,0,2.2,1.882H19.82a1.326,1.326,0,0,1,1.343,1.358,1.582,1.582,0,0,1-.537,1.241.462.462,0,0,0-.059.717,1.894,1.894,0,0,1,.447,1.2,1.582,1.582,0,0,1-.711,1.331.619.619,0,0,0-.22.853,2.03,2.03,0,0,1,.386,1.118c0,.6-.372,1.073-1.127,1.444a.438.438,0,0,0-.2.638,2.149,2.149,0,0,1,.273.982c0,.579-.42,1.042-1.255,1.249a13.7,13.7,0,0,1-2.939.227H13.79C9.115,22.777,5.969,20.1,5.969,16.357Zm-4.62.026c0-2.965,1.621-5.3,3.41-5.3H5.953a9.838,9.838,0,0,0-1.333,5.25,6.964,6.964,0,0,0,2.3,5.28H5.17C3.143,21.616,1.349,19.258,1.349,16.383Z"
          fill={'#0239ff'} />
        </svg>
      </div>
      ) : (
      <div>
        <svg xmlns="http://www.w3.org/2000/svg" className="LikeBody" viewBox="0 0 22.509 24.118">
          <path d="M0,16.383C0,20,2.364,22.974,5.17,22.974H8.741A10.773,10.773,0,0,0,13.7,24.118h1.5a14.765,14.765,0,0,0,3.27-.267A2.692,2.692,0,0,0,20.77,21.3a2.519,2.519,0,0,0-.157-.86,2.629,2.629,0,0,0,1.207-2.2,2.774,2.774,0,0,0-.3-1.292,2.663,2.663,0,0,0,.842-2.01,2.825,2.825,0,0,0-.388-1.464,2.706,2.706,0,0,0,.533-1.694A2.676,2.676,0,0,0,19.82,9.069H15.772c-.429,0-.691-.2-.691-.532,0-1.244,1.853-3.984,1.853-6.146A2.265,2.265,0,0,0,14.626,0c-.99,0-1.649.516-2.314,1.788A45.448,45.448,0,0,1,6.842,9.741H4.759C2.145,9.741,0,12.686,0,16.383Zm5.969-.026a8.739,8.739,0,0,1,2.023-5.9,53.515,53.515,0,0,0,5.536-8.051c.422-.848.7-1.061,1.142-1.061.553,0,.914.383.914,1.045,0,1.792-1.853,4.467-1.853,6.146a1.961,1.961,0,0,0,2.2,1.882H19.82a1.326,1.326,0,0,1,1.343,1.358,1.582,1.582,0,0,1-.537,1.241.462.462,0,0,0-.059.717,1.894,1.894,0,0,1,.447,1.2,1.582,1.582,0,0,1-.711,1.331.619.619,0,0,0-.22.853,2.03,2.03,0,0,1,.386,1.118c0,.6-.372,1.073-1.127,1.444a.438.438,0,0,0-.2.638,2.149,2.149,0,0,1,.273.982c0,.579-.42,1.042-1.255,1.249a13.7,13.7,0,0,1-2.939.227H13.79C9.115,22.777,5.969,20.1,5.969,16.357Zm-4.62.026c0-2.965,1.621-5.3,3.41-5.3H5.953a9.838,9.838,0,0,0-1.333,5.25,6.964,6.964,0,0,0,2.3,5.28H5.17C3.143,21.616,1.349,19.258,1.349,16.383Z"
          fill={'#999'} />
        </svg>
      </div>
      )
      }
      <LikeCount color={isLiked === true ? '#0239ff' : '#999'}>
        <span >
          {totalLikes?.toLocaleString("ko-KR")}
        </span>
      </LikeCount>
    </Heart>
    
  
    )
}

export default LikeIcon;