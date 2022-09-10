import React, { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate, useParams } from "react-router-dom";
import CustomSelect from "./CustomSelect";
import { flexColumn, flexRow, flexBetween, FlexRow, Text, flexColumnLeft } from "../../styles/Flex";
import { useDispatch, useSelector } from "react-redux";
import { commentEditChange, deleteComments, getComments, patchComment } from "../../redux/modules/commentsSlice";
import ConfirmModal from "../Modals/ConfirmModal";

const Comment = () => {
  const dispatch = useDispatch();
  const param = useParams();
  const { commentResponseDtoList, commentEdit } = useSelector((state) => state.comments.comments);

  useEffect(() => {
    dispatch(getComments(param.proofId));
  }, []);

  /* -------------------- Select Box function (Update & Delete) -------------------- */
  const clickDispatch = (payload) => {
    if (payload.selectName === "수정하기") {
      if (commentEdit?.editMode !== true) {
        const commentList = commentResponseDtoList.find((comment) => comment.commentId === payload.contentId);
        dispatch(commentEditChange({}));
        dispatch(
          commentEditChange({
            editMode: true,
            comment: commentList.content,
            commentImg: commentList.img?.imgUrl,
            commentId: payload.contentId,
          })
        );
      }
    } else if (payload.selectName === "삭제하기") {
      setModal(!modal);
      setDispaychPayload(payload);
    }
  };

  /* ----------------------------- Select Box Data ---------------------------- */
  const selectBoxData = [
    { id: 1, selectName: "수정하기" },
    { id: 2, selectName: "삭제하기" },
    { id: 3, selectName: "신고하기" },
  ];

  /* -------------------------------- delete modal ------------------------------- */
  const [modal, setModal] = useState(false);
  const [dispaychPayload, setDispaychPayload] = useState({});

  // modal text data
  const confirmModalData = {
    title: "댓글을 삭제하시겠습니까?",
    cancel: "아니오",
    submit: "예",
    // submitReturn: "취소되었습니다.",
  };

  // editMode cancel function
  const clickSubmit = () => {
    setModal(!modal);
    dispatch(
      deleteComments({
        commentId: dispaychPayload.contentId,
        proofId: param.proofId,
      })
    );
  };

  // close Modal
  const closeModal = () => {
    setModal(!modal);
  };

  return (
    <>
      <CommentContainer>
        {commentResponseDtoList?.map((comment) => (
          <CommentBox key={comment.commentId}>
            <CommentWrap>
              <CommentTop>
                <CommentText>
                  <Nickname>{comment.nickname}</Nickname>
                  <CreatAt>{comment.creatAt}</CreatAt>
                </CommentText>
                <CustomSelect clickDispatch={clickDispatch} contentId={comment.commentId} selectBoxData={selectBoxData} />
                {modal && <ConfirmModal clickSubmit={clickSubmit} confirmModalData={confirmModalData} closeModal={closeModal}></ConfirmModal>}
              </CommentTop>
              {comment.img !== null ? <CommentImg src={comment.img.imgUrl} alt="img" /> : null}
            </CommentWrap>
            <StSpan>{comment.content}</StSpan>
          </CommentBox>
        ))}
      </CommentContainer>
    </>
  );
};

export default Comment;
const CommentContainer = styled.div`
  max-height: 350px;
  width: 100%;
  overflow: auto;
  &::-webkit-scrollbar {
    display: none;
  }
`;

/* --------------------------------- Top div -------------------------------- */

const CommentBox = styled.div`
  margin-bottom: 5px;
  width: 100%;
  box-sizing: border-box;
  padding: 10px 20px 20px 20px;
  border-bottom: 2px solid rgba(217, 217, 217, 0.3);
`;

const CommentWrap = styled.div`
  ${flexColumnLeft}
`;
const StSpan = styled.div`
  align-items: flex-start;
  margin: 10px 0;
  word-break: break-all;
  white-space: pre-line;
`;
const CommentTop = styled.div`
  ${flexBetween};
  width: 100%;
`;

const CommentText = styled.div`
  ${flexRow}
  gap: 10px;
`;

const CommentImg = styled.img`
  background-size: 100px;
  width: 100px;
  height: 100px;
  box-sizing: border-box;
  border-radius: 6px;
  border: 1px solid gray;
  display: flex;
  align-items: flex-start;
`;

/* ---------------------------------- font ---------------------------------- */
const CreatAt = styled.p`
  font-size: 12px;
`;

const Nickname = styled.p`
  font-size: 18px;
`;
