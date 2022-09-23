import React from "react";
import styled from "styled-components";
import LoadingMain from "../../assets/loading-main.gif";

const Layout = (props) => {
  return (
    <LayoutWrap>
      <SubWrap>
        <MainLoading imgUrl={LoadingMain}></MainLoading>
        <ChildrenWrap>{props.children}</ChildrenWrap>
      </SubWrap>
    </LayoutWrap>
  );
};
export default Layout;

const LayoutWrap = styled.div`
  width: 100vw;
  height: 100vh;
`;

const SubWrap = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  align-content: center;
  background: linear-gradient(white 30%, #e4ffbc);
  margin: 0 auto;
`;
const ChildrenWrap = styled.div`
  background-color: white;
  position: relative;
  height: 100%;
  width: 390px;
  display: flex;
  flex-direction: column;
  box-shadow: 1px 3px 5px 3px #cecece33;
  @media (max-width: 540px) {
    width: 100%;
  }
`;

const MainLoading = styled.div`
  width: 250px;
  height: 250px;  
  margin-right: 5%;
  @media (max-width: 540px) {
    margin-right: 0;
  display: none;
  }
  background-image: url(${(props) => props.imgUrl});
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
`;
