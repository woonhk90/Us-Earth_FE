import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import dayjs from "dayjs";
import styled from "styled-components";
import { flexBetween, flexColumn, flexRow } from "../../styles/Flex";
import Button from "../elements/Button";
import UserMissionMonthCalendar from "./UserMissionMonthCalendar";
import { getDailyMissionStats, getOnClickDate } from "../../redux/modules/userMissonSlice";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { colors } from "../../styles/color";

const UserMissionBottom = () => {
  const dispatch = useDispatch();
  
  const { dailyMissionData} = useSelector((state) => state.userMission);

  useEffect(() => {
    dispatch(getDailyMissionStats(dayjs().format("YYYY-MM-DD")));
  }, []);

  return (
    <>
      <SelectDateWrap>
        <SelectDateP>{dayjs(dailyMissionData.clearTime).format("YYYY년 MM월 DD일")}</SelectDateP>
        <SuccessMissionP>{dailyMissionData.count}개 완료</SuccessMissionP>
      </SelectDateWrap>
      <SelectDateMissionListWrap>
        <div>
          {dailyMissionData.clearMissionList?.map((data, index) => {
            return (
              <SelectMissionSingleWrap key={data.id}>
                <SelectDateMissionDot className={`dot${index}`} />
                <SelectDateSingleP>{data.content}</SelectDateSingleP>
              </SelectMissionSingleWrap>
            );
          })}
        </div>
      </SelectDateMissionListWrap>
    </>
  );
};

export default UserMissionBottom;

const MissionStatsButtonWrap = styled.div`
  ${flexRow}
`;

const SelectDateP = styled.p`
  font-weight: 600;
  font-size: 18px;
  letter-spacing: -0.02em;
`;
const SuccessMissionP = styled.p`
  font-weight: 500;
  font-size: 18px;
  color: #898989;
  letter-spacing: -0.02em;
`;
const SelectDateSingleP = styled.p`
  font-weight: 400;
  font-size: 16px;
  letter-spacing: -0.02em;
`;
const SelectDateWrap = styled.div`
  ${flexBetween}
  padding: 21px 16px;
  border-bottom: 1px solid #dbdbdb;
`;

const SelectDateMissionListWrap = styled.div`
  /* ${flexColumn} */
  padding: 12px 33px;
  .dot0 {
    background-color: ${colors.dot1};
  }
  .dot1 {
    background-color: ${colors.dot2};
  }
  .dot2 {
    background-color: ${colors.dot3};
  }
  .dot3 {
    background-color: ${colors.dot4};
  }
  .dot4 {
    background-color: ${colors.dot5};
  }
  @media (max-width: 390px) {
    padding: 12px;
  }
`;
const SelectMissionSingleWrap = styled.div`
  ${flexRow}
  padding:14px 0;
  box-sizing: border-box;
`;
const SelectDateMissionDot = styled.div`
  width: 22px;
  height: 22px;
  background-color: #d9d9d9;
  border-radius: 50%;
  margin-right: 17px;

  @media (max-width: 390px) {
    width: 18px;
    height: 18px;
  }
`;
