import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { ReactComponent as LeftArrow } from "../../assets/LeftArrow.svg";

const CommunityProofTop = () => {
  const navigate = useNavigate();
  return (
    <>
      <HeaderWrap>
        <LeftArrow
          onClick={() => {
            navigate("/community");
          }}
        />
        <PTag>그룹 투두 제목</PTag>
        <LeftArrow />
      </HeaderWrap>
    </>
  );
};
export default CommunityProofTop;

const HeaderWrap = styled.div`
  position: relative;
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

const PTag = styled.p`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;
