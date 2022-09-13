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

const CommentBox = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const param = useParams();
  const [modalOpen, setModalOpen] = useState(false);
  const { commentEdit } = useSelector((state) => state.comments);
  const { heartCommentCnt } = useSelector((state) => state.proofs);
  console.log(heartCommentCnt);
  console.log("커멘트에서 에딧모드", commentEdit);
  const editMode = commentEdit.editMode;
  const openModal = () => {
    setModalOpen(true);
  };

  useEffect(() => {
    console.log("랜더링");
    dispatch(getHeartCommentCnt(param.proofId));
    return console.log("커멘트박스 언마운트");
  }, []);

  const closeModal = () => {
    console.log("클로즈모달?");
    if (editMode) {
      if (window.confirm("삭제모드 취소 하시겠습니까")) {
        setModalOpen(false);
        dispatch(commentEditChange({}));
        console.log("에딧모드 리셋");
      } else return;
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
    // submitReturn: "취소되었습니다.",
  };

  // editMode cancel function
  const clickSubmit = () => {};

  const modalOnOff = () => {
    setModal(!modal);
  };

  /* -------------------------------- 빠른좋아요 구현 -------------------------------- */
  const [heart, setHeart] = useState(false);
  const onClickHeart = () => {
    setHeart(!heart);
    dispatch(patchHeartCnt(param.proofId));
  };

  return (
    <>
      <div onClick={onClickHeart}>빠른좋아요버튼</div>
      <div>{heart ? "좋아" : "싫어"}</div>
      <div>좋아요 {heartCommentCnt.heartCnt}</div>
      <div>댓글 {heartCommentCnt.commentCnt}</div>
      <ModalButton onClick={openModal}>아이콘</ModalButton>
      {modal && <ConfirmModal clickSubmit={clickSubmit} confirmModalData={confirmModalData} closeModal={modalOnOff}></ConfirmModal>}
      <CommentModal open={modalOpen} close={closeModal}>
        <ButtonInModalWrap>
          <StHeader>댓글 갯수</StHeader>
          <CommentContainer>
            <Comment />
          </CommentContainer>
          {editMode ? <CommentInputEdit /> : <CommentInput />}
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
  padding: 20px 0 10px 20px;
  font-weight: 800;
`;

const CommentContainer = styled.div`
  width: 100%;
`;

// height: 100%;
// width: 100%;

// position: absolute;
// top: 48px;
// left: 0;
