import React from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import Chart from "./Chart";
import { __getEnvironment } from "../../redux/modules/infoSlice";
import { colors } from "../../styles/color";

const ChartComponents = () => {
  const dispatch = useDispatch();
  const { infoEnvironment } = useSelector((state) => state.info);
  React.useEffect(() => {
    dispatch(__getEnvironment());
  }, []);
  return (
    <>
      <ChartWrap>
        <ChartBox>
          {infoEnvironment.map((v) => (
            <ChartItem key={v.category}>
              <ChartItemTitle>{v.category}</ChartItemTitle>
              <ChartItemContent>
                <Chart chartInfo={v} />
              </ChartItemContent>
            </ChartItem>
          ))}
          <ChartBottom>1시간 단위로 업데이트되며, 변경될 수 있습니다.</ChartBottom>
        </ChartBox>
      </ChartWrap>
    </>
  );
};
export default ChartComponents;

const ChartWrap = styled.div`
  width: 100%;
  box-sizing: border-box;
`;
const ChartBox = styled.div`
position: relative;
  padding: 30px 23px 60px 23px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  text-align: center;
  gap: 25px;
  font: 600 20px/28px "Noto Sans KR", "sans-serif";
  background: #ffffff;
  border: 1px solid #fafafa;
  box-shadow: 1px 2px 2px rgba(0, 0, 0, 0.02);
  border-radius: 6px;
  
  @media (max-width: 389px) {
  padding: 30px 23px 60px 23px;
  gap: 15px;
  }
`;
const ChartItem = styled.div`
  width: 45%;
  box-sizing: border-box;
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
  width: 80%;
  margin: 0 auto;
`;

const ChartBottom = styled.span`
position: absolute;
right: 15px;
bottom:-2px;
color: ${colors.gray7B};
  font-weight: 500;
  font-size: 12px;
  line-height: 16px;
  display: flex;
  align-items: flex-end;
  align-content: flex-end;
  justify-content: flex-end;
  box-sizing: border-box;
  text-align: right;
  letter-spacing: -0.03em;
  margin-bottom: 10px;
`