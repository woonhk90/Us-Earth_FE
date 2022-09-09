import React, { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate, useParams } from "react-router-dom";
import { Navigation, Pagination, Scrollbar } from "swiper";
import CustomSelect from "./CustomSelect";
import { flexColumn, flexRow, flexBetween, FlexRow, Text, flexColumnLeft } from "../../styles/Flex";
import { useDispatch, useSelector } from "react-redux";
import { deleteComments, getComments } from "../../redux/modules/commentsSlice";

const Comment = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { comments, commentSelectBoxId } = useSelector((state) => state.comments);
  // const dispatch = useDispatch();
  console.log(comments);
  console.log(commentSelectBoxId);
  const contentId = commentSelectBoxId.contentId;
  const param = useParams();
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    dispatch(getComments(param.proofId));
  }, []);

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  // const onClickDelete = (contentId) => {
  //   if (window.confirm("삭제하시겠습니까?")) {
  //     dispatch(deleteComments(contentId));
  //     navigate(`/community/${param.communityId}`);
  //   } else {
  //     return;
  //   }
  // };
  const onClickDelete = (payload) => {
    if (window.confirm("삭제하시겠습니까?")) {
      dispatch(deleteComments(payload));
      // navigate(`/community/detail/${param.communityId}`);
    } else {
      return;
    }
  };

  const onClickEdit = () => {
    // navigate(`/edit/${param.id}`);
  };

  const selectBoxData = [
    { id: 1, buttonName: "수정하기" },
    { id: 2, buttonName: "삭제하기" },
    { id: 3, buttonName: "신고하기" },
  ];

  const selectOnClickHandler = {
    onClickDelete,
    onClickEdit,
  };

  return (
    <>
      <CommunityBox>
        {comments?.map((comment) => (
          <CommentContainer key={comment.commentId}>
            <CommentWrap>
              <CommentTop>
                <CommentText>
                  <Nickname>{comment.nickname}</Nickname>
                  <CreatAt>{comment.creatAt}</CreatAt>
                </CommentText>
                {/* <CustomSelect onClickDelete={()=>onClickDelete(contentId)}  contentId={comment.commentId} selectBoxData={selectBoxData} /> */}
                <CustomSelect selectOnClickHandler={selectOnClickHandler} contentId={comment.commentId} selectBoxData={selectBoxData} />
              </CommentTop>
              {comment.img !== null ? <CommentImg src={comment.img.imgUrl} alt="img" /> : null}
            </CommentWrap>
            <StSpan>{comment.content}</StSpan>
          </CommentContainer>
        ))}
        <CommentContainer>
          <CommentWrap>
            <CommentTop>
              <CommentText>
                <Nickname>닉네임</Nickname>
                <CreatAt>시간</CreatAt>
              </CommentText>
              <CustomSelect selectBoxData={selectBoxData} />
            </CommentTop>
            <CommentImg alt="img" />
          </CommentWrap>
          <StSpan>내용~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~</StSpan>
        </CommentContainer>
      </CommunityBox>
    </>
  );
};

export default Comment;

const CommunityBox = styled.div`
  width: 100%;
  height: 300px;
  overflow: auto;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const CommentContainer = styled.div`
  margin-bottom: 5px;
  /* ${flexColumn}; */
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
`;
const CommentTop = styled.div`
  ${flexBetween};
  width: 100%;
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
const CommentText = styled.div`
  ${flexRow}
  /* margin-left: 10px; */
  gap: 10px;
`;

const CommentImg = styled.img`
  /* display: inline-flex; */
  background-size: 100px;
  width: 100px;
  height: 100px;
  box-sizing: border-box;
  border-radius: 6px;
  border: 1px solid gray;
  display: flex;
  align-items: flex-start;
`;

const CreatAt = styled.p`
  font-size: 12px;
`;

const Nickname = styled.p`
  font-size: 18px;
`;
