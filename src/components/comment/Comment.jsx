import React, { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate, useParams } from "react-router-dom";
import CustomSelect from "./CustomSelect";
import { flexColumn, flexRow, flexBetween, FlexRow, Text, flexColumnLeft } from "../../styles/Flex";
import { useDispatch, useSelector } from "react-redux";
import { commentEditChange, deleteComments, getComments, patchComment } from "../../redux/modules/commentsSlice";
import ConfirmModal from "../Modals/ConfirmModal";
import icons from "../../assets";

const Comment = ({ userToken }) => {
  const { VerticalDot, Delete, Report, Edit } = icons;
  const dispatch = useDispatch();
  const param = useParams();
  const { commentResponseDtoList, commentEdit } = useSelector((state) => state.comments.comments);
  console.log(commentResponseDtoList);

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
    {
      id: 1,
      selectName: "수정하기",
      icon: [
        <ModalIcon key={1}>
          <Edit />
        </ModalIcon>,
      ],
    },
    {
      id: 2,
      selectName: "삭제하기",
      icon: [
        <ModalIcon key={2}>
          <Delete />
        </ModalIcon>,
      ],
    },
    {
      id: 3,
      selectName: "신고하기",
      icon: [
        <ModalIcon key={3}>
          <Report />
        </ModalIcon>,
      ],
    },
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
              {comment.img !== null ? <CommentImg src={comment.img} alt="img" /> : null}
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
  max-height: 546px;
  width: 100%;
  overflow: auto;
  &::-webkit-scrollbar {
    display: none;
  }
`;
//700부터는 450으로 하기
/* --------------------------------- Top div -------------------------------- */

const CommentBox = styled.div`
  margin-bottom: 5px;
  width: 100%;
  box-sizing: border-box;
  padding: 10px 28px 20px 28px;
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
  margin-bottom: 10px;
`;

const CommentImg = styled.img`
  background-size: 100px;
  width: 176px;
  height: 176px;
  border: none;
  box-sizing: border-box;
  border-radius: 6px;
  display: flex;
  align-items: flex-start;
`;

/* ---------------------------------- font ---------------------------------- */
const CreatAt = styled.p`
  font-weight: 400;
  font-size: 12px;
  letter-spacing: -0.02em;
  color: #9b9b9b;
`;

const Nickname = styled.p`
  font-weight: 600;
  font-size: 18px;
  letter-spacing: -0.03em;
  color: #212121;
`;

/* -------------------------------- selectBox ------------------------------- */
const IconDiv = styled.div`
  width: 4px;
  padding: 10px;
`;
const ModalIcon = styled.div`
  width: 18px;
  margin-right: 18px;
`;

const ModalButton = styled.div`
  cursor: pointer;
  background-color: transparent;
  border: none;
  margin-right: 18px;
`;

const ButtonInModal = styled.button`
  width: 100%;
  ${flexRow}
  font-size: 18px;
  font-weight: 300;
  float: left;
  cursor: pointer;
  border: none;
  border-radius: 5px;
  padding: 12px 0;
  background-color: transparent;
`;
