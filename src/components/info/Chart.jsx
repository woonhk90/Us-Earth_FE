import React from "react";
import styled from "styled-components";
import "react-circular-progressbar/dist/styles.css";
import { CircularProgressbar, CircularProgressbarWithChildren, buildStyles } from "react-circular-progressbar";
import ChangingProgressProvider from "./ChangingProgressProvider";
import { useSelector } from "react-redux";

const Chart = ({ chartInfo }) => {
  const [chartFlag, setChartFlag] = React.useState("좋음");
  const [colorFlag, setColorFlag] = React.useState("0000ff");
  React.useEffect(() => {
    if (chartInfo.risk === "좋음") {
      // setColorFlag('linear-gradient(90deg, #e8e8e8 0px, #f8f8f8 40px, #e8e8e8 80px)');
      setColorFlag("00b3ff96");
    } else if (chartInfo.risk === "보통") {
      // setColorFlag('linear-gradient(90deg, #e8e8e8 0px, #f8f8f8 40px, #e8e8e8 80px)');
      setColorFlag("01d33694");
    } else if (chartInfo.risk === "나쁨") {
      setColorFlag("ffff006a");
      // setColorFlag('linear-gradient(90deg, #e8e8e8 0px, #f8f8f8 40px, #e8e8e8 80px)');
    } else if (chartInfo.risk === "매우나쁨") {
      // setColorFlag('linear-gradient(90deg, #e8e8e8 0px, #f8f8f8 40px, #e8e8e8 80px)');
      setColorFlag("ff000057");

      // background: linear-gradient(90deg, #e8e8e8 0px, #f8f8f8 40px, #e8e8e8 80px);
    }
  }, []);
  const { infoEnvironment } = useSelector((state) => state.info);
  console.log(infoEnvironment);
  const stats = (chartInfo.amount / chartInfo.maxAmount) * 100;
  console.log(stats);
  return (
    <>
      <ProgressWrap>
        <ChangingProgressProvider values={[(chartInfo.amount / chartInfo.maxAmount) * 100]}>
          {(value) => (
            <>
              <CircularProgressbar
                value={value}
                text={`${chartInfo.amount}`}
                circleRatio={0.75}
                styles={buildStyles({
                  rotation: 1 / 2 + 1 / 8,
                  strokeLinecap: "butt",
                  trailColor: "#eee",
                  strokeLinecap: "round",
                  background: {
                    fill: "eee",
                  },
                  // borderRadius:"50%"
                  pathColor: `#${colorFlag}`,
                })}
              />
              <RiskName colorFlag={colorFlag}>{chartInfo.risk}</RiskName>
            </>
          )}
        </ChangingProgressProvider>

        {/* <CircularProgressbarWithChildren value={chartInfo.amount / chartInfo.maxAmount * 100} strokeWidth={10} styles={{
          root: { height: "100%" },
          path: {
            stroke: `#${colorFlag}`,
            strokeLinecap: "butt",
            transition: "stroke-dashoffset 0.5s ease 0s",
          },
          trail: {
            stroke: "#d7d7d7",
          },
          background: {
            fill: "#3e98c7",
          }
        }}>
          <ChartFlag>{chartInfo.amount}</ChartFlag>
          <ChartFlag>{chartInfo.risk}</ChartFlag>
        </CircularProgressbarWithChildren> */}
      </ProgressWrap>
    </>
  );
};
export default Chart;

const ProgressWrap = styled.div`
  position: relative;
  width: 100%;
  margin: 0 auto;

  .CircularProgressbar-path {
    /* stroke: #ffff006a !important; */
  }
  .CircularProgressbar-trail {
    stroke: gray;
  }
  .CircularProgressbar-text {
    fill: #000000;
    font-style: normal;
    font-weight: 600;
    /* font-size: 32px; */
    line-height: 44px;
    text-align: center;
    letter-spacing: -0.03em;
  }
  .CircularProgressbar-background {
    fill: green;
  }
`;

const RiskName = styled.div`
  color: ${(props) => `#${props.colorFlag}`};
  position: absolute;
  /* top:5px; */
  bottom: 0;
  text-align: center;
  left: 50%;
  transform: translate(-50%, 0);

  font-weight: 500;
  font-size: 18px;
  line-height: 25px !important;
  text-align: center;
  letter-spacing: -0.03em;
`;

const ChartFlag = styled.div`
  font: 600 14px/20px "Noto Sans KR", "sans-serif";
`;
