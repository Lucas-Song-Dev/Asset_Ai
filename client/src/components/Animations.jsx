import React, { Component, useState } from "react";
import styled, { keyframes } from "styled-components";

function TitleAnimation() {
  const NameArray = "LUCAS SONG".split("");
  const CreatedByArray = "CREATOR".split("");
  return (
    <>
      <WrapperTitle style={{ position: "absolute" }}>
        {CreatedByArray.map((item, index) => (
          <span key={index}>{item} </span>
        ))}
      </WrapperTitle>
      <WrapperTitle2>
        {NameArray.map((item, index) => (
          <span key={index}>{item} </span>
        ))}
      </WrapperTitle2>
    </>
  );
}

const animationTitle = keyframes`
0% {opacity: 0; transform: translateY(-200px) skewY(10deg) skewX(5deg) rotateZ(5deg); filter: blur(10px); z-index: 200;}
50% {opacity: 1; transform: translateY(0px) skewY(0deg) skewX(0deg) rotateZ(0deg); filter: blur(0px);z-index: 200;
75% {opacity: 0; transform: translateY(-200px) skewY(10deg) skewX(5deg) rotateZ(5deg); filter: blur(10px);z-index: 200;}
`;
const animationTitle2 = keyframes`
  25% {
    opacity: 0; 
    transform: translateY(-200px) skewY(10deg) skewX(5deg) rotateZ(5deg); 
    filter: blur(10px); 
    z-index: 200;
  }
  50% {
    opacity: 1; 
    transform: translateY(0px) skewY(0deg) skewX(0deg) rotateZ(0deg); 
    filter: blur(0px);
    z-index: 200;
  }
  100% {
    opacity: 1;
  }
`;

const fontFamily = `
@font-face {
  font-family: "Rajdhandi-Light"; /*Can be any text*/
  src: local("Rajdhandi-Light"), url("./Fonts/Rajdhani/Rajdhani-SemiBold.ttf") format("truetype");
}
@font-face {
  font-family: "Rajdhandi-Regular"; /*Can be any text*/
  src: local("Rajdhandi-Regular"),
    url("./Fonts/Rajdhani/Rajdhani-Regular.ttf") format("truetype");
}
`;

const WrapperTitle2 = styled.span`
span{
  display: inline-block;

  ${fontFamily}
  font-family: "Comfortaa";
  color: black;
  opacity: 0;
  animation-name: ${animationTitle2};
  animation-duration: 4s;
  animation-fill-mode: forwards;
  animation-iteration-count: 1 ;
  
  user-select: none
  
  position: fixed;
  width: 8vw;
  text-align: center;
  font-size: 7vw;
  z-index: 3;
  user-select: none;
  overflow: hidden;
}
span:nth-child(1){
  animation-delay:4.2s;
  right: 27vw;
}
span:nth-child(2){
  animation-delay:4.4s;
  right: 23.65vw;

}
span:nth-child(3){
  animation-delay:4.6s;
  right: 21vw;
}
span:nth-child(4){
  animation-delay:4.8s;
  right: 18.9vw;
}
span:nth-child(5){
  animation-delay:4.5s;
  right: 15vw;
}
span:nth-child(6){
  animation-delay:4.6s;
  right: 12vw;
}
span:nth-child(7){
  animation-delay:4.7s;
  right: 9.3vw;
}
span:nth-child(8){
  animation-delay:4.8s;
  right: 6.1vw;
}
span:nth-child(9){
  animation-delay:4.9s;
  right: 3.1vw;
}
span:nth-child(10){
  animation-delay:4.4s;
  right: 0vw;
}
`;

const WrapperTitle = styled.span`
span{
  display: inline-block;

  ${fontFamily}
  font-family: "Comfortaa";
  color: black;
  opacity: 0;
  animation-name: ${animationTitle};
  animation-duration: 4s;
  animation-fill-mode: forwards;
  animation-iteration-count: 1 ;
  
  user-select: none
  
  position: fixed;
  width: 10vw;
  text-align: center;
  font-size: 7vw;
  z-index: 3;
  user-select: none;
  overflow: hidden;
}
span:nth-child(1){
  animation-delay:0.2s;
  right: 27vw;
}
span:nth-child(2){
  animation-delay:0.4s;
  right: 23.65vw;

}
span:nth-child(3){
  animation-delay:0.6s;
  right: 21vw;
}
span:nth-child(4){
  animation-delay:0.8s;
  right: 18.9vw;
}
span:nth-child(5){
  animation-delay:0.5s;
  right: 15vw;
}
span:nth-child(6){
  animation-delay:0.6s;
  right: 12vw;
}
span:nth-child(7){
  animation-delay:0.7s;
  right: 9.3vw;
}
span:nth-child(8){
  animation-delay:0.8s;
  right: 6.1vw;
}
span:nth-child(9){
  animation-delay:0.9s;
  right: 3.1vw;
}
span:nth-child(10){
  animation-delay:1s;
  right: 0vw;
}
`;

export default TitleAnimation;

export function IssueHound() {
  const ISSUE_ARRAY = "ASSET_AI".split("");
  return (
    <>
      <WrapperIssueHound style={{ position: "absolute" }}>
        {ISSUE_ARRAY.map((item, index) => (
          <span key={index}>{item} </span>
        ))}
      </WrapperIssueHound>
    </>
  );
}

const WrapperIssueHound = styled.span`
  position: relative;
  z-index: 10;
  bottom: 0px;
  left: 50px;
  text-shadow: 4px 4px 2px #a65dd6;
  color: black;

  span {
    font-family: Inter var, sans-serif;
    display: inline-block;
    transition: all 0.35s;
    font-size: 12vw;
    z-index: 10;
  }
  &:hover span {
    &:nth-child(0) {
      transform: translateY(-30%) rotate(-5deg);
    }
    &:nth-child(1) {
      transform: translateY(-30%) rotate(-5deg);
    }
    &:nth-child(2) {
      transform: translateY(-10%) rotate(-4deg);
    }
    &:nth-child(3) {
      transform: translateY(-30%) rotate(-3deg);
    }
    &:nth-child(4) {
      transform: translateY(-45%) rotate(-2deg);
    }
    &:nth-child(5) {
      transform: translateY(-3%) rotate(-1deg);
    }
    &:nth-child(6) {
      transform: translateY(-2%) rotate(0deg);
    }
    &:nth-child(7) {
      transform: translateY(-30%) rotate(1deg);
    }
    &:nth-child(8) {
      transform: translateY(-10%) rotate(2deg);
    }
    &:nth-child(9) {
      transform: translateY(-10%) rotate(3deg);
    }
    &:nth-child(10) {
      transform: translateY(-35%) rotate(2deg);
    }
    &:nth-child(11) {
      transform: translateY(-10%) rotate(6deg);
    }
    &:nth-child(12) {
      transform: translateY(10%) rotate(4deg);
    }

    @media (max-width: 480px) {
      span {
        font-size: 2rem;
      }
    }
  }
`;
