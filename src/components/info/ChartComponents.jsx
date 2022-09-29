import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import Chart from './Chart';
import { __getEnvironment } from '../../redux/modules/infoSlice';

const ChartComponents = () => {
  const dispatch = useDispatch();
  const { infoEnvironment } = useSelector((state) => state.info);
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
  box-sizing:border-box;
  `;
const ChartBox = styled.div`
padding: 37px 23px;
  display:flex;
  flex-wrap:wrap;
  justify-content:center;
  align-items:center;
  text-align:center;
  gap:25px;
  font:600 20px/28px 'Noto Sans KR','sans-serif';

  
background: #FFFFFF;
border: 1px solid #FAFAFA;
box-shadow: 1px 2px 2px rgba(0, 0, 0, 0.02);
border-radius: 6px;
`;
const ChartItem = styled.div`
  width:45%;
  box-sizing:border-box;
`;
const ChartItemTitle = styled.div`
font-weight: 600;
font-size: 20px;
line-height: 27px;
text-align: center;
letter-spacing: -0.03em;
margin-bottom: 10px;
`;
const ChartItemContent = styled.div`
  width:80%;
  margin: 0 auto;
`;