import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { ReactComponent as LeftArrow } from "../../assets/LeftArrow.svg";

const UserMissionWeekTop = () => {
  const navigate = useNavigate();

  return (
    <>
      <HeaderWrap>
        <LeftArrow
          onClick={() => {
            navigate("/mypage");
          }}
        />
      </HeaderWrap>
      <HeaderFlex>
        <HeaderP>개인 미션 통계</HeaderP>
      </HeaderFlex>
    </>
  );
};
export default UserMissionWeekTop;

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
  border-bottom: 1px solid #f5f5f5;
`;
const HeaderFlex = styled.div`
  width: 100%;
  padding-top: 10px;
  margin: auto;
  text-align: center;
`;

const HeaderP = styled.p`
  font-weight: 600;
  font-size: 20px;
  letter-spacing: -0.02em;
`;
