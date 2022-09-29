import React from "react";
import styled from "styled-components";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css"; // css import
import dayjs from "dayjs";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDailyMissionStats, getOnClickDate, getPeriodMissionStats } from "../../redux/modules/userMissonSlice";
import calendarRightDoubleArrow from "../../assets/calendarRightDoubleArrow.svg";
import calendarLeftDoubleArrow from "../../assets/calendarLeftDoubleArrow.svg";
import calendarRightArrow from "../../assets/calendarRightArrow.svg";
import calendarLeftArrow from "../../assets/calendarLeftArrow.svg";
import { useEffect } from "react";
import { colors } from "../../styles/color";

const UserMissionMonthCalendar = () => {
  const dispatch = useDispatch();
  const { periodMissionData, isLoading } = useSelector((state) => state.userMission);

  useEffect(() => {
    dispatch(
      getPeriodMissionStats({
        startDate: dayjs(value).startOf("month").startOf("week").format("YYYY-MM-DD"),
        endDate: dayjs(value).endOf("month").endOf("week").format("YYYY-MM-DD"),
      })
    );
  }, []);

  const [value, setValue] = useState(new Date());
  const [dates, setDates] = useState("");

  const onClickDay = (value, event) => {
    // setDates(dayjs(value).format("YYYY-MM-DD"));
    dispatch(getDailyMissionStats(dayjs(value).format("YYYY-MM-DD")));
  };

  const onActiveStartDateChange = ({ action, activeStartDate, value, view }) => {
    dispatch(
      getPeriodMissionStats({
        startDate: dayjs(activeStartDate).startOf("week").format("YYYY-MM-DD"),
        endDate: dayjs(activeStartDate).endOf("month").endOf("week").format("YYYY-MM-DD"),
      })
    );
  };

  const onChangeDate = (value, event) => {
    setValue(value);
    dispatch(getOnClickDate(dayjs(value).format("YYYY-MM-DD")));
  };

  return (
    <>
      <StCalender>
        <Calendar
          onChange={onChangeDate}
          locale="en-US"
          onClickDay={onClickDay}
          formatMonthYear={(locale, date) => {
            return dayjs(date).format("YYYY.MM");
          }}
          onActiveStartDateChange={onActiveStartDateChange}
          formatMonth={(locale, date) => {
            return dayjs(date).format("MM");
          }}
          value={value}
          tileContent={({ date, view }) => {
            let html = [];
            periodMissionData?.map((item, index) => {
              if (item.clearTime === dayjs(date).format("YYYY-MM-DD")) {
                [...Array(item.count)].map((e, i) => html.push(<div className="dot" key={i}></div>));
              }
            });
            return <MissionCnt>{html}</MissionCnt>;
          }}
        />
      </StCalender>
    </>
  );
};

export default UserMissionMonthCalendar;

const StCalender = styled.div`
  color: black;
  .dot {
    height: 8px;
    width: 8px;

    @media (max-width: 390px) {
      height: 7px;
      width: 7px;
    }
    background: #d9d9d9;
    border-radius: 50%;
    display: flex;
    :nth-child(1) {
      background-color: ${colors.dot1};
    }
    :nth-child(2) {
      background-color: ${colors.dot2};
    }
    :nth-child(3) {
      background-color: ${colors.dot3};
    }
    :nth-child(4) {
      background-color: ${colors.dot4};
    }
    :nth-child(5) {
      background-color: ${colors.dot5};
    }
  }
  .react-calendar {
    width: 100%;
    background: white;
    margin-top: 20px;
    padding: 0 14px 15px 14px;
    border: none;
    border-bottom: 1px solid #dbdbdb;
    font-family: Arial, Helvetica, sans-serif;
    line-height: 1.125em;
  }

  .react-calendar--doubleView {
    width: 700px;
  }
  .react-calendar--doubleView .react-calendar__viewContainer {
    display: flex;
    margin: -0.5em;
  }
  .react-calendar--doubleView .react-calendar__viewContainer > * {
    width: 50%;
    margin: 0.5em;
  }
  .react-calendar,
  .react-calendar *,
  .react-calendar *:before,
  .react-calendar *:after {
    -moz-box-sizing: border-box;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
  }
  .react-calendar button {
    margin: 0;
    border: 0;
    outline: none;
  }
  .react-calendar button:enabled:hover {
    cursor: pointer;
  }
  .react-calendar__navigation {
    span {
      color: #000000;
      font-size: 24px;
      @media (max-width: 390px) {
        font-size: 20px;
      }
      font-weight: 700;
    }

    display: flex;
    height: 44px;
    margin-bottom: 14.5px;
  }
  .react-calendar__navigation button {
    min-width: 44px;
    background: none;
  }
  .react-calendar__navigation button:disabled {
    background-color: transparent;
  }
  .react-calendar__navigation button:enabled:hover,
  .react-calendar__navigation button:enabled:focus {
    background-color: transparent;
  }
  .react-calendar__month-view__weekdays {
    text-align: center;
    text-transform: uppercase;
    font-weight: bold;
    font-size: 0.75em;

    color: #000000;
    abbr {
      text-decoration: none;
      font-size: 16px;
      @media (max-width: 390px) {
        font-size: 13px;
      }
      font-weight: 400;
      opacity: 0.5;
    }
  }
  .react-calendar__month-view__weekdays__weekday {
    padding: 0.5em;
    @media (max-width: 390px) {
      padding: 0;
    }
    margin-bottom: 25px;
  }
  .react-calendar__month-view__weekNumbers .react-calendar__tile {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.75em;
    font-weight: bold;

    color: #000000;
  }
  .react-calendar__month-view__days__day {
    abbr {
      font-size: 18px;
      font-weight: 400;
    }
  }

  .react-calendar__month-view__days__day--weekend {
    color: black;
  }
  .react-calendar__month-view__days__day--neighboringMonth {
    color: black;
    opacity: 0.5;
  }
  .react-calendar__navigation__next2-button {
    background-image: url("${calendarRightDoubleArrow}") !important;
    background-repeat: no-repeat !important;
    background-size: 14px !important;
    color: transparent;
    background-position: center !important;
  }
  .react-calendar__navigation__next-button {
    background-image: url("${calendarRightArrow}") !important;
    background-repeat: no-repeat !important;
    background-size: 7px !important;
    color: transparent;
    background-position: center !important;
  }
  .react-calendar__navigation__prev2-button {
    background-image: url("${calendarLeftDoubleArrow}") !important;
    background-repeat: no-repeat !important;
    background-size: 14px !important;
    color: transparent;
    background-position: center !important;
  }
  .react-calendar__navigation__prev-button {
    background-image: url("${calendarLeftArrow}") !important;
    background-repeat: no-repeat !important;
    background-size: 7px !important;
    color: transparent;
    background-position: center !important;
  }

  .react-calendar__year-view .react-calendar__tile,
  .react-calendar__decade-view .react-calendar__tile,
  .react-calendar__century-view .react-calendar__tile {
    padding: 2em 0.5em;
  }
  .react-calendar__tile {
    max-width: 100%;
    background: none;
    text-align: center;
    line-height: 16px;

    color: #000000;
  }
  .react-calendar__tile:disabled {
    background-color: #f0f0f0;
  }
  .react-calendar__month-view__days__day:enabled:hover {
    background-color: transparent;
    position: relative;
    z-index: 0;
    color: black;
    ::before {
      content: "";
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -88%);
      z-index: -1;
      width: 32px;
      height: 32px;
      border-radius: 50%;
      background-color: #eaeaea;
    }
  }

  .react-calendar__tile--now {
    background: transparent;
    abbr {
      font-weight: 700;
    }
    font-weight: 700;
  }
  .react-calendar__decade-view__years__year:hover {
    position: relative;
    background: transparent;
    color: black;
    ::before {
      content: "";
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -75%);
      z-index: 99;
      width: 50px;
      height: 50px;
      border-radius: 50%;
      background-color: rgba(187, 187, 187, 0.2);
    }
  }
  .react-calendar__tile--hasActive {
    background: transparent;
    position: relative;
    z-index: 0;
    color: white;
    ::before {
      content: "";
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -75%);
      z-index: -1;
      width: 50px;
      height: 50px;
      border-radius: 50%;
      background-color: #add477;
    }
  }

  .react-calendar__tile--hasActive:enabled:hover,
  .react-calendar__year-view__months__month:hover,
  .react-calendar__year-view__months__month:active,
  .react-calendar__tile--hasActive:enabled:focus,
  .react-calendar__decade-view__years__year:hover {
    background: transparent;
    position: relative;
    color: black;
    ::before {
      content: "";
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -75%);
      z-index: 99;
      width: 50px;
      height: 50px;
      border-radius: 50%;
      background-color: rgba(187, 187, 187, 0.2);
    }
  }
  .react-calendar__tile--active,
  .react-calendar__month-view__days__day:enabled:focus {
    color: white;
    position: relative;
    z-index: 0;
    text-align: center;
    ::before {
      content: "";
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -88%);
      z-index: -1;
      width: 32px;
      height: 32px;
      border-radius: 50%;
      background-color: #add477;
    }
  }
  .react-calendar__century-view__decades__decade {
    color: black !important;
  }
  .react-calendar__tile--active:enabled:hover,
  .react-calendar__tile--active:enabled:focus,
  .react-calendar--selectRange .react-calendar__tile--hover {
    background: transparent;
  }
`;

const MissionCnt = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 3px;
  @media (max-width: 390px) {
    gap: 1px;
  }
  justify-items: center;
  margin-top: 13px;
  height: 10px;
  flex-wrap: wrap;
`;
