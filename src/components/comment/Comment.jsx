import React, { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate, useParams } from "react-router-dom";
import { Navigation, Pagination, Scrollbar } from "swiper";
import CustomSelect from "./CustomSelect";
import { flexColumn, flexRow, flexBetween, FlexRow, Text } from "../../styles/Flex";

const Comment = () => {
  const navigate = useNavigate();
  // const dispatch = useDispatch();
  const param = useParams();
  const [modalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
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
      <StCommentWrap>
        <StTopComment>
          <StText>
            <div>닉네임</div>
            <div>작성일자</div>
          </StText>
          <CustomSelect />
        </StTopComment>
        <StSpan>내용</StSpan>
        <button>답글달기</button>
      </StCommentWrap>
    </>
  );
};

export default Comment;

const StCommentWrap = styled.div`
  /* ${flexColumn}; */
  width: 100%;
  box-sizing: border-box;
  padding: 10px 20px 20px 20px;
  border-bottom: 1px solid gray;
`;

const StTopComment = styled.div`
  ${flexBetween}
`;
const StSpan = styled.div`
  align-items: flex-start;
  margin: 10px 0;
`;

const ButtonInModal = styled.button`
  border: none;
  border-radius: 5px;
  padding: 5px;
  background-color: transparent;
  :hover {
    font-weight: bolder;
    padding: 1px solid transparent;
  }
`;

const StHeader = styled.header`
  box-sizing: border-box;
  text-align: left;
  width: 100%;
  padding: 20px 0 10px 20px;
  font-weight: 800;
`;
const StText = styled.div`
  ${flexRow}
  /* margin-left: 10px; */
  gap: 10px;
`;
