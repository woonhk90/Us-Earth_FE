import React from "react";
import styled from "styled-components";
import Calendar from "react-calendar";
import moment from "moment/moment";
import { useState } from "react";
import { flexColumn, flexRow } from "../../styles/Flex";
import MyResponsiveRadialBar from "./MyResponsiveLine";
import MyResponsiveBar from "./MyResponsiveBar";
import MyResponsiveLine from "./MyResponsiveLine";

const SubCalendar = () => {
  const format = "YYYY-MM-DD";
  const this_monday = moment().day(-7).format(format);
  const this_sunday = moment().day(0).format(format);
  const this_saturday = moment().day(6).format(format);
  const next_monday = moment().day(7).format(format);
  const next_sunday = moment().day(14).format(format);

  const [startDate, setStartDate] = useState(this_sunday);
  const [endDate, setEndDate] = useState(this_saturday);
  const prevWeek = () => {
    setStartDate(moment(startDate).day(-7).format(format));
    setEndDate(moment(endDate).day(-1).format(format));
  };
  const nextWeek = () => {
    setStartDate(moment().day(7).format(format));
  };

  return (
    <>
      <StCalender>
        {/* <div>이번주 월요일----{this_monday}</div> */}
        {/* <div>다음주 월요일----{next_monday}</div> */}
        <button onClick={prevWeek}>＜</button>
        <Stdic>
          <div>
            {this_sunday}~{this_saturday}
          </div>
          <div>
            {startDate}~{endDate}
          </div>
        </Stdic>
        <button onClick={nextWeek}>＞</button>
      </StCalender>
      <div>이번주 일요일----{this_sunday}</div>
      <div>이번주 토요일----{this_saturday}</div>
      <BarWrap>
      {/* <MyResponsiveBar /> */}
      <MyResponsiveLine />
      </BarWrap>
      {/* <div>다음주 일요일----{next_sunday}</div> */}
    </>
  );
};

export default SubCalendar;

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

const BarWrap =styled.div`
  height: 300px;
`