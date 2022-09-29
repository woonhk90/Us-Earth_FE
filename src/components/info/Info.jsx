import React from 'react'
import styled from 'styled-components';
import CampaignList from './CampaignList';
import ChartComponents from './ChartComponents';

const Info = () => {
  /* ------------------------------- goToTop 버튼 ------------------------------- */
  const [scrollPosition, setScrollPosition] = React.useState(0);

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
            <TopTitle>대기환경지수</TopTitle>

            <ChartComponents></ChartComponents>

          </InfoTop>


          <InfoBottom>
            <BottomTitle>캠페인 소식</BottomTitle>

            <CampaignList />

          </InfoBottom>


          <StGoBack
            onClick={onClickScroll}
            style={{ display: scrollPosition < 500 ? "none" : "inline" }}
          >
            upupupupupupupup
          </StGoBack>

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
  font: 600 26px/1 "Noto Sans","sans-serif";
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

const StGoBack = styled.div`
  position: fixed;
  bottom: 13%;
  right: 8%;
  border-radius: 100px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  width: 50px;
  height: 50px;
  border: 2px solid red;
`;
