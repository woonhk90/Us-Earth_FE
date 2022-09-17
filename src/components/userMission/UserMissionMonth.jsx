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
import Cookies from "universal-cookie";
import { colors } from "../../styles/color";

const UserMissionMonth = () => {
  const cookies = new Cookies();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { clickDate } = useSelector((state) => state.userMission);
  const { dailyMissionData, periodMissionData } = useSelector((state) => state.userMission);
console.log(dailyMissionData)
  useEffect(() => {
    if (cookies.get("mycookie") === undefined) {
      navigate("/login");
    }
    dispatch(getDailyMissionStats(dayjs().format("YYYY-MM-DD")));
  }, []);

  return (
    <>
      <MissionStatsButtonWrap>
        <Button
          onClick={() => {
            navigate("/mypage/mission/week");
          }}
          btntype="onOff"
        >
          주간통계
        </Button>
        <Button btntype="onOff" on="on">
          월간통계
        </Button>
      </MissionStatsButtonWrap>
      <UserMissionMonthCalendar />
      <SelectDateWrap>
        {/* <SelectDateP>{dayjs(clickDate).format("YYYY년 MM월 DD일")}</SelectDateP> */}
        <SelectDateP>{dayjs(dailyMissionData.createdAt).format("YYYY년 MM월 DD일")}</SelectDateP>
        <SuccessMissionP>{dailyMissionData.count}개 완료</SuccessMissionP>
      </SelectDateWrap>
      <SelectDateMissionListWrap>
        <div>
          {dailyMissionData.clearMissionList?.map((data,index) => {
            return (
              <SelectMissionSingleWrap  key={data.id}>
                <SelectDateMissionDot className={`dot${index}`}/>
                <SelectDateSingleP>{data.content}</SelectDateSingleP>
              </SelectMissionSingleWrap>
            );
          })}
        </div>
      </SelectDateMissionListWrap>
    </>
  );
};

export default UserMissionMonth;

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
    .dot1{
      background-color: ${colors.dot2};
    }
    .dot2{
      background-color: ${colors.dot3};
    }
    .dot3{
      background-color: ${colors.dot4};
    }
    .dot4{
      background-color: ${colors.dot5};
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
 
`;
