import React from "react";
import styled from "styled-components";
import Calendar from "react-calendar";
import dayjs from "dayjs";
import { useState } from "react";
import { flexBetween, flexColumn, flexRow } from "../../styles/Flex";
import calendarRightArrow from "../../assets/calendarRightArrow.svg";
import calendarLeftArrow from "../../assets/calendarLeftArrow.svg";
import MyResponsiveLine from "./UserMissionWeekLine";
import Button from "../elements/Button";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getDailyMissionStats, getPeriodMissionStats } from "../../redux/modules/userMissonSlice";
import { useEffect } from "react";

const UserMissionWeek = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { periodMissionData, dailyMissionData } = useSelector((state) => state.userMission);

  // console.log(periodMissionData);
  // console.log(dailyMissionData);
  const format = "YYYY-MM-DD";
  const this_sunday = dayjs().day(0).format(format);
  const this_saturday = dayjs().day(6).format(format);

  useEffect(() => {
    dispatch(getDailyMissionStats(dayjs().format("YYYY-MM-DD")));
    dispatch(
      getPeriodMissionStats({
        startDate: dayjs().startOf("week").format("YYYY-MM-DD"),
        endDate: dayjs().endOf("week").format("YYYY-MM-DD"),
      })
    );
  }, []);

  const [startDate, setStartDate] = useState(this_sunday);
  const [endDate, setEndDate] = useState(this_saturday);
  const prevWeek = () => {
    setStartDate(dayjs(startDate).day(-7).format(format));
    setEndDate(dayjs(endDate).day(-1).format(format));
    dispatch(
      getPeriodMissionStats({
        startDate: dayjs(startDate).day(-7).format(format),
        endDate: dayjs(endDate).day(-1).format(format),
      })
    );
  };
  const nextWeek = () => {
    setStartDate(dayjs(startDate).day(7).format(format));
    setEndDate(dayjs(endDate).day(13).format(format));
    dispatch(
      getPeriodMissionStats({
        startDate: dayjs(startDate).day(7).format(format),
        endDate: dayjs(endDate).day(13).format(format),
      })
    );
  };

  return (
    <>
      <MissionStatsButtonWrap>
        <Button btntype="onOff" on="on">
          주간통계
        </Button>
        <Button
          onClick={() => {
            navigate("/mypage/mission/month");
          }}
          btntype="onOff"
        >
          월간통계
        </Button>
      </MissionStatsButtonWrap>
      <StCalender>
        {/* <div>이번주 월요일----{this_monday}</div> */}
        {/* <div>다음주 월요일----{next_monday}</div> */}
        <WeekDateButtonWrap>
          <WeekDatePrevButton onClick={prevWeek}>＜</WeekDatePrevButton>
          <WeekDatePWrap>
            <WeekDateP>
              {dayjs(startDate).format("MM.DD")}~{dayjs(endDate).format("MM.DD")}
            </WeekDateP>
          </WeekDatePWrap>
          <WeekDateNextButton onClick={nextWeek}>＞</WeekDateNextButton>
        </WeekDateButtonWrap>
      </StCalender>
      <BarWrap>
        {/* <MyResponsiveBar /> */}
        <MyResponsiveLine startDate={startDate} endDate={endDate} />
      </BarWrap>
      {/* <div>다음주 일요일----{next_sunday}</div> */}
      <SelectDateWrap>
        {/* <SelectDateP>{dayjs(clickDate).format("YYYY년 MM월 DD일")}</SelectDateP> */}
        <SelectDateP>{dayjs(dailyMissionData.selectedDate).format("YYYY년 MM월 DD일")}</SelectDateP>
        <SuccessMissionP>{dailyMissionData.clearMissionCnt}개 완료</SuccessMissionP>
      </SelectDateWrap>
      <SelectDateMissionListWrap>
        <div>
          {dailyMissionData.clearMissionList?.map((data) => {
            return (
              <SelectMissionSingleWrap key={data.id}>
                <SelectDateMissionDot />
                <SelectDateSingleP>{data.content}</SelectDateSingleP>
              </SelectMissionSingleWrap>
            );
          })}
        </div>
      </SelectDateMissionListWrap>
    </>
  );
};

export default UserMissionWeek;

const MissionStatsButtonWrap = styled.div`
  ${flexRow}
`;
const StCalender = styled.div`
  ${flexRow}
  .dot {
    height: 8px;
    width: 8px;
    background-color: #f87171;
    border-radius: 50%;
    display: flex;
    margin-left: 1px;
  }
`;

const Stdic = styled.div`
  ${flexColumn}
`;

const BarWrap = styled.div`
  height: 300px;
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

const WeekDateButtonWrap = styled.div`
  ${flexBetween}
  padding: 25px 0 15px 0;
  margin: 0 auto;
`;
const WeekDatePrevButton = styled.button`
  /* margin: 0; */
  background-image: url("${calendarLeftArrow}");
  background-repeat: no-repeat;
  background-size: 8px;
  width: 8px;
  height: 12px;
  background-color: transparent;
  border: none;
  color: transparent;
  background-position: center;
`;

const WeekDateNextButton = styled.button`
  background-image: url("${calendarRightArrow}");
  background-repeat: no-repeat;
  background-size: 8px;
  width: 8px;
  height: 12px;
  background-color: transparent;
  border: none;
  color: transparent;
  background-position: center;
`;

const WeekDatePWrap = styled.div`
  width: 100%;
  margin: 0 53px;
`;
const WeekDateP = styled.p`
  font-size: 24px;
  font-weight: 700;
`;