import React, { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate, useParams } from "react-router-dom";
import { Navigation, Pagination, Scrollbar } from "swiper";
import CustomSelect from "./CustomSelect";
import { flexColumn, flexRow, flexBetween, FlexRow, Text, flexColumnLeft } from "../../styles/Flex";
import { useDispatch, useSelector } from "react-redux";
import { commentEditChange, deleteComments, getComments, patchComment } from "../../redux/modules/commentsSlice";

const Comment = () => {
  const dispatch = useDispatch();
  const param = useParams();
  const { commentResponseDtoList, commentEdit } = useSelector((state) => state.comments.comments);

  useEffect(() => {
    console.log("코멘트 랜더링");
    dispatch(getComments(param.proofId));
    return console.log("코멘트 언마운트");
  }, []);

  /* -------------------- Select Box function (Update & Delete) -------------------- */
  const clickDispatch = (payload) => {
    console.log("코멘트에서 수정모드 확인", commentEdit);
    if (payload.selectName === "수정하기") {
      if (commentEdit?.commentId !== payload.contentId) {
        console.log("수정 다른거 하기 시작", payload.contentId, commentEdit?.commentId);
      }
      if (commentEdit?.editMode !== true) {
        const commentList = commentResponseDtoList.find((comment) => comment.commentId === payload.contentId);
        dispatch(commentEditChange({}));
        console.log("코멘트에서 디스페치 에딧모드온 ㅋ");
        console.log("에딧모드 리셋 오른쪽이없으면 리셋될듯?", commentList.content);
        dispatch(
          commentEditChange({
            editMode: true,
            comment: commentList.content,
            commentImg: commentList.img?.imgUrl,
            commentId: payload.contentId,
          })
        );
      } else console.log("수정중이었자나");
    } else if (payload.selectName === "삭제하기") {
      dispatch(
        deleteComments({
          commentId: payload.contentId,
          proofId: param.proofId,
        })
      );
    }
  };

  /* ----------------------------- Select Box Data ---------------------------- */
  const selectBoxData = [
    { id: 1, selectName: "수정하기" },
    { id: 2, selectName: "삭제하기" },
    { id: 3, selectName: "신고하기" },
  ];

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
