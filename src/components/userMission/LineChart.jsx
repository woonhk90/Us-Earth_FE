import React from "react";
import dayjs from "dayjs";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useState } from "react";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";
import { Line } from "react-chartjs-2";
import { getDailyMissionStats, getPeriodMissionStats } from "../../redux/modules/userMissonSlice";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export const graphClickEvent = (event, array) => {
  console.log("legend onClick", event);
  console.log("legd item", array);
};
const LineChart = ({ startDate, endDate }) => {
  const dispatch = useDispatch();
  const [data, setData] = useState({
    labels: [],
    datasets: [
      {
        label: "success",
        data: [],
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  });
  const { periodMissionData } = useSelector((state) => state.userMission);
  const [weekMissionDate, setWeekMissionDate] = useState([]);
  useEffect(() => {
    weekMissionDataCheck();
  }, [startDate, periodMissionData]);

  let stats = [];
  let week = [];
  const weekMissionDataCheck = () => {
    for (let i = 0; i < 7; i++) {
      let finding = periodMissionData.find((item) => item.createdAt === dayjs(startDate).add(i, "day").format("YYYY-MM-DD"));
      if (finding !== undefined) {
        stats.push(finding.count);
      } else {
        stats.push(0);
      }
      week.push(dayjs(startDate).add(i, "day").format("MM.DD"));
    }
    setWeekMissionDate(week);
    setData({
      labels: week,
      datasets: [
        {
          label: "success",
          data: stats,
          borderColor: "#ADD477",
          backgroundColor: "#ADD477",
          pointStyle: "circle",
          pointRadius: 5,
          pointHoverRadius: 10,
          borderWidth: 2,
        },
      ],
    });
  };
  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: false,
      },
    },
    interaction: {
      mode: "index",
      intersect: false,
    },
    onClick: (event, array) => {
      let index = array[0].index;
      let day = weekMissionDate[index];
      console.log(index);
      console.log(week);
      console.log(day);
      let year = dayjs(startDate).format("YYYY-");
      dispatch(getDailyMissionStats(`${year}${dayjs(day).format("MM-DD")}`));
    },

    maintainAspectRatio: false,
    layout: {
      padding: {
        left: 10,
        right: 30,
      },
    },
    scales: {
      y: {
        type: "linear",
        display: true,
        position: "left",

        min: 0,
        max: 6,
        ticks: {
          stepSize: 1,
        },
        grid: {
          tickLength: 7,
          display: true,
        },
      },
      x: {
        display: true,
        grid: {
          display: false,
        },
      },
    },
  };
  return <Line options={options} data={data} />;
};

export default LineChart;
