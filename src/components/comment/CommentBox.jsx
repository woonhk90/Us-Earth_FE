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

const CommentBox = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const param = useParams();
  const [modalOpen, setModalOpen] = useState(false);
  const { commentEdit } = useSelector((state) => state.comments);
  console.log("커멘트에서 에딧모드", commentEdit);
  const editMode = commentEdit.editMode;
  const openModal = () => {
    setModalOpen(true);
  };

  useEffect(() => {
    console.log("랜더링");

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

  return (
    <>
      <ModalButton onClick={openModal}>아이콘</ModalButton>
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
