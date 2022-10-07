import React from "react";
import styled from "styled-components";
import { colors } from "../styles/color";

const CommunityTop = () => {
  return (
    <HeaderWrap>
      <LoginText>로그인</LoginText>
    </HeaderWrap>
  );
};
export default CommunityTop;

const HeaderWrap = styled.div`
  position: relative;
  top: 0;
  left: 0;
  width: 100%;
  height: 48px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
  box-sizing: border-box;
  z-index: 1;
  border-bottom: 1px solid ${colors.grayF5};
`;

const LoginText = styled.span`
  font-weight: 600;
  font-size: 20px;
  line-height: 27px;
  text-align: center;
  letter-spacing: -0.02em;
  color: #222222;
`;
