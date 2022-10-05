import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Modal from "./CommunityDetailModal";
import forest1 from "../assets/forest_01.gif";
import forest2 from "../assets/forest_02.gif";
import forest3 from "../assets/forest_03.gif";
import forest4 from "../assets/forest_04.gif";
import forest5 from "../assets/forest_05.gif";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  __getCommunityDetail,
  __getCommunityCertify,
  errorReset,
  detailReset,
} from "../redux/modules/communitySlice";
import { useInView } from "react-intersection-observer";
import { colors } from "../styles/color";
import { getCookie } from "../shared/cookie";
import LoginModal from "./Modals/LoginModal";
import NoMore from "../components/etc/NoMore";
import Loading from "./etc/Loading";
import ErrorModal from "./Modals/ErrorModal";
import icons from "../assets";
import Button from "./elements/Button";

const CommunityDetail = () => {
  const { CommunityNewProof } = icons;
  const navigate = useNavigate();
  const [modal, setModal] = React.useState(false);
  const param = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(__getCommunityDetail({ communityId: param.id }));
    return () => dispatch(detailReset()); //detail clean-up
  }, [dispatch, param.id]);
  const { communityDetail, isLoading, detailIsLoading, error, certifyHasMore } =
    useSelector((state) => state.community);
  console.log(communityDetail);

  /* ------------------------------- 무한스크롤 기본셋팅 ------------------------------- */
  const { certify } = useSelector((state) => state.community);
  const [page, setPage] = useState(0);
  const { ref, inView, entry } = useInView({
    threshold: 0,
  });

  useEffect(() => {
    dispatch(
      __getCommunityCertify({ page, communityId: param.id })
    ); /*인증글전체조회하려고*/
  }, [page, dispatch, param]);
  useEffect(() => {
    if (inView) {
      setPage((page) => page + 1);
    }
  }, [inView]);

  /* ----------------------------------- 로그인 ---------------------------------- */
  const [loginModal, setLoginModal] = useState(false);
  const loginModalOnOff = () => {
    setLoginModal(!loginModal);
  };

  const onInJoinBtn = () => {
    dispatch(errorReset());
    if (getCookie("mycookie") === undefined) {
      setLoginModal(!loginModal);
    } else {
      setModal(!modal);
    }
  };

  /* ------------------------------ 단계별 숲 이미지 띄우기 ----------------------------- */
  // const [forest, setForest] = useState();
  let gifUrl;
  if (communityDetail.successPercent <= 20) {
    gifUrl = forest1;
  } else if (
    Number(communityDetail.successPercent) > 21 &&
    Number(communityDetail.successPercent) <= 40
  ) {
    gifUrl = forest2;
  } else if (
    Number(communityDetail.successPercent) > 41 &&
    Number(communityDetail.successPercent) <= 60
  ) {
    gifUrl = forest3;
  } else if (
    Number(communityDetail.successPercent) > 61 &&
    Number(communityDetail.successPercent) <= 80
  ) {
    gifUrl = forest4;
  } else if (Number(communityDetail.successPercent) > 81) {
    gifUrl = forest5;
  }
  /* ----------------------------------- 이미지 확대 ---------------------------------- */
  const [imageModal, setImageModal] = useState(false);

  const imageModalOnOff = () => {
    setImageModal(!imageModal);
  };

  /* --------------------------- 수정, 삭제, 신고하기 셀렉트 박스 -------------------------- */
  // const { dateStatus, commentResponseDtoList } = useSelector((state) => state.comments.comments);

  // // dispatch function
  // const clickDispatch = (payload) => {
  //   if (payload.selectName === "수정하기") {
  //     /* ------------------------- detail수정페이지로 navigate시킴 ------------------------ */
  //     navigate(`/community/edit/${payload.contentId}`);
  //   } else if (payload.selectName === "삭제하기") {
  //     /* ------------------------------- Detail를 삭제함 ------------------------------ */
  //     setDelModal(!delModal);
  //   }
  // };

  // // data
  // const { Delete, Report, Edit } = icons;
  // const selectBoxData = [
  //   {
  //     id: 1,
  //     selectName: "수정하기",
  //     icon: [
  //       <ModalIcon key={1}>
  //         <Edit />
  //       </ModalIcon>,
  //     ],
  //   },
  //   {
  //     id: 2,
  //     selectName: "삭제하기",
  //     icon: [
  //       <ModalIcon key={2}>
  //         <Delete />
  //       </ModalIcon>,
  //     ],
  //   },
  // ];

  // /* ---------------------------------- 삭제 모달 --------------------------------- */
  // const [delModal, setDelModal] = useState(false);

  // // modal text data
  // const confirmModalData = {
  //   title: "해당 글을 삭제하시겠습니까?",
  //   cancel: "아니오",
  //   submit: "예",
  // };

  // // editMode cancel function
  // const clickSubmit = async () => {
  //   await dispatch(deleteCommunityDetail({ communityId: param.id }));
  //   navigate('/', { replace: true });
  // };

  // // close Modal
  // const closeModal = () => {
  //   setDelModal(!delModal);
  // };

  /* ------------------------------- 로딩&에러 모달 ------------------------------ */

  if (detailIsLoading) {
    return (
      <>
        <Loading />
      </>
    );
  }

  if (error.length) {
    return <ErrorModal error={error} />;
  }

  return (
    <>
      {/* {imageModal && <ImageModal image={communityDetail?.img} modalOnOff={imageModalOnOff} modal={imageModal}></ImageModal>} */}
      {loginModal && (
        <LoginModal
          modalOnOff={loginModalOnOff}
          modal={loginModal}
        ></LoginModal>
      )}
      {/* {delModal && <ConfirmSingleModal clickSubmit={clickSubmit} confirmModalData={confirmModalData} closeModal={closeModal}></ConfirmSingleModal>} */}
      <CommunityDetailWrap>
        <Container>
          <Forest imgUrl={gifUrl}></Forest>

          {/* <DetailSetting>
            {communityDetail.dateStatus === "before" ?
              (communityDetail.writer ? <CustomSelect clickDispatch={clickDispatch} contentId={param.id} selectBoxData={selectBoxData} /> : null)
              :
              null
            }
          </DetailSetting> */}

          <Content>
            <ContentItem
              font={"16px/22px 'Noto Sans KR', 'sans-serif'"}
              marginBottom={"10px"}
            >
              {communityDetail.startDate} - {communityDetail.endDate}
            </ContentItem>
            <ContentItem
              font={"700 26px/35px 'Noto Sans KR', 'sans-serif'"}
              marginBottom={"9px"}
            >
              {communityDetail.title}
            </ContentItem>
            <ContentItem
              font={"22px/30px 'Noto Sans KR', 'sans-serif'"}
              marginBottom={"35px"}
            >
              {communityDetail.content}
            </ContentItem>
            <ContentItem marginBottom={"35px"}>
              {" "}
              {communityDetail?.img !== null ? (
                <img src={communityDetail?.img} alt="img" />
              ) : null}{" "}
            </ContentItem>
          </Content>

          <StateBox>
            {communityDetail.dateStatus === "before" ? (
              !communityDetail.participant ? (
                <State>
                  <StateTop>
                    <StateItem
                      font={"600 30px/40px 'Noto Sans KR', 'sans-serif'"}
                    >
                      모집중
                    </StateItem>
                    <StateItem
                      font={"600 60px/82px 'Noto Sans KR', 'sans-serif'"}
                    >
                      {" "}
                      {communityDetail.participantsCnt}{" "}
                    </StateItem>
                    <StateItem
                      font={"24px/32px 'Noto Sans KR', 'sans-serif'"}
                      color={"#9E9E9E"}
                    >
                      / {communityDetail.limitParticipants}명
                    </StateItem>
                  </StateTop>
                  <Button
                    btnType="communityJoin"
                    color={colors.green00}
                    onClick={() => {
                      onInJoinBtn();
                    }}
                  >
                    참여하기
                  </Button>
                  {modal && (
                    <Modal
                      closeModal={() => setModal(!modal)}
                      communityId={param.id}
                    ></Modal>
                  )}
                </State>
              ) : (
                <OnGoingState>
                  <p>참가완료</p>
                  <p>곧 캠페인이 시작됩니다.</p>
                </OnGoingState>
              )
            ) : null}
            {communityDetail.dateStatus === "ongoing" ? (
              <div>
                <EndState
                  style={
                    communityDetail.currentPercent === 100
                      ? {
                          borderBottomLeftRadius: "12px",
                          borderBottomRightRadius: "12px",
                        }
                      : null
                  }
                >
                  <EndStateTop>
                    <RightTop>
                      <p>참여인원</p>
                      <p>
                        ({communityDetail.participantsCnt}/
                        {communityDetail.limitParticipants})
                      </p>
                    </RightTop>
                    <LeftTop>
                      <p>달성률</p>
                      <p>
                        {communityDetail.successPercent}
                        <span>% </span>
                        <span> /100%</span>
                      </p>
                    </LeftTop>
                  </EndStateTop>
                  <EndStateBottom>
                    <progress
                      value={communityDetail.successPercent}
                      max="100"
                    ></progress>
                  </EndStateBottom>
                </EndState>
                {communityDetail.currentPercent ===
                100 ? null : communityDetail.participant ? null : (
                  <Button
                    btnType="communityJoin"
                    color={colors.green00}
                    onClick={() => {
                      onInJoinBtn();
                    }}
                  >
                    참여하기
                  </Button>
                )}
                {modal && (
                  <Modal
                    closeModal={() => setModal(!modal)}
                    communityId={param.id}
                  ></Modal>
                )}
              </div>
            ) : null}

            {communityDetail.dateStatus === "end" ? (
              <OnGoingState>
                <p>캠페인이 완료 되었습니다.</p>
              </OnGoingState>
            ) : null}
          </StateBox>

          {/* 인증글 리스트 */}
          <CertifyContentBox>
            <CertifyContent>
              {certify.map((v) => (
                <CertifyItem
                  key={v.proofId}
                  onClick={() =>
                    navigate(`/community/${param.id}/proof/${v.proofId}`)
                  }
                >
                  <img src={v.img[0].imgUrl} alt="proofImg" />
                </CertifyItem>
              ))}
            </CertifyContent>
          </CertifyContentBox>

          {/* 글작성아이콘 */}
          {getCookie("mycookie") ===
          undefined ? null : communityDetail.participant ? (
            communityDetail.dateStatus === "ongoing" ? (
              <Button
                btnType="communityWrite"
                svgType="newProof"
                onClick={() =>
                  navigate(`/community/${param.id}/proof/form`, {
                    replace: true,
                  })
                }
              ></Button>
            ) : null
          ) : null}

          {certify.length === 0 ? (
            <NoMore txt={"아직 작성글이 없어요."} />
          ) : null}
          {certifyHasMore ? (
            isLoading ? null : (
              <div ref={ref} style={{ border: "1px solid white" }}></div>
            )
          ) : null}
        </Container>
      </CommunityDetailWrap>
    </>
  );
};
export default CommunityDetail;

const CommunityDetailWrap = styled.div`
  width: 100%;
`;
const Container = styled.div`
  width: 100%;
`;
const Forest = styled.div`
  width: 100%;
  height: 416px;
  border-bottom-left-radius: 26px;
  border-bottom-right-radius: 26px;
  margin-bottom: 41px;
  background: url(${(props) => props.imgUrl}) no-repeat 50% 50%;
  background-size: cover;
`;

const DetailSetting = styled.div`
  display: flex;
  justify-content: end;
  margin-right: 25px;
`;

const Content = styled.div`
  width: 100%;
  padding: 0 17px;
  box-sizing: border-box;
  margin-bottom: 35px;
`;
const ContentItem = styled.div`
  width: 100%;
  font: ${(props) => props.font};
  margin-bottom: ${(props) => props.marginBottom};
  word-break: break-all;
  white-space: pre-line;
  img {
    width: 100%;
  }
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
  font: 18px/27px "Noto Sans KR", "sana-serif";
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
    font: 600 30px/40px "Noto Sans KR", "sans-serif";
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
  border-top-left-radius: 12px;
  border-top-right-radius: 12px;
  padding: 25px 18px 20px 18px;
  box-sizing: border-box;
`;
const EndStateTop = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
`;
const RightTop = styled.div`
  width: 100%;
  p {
    font-weight: 600;
    font-size: 20px;
    line-height: 30px;
    font-family: "Noto sans KR", "sans-serif";
  }
  p:nth-child(2) {
    color: ${colors.gray9E};
  }
`;
const LeftTop = styled.div`
  width: 100%;
  text-align: right;
  p:nth-child(1) {
    font-weight: 600;
    font-size: 20px;
    line-height: 25px;
    font-family: "Noto sans KR", "sans-serif";
  }
  p:nth-child(2) {
    font-weight: 600;
    font-size: 40px;
    line-height: 1;
    font-family: "Noto sans KR", "sans-serif";

    span:nth-of-type(1) {
      font-size: 30px;
      @media (max-width: 299px) {
        font-size: 18px;
      }
    }
    span:nth-of-type(2) {
      font: 18px/25px "Noto Sans KR", "sans-serif";
      color: #9e9e9e;
    }
  }
`;

const EndStateBottom = styled.div`
  width: 100%;
  margin: 10px 0;

  progress {
    appearance: none;
    width: 100%;
    height: 20px;
  }
  progress::-webkit-progress-bar {
    background: transparent;
    border-radius: 10px;
    box-shadow: 1px 1px 1px 0px rgba(0, 0, 0, 0.2);
  }
  progress::-webkit-progress-value {
    border-radius: 10px;
    background: linear-gradient(to right, ${colors.green89}, ${colors.green28});
  }
`;

const EndStateJoin = styled.div`
  width: 100%;

  font: 18px/27px "Noto Sans KR", "sana-serif";
  text-align: center;
  padding: 11px 0;
  background-color: ${colors.green00};
  color: #fff;
  border-bottom-left-radius: 12px;
  border-bottom-right-radius: 12px;
`;
// const ProgressBar = styled.progress`
//   accent-color: #1c1c1c;
//   display: inline-block;
//   width: 100%;
//   height: 50px;
//   opacity: 0.4;
//   padding: 0;
//   margin: 0;
// `;

const CertifyContentBox = styled.div``;

const CertifyContent = styled.div`
  display: grid;
  justify-items: center;
  grid-template-columns: repeat(auto-fill, minmax(32%, auto));
  gap: 2px;
`;
const CertifyItem = styled.div`
  cursor: pointer;
  width: 100%;
  height: 150px;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const CertifyContentIcon = styled.div`
  cursor: pointer;
  position: absolute;
  bottom: 80px;
  right: 17px;

  display: flex;
  justify-content: center;
  align-items: center;
`;

/* -------------------------------- selectBox ------------------------------- */

const ModalIcon = styled.div`
  width: 18px;
  margin-right: 18px;
`;

const ImageLoadingWrap = styled.div`
  width: 100%;
  height: 100px;
  align-items: center;
  align-content: center;
  position: relative;
  display: flex;
`;
const ImageLoadingCenter = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;
