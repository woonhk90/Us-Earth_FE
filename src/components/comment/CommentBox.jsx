import React, { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate, useParams } from "react-router-dom";
import { Navigation, Pagination, Scrollbar } from "swiper";
import CommentModal from "./CommentModal";
import { useDispatch, useSelector } from "react-redux";
import { flexColumn, flexRow, flexBetween, FlexRow, Text } from "../../styles/Flex";
import Comment from "./Comment";
import useInput from "../../hooks/useInput";
import CommentInput from "./CommentInput";
import CommentInputEdit from "./CommentInputEdit";
import { commentEditChange } from "../../redux/modules/commentsSlice";
import ConfirmModal from "../Modals/ConfirmModal";
import { getHeartCommentCnt, patchHeartCnt } from "../../redux/modules/proofsSlice";
import { ReactComponent as Heart } from "../../assets/heart.svg";
import { ReactComponent as HeartGy } from "../../assets/heartGy.svg";
import { ReactComponent as CommentIcon } from "../../assets/commentIcon.svg";
import Cookies from "universal-cookie";

const CommentBox = () => {
  const cookies = new Cookies();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const param = useParams();
  const [modalOpen, setModalOpen] = useState(false);
  const { comments, commentEdit } = useSelector((state) => state.comments);
  const { userHeart, proofs, heartCommentCnt } = useSelector((state) => state.proofs);
  const [userToken, setUserToken] = useState(false);

  console.log("유저의 헐트 상태", userHeart);
  console.log(userToken);

  console.log("커멘트에서 에딧모드", commentEdit);

  const editMode = commentEdit.editMode;
  const openModal = () => {
    setModalOpen(true);
  };

  useEffect(() => {
    console.log("랜더링");
    if (cookies.get("mycookie")) {
      setUserToken(true);
    } else setUserToken(false);
    dispatch(getHeartCommentCnt(param.proofId));
    return console.log("커멘트박스 언마운트");
  }, []);

  const closeModal = () => {
    console.log("클로즈모달?");
    if (editMode) {
      modalOnOff();
      // if (window.confirm("삭제모드 취소 하시겠습니까")) {
      //   setModalOpen(false);
      //   dispatch(commentEditChange({}));
      //   console.log("에딧모드 리셋");
      // } else return;
    } else setModalOpen(false);
  };

  const onClickDelete = () => {
    if (window.confirm("삭제하시겠습니까?")) {
      // dispatch(__deleteDetail(param.id));
      // navigate("/");
    } else {
      return;
    }
  };

  const onClickEdit = () => {
    // navigate(`/edit/${param.id}`);
  };

  /* -------------------------------- delete modal ------------------------------- */
  const [modal, setModal] = useState(false);

  // modal text data
  const confirmModalData = {
    title: "수정을 취소하시겠습니까?",
    cancel: "아니오",
    submit: "예",
    submitReturn: "취소되었습니다.",
  };

  // editMode cancel function
  const clickSubmit = () => {
    setModalOpen(false);
    dispatch(commentEditChange({}));
  };

  const modalOnOff = () => {
    setModal(!modal);
  };

  /* -------------------------------- 빠른좋아요 구현 -------------------------------- */
  const [heart, setHeart] = useState(false);
  const onClickHeart = () => {
    if (userToken) {
      dispatch(patchHeartCnt(param.proofId));
    }
  };

  return (
    <>
      <IconContainer>
        <IconWrap>
          <div onClick={onClickHeart}>
            {userHeart ? (
              <>
                <BottomIcon>
                  <HeartGy />
                </BottomIcon>
              </>
            ) : (
              <>
                <BottomIcon>
                  <Heart />
                </BottomIcon>
              </>
            )}
          </div>
          <IconP>{heartCommentCnt.heartCnt}</IconP>
        </IconWrap>
        <IconWrap onClick={openModal}>
          <BottomIcon>
            <CommentIcon />
          </BottomIcon>
          <IconP>{heartCommentCnt.commentCnt}</IconP>
        </IconWrap>
      </IconContainer>
      {modal && <ConfirmModal clickSubmit={clickSubmit} confirmModalData={confirmModalData} closeModal={modalOnOff}></ConfirmModal>}
      <CommentModal open={modalOpen} close={closeModal}>
        <ButtonInModalWrap>
          <StHeader>
            <HeaderP>댓글 {comments.commentResponseDtoList?.length}</HeaderP>
          </StHeader>
          <CommentContainer>
            <Comment userToken={userToken} />
          </CommentContainer>
          
          {editMode ? <CommentInputEdit /> : <CommentInput userToken={userToken}/>}
        </ButtonInModalWrap>
      </CommentModal>
    </>
  );
};
export default React.memo(CommentBox);

const ModalButton = styled.div`
  background-color: transparent;
  border: none;
`;

const ButtonInModalWrap = styled.div`
  width: 100%;
  ${flexColumn};
`;

const StHeader = styled.header`
  box-sizing: border-box;
  text-align: left;
  width: 100%;
  padding: 28px 0 10px 28px;
  font-weight: 800;
`;

const CommentContainer = styled.div`
  width: 100%;
`;
const IconContainer = styled.div`
  ${flexRow}
  padding: 10px;
  gap: 10px;
`;

// height: 100%;
// width: 100%;

// position: absolute;
// top: 48px;
// left: 0;

const BottomIcon = styled.div`
  cursor: pointer;
  width: 23px;
  padding-right: 5px;
  height: 21px;
`;

const IconWrap = styled.div`
  ${flexRow}
  margin: 10px;
`;

const IconP = styled.p`
  font-weight: 400;
  font-size: 18px;
  letter-spacing: -0.02em;
  color: #9b9b9b;
  margin-bottom: 3px;
`;

const HeaderP = styled.p`
  font-size: 24px;
  font-weight: 600;
`;
