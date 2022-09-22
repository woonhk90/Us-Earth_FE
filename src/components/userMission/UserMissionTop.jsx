import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { ReactComponent as LeftArrow } from "../../assets/LeftArrow.svg";
import { ReactComponent as Back } from "../../assets/back.svg";

const UserMissionTop = () => {
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
      </HeaderWrap>
      <HeaderFlex>
        <HeaderP>개인 미션 통계</HeaderP>
      </HeaderFlex>
    </>
  );
};
export default UserMissionTop;
const HeaderWrap = styled.div`
position: absolute;
  top: 0;
  left: 0;
  display: flex;
  justify-content: space-between;
  padding: 13px;
  box-sizing: border-box;
  z-index: 1;
`;
const HeaderFlex = styled.div`
  width: 100%;
  padding-top: 10px;
  box-sizing: border-box;
  margin: auto;
  text-align: center;
  height: 48px;
  border-bottom: 1px solid #f5f5f5;
`;

const HeaderP = styled.p`
  font-weight: 600;
  font-size: 20px;
  letter-spacing: -0.02em;
  color: #222222;
`;

const IconDiv = styled.div`
  cursor: pointer;
  width: 12px;
  height: 21px;
`;
