import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate, useParams } from "react-router-dom";
import CommentModal from "./CommentModal";
import { useDispatch, useSelector } from "react-redux";
import { flexColumn, flexRow } from "../../styles/Flex";
import Comment from "./Comment";
import CommentInput from "./CommentInput";
import CommentInputEdit from "./CommentInputEdit";
import { commentClearUp, commentEditChange } from "../../redux/modules/commentsSlice";
import ConfirmModal from "../Modals/ConfirmModal";
import { getHeartCommentCnt, heartCommentCleanUp, patchHeartCnt } from "../../redux/modules/heartCommentSlice";
import { ReactComponent as Heart } from "../../assets/heart.svg";
import { ReactComponent as HeartGy } from "../../assets/heartGy.svg";
import { ReactComponent as CommentIcon } from "../../assets/commentIcon.svg";
import Cookies from "universal-cookie";
import LoginModal from "../Modals/LoginModal";

const CommentBox = () => {
  const cookies = new Cookies();
  const param = useParams();
  const dispatch = useDispatch();
  const { heartCommentCnt } = useSelector((state) => state.heartComment);
  const { comments, commentEdit, writeMode } = useSelector((state) => state.comments);
  const participant = heartCommentCnt.participant;
  const editMode = commentEdit.editMode;
  const [userToken, setUserToken] = useState(false);

  const [commentModal, setCommentModal] = useState(false);

  const commentModalOpen = () => {
    setCommentModal(true);
  };

  useEffect(() => {
    if (cookies.get("mycookie")) {
      setUserToken(true);
    } else setUserToken(false);
    dispatch(getHeartCommentCnt(param.proofId));
    return () => {
      dispatch(heartCommentCleanUp());
      dispatch(commentClearUp());
    };
  }, []);

  const commentModalClose = () => {
    if (editMode) {
      setDeleteModal(true);
    } else setCommentModal(false);
  };

  /* -------------------------------- delete modal ------------------------------- */
  const [deleteModal, setDeleteModal] = useState(false);

  // modal text data
  const deleteModalData = {
    title: "수정을 취소하시겠습니까?",
    cancel: "아니오",
    submit: "예",
    submitReturn: "취소되었습니다.",
  };

  // editMode cancel function
  const deleteModalOnclickSubmit = () => {
    setDeleteModal(false);
    dispatch(commentEditChange({}));
    setCommentModal(false);
  };

  const deleteModalOnOff = () => {
    setDeleteModal(!deleteModal);
  };

  /* ----------------------------------- 좋아요 ---------------------------------- */

  const onClickHeart = () => {
    if (userToken && participant) {
      dispatch(patchHeartCnt(param.proofId));
    }
  };

  /* ----------------------------------- 로그인 ---------------------------------- */
  const [loginModal, setLoginModal] = useState(false);
  const loginModalOnOff = () => {
    setLoginModal(!loginModal);
  };

  const loginCheck = () => {
    if (!userToken) setLoginModal(true);
  };

  return (
    <>
      {loginModal && <LoginModal modalOnOff={loginModalOnOff} modal={loginModal}></LoginModal>}
      <IconContainer>
        <IconWrap>
          <div onClick={onClickHeart}>
            <HeartButtonWrap isHeart={!participant || !userToken}>
              <BottomIcon>{heartCommentCnt.heart ? <HeartGy /> : <Heart />}</BottomIcon>
            </HeartButtonWrap>
          </div>
          <IconP>{heartCommentCnt.heartCnt}</IconP>
        </IconWrap>
        <CommentButtonWrap onClick={commentModalOpen}>
          <BottomIcon>
            <CommentIcon />
          </BottomIcon>
          <IconP>{heartCommentCnt.commentCnt}</IconP>
        </CommentButtonWrap>
      </IconContainer>
      {deleteModal && <ConfirmModal clickSubmit={deleteModalOnclickSubmit} confirmModalData={deleteModalData} closeModal={deleteModalOnOff}></ConfirmModal>}
      <CommentModal open={commentModal} close={commentModalClose}>
        <ButtonInModalWrap>
          <StHeader>
            <HeaderP>댓글 {comments.commentResponseDtoList?.length}</HeaderP>
          </StHeader>
          <Comment userToken={userToken} />
          <CommentContainer>
            <CommentContainer onClick={loginCheck}></CommentContainer>
            {editMode ? <CommentInputEdit userToken={userToken} /> : <CommentInput userToken={userToken} />}
          </CommentContainer>
        </ButtonInModalWrap>
      </CommentModal>
    </>
  );
};
export default React.memo(CommentBox);

const ButtonInModalWrap = styled.div`
border-radius: 30px 30px 0 0;
background-color: white;
  width: 100%;
  ${flexColumn};
`;

const StHeader = styled.div`

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

const BottomIcon = styled.div`
  width: 23px;
  padding-right: 5px;
  height: 21px;
`;

const IconWrap = styled.div`
  ${flexRow}
  margin: 10px;
`;

const CommentButtonWrap = styled.div`
  ${flexRow}
  margin: 10px;
  cursor: pointer;
`;

const IconP = styled.p`
  font-weight: 400;
  font-size: 18px;
  letter-spacing: -0.02em;
  color: #9b9b9b;
  margin-bottom: 4px;
`;

const HeaderP = styled.p`
  font-size: 24px;
  font-weight: 600;
`;

const HeartButtonWrap = styled.div`
  cursor: ${(props) => (props.isHeart ? "auto" : "pointer")};
`;
