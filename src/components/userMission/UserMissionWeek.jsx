import React from "react";
import styled from "styled-components";
import dayjs from "dayjs";
import { useState } from "react";
import { flexBetween, flexRow } from "../../styles/Flex";
import { ReactComponent as CalendarRightArrow } from "../../assets/calendarRightArrow.svg";
import { ReactComponent as CalendarLeftArrow } from "../../assets/calendarLeftArrow.svg";
import Button from "../elements/Button";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getPeriodMissionStats } from "../../redux/modules/userMissionSlice";
import { useEffect } from "react";
import UserMissionBottom from "./UserMissionBottom";
import LineChart from "./LineChart";
import isLogin from "../../lib/isLogin";

const UserMissionWeek = () => {
  const format = "YYYY-MM-DD";
  const this_sunday = dayjs().day(0).format(format);
  const this_saturday = dayjs().day(6).format(format);
  const [startDate, setStartDate] = useState(this_sunday);
  const [endDate, setEndDate] = useState(this_saturday);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!isLogin()) {
      navigate("/login");
    }
    dispatch(
      getPeriodMissionStats({
        startDate: dayjs().startOf("week").format("YYYY-MM-DD"),
        endDate: dayjs().endOf("week").format("YYYY-MM-DD"),
      })
    );
  }, []);


  // 다음 달 버튼
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

  // 지난 달 버튼
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
        <Button btnType="onOff" on="on">
          주간통계
        </Button>
        <Button
          onClick={() => {
            navigate("/mypage/mission/month");
          }}
          btnType="onOff"
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
      </BarWrap>
      <UserMissionBottom />
    </>
  );
};

export default UserMissionWeek;

const MissionStatsButtonWrap = styled.div`
  ${flexRow}
  color:#000000;
`;

const StCalender = styled.div`
  margin: 20px 0 14.5px 0;
`;

const BarWrap = styled.div`
  height: 300px;
  width: 100%;
  box-sizing: border-box;
  padding-bottom: 55px;
  border-bottom: 1px solid #dbdbdb;
`;

const WeekDateButtonWrap = styled.div`
  ${flexBetween}
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
  color: #000000;
  @media (max-width: 389px) {
    font-size: 20px;
  }
`;
