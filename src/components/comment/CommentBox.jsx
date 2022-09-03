import React, { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate, useParams } from "react-router-dom";
import { Navigation, Pagination, Scrollbar } from "swiper";
import CommentModal from "./CommentModal";
import { flexColumn, flexRow, flexBetween, FlexRow, Text } from "../../styles/test";
import Comment from "./Comment";
import useInput from "../../hooks/useInput";
import { postCommentFormData } from "../../hooks/Query";
import { useMutation, useQuery, useQueryClient } from "react-query";
import CommentInput from "./CommentInput";

const CommentBox = () => {
  const navigate = useNavigate();
  // const dispatch = useDispatch();
  const param = useParams();
  const [modalOpen, setModalOpen] = useState(false);
  //query
  const queryClient = useQueryClient();
  const { mutate: addCommentMutateData } = useMutation((data) => postCommentFormData(data), {
    onSuccess: (data) => {
      console.log(data);
      // queryClient.setQueryData("sleep_list", (sleep_times) => {
      //   return [...sleep_times, data];
      // });

      //방법1
      // key를 넣지 않을 경우 모든 쿼리가 무효화됩니다.
      // mutation을 성공하면 수면 데이터 목록을 불러오는 useQuery를 무효화 시켜줍니다!
      // post후 바로 fetch해주기 위해! usequery를 무효화 시켜서 수면 데이터 목록을 다시 불러오기~
      // queryClient.invalidateQueries("sleep_list");
      // day_input.current.value = "";
      // time_input.current.value = "";
    },
    onError: (error) => {
      console.log(error);
    },
  });

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
      <ModalButton onClick={openModal}>아이콘</ModalButton>
      <CommentModal open={modalOpen} close={closeModal}>
        <ButtonInModalWrap>
          <StHeader>댓글 갯수</StHeader>
          <Comment />
          {/* <ButtonInModal onClick={onClickDelete}>삭제하기</ButtonInModal>
          <ButtonInModal onClick={onClickEdit}>수정하기</ButtonInModal> */}
          <CommentInput />
        </ButtonInModalWrap>
      </CommentModal>
    </>
  );
};
export default CommentBox;

const ModalButton = styled.div`
  background-color: transparent;
  border: none;
`;

const ButtonInModalWrap = styled.div`
  ${flexColumn};
`;

const StHeader = styled.header`
  box-sizing: border-box;
  text-align: left;
  width: 100%;
  padding: 20px 0 10px 20px;
  font-weight: 800;
`;
