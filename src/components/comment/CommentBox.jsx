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
import OkModal from "../Modals/OkModal";
import isLogin from "../../lib/isLogin";
import ConfirmSingleModal from "../Modals/ConfirmSingleModal";

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
    } else {
      canWriteCheck();
      setOkModal(!okModal);
    }
  };

  const [okModal, setOkModal] = useState(false);
  const [okModalTitle, setOkModalTitle] = useState(false);

  // onOff Modal
  const okModalOnOff = () => {
    setOkModal(!okModal);
  };

  // user check
  const canWriteCheck = () => {
    if (!participant) {
      setOkModalTitle("그룹 참가자만 좋아요를 누를 수 있습니다.");
      setOkModal(true);
    }
  };

  return (
    <>
      {okModal && <OkModal title={okModalTitle} modalOnOff={okModalOnOff}></OkModal>}
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
      {deleteModal && <ConfirmSingleModal clickSubmit={deleteModalOnclickSubmit} confirmModalData={deleteModalData} closeModal={deleteModalOnOff}/>}
      <CommentModal open={commentModal} close={commentModalClose}>
        <ButtonInModalWrap>
          <StHeader>
            <HeaderP>댓글 {comments.commentResponseDtoList?.length}</HeaderP>
          </StHeader>
          <Comment commentCnt={heartCommentCnt.commentCnt} userToken={userToken} />
          <CommentContainer>
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
  ${flexRow}/* padding: 10px;
  gap: 10px; */
`;

const BottomIcon = styled.div`
  width: 23px;
  padding-right: 5px;
  height: 21px;
`;

const IconWrap = styled.div`
  ${flexRow}
  margin: 15px 10px 10px 20px;
`;

const CommentButtonWrap = styled.div`
  ${flexRow}
  margin: 15px 10px;
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
