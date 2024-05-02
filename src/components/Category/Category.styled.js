import styled, { keyframes } from "styled-components";
import { setBgColor } from "../../services";

export const ItemMenu = styled.div`
  /* outline: 1px solid tomato; */
  position: absolute;
  display: flex;
  transition: opacity 0.3s ease; /* Плавна анімація зміни прозорості */
  opacity: 1; /* Початкова прозорість */
  top: 0;
  right: 0;

  @media screen and (min-width: 680px) {
    opacity: 0;
  }
`;

export const Card = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  background-color: var(--materialColorAlfa);
  /* outline: 1px solid tomato; */
  margin-bottom: ${(props) => props.theme.space[2]}px;
  &:hover,
  &:focus {
    box-shadow: var(--card-shadow);
    background-color: white;

    /* Зміна прозорості у ItemMenu при ховері на Card */
    & ${ItemMenu} {
      opacity: 1; /* Нове значення прозорості */
    }
  }
`;

export const CategoryWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  border-radius: 5px;

  width: 100%;

  /* outline: 1px solid blue; */

  @media screen and (min-width: 680px) {
    flex-direction: row;
    align-items: center;
  }
`;

export const CodeWrapper = styled.div`
  position: relative;
  text-align: start;
  height: 100%;
  width: 100%;
  background-color: ${setBgColor};
  border-radius: 0 5px 5px 0px;
  justify-content: end;

  @media screen and (min-width: 680px) {
    /* display: flex; */
    width: auto;
    text-align: start;
  }
`;

export const CategoryCode = styled.p`
  padding: ${(props) => props.theme.space[2]}px;
  padding-left: ${(props) => props.theme.space[5]}px;
  padding-right: ${(props) => props.theme.space[3]}px;
  border-radius: 0 5px 5px 0px;
  display: inline-block;
  min-width: 90px;
  text-align: center;
  color: ${(props) => props.theme.colors.textWhiteColor};
  font-size: ${(props) => props.theme.fontSizes.m};
  @media screen and (min-width: 680px) {
    padding-left: ${(props) => props.theme.space[3]}px;
  }
`;

export const DescriptionWrapper = styled.div`
  padding: ${(props) => props.theme.space[2]}px;
  /* outline: 1px solid red; */
  position: relative;
`;

export const CopyParent = styled.div`
  /* position: relative; */
  /* outline: 1px solid green; */
`;

export const CategoryDescription = styled.p`
  padding-left: 30px;
  line-height: 1;
  font-size: ${(props) => props.theme.fontSizes.m};
`;
export const HilightDescription = styled.div`
  padding-left: 30px;
  font-size: ${(props) => props.theme.fontSizes.s};
  background-color: ${(props) => props.type === "mark" && "yellow"};
`;

export const MaterialPrice = styled.p`
  font-size: 12px;
  color: ${(props) => props.theme.colors.green};
  padding-left: 10px;
`;

export const UserPrice = styled.p`
  font-size: 12px;
  color: ${(props) => props.theme.colors.orange};
  padding-left: 10px;
`;

export const MaterialUnit = styled.p`
  font-size: 12px;
  color: var(--unit-color);
  padding-left: 10px;
`;

export const Extended = styled.div`
  line-height: 1;
  /* outline: 1px red solid; */
  padding-left: 24px;
  display: flex;
`;
// Можна отримати доступ до пропсів
//  ${(props) => {
//     console.log(props);
//   }}

// Так можна додати зображення на фон
// background-image: ${props => `url(${props.img})`}

const fadeIn = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;

const expandHeight = keyframes`
from {
    max-height: 0;
  }
  to {
    max-height: 1000px; 
  }
`;

export const SubList = styled.div`
  /* animation: 2s ${fadeIn} ease-in; */
  animation: ${expandHeight} 0.5s ease-in-out;
  /* overflow: hidden; */
`;
