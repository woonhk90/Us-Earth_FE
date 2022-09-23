import React from "react";
import { ResponsiveLine } from "@nivo/line";
import dayjs from "dayjs";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useState } from "react";
import { getDailyMissionStats, getPeriodMissionStats } from "../../redux/modules/userMissonSlice";

const MyResponsiveLine = ({ startDate, endDate }) => {
  const dispatch = useDispatch();
  const { periodMissionData, dailyMissionData } = useSelector((state) => state.userMission);
  const [weekMissionData, setWeekMissionData] = useState([]);
console.log(periodMissionData)
  useEffect(() => {
    weekMissionDataCheck();
  }, [startDate]);

  let arry = [];
  const weekMissionDataCheck = () => {
    for (let i = 0; i < 7; i++) {
      console.log("추가", i);
      let finding = periodMissionData.find((item) => item.clearTime === dayjs(startDate).add(i, "day").format("YYYY-MM-DD"));
      if (finding === undefined) finding = { count: "" };
      console.log(finding);
      arry.push({
        x: dayjs(startDate).add(i, "day").format("MM.DD"),
        y: finding.count,
      });
    }
    arry.push({
      x: "",
      y: null,
    });
    setWeekMissionData(arry);
  };

  return (
    <LineWrap>
      <ResponsiveLine
        data={[
          {
            id: "mission",
            data: weekMissionData,
          },
        ]}
        onClick={(data) => {
          let year = dayjs(startDate).format("YYYY-");
          dispatch(getDailyMissionStats(`${year}${dayjs(data.data["xFormatted"]).format("MM-DD")}`));
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
            <ClickDot>
              완료일자
              <br />
              <b>{point.data.xFormatted}</b>
              <br />
              완료 수 <br />
              <b>{point.data.yFormatted}개</b>
            </ClickDot>
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
`;

const ClickDot = styled.div`
  text-align: start;
  font-size: 12px;
  b{
    font-size: 12px;

  }
`