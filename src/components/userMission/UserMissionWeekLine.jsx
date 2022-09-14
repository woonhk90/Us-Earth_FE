import React from "react";
import { ResponsiveLine } from "@nivo/line";
import dayjs from "dayjs";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useState } from "react";
import { getDailyMissionStats, getPeriodMissionStats } from "../../redux/modules/userMissonSlice";

// make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
// no chart will be rendered.
// website examples showcase many properties,
// you'll often use just a few of them.
const MyResponsiveLine = ({ startDate, endDate }) => {
  const dispatch = useDispatch();
  const { periodMissionData, dailyMissionData } = useSelector((state) => state.userMission);
  console.log(startDate);
  // console.log(endDate);
  console.log(periodMissionData);
  // console.log(dailyMissionData);

  const [arrData, setArrData] = useState([]);
  console.log(arrData);

  useEffect(() => {
    arrys(startDate);
  }, []);
let arry = [];
  let arr = [
    { selectedDate: null, clearMissionCnt: 0, clearMissionList: null, createdAt: "2022-09-12", count: 4 },
    { selectedDate: null, clearMissionCnt: 0, clearMissionList: null, createdAt: "2022-09-13", count: 4 },
    { selectedDate: null, clearMissionCnt: 0, clearMissionList: null, createdAt: "2022-09-14", count: 3 },
    { selectedDate: null, clearMissionCnt: 0, clearMissionList: null, createdAt: "2022-09-15", count: 1 },
  ];
  const arrys = () => {
    arr.map((item)=>{
      arry.push({
        x:dayjs(item.createdAt).format("MM.DD"),
        y:item.count,
      })
    })
    arry.push({
      x: "",
      y: null,
    });
    setArrData(arry);
  };

  return (
    <LineWrap>
      <ResponsiveLine
        data={[
          {
            id: "mission",
            data: arrData,
          },
        ]}
        onClick={(data) => {
          let year = dayjs(startDate).format("YYYY-");
          dispatch(getDailyMissionStats(`${year}${dayjs(data.data["xFormatted"]).format("MM-DD")}`))
        }}
        lineWidth={1.5}
        margin={{ top: 15, right: 0, bottom: 55, left: 50 }}
        xScale={{ type: "point" }}
        yScale={{
          type: "linear",
          min: "0",
          max: "5",
          stacked: true,
          reverse: false,
        }}
        enableGridX={false}
        tooltip={({ point }) => {
          return (
            <p>
              완료일자: <b>{point.data.xFormatted}</b>
              <br />
              완료 수: <b>{point.data.yFormatted}</b>
            </p>
          );
        }}
        colors={"#ADD477"}
        curve="linear"
        yFormat=" >-.1r"
        axisTop={null}
        axisRight={null}
        axisBottom={{
          orient: "bottom",
          tickSize: 0,
          tickPadding: 5,
          tickRotation: 0,
          tickPadding: 10,
        }}
        axisLeft={{
          orient: "left",
          tickSize: 0,
          tickPadding: 5,
          tickRotation: 0,
          tickValues: [0, 1, 2, 3, 4, 5],
          tickPadding: 25,
        }}
        pointSize={8}
        pointColor={{ from: "color", modifiers: [] }}
        pointBorderWidth={5}
        pointBorderColor={{ from: "serieColor" }}
        pointLabelYOffset={-12}
        useMesh={true}
        legends={[]}
      />
    </LineWrap>
  );
};

export default MyResponsiveLine;

const LineWrap = styled.div`
  width: 100%;
  height: 100%;

  border-bottom: 1px solid #dbdbdb;
  > div > div > svg > g > g {
    text {
      font-size: 14px !important;
      font-weight: 400 !important;
    }
    /* background-color:red !important;
    color:red !important;
    border: 1px solid red; */
    line {
      transform: translateX(-15px);
    }
    &:nth-child(1) line:nth-child(2n) {
      stroke: transparent !important;
    }
    &:nth-child(1) line:nth-child(2n-1) {
      stroke: #f5f5f5 !important;
    }
    &:nth-child(3) {
      line {
        stroke: #d9d9d9 !important;
      }
    }
    &:nth-child(2) {
      transform: translate(5, 200);
      width: 100px !important;

      line {
        width: 100px !important;
        line-height: normal 1 20%;
        stroke: #d9d9d9 !important;
      }
    }
    &:nth-child(1) {
      stroke-width: 20px;
      position: absolute;
      top: 0;
      transform: translate(5, 200) !important;
      margin: 20px;
      box-sizing: border-box;
    }
    /* &:nth-child(5) > g > circle {
      &:nth-child(1) {
          background-color: green !important;
          fill: rgb(255, 255, 255) !important;
          stroke: rgb(255, 255, 255) !important;
      }
    } */
  }
`;
