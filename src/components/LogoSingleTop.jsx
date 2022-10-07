import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import topLogo from "../assets/logo/topLogo.png";
import { colors } from "../styles/color";

const LogoSingleTop = () => {
  const navigate = useNavigate();

  return (
    <HeaderWrap>
      <HeaderCenter
        onClick={() => {
          navigate("/");
        }}
      >
        <Image src={topLogo} alt="topLogo"></Image>
      </HeaderCenter>
    </HeaderWrap>
  );
};
export default LogoSingleTop;

const HeaderWrap = styled.div`
  position: relative;
  top: 0;
  left: 0;
  width: 100%;
  height: 48px;
  box-sizing: border-box;
  margin: auto;
  text-align: center;
  border-bottom: 1px solid ${colors.grayF5};
  display: flex;
  justify-content: center;
  align-items: center;
`;

const HeaderCenter = styled.div`
  cursor: pointer;
  display: flex;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const Image = styled.img`
  width: 132px;
  @media (max-width: 325px) {
    width: 100px;
  }
`;
