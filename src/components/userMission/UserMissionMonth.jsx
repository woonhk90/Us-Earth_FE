import React from "react";
import styled from "styled-components";
import { flexRow } from "../../styles/Flex";
import Button from "../elements/Button";
import UserMissionMonthCalendar from "./UserMissionMonthCalendar";
import { useNavigate } from "react-router-dom";
import UserMissionBottom from "./UserMissionBottom";
import isLogin from "../../lib/isLogin";
import IsLoginModal from "../Modals/IsLoginModal";

const UserMissionMonth = () => {
  const navigate = useNavigate();

  return (
    <>
      {isLogin() ? null : <IsLoginModal />}
      <MissionStatsButtonWrap>
        <Button
          onClick={() => {
            navigate("/mypage/mission/week");
          }}
          btnType="onOff"
        >
          주간통계
        </Button>
        <Button btnType="onOff" on="on">
          월간통계
        </Button>
      </MissionStatsButtonWrap>
      <UserMissionMonthCalendar />
      <UserMissionBottom />
    </>
  );
};

export default UserMissionMonth;

const MissionStatsButtonWrap = styled.div`
  ${flexRow}
`;
