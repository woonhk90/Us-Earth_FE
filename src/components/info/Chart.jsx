import React from 'react';
import styled from 'styled-components';
import { CircularProgressbarWithChildren } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const Chart = ({ chartInfo }) => {
  const [chartFlag, setChartFlag] = React.useState('좋음');
  const [colorFlag, setColorFlag] = React.useState('0000ff');
  React.useEffect(() => {
    if (chartInfo.risk === '좋음') {
      setColorFlag('0000ff');
    } else if (chartInfo.risk === '보통') {
      setColorFlag('00FF00');
    } else if (chartInfo.risk === '나쁨') {
      setColorFlag('FFFF00');
    } else if (chartInfo.risk === '매우나쁨') {
      setColorFlag('FF0000');
    }
  }, [])
  return (
    <>
      <ProgressWrap>
        <CircularProgressbarWithChildren value={chartInfo.amount / chartInfo.maxAmount * 100} strokeWidth={10} styles={{
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
        </CircularProgressbarWithChildren>
      </ProgressWrap>
    </>
  )
}
export default Chart;

const ProgressWrap = styled.div`
  width:100%;
  margin:0 auto;
`;

const ChartFlag = styled.div`
  font:600 14px/20px 'Noto Sans KR','sans-serif';
`;