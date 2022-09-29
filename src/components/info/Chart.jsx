import React from "react";
import styled from "styled-components";
import "react-circular-progressbar/dist/styles.css";
import { CircularProgressbar, CircularProgressbarWithChildren, buildStyles } from "react-circular-progressbar";
import ChangingProgressProvider from "./ChangingProgressProvider";
import { useSelector } from "react-redux";

const Chart = ({ chartInfo }) => {
  const [colorFlag, setColorFlag] = React.useState("0000ff");
  React.useEffect(() => {
    if (chartInfo.risk === "좋음") {
      setColorFlag("00b3ff96");
    } else if (chartInfo.risk === "보통") {
      setColorFlag("01d33694");
    } else if (chartInfo.risk === "나쁨") {
      setColorFlag("ffe353");
    } else if (chartInfo.risk === "매우나쁨") {
      setColorFlag("ff000057");
    }
  }, []);
  
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
      </ProgressWrap>
    </>
  );
};
export default Chart;

const ProgressWrap = styled.div`
  position: relative;
  width: 100%;
  margin: 0 auto;

  font-family: 'Noto Sans KR', 'sans-serif';
  .CircularProgressbar-path {
    /* stroke: #ffe353 !important; */
  }
  .CircularProgressbar-trail {
    stroke: gray;
  }
  .CircularProgressbar-text {
  font-family: 'Noto Sans KR', 'sans-serif';
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
  /* color:#ffe353; */
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
