import React from 'react'
import styled from 'styled-components';
import Chart from './Chart';
import CampaignList from './CampaignList';

const Info = () => {
  /* ------------------------------- goToTop 버튼 ------------------------------- */
  const [scrollPosition, setScrollPosition] = React.useState(0);
  console.log(scrollPosition);

  const updateScroll = () => {
    setScrollPosition(window.scrollY);
  };

  React.useEffect(() => {
    window.addEventListener("scroll", () => { updateScroll() });
  }, [scrollPosition]);

  const onClickScroll = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  return (
    <>
      <InfoWrap>
        <Container>
          <InfoTop>
            <TopTitle>차트제목</TopTitle>
            <ChartWrap>
              <ChartTotal>
                <ChartTotalTitle>통합대기 <span>{Math.ceil((18 + 26 + 77) / 3)}</span> <span>좋음</span></ChartTotalTitle>
                <ChartTotalContent><progress value={Math.ceil((18 + 26 + 77) / 3)} max='100' /></ChartTotalContent>
              </ChartTotal>
              <ChartBox>
                <ChartItem>
                  <ChartItemTitle>미세먼지</ChartItemTitle>
                  <ChartItemContent><Chart val={18} /></ChartItemContent>
                </ChartItem>
                <ChartItem>
                  <ChartItemTitle>초미세먼지</ChartItemTitle>
                  <ChartItemContent><Chart val={26} /></ChartItemContent>
                </ChartItem>
                <ChartItem>
                  <ChartItemTitle>오존</ChartItemTitle>
                  <ChartItemContent><Chart val={77} /></ChartItemContent>
                </ChartItem>
              </ChartBox>
            </ChartWrap>
          </InfoTop>


          <InfoBottom>
            <BottomTitle>캠페인 소식</BottomTitle>

            <CampaignList />

          </InfoBottom>


          <StGoBack
            onClick={onClickScroll}
            style={{ display: scrollPosition < 1 ? "none" : "inline" }}
          >
            upupupupupupupup
          </StGoBack>

        </Container>
      </InfoWrap>
    </>
  )
}
export default Info;

const InfoWrap = styled.div`width:100%`;
const Container = styled.div`width:100%`;
const InfoTop = styled.div`
  width:100%;
  padding:40px 16px;
  box-sizing:border-box;
`;
const TopTitle = styled.div`
  font:600 26px/1 'Noto Sans','Arial','sans-serif';
  padding:0 0 22px;
`;

const ChartWrap = styled.div`
  width:100%;
  padding:32px 25px 40px;
  box-sizing:border-box;
  background-color:#f6f6f6;
`;
const ChartTotal = styled.div``;
const ChartTotalTitle = styled.div`
  font:600 20px/28px 'Noto Sans','Arial','sans-serif';
  span:nth-child(1){
    font:600 32px/45px 'Noto Sans','Arial','sans-serif';  
  }
`;
const ChartTotalContent = styled.div`
  width:100%;
  padding:0 0 25px;
  box-sizing:border-box;
  progress{
    appearance: none;
    width:100%;
    height:15px;
  }
  progress::-webkit-progress-bar {
    background:#e2e2e2;
    border-radius:50px;
  }
  progress::-webkit-progress-value {
    border-radius:50px;
    background:#818181;
  }
`;
const ChartBox = styled.div`
  display:flex;
  justify-content:center;
  align-items:center;
  gap:30px;
  text-align:center;
  font:600 20px/28px 'Noto Sans','Arial','sans-serif';
`;
const ChartItem = styled.div``;
const ChartItemTitle = styled.div`letter-spacing:-0.1em;`;
const ChartItemContent = styled.div``;





const InfoBottom = styled.div`
  width:100%;
  padding:0 16px;
  box-sizing:border-box;
`;
const BottomTitle = styled.div`
  font:600 26px/1 'Noto Sans','Arial','sans-serif';
  padding:0 0 22px;
`;




const StGoBack = styled.div`
  position: fixed;
  bottom: 13%;
  right: 8%;
  border-radius: 100px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  width: 50px;
  height: 50px;
  border:2px solid red;
`;