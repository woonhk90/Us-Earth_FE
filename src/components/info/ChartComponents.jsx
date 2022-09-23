import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import Chart from './Chart';
import { __getEnvironment } from '../../redux/modules/infoSlice';

const ChartComponents = () => {
  const dispatch = useDispatch();
  const { infoEnvironment } = useSelector((state) => state.info);
  console.log(infoEnvironment);
  React.useEffect(() => {
    dispatch(__getEnvironment());
  }, [])
  return (
    <>
      <ChartWrap>
        <ChartBox>
          {infoEnvironment.map((v) =>
            <ChartItem key={v.category}>
              <ChartItemTitle>{v.category}</ChartItemTitle>
              <ChartItemContent><Chart chartInfo={v} /></ChartItemContent>
            </ChartItem>
          )}
        </ChartBox>
      </ChartWrap>
    </>
  )
}
export default ChartComponents;

const ChartWrap = styled.div`
  width:100%;
  padding:25px;
  box-sizing:border-box;
  background-color:#f6f6f6;
  `;
const ChartBox = styled.div`
  display:flex;
  flex-wrap:wrap;
  justify-content:center;
  align-items:center;
  text-align:center;
  gap:25px;
  font:600 20px/28px 'Noto Sans KR','sans-serif';
`;
const ChartItem = styled.div`
  width:45%;
  box-sizing:border-box;
`;
const ChartItemTitle = styled.div`
  font-size:20px;
  letter-spacing:-0.1em;
`;
const ChartItemContent = styled.div`
  width:80%;
  margin: 0 auto;
`;