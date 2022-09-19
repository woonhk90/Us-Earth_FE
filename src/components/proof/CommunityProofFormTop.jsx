import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { ReactComponent as LeftArrow } from "../../assets/LeftArrow.svg";
import { ReactComponent as Back } from "../../assets/back.svg";

const CommunityProofFormTop = () => {
  const navigate = useNavigate();
  return (
    <>
      <HeaderWrap>
      <IconDiv>
          <Back
            onClick={() => {
              navigate("/mypage");
            }}
          />
        </IconDiv>
        <RightButton>등g록</RightButton>
      </HeaderWrap>
    </>
  );
};
export default CommunityProofFormTop;

const HeaderWrap = styled.div`
position: fixed;
top: 0;
left: 0;
width: 100vw;
height: 48px;
display: flex;
justify-content: space-between;
padding: 13px;
box-sizing: border-box;
z-index: 1;
border-bottom: 1px solid #f5f5f5;
`;

const IconDiv = styled.div`
  cursor: pointer;
  width: 12px;
  height: 21px;
`;

const RightButton = styled.button`

cursor: pointer;
  font-weight: 600;
  font-size: 20px;
  letter-spacing: -0.03em;
  color: #222222;
`;
