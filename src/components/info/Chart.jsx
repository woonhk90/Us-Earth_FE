import React from 'react';
import styled from 'styled-components';
import { CircularProgressbarWithChildren } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const Chart = ({ val }) => {
  const [chartFlag, setChartFlag] = React.useState('좋음');
  const [colorFlag, setColorFlag] = React.useState('0000ff');
  React.useEffect(() => {
    if (val > 0 && val <= 25) {
      setChartFlag('좋음');
      setColorFlag('0000ff');
    } else if (val > 25 && val <= 50) {
      setChartFlag('보통');
      setColorFlag('008000');
    } else if (val > 50 && val <= 75) {
      setChartFlag('나쁨');
      setColorFlag('ffff00');
    } else if (val > 75) {
      setChartFlag('매우나쁨');
      setColorFlag('ff0000');
    }
  }, [])
  console.log(chartFlag);
  return (
    <>
      <ProgressWrap>
        <CircularProgressbarWithChildren value={val} strokeWidth={10} styles={{
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
          <ChartFlag>{val}</ChartFlag>
          <ChartFlag>{chartFlag}</ChartFlag>
        </CircularProgressbarWithChildren>
      </ProgressWrap>
    </>
  )
}
export default Chart;

const ProgressWrap = styled.div`
  width:100%;
`;

const ChartFlag = styled.div`
  font: 600 12px/20px "Noto Sans","sans-serif";
`;
