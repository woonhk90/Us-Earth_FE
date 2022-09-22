import React from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import dayjs from "dayjs";
import styled from "styled-components";
import { flexRow } from "../../styles/Flex";
import Button from "../elements/Button";
import MissionCalendar from "./MissionCalendar";
import isLogin from "../../lib/isLogin";
import IsLoginModal from "../../pages/IsLoginModal";

const MissionStats = () => {
  const { clickDate } = useSelector((state) => state.userMission);
  const { dailyMissionData, periodMissionData } = useSelector((state) => state.userMission);
  console.log(clickDate);

if (error){
  return <></>
}

  return (
    <>
      {isLogin() ? null : <IsLoginModal />}
      <MissionStatsButtonWrap>
        <Button btntype="onOff" on="on">
          주간통계
        </Button>
        <Button btntype="onOff">월간통계</Button>
      </MissionStatsButtonWrap>
      {/* <SubCalendar/> */}
      <MissionCalendar />

      <DateP>{dayjs(clickDate).format("YYYY년 MM월 DD일")}</DateP>
      <div>선택날짜 : {dailyMissionData.selectedDate}</div>
      <div>
        {dailyMissionData.clearMissionList?.map((data) => {
          return <div key={data.id}>{data.content}</div>;
        })}
      </div>
    </>
  );
};

export default MissionStats;

const MissionStatsButtonWrap = styled.div`
  ${flexRow}
`;

const DateP = styled.p`
  font-weight: 600;
  font-size: 18px;
`;
