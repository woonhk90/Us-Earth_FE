import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import CustomSelect from "./CustomSelect";
import { flexRow, flexBetween, flexColumnLeft } from "../../styles/Flex";
import { useDispatch, useSelector } from "react-redux";
import { commentClearUp, commentEditChange, deleteComments, getComments } from "../../redux/modules/commentsSlice";
import ConfirmModal from "../Modals/ConfirmModal";
import icons from "../../assets";
import OkModal from "../Modals/OkModal";
import ErrorModal from "../Modals/ErrorModal";
import ImageLoading from "../etc/ImageLoading";

const Comment = () => {
  const dispatch = useDispatch();
  const param = useParams();
  const { getIsLoading, error, commentNew } = useSelector((state) => state.comments);
  const { dateStatus, commentResponseDtoList } = useSelector((state) => state.comments.comments);

  useEffect(() => {
    dispatch(getComments(param.proofId));
    return () => dispatch(commentClearUp());
  }, []);

  /* ------------------------------- 댓글창 스크롤 이동 ------------------------------- */
  const commentRef = useRef(null);

  const scrollToBottom = () => {
    commentRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [commentNew]);

  /* -------------------------- 캠페인 종료 시 댓글 수정 실패 모달 -------------------------- */
  const [okModal, setOkModal] = useState(false);

  // modal text
  const okModalTitle = "종료된 캠페인의 댓글은 수정하실 수 없습니다.";

  // onOff Modal
  const okModalOnOff = () => {
    setOkModal(!okModal);
  };

  /* --------------------------- 수정, 삭제, 신고하기 셀렉트 박스 -------------------------- */

  // dispatch function
  const clickDispatch = (payload) => {
    if (payload.selectName === "수정하기") {
      if (dateStatus === "ongoing") {
        // if (commentEdit?.editMode !== true) {
        dispatch(commentEditChange({}));
        dispatch(
          commentEditChange({
            editMode: true,
            commentId: payload.contentId,
          })
        );
        // }
      } else setOkModal(true);
    } else if (payload.selectName === "삭제하기") {
      setModal(!modal);
      setDispaychPayload(payload);
    }
  };

  // data
  const { Delete, Report, Edit } = icons;
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
    // {
    //   id: 3,
    //   selectName: "신고하기",
    //   icon: [
    //     <ModalIcon key={3}>
    //       <Report />
    //     </ModalIcon>,
    //   ],
    // },
  ];

  /* ---------------------------------- 삭제 모달 --------------------------------- */
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
    dispatch(commentEditChange({}));
  };

  // close Modal
  const closeModal = () => {
    setModal(!modal);
  };
  if (getIsLoading) {
    return (
      <ImageLoadingWrap>
        <ImageLoadingCenter>
          <ImageLoading color="rgba(0, 0, 0, 0.13)" />
        </ImageLoadingCenter>
      </ImageLoadingWrap>
    );
  }

  return (
    <>
      {error && <ErrorModal notGo={true} error={error} />}
      {okModal && <OkModal title={okModalTitle} modalOnOff={okModalOnOff}></OkModal>}
      {modal && <ConfirmModal clickSubmit={clickSubmit} confirmModalData={confirmModalData} closeModal={closeModal}></ConfirmModal>}
      <CommentContainer>
        {commentResponseDtoList?.map((comment) => (
          <CommentBox key={comment.commentId}>
            <CommentWrap>
              <CommentTop>
                <CommentText>
                  <Nickname>{comment.nickname}</Nickname>
                  <CreatAt>{comment.creatAt}</CreatAt>
                </CommentText>
                {comment.writer ? <CustomSelect clickDispatch={clickDispatch} contentId={comment.commentId} selectBoxData={selectBoxData} /> : null}
              </CommentTop>
              {comment.img !== null ? <CommentImg src={comment.img} alt="img" /> : null}
            </CommentWrap>
            <StSpan>{comment.content}</StSpan>
          </CommentBox>
        ))}
        <div ref={commentRef} />
      </CommentContainer>
    </>
  );
};

export default Comment;

const CommentContainer = styled.div`
  padding-bottom: 5px;
  max-height: 360px;
  width: 100%;
  overflow: auto;
  &::-webkit-scrollbar {
    display: none;
  }
  @media (min-height: 600px) and (max-height: 700px) {
    max-height: 270px;
  }
  @media (min-height: 300px) and (max-height: 556px) {
    max-height: 150px;
  }
`;

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
