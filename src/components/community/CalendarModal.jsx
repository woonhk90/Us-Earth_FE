import React, { useEffect, useState } from "react";
import styled from "styled-components";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useDispatch, useSelector } from "react-redux";
import { flexColumn, flexRow, flexBetween, Text } from "../../styles/Flex";
import { addDates } from "../../redux/modules/communityFormSlice";
import { ReactComponent as CalendarRightArrowBk } from "../../assets/calendarRightArrowBk.svg";
import dayjs from "dayjs";
import Button from "../elements/Button";
import { colors } from "../../styles/color";

const CalendarModal = (props) => {
  const dispatch = useDispatch();
  const { dates } = useSelector((state) => state.communityForm);

  // 달력 data
  const [dateRange, setDateRange] = useState([null, null]);
  const [startDate, endDate] = dateRange;

  // 달력 날짜 onChange
  const onChange = (dates) => {
    setDateRange(dates);
  };

  useEffect(() => {
    if (Object.values(dates).length) {
      const list = Object.values(dates).map((val) => new Date(val));
      setDateRange(list);
    }
  }, []);

  // 선택 날짜
  const date = {
    start: dayjs(dateRange[0]).format("YYYY-MM-DD"),
    end: dayjs(dateRange[1]).format("YYYY-MM-DD"),
  };

  // 달력 모달 닫기
  const closeModal = () => {
    props.closeModal();
  };

  // 진행 기간 날짜 선택 버튼
  const addDateDispatch = () => {
    dispatch(addDates(date));
    props.closeModal();
  };

  return (
    <ModalWrap onClick={closeModal}>
      <StInput
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <DatePicker
          isdate={date.start === date.end}
          formatWeekDay={(nameOfDay) => nameOfDay.substring(0, 3).toUpperCase()}
          renderCustomHeader={({ monthDate, customHeaderCount, decreaseMonth, increaseMonth }) => {
            const month = dayjs(monthDate).format("YYYY.MM");
            return (
              <div>
                <button
                  className={"react-datepicker__navigation react-datepicker__navigation--previous"}
                  style={customHeaderCount === 1 ? { visibility: "hidden" } : null}
                  onClick={decreaseMonth}
                >
                  <span className={"react-datepicker__navigation-icon react-datepicker__navigation-icon--previous"}>
                    <CalendarRightArrowBk />
                  </span>
                </button>
                <span className="react-datepicker__current-month">{month}</span>
                <button
                  className={"react-datepicker__navigation react-datepicker__navigation--next"}
                  style={customHeaderCount === 1 ? { visibility: "hidden" } : null}
                  onClick={increaseMonth}
                >
                  <span className={"react-datepicker__navigation-icon react-datepicker__navigation-icon--next"}>
                    <CalendarRightArrowBk />
                  </span>
                </button>
              </div>
            );
          }}
          dateFormat="yyyy-MM-dd"
          minDate={new Date()}
          selected={startDate}
          startDate={startDate}
          endDate={endDate}
          onChange={onChange}
          selectsRange
          selectsDisabledDaysInRange
          inline
          disabledKeyboardNavigation
        />
        {date.start !== "Invalid Date" && date.end !== "Invalid Date" ? (
          <Button btnType="submit" on="on" onClick={addDateDispatch}>
            {dayjs(date.start).format("YY.MM.DD")} - {dayjs(date.end).format("YY.MM.DD")} / 선택완료
          </Button>
        ) : (
          <Button btnType="submit">기간을 선택해 주세요</Button>
        )}
      </StInput>
    </ModalWrap>
  );
};

export default CalendarModal;

const ModalWrap = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
`;

const StInput = styled.div`
  ${flexColumn}

  >div {
    width: 100%;
  }

  box-sizing: border-box;
  position: absolute;
  bottom: 0px;
  left: 0;
  width: 100%;

  .react-datepicker__header {
    padding: 30px 0 8px 0;
    background-color: #ffffff;
    border: none;
    border-radius: 20px 20px 0 0 !important;
  }

  .react-datepicker {
    border-radius: 20px 20px 0 0 !important;
  }

  .react-datepicker__month-container {
    float: none;
    margin-bottom: 25px;
  }

  .react-datepicker__current-month {
    font-size: 24px !important;
  }

  .react-datepicker__day-names,
  .react-datepicker__week {
    display: flex;
    justify-content: space-between;
  }

  .react-datepicker__day-names {
    color: #000000;
    opacity: 0.5;
  }

  .react-datepicker__day--selected {
    border-radius: 50%;
    background-color: ${colors.green77} !important;
  }

  .react-datepicker__day,
  .react-datepicker__day--selected,
  .react-datepicker__day--weekend {
    :hover {
      border-radius: 50%;
    }
    border: none;
  }

  .react-datepicker__day-names,
  .react-datepicker__month {
    margin: 0 17px;
  }

  .react-datepicker__day {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .react-datepicker__day-name {
    margin-top: 20px;
    width: 100%;
  }

  .react-datepicker__day--disabled {
    ::after {
      opacity: 0.5 !important;
    }
  }

  .react-datepicker__day--disabled {
    color: #000000;
    opacity: 0.5;
  }
  .react-datepicker__day--in-range,
  .react-datepicker__day--disabled {
    color: #000000;
    opacity: 0.5;
  }

  .react-datepicker__day,
  .react-datepicker__time-name {
    width: 100%;
    aspect-ratio: 1/1;
    margin: 3px 0;
    border: none;
  }

  .react-datepicker {
    justify-content: start;
    align-items: flex-end;
    width: 100%;
    padding: 0;
    z-index: 1;
    border: none;
  }

  .react-datepicker__current-month {
    font-size: 16px;
  }

  .react-datepicker__day--in-range {
    color: black;
    border-radius: 0;
    background-color: #ebf5dd;
    opacity: 1;
    border: none;
  }
  .react-datepicker__day--selecting-range-start {
    color: white !important;
  }
  .react-datepicker__day--in-selecting-range {
    border-radius: 50%;
    background-color: transparent;
    border: none;
    color: black;
    :hover {
      background-color: #ededed;
    }
  }

  .react-datepicker__day {
    border: none;
    font-size: 18px;
  }

  .react-datepicker__navigation {
    top: 30px;
    margin: 0 20px;
  }

  .react-datepicker__day--in-range {
    :hover {
      border-radius: 0%;
    }
    position: relative;
  }

  .react-datepicker__day--range-start {
    border-radius: 50%;
    background-color: ${colors.green77};
    color: #ffffff;
    :hover {
      border-radius: 50%;
    }
    ::after {
      content: "";
      z-index: -1;
      background-color: #ebf5dd;
      width: 50%;
      border-radius: 0;
      height: 100%;
      position: absolute;
      right: 0;
      opacity: 1 !important;
    }
    opacity: 1;
  }

  .react-datepicker__day--range-end {
    border-radius: 50%;
    background-color: ${colors.green77};
    position: relative;
    opacity: 1;
    color: #ffffff;
    ::after {
      content: "";
      z-index: -1;
      background-color: ${(props) => {
        return props.children[0].props.isdate ? "transparent" : "#EBF5DD";
      }};
      width: 50%;
      border-radius: 0;
      height: 100%;
      position: absolute;
      left: 0;
    }
    :hover {
      border-radius: 50%;
    }
  }
`;
