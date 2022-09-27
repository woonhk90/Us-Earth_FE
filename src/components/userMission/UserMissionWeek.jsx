import React from "react";
import styled from "styled-components";
import Calendar from "react-calendar";
import dayjs from "dayjs";
import { useState } from "react";
import { flexBetween, flexColumn, flexRow } from "../../styles/Flex";
import { ReactComponent as CalendarRightArrow } from "../../assets/calendarRightArrow.svg";
import { ReactComponent as CalendarLeftArrow } from "../../assets/calendarLeftArrow.svg";
import Button from "../elements/Button";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {  getPeriodMissionStats } from "../../redux/modules/userMissonSlice";
import { useEffect } from "react";
import Cookies from "universal-cookie";
import { colors } from "../../styles/color";
import UserMissionBottom from "./UserMissionBottom";
import LineChart from "./LineChart";

const UserMissionWeek = () => {
  const format = "YYYY-MM-DD";
  const this_sunday = dayjs().day(0).format(format);
  const this_saturday = dayjs().day(6).format(format);
  const [startDate, setStartDate] = useState(this_sunday);
  const [endDate, setEndDate] = useState(this_saturday);
  const cookies = new Cookies();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { periodMissionData, dailyMissionData } = useSelector((state) => state.userMission);

  useEffect(() => {
    if (cookies.get("mycookie") === undefined) {
      navigate("/login");
    }
    // dispatch(getDailyMissionStats(dayjs().format("YYYY-MM-DD")));
    dispatch(
      getPeriodMissionStats({
        startDate: dayjs().startOf("week").format("YYYY-MM-DD"),
        endDate: dayjs().endOf("week").format("YYYY-MM-DD"),
      })
    );
  }, []);

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
        <WeekDateButtonWrap>
          <WeekDatePrevButton onClick={prevWeek}>
            <CalendarLeftArrow width="7px" />
          </WeekDatePrevButton>
          <WeekDatePWrap>
            <WeekDateP>
              {dayjs(startDate).format("MM.DD")}~{dayjs(endDate).format("MM.DD")}
            </WeekDateP>
          </WeekDatePWrap>
          <WeekDatePrevButton onClick={nextWeek}>
            <CalendarRightArrow width="7px" />
          </WeekDatePrevButton>
        </WeekDateButtonWrap>
      </StCalender>
      <BarWrap>
        <LineChart startDate={startDate} endDate={endDate} />
        {/* <MyResponsiveLine startDate={startDate} endDate={endDate} /> */}
      </BarWrap>
      <UserMissionBottom/>
    </>
  );
};

export default UserMissionWeek;

const MissionStatsButtonWrap = styled.div`
  ${flexRow}
`;
const StCalender = styled.div`
  /* ${flexRow} */
  .dot {
    height: 8px;
    width: 8px;
    background-color: #f87171;
    border-radius: 50%;
    display: flex;
    margin-left: 1px;
  }
  margin: 20px 0 14.5px 0;
`;

const Stdic = styled.div`
  ${flexColumn}
`;

const BarWrap = styled.div`
  height: 300px;
    width: 100%;
    box-sizing: border-box;
  padding-bottom: 55px;

  border-bottom: 1px solid #dbdbdb;
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
  padding: 12px 33px;
`;
const SelectMissionSingleWrap = styled.div`
  ${flexRow}
  padding:14px 0;
  box-sizing: border-box;

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
`;
const SelectDateMissionDot = styled.div`
  width: 22px;
  height: 22px;
  background-color: #d9d9d9;
  border-radius: 50%;
  margin-right: 17px;
`;

const WeekDateButtonWrap = styled.div`
  ${flexBetween}/* margin: 0 auto; */
  /* padding: 0 250px; */
`;
const WeekDatePrevButton = styled.div`
  text-align: center;
  cursor: pointer;
  padding: 10px;
  width: 100%;
`;
const WeekDatePWrap = styled.div`
  text-align: center;
  width: 100%;
`;
const WeekDateP = styled.p`
  font-size: 24px;
  font-weight: 700;
  width: 144px;
  margin: 0 auto;
  
  @media (max-width: 390px) {
        font-size: 20px;
  }
`;
