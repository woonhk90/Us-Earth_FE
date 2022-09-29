import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import styled from "styled-components";
import { getCookie } from "../shared/cookie";
import { useDispatch, useSelector } from "react-redux";
import { __updateCommunityJoin, __getCommunityDetail, errorReset, statusCodeReset } from "../redux/modules/communitySlice";

const CommunityModal = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  /* -------------------------------- 모달 닫기 버튼 -------------------------------- */
  const closeModal = () => {
    if (statusCode === 200) {
      onClickResetInfo(props.communityId);
    }
    
    dispatch(errorReset());
    dispatch(statusCodeReset());

    props.closeModal();
  };

  const [viewFlag, setViewFlag] = React.useState(false);
  const { error, isLoading, statusCode } = useSelector((state) => state.community);
  const [msg, setMsg] = React.useState("aa");

  /* ------------------------------- 참여하기(가입) 버튼 누름 ------------------------------- */
  const onViewFlagHandler = async (id) => {
    await dispatch(__updateCommunityJoin({ communityId: id }));
  };

  /* ------------------------- 참가완료하고 확인누름(정보초기화(랜더링)) ------------------------ */
  const onClickResetInfo = async (id) => {
    await dispatch(__getCommunityDetail({ communityId: id }));
  };

  React.useEffect(() => {
    if (statusCode === 200) {
      setMsg("참가 완료 되었습니다.");
      setViewFlag(!viewFlag);
    } else if (Number(statusCode) === 400) {
      setMsg(error.msg);
      setViewFlag(!viewFlag);
    }
  }, [statusCode]);

  /* --------------------- 로그인 되어있는지 우선 확인(안되어있으면 로그인페이지) --------------------- */
  const usercookie = getCookie("mycookie");
  const { pathname } = useLocation();
  if (usercookie === undefined) {
    localStorage.setItem("pathname", pathname);
    navigate("/login");
  }

  return (
    <>
      <ModalWrap onClick={closeModal}>
        <ModalBody
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <ConfirmWrap viewFlag={viewFlag}>
            <ConfirmTitle>참여 하시겠습니까?</ConfirmTitle>
            <ConfirmBox>
              <ConfirmItem borderRight={"1px solid #d9d9d9"} onClick={closeModal}>
                취소
              </ConfirmItem>
              <ConfirmItem
                borderLeft={"1px solid #d9d9d9"}
                onClick={() => {
                  onViewFlagHandler(props.communityId);
                }}
              >
                가입
              </ConfirmItem>
            </ConfirmBox>
          </ConfirmWrap>

          <AttendWrap viewFlag={viewFlag}>
            <AttendTitle>{msg}</AttendTitle>
            <AttendBox>
              <AttendItem onClick={closeModal}>확인</AttendItem>
            </AttendBox>
          </AttendWrap>
        </ModalBody>
      </ModalWrap>
    </>
  );
};
export default CommunityModal;

const ModalWrap = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10;
  padding: 0 15px;
  box-sizing: border-box;
`;
const ModalBody = styled.div`
  width: 100%;

  background-color: #fff;
  border-radius: 12px;
`;

const ConfirmWrap = styled.div`
  display: ${(props) => (!props.viewFlag ? "block" : "none")};
`;
const ConfirmTitle = styled.p`
  font: 22px/30px "Noto Sans KR", "sans-serif";
  text-align: center;
  padding: 50px 0;
`;
const ConfirmTitleSpan = styled.span`
  font: 700 22px/30px "Noto Sans KR", "sans-serif";
`;
const ConfirmBox = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  text-align: center;
  border-top: 1px solid #d9d9d9;
`;
const ConfirmItem = styled.div`
  width: 50%;
  border-right: ${(props) => props.borderRight};
  border-left: ${(props) => props.borderLeft};
  font: 600 22px/30px "Noto Sans KR", "sans-serif";
  padding: 19px 0;
`;

const AttendWrap = styled.div`
  display: ${(props) => (!props.viewFlag ? "none" : "block")};
`;
const AttendTitle = styled.p`
  font: 22px/30px "Noto Sans KR", "sans-serif";
  text-align: center;
  padding: 50px 0;
`;
const AttendTitleSpan = styled.span`
  font: 700 22px/30px "Noto Sans KR", "sans-serif";
`;
const AttendBox = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  text-align: center;
  border-top: 1px solid #d9d9d9;
`;
const AttendItem = styled.div`
  width: 50%;
  font: 600 22px/30px "Noto Sans KR", "sans-serif";
  padding: 19px 0;
`;
