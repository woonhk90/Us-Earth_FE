import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { ReactComponent as LeftArrow } from "../../assets/LeftArrow.svg";

const CommunityCertifyFormTop = () => {
  const navigate = useNavigate();
  return (
    <>
      <HeaderWrap>
        <LeftArrow
          onClick={() => {
            navigate("/community");
          }}
        />
        <p>등록</p>
      </HeaderWrap>
    </>
  );
};
export default CommunityCertifyFormTop;

const HeaderWrap = styled.div`
  position: fixed;
  top: 0;
  left: 0;

  width: 100vw;
  height: 48px;
  display: flex;
  justify-content: space-between;
  padding: 10px;
  box-sizing: border-box;
  z-index: 1;
`;
