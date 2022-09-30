import React from "react";
import dayjs from "dayjs";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useState } from "react";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";
import { Line } from "react-chartjs-2";
import { getDailyMissionStats} from "../../redux/modules/userMissionSlice";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const LineChart = ({ startDate, endDate }) => {
  const dispatch = useDispatch();
  const [data, setData] = useState({
    labels: [],
    datasets: [],
  });

  const { periodMissionData } = useSelector((state) => state.userMission);
  const [weekMissionDate, setWeekMissionDate] = useState([]);

  useEffect(() => {
    weekMissionDataCheck();
  }, [ periodMissionData]);

  let stats = [];
  let week = [];
  const weekMissionDataCheck = () => {
    for (let i = 0; i < 7; i++) {
      let finding = periodMissionData.find((item) => item.clearTime === dayjs(startDate).add(i, "day").format("YYYY-MM-DD"));
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
          label: "완료 수",
          data: stats,
          borderColor: "#ADD477",
          backgroundColor: "#ADD477",
          pointStyle: "circle",
          pointRadius: 5,
          pointHoverRadius: 8,
          borderWidth: 2,
        },
      ],
    });
  };
  const options = {
    responsive: true,
    plugins: {
      tooltip: {
        backgroundColor: "rgba(206, 243, 119, 0.486)",
        displayColors: false,
        bodyColor: `#000000`,
        titleColor: `#000000`,
      },
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
      xAxes: {
        ticks: {
          autoSkip: false,
          padding: 4,
          font: {
            size: 14,
          },
        },
        grid: {
          display: false,
        },
      },
      x: {
        display: false,
        ticks: {
          display: false,
        },
      },

      yAxes: {
        ticks: {
          autoSkip: false,
          padding: 4,
          font: {
            size: 14,
          },
          stepSize: 1,
        },

        min: 0,
        max: 6,
        grid: {
          display: true,
        },
      },
      y: {
        display: false,
      },
    },
  };
  return <Line options={options} data={data} />;
};

export default LineChart;
