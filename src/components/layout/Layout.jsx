import React from "react";
import styled from "styled-components";
import LoadingMain from "../../assets/loading-main.gif";
import background from "../../assets/jpg/background.jpg";
import { flexRow } from "../../styles/Flex";

const Layout = (props) => {
  return (
    <LayoutWrap>
      <SubWrap imgUrl={background}>
        <ChildrenWrap>{props.children}</ChildrenWrap>
      </SubWrap>
    </LayoutWrap>
  );
};
export default Layout;

const LayoutWrap = styled.div`
  width: 100vw;
  height: 100vh;
  background: #eaf7bf;
  
  @media (max-width: 540px) {
  background: #ffffff;
  }
`;

const SubWrap = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  align-content: center;
  position: fixed;
  background-image: url(${(props) => props.imgUrl});
  background-repeat: no-repeat;
  background-position: left;
  background-size: auto 100vh;
  @media (min-width: 541px) and (max-width: 900px) {
  justify-content: flex-end;
  }
`;
const ChildrenWrap = styled.div`
  background-color: white;
  position: relative;
  height: 100%;
  display: flex;
  flex-direction: column;
  box-shadow: 1px 3px 5px 3px #cecece33;
  width: 390px;
  left: 240px;

  @media (min-width: 541px) and (max-width: 900px) {
    left: 0;
  margin-right: 30px;
  }
  @media (max-width: 540px) {
    width: 100%;
    left: 0;
  }
`;

