import React from "react";
import styled from "styled-components";
import CampaignList from "./CampaignList";
import ChartComponents from "./ChartComponents";

const Info = () => {
  return (
    <>
      <InfoWrap>
        <Container>
          <InfoTop>
            <TopTitle>대기환경지수</TopTitle>

            <ChartComponents></ChartComponents>
          </InfoTop>

          <InfoBottom>
            <BottomTitle>캠페인 소식</BottomTitle>

            <CampaignList />
          </InfoBottom>
        </Container>
      </InfoWrap>
    </>
  );
};
export default Info;

const InfoWrap = styled.div`
  width: 100%;
`;
const Container = styled.div`
  width: 100%;
`;
const InfoTop = styled.div`
  width: 100%;
  padding: 40px 16px;
  box-sizing: border-box;
`;
const TopTitle = styled.div`
  font: 600 26px/1 "Noto Sans", "sans-serif";
  padding: 0 0 22px;
`;

const InfoBottom = styled.div`
  width: 100%;
  padding: 0 16px;
  box-sizing: border-box;
`;
const BottomTitle = styled.div`
  font: 600 26px/1 "Noto Sans", "sans-serif";
  padding: 0 0 22px;
`;
