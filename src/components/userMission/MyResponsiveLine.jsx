import React from "react";
import { ResponsiveLine } from "@nivo/line";
import moment from "moment/moment";

// make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
// no chart will be rendered.
// website examples showcase many properties,
// you'll often use just a few of them.
const MyResponsiveLine = ({ data /* see data tab */ }) => (
  <ResponsiveLine
    data={[
      {
        id: "mission",
        data: [
          {
            x: "2022-09-30",
            y: 1,
          },
          {
            x: "2022-09-04",
            y: 3,
          },
          {
            x: "2022-09-21",
            y: 0,
          },
          {
            x: "2022-09-25",
            y: 4,
          },
          {
            x: "2022-09-29",
            y: 5,
          },
          {
            x: "2022-09-13",
            y: 2,
          },
        ],
      },
    ]}
    lineWidth={1}
    margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
    xScale={{ type: "point" }}
    yScale={{
      type: "linear",
      min: "0",
      max: "5",
      stacked: true,
      reverse: false,
    }}
    tooltip={({ point }) => {
      return (
        <p>
          완료일자: <b>{point.data.xFormatted}</b>
          <br />
          완료 수: <b>{point.data.yFormatted}</b>
        </p>
      );
    }}
    colors={"#8bcf67"}
    curve="natural"
    yFormat=" >-.1r"
    axisTop={null}
    axisRight={null}
    axisBottom={{
      orient: "bottom",
      tickSize: 5,
      tickPadding: 5,
      tickRotation: 0,
      legend: "transportation",
      legendOffset: 36,
      legendPosition: "middle",
    }}
    axisLeft={{
      orient: "left",
      tickSize: 5,
      tickPadding: 5,
      tickRotation: 0,
      tickValues: [0, 1, 2, 3, 4, 5],
      legend: "count",
      legendOffset: -40,
      legendPosition: "middle",
    }}
    pointSize={20}
    pointColor={{ from: "color", modifiers: [] }}
    pointBorderWidth={5}
    pointBorderColor={{ from: "serieColor" }}
    pointLabelYOffset={-12}
    useMesh={true}
    legends={[]}
  />
);

export default MyResponsiveLine;
