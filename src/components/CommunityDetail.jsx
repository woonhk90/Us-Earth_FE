import React from "react";
import styled from "styled-components";
import Modal from "./CommunityDetailModal";
import { ReactComponent as Edit } from "../assets/Edit.svg";
import forest from "../assets/Forest.jpg";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { __getCommunityDetail } from "../redux/modules/communitySlice";

const CommunityDetail = () => {
  const [modal, setModal] = React.useState(false);
  const param = useParams();
  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(__getCommunityDetail({ communityId: param.id }));
  }, []);
  const { communityDetail } = useSelector((state) => state.community);
  console.log(communityDetail);
  return (
    <>
      <CommunityDetailWrap>
        <Container>
          <Forest imgUrl={forest}></Forest>
          <Content>
            <ContentItem font={"16px/22px 'Arial','sans-serif'"} marginBottom={"10px"}>
              {communityDetail.startDate} - {communityDetail.endDate}
            </ContentItem>
            <ContentItem font={"700 26px/35px 'Arial','sans-serif'"} marginBottom={"9px"}>
              {communityDetail.title}aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
            </ContentItem>
            <ContentItem font={"22px/30px 'Arial','sans-serif'"} marginBottom={"35px"}>
              {communityDetail.content}내용 추가내용 즐겁게 화티잉 합시다
            </ContentItem>
            {/* <ContentItem></ContentItem> */}
            <ContentItem
              marginBottom={"35px"}
              height={"500px"}
              imgUrl={
                communityDetail.img !== null
                  ? communityDetail.img.imgUrl
                  : "https://www.urbanbrush.net/web/wp-content/uploads/edd/2020/02/urbanbrush-20200227023608426223.jpg"
              }
            ></ContentItem>
            {/* <ContentItem marginBottom={'35px'} height={'500px'} imgUrl={communityDetail.imgList[0].imgUrl}></ContentItem> */}
          </Content>
          <StateBox>
            {communityDetail.dateStatus === "before" ? (
              !communityDetail.participant ? (
                <State>
                  <StateTop>
                    <StateItem font={"600 30px/40px 'Arial','sans-serif'"}>모집중</StateItem>
                    <StateItem font={"600 60px/82px 'Arial','sans-serif'"}> 5 </StateItem>
                    <StateItem font={"24px/32px 'Arial','sans-serif'"} color={"#9E9E9E"}>
                      / 10명
                    </StateItem>
                  </StateTop>
                  <StateBottom
                    onClick={() => {
                      setModal(!modal);
                    }}
                  >
                    참여하기
                  </StateBottom>
                  {modal && <Modal closeModal={() => setModal(!modal)} communityId={param.id}></Modal>}
                </State>
              ) : (
                <OnGoingState>
                  <p>참가완료</p>
                  <p>곧 캠페인이 시작됩니다.</p>
                </OnGoingState>
              )
            ) : null}
            {communityDetail.dateStatus === "ongoing" ? (
              <EndState>
                <EndStateTop>
                  <EndStateItem position={"absolute"} top={"0"} left={"0"}>
                    달성률
                  </EndStateItem>
                  <EndStateItem font={"600 44px/1 'Noto Sans', 'Arial', 'sans-serif'"} textAlign={"right"}>
                    50<span>% </span>
                    <span> /100%</span>
                  </EndStateItem>
                </EndStateTop>
                <EndStateBottom>
                  <ProgressBar value="50" max="100"></ProgressBar>
                </EndStateBottom>
              </EndState>
            ) : null}

            {communityDetail.dateStatus === "end" ? (
              <OnGoingState>
                <p>캠페인이 완료 되었습니다.</p>
              </OnGoingState>
            ) : null}
          </StateBox>
          <CertifyContentBox>
            <CertifyContent>
              <CertifyItem></CertifyItem>
              <CertifyItem></CertifyItem>
              <CertifyItem></CertifyItem>
              <CertifyItem></CertifyItem>
              <CertifyItem></CertifyItem>
              <CertifyItem></CertifyItem>
              <CertifyItem></CertifyItem>
              <CertifyItem></CertifyItem>
              <CertifyItem></CertifyItem>
              <CertifyItem></CertifyItem>
              <CertifyItem></CertifyItem>
            </CertifyContent>
            <CertifyContentIcon>
              <Edit />
            </CertifyContentIcon>
          </CertifyContentBox>
        </Container>
      </CommunityDetailWrap>
    </>
  );
};
export default CommunityDetail;

const CommunityDetailWrap = styled.div`
  width: 100vw;
`;
const Container = styled.div`
  width: 100%;
`;
const Forest = styled.div`
  width: 100%;
  height: 466px;
  border-bottom-left-radius: 26px;
  border-bottom-right-radius: 26px;
  margin-bottom: 41px;
  background: url(${(props) => props.imgUrl}) no-repeat 50% 50%;
  background-size: cover;
`;

const Content = styled.div`
  width: 100%;
  height: 100%;
  padding: 0 17px;
  box-sizing: border-box;
  margin-bottom: 35px;
`;
const ContentItem = styled.div`
  width: 100%;
  height: ${(props) => props.height};
  font: ${(props) => props.font};
  margin-bottom: 10px;
  word-break: break-all;
  background: url(${(props) => props.imgUrl}) no-repeat 50% 50%;
  background-size: cover;
`;

const StateBox = styled.div`
  width: 100%;
  padding: 0 16px;
  box-sizing: border-box;
  margin-bottom: 27px;
`;
const State = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid #ececec;
  border-radius: 15px;
`;
const StateTop = styled.div`
  text-align: center;
`;
const StateItem = styled.span`
  font: ${(props) => props.font};
  color: ${(props) => props.color};
`;
const StateBottom = styled.div`
  width: 100%;
  font: 18px/27px "Arial", "sana-serif";
  text-align: center;
  padding: 11px 0;
  background-color: #424242;
  color: #fff;
  border-bottom-left-radius: 15px;
  border-bottom-right-radius: 15px;
`;

const OnGoingState = styled.div`
  width: 100%;
  border: 1px solid #ececec;
  padding: 35px 0;
  border-radius: 12px;
  p {
    font: 600 30px/40px "Noto Sans", "Arial", "sans-serif";
    text-align: center;
  }
  p:nth-child(1) {
    color: #dddddd;
  }
  p:nth-child(2) {
    color: #202020;
  }
`;

const EndState = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 1px solid #ececec;
  border-radius: 12px;
  padding: 25px 18px 4px 18px;
  box-sizing: border-box;
`;
const EndStateTop = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: baseline;

  position: relative;
  top: 0;
  left: 0;
`;
const EndStateItem = styled.div`
  width: 100%;
  position: ${(props) => props.position};
  top: ${(props) => props.top};
  left: ${(props) => props.left};
  font: ${(props) => props.font};
  color: ${(props) => props.color};
  text-align: ${(props) => props.textAlign};
  span:nth-of-type(1) {
    font-size: 30px;
  }
  span:nth-of-type(2) {
    font: 18px/25px "Noto Sans", "Arial", "sans-serif";
    color: #9e9e9e;
  }
`;
const EndStateBottom = styled.div`
  width: 100%;
`;
const ProgressBar = styled.progress`
  accent-color: #1c1c1c;
  display: inline-block;
  width: 100%;
  height: 50px;
  opacity: 0.4;
  padding: 0;
  margin: 0;
`;

const CertifyContentBox = styled.div`
  position: relative;
`;
const CertifyContent = styled.div`
  display: grid;
  justify-items: center;
  grid-template-columns: repeat(auto-fill, minmax(33%, auto));
  gap: 1px;
`;
const CertifyContentIcon = styled.div`
  position: absolute;
  bottom: 43px;
  right: 17px;
  width: 71px;
  height: 71px;
  background-color: #515151;
  border-radius: 50%;

  display: flex;
  justify-content: center;
  align-items: center;
`;
const CertifyItem = styled.div`
  width: 128px;
  height: 141px;
  background-color: #d9d9d9;
`;
