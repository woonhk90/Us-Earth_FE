import React, { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate, useParams } from "react-router-dom";
import { Navigation, Pagination, Scrollbar } from "swiper";
import EditModal from "../Modals/EditModal";
import { useDispatch, useSelector } from "react-redux";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

const CommunityProof = () => {
  const navigate = useNavigate();
  // const dispatch = useDispatch();
  const param = useParams();
  console.log(param);
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
      <FirstWrap>
        <Swiper modules={[Navigation, Pagination, Scrollbar]} spaceBetween={50} slidesPerView={1} navigation pagination={{ clickable: true }}>
          <SwiperSlide>
            <StDiv>
              <ItemImg></ItemImg>
            </StDiv>
          </SwiperSlide>
          <SwiperSlide>
            <StDiv>
              <ItemImg></ItemImg>
            </StDiv>
          </SwiperSlide>
          <SwiperSlide>
            <StDiv>
              <ItemImg></ItemImg>
            </StDiv>
          </SwiperSlide>
          <SwiperSlide>
            <StDiv>
              <ItemImg></ItemImg>
            </StDiv>
          </SwiperSlide>
        </Swiper>
      </FirstWrap>
      <UserInfoFirstWrap>
        <UserInfoWrap>
          <UserInfoImg />
          <UerInpo>
            <Username>닉네임</Username>
            <CreatAt>작성일자</CreatAt>
          </UerInpo>
        </UserInfoWrap>
        <ModalButton onClick={openModal}>아이콘</ModalButton>
        <EditModal open={modalOpen} close={closeModal}>
          <main>
            <ButtonInModalWrap>
              <ButtonInModal onClick={onClickDelete}>삭제하기</ButtonInModal>
              <ButtonInModal onClick={onClickEdit}>수정하기</ButtonInModal>
            </ButtonInModalWrap>
          </main>
        </EditModal>
      </UserInfoFirstWrap>
      <TextContainer>
        <ContentTitle>제목</ContentTitle>
        <ContentContent>내용</ContentContent>
      </TextContainer>
      {/* <UserInfoFirstWrap>
        <button
          onClick={() => {
            navigate(`/community/article/${parseInt(param.id) - 1}`);
          }}
        >
          이전글
        </button>
        <button
          onClick={() => {
            navigate(`/community/article/${parseInt(param.id) + 1}`);
          }}
        >
          다음글
        </button>
      </UserInfoFirstWrap> */}
      <div>좋아요</div>
      <div>댓글</div>
    </>
  );
};

export default CommunityProof;

const UserInfoFirstWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #e9ecef;
`;

const UserInfoWrap = styled.div`
  width: 100%;
  height: 100px;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 5px;
  box-sizing: border-box;
`;

const UerInpo = styled.div`
  margin: 0;
  padding: 0;
`;

const UserInfoImg = styled.div`
  background-image: url("https://d1unjqcospf8gs.cloudfront.net/assets/users/default_profile_80-0443429487fdc2277fc8f9dd1eca6fb8b678862f593e21222ba9f6592b99ad14.png");
  width: 40px;
  height: 40px;
  background-position: center;
  background-size: cover;
  border-radius: 50%;
`;

const CreatAt = styled.div`
  font-size: 13px;
  line-height: 1.46;
  letter-spacing: -0.6px;
  color: #212529;
`;

const Username = styled.div`
  font-size: 15px;
  font-weight: 600;
  line-height: 1.5;
  letter-spacing: -0.6px;
  color: #212529;
`;

//내용
const TextContainer = styled.div`
  padding: 10px;
  border-bottom: 1px solid #e9ecef;
`;
const ContentTitle = styled.h1`
  font-size: 20px;
  font-weight: 700;
  line-height: 1.5;
  letter-spacing: -0.6px;
`;

const ContentContent = styled.div`
  font-size: 17px;
  line-height: 1.6;
  letter-spacing: -0.6px;
  margin: 10px 0;
  word-break: break-all;
  white-space: pre-line;
`;

//스와이퍼

const FirstWrap = styled.div`
  /* height: 470px; */
  width: 100%;
  /* max-width: 800px; */
  aspect-ratio: 1 / 1;
  margin: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .swiper {
    height: 100%;
    width: 100%;
  }

  .swiper-button-next {
    border-radius: 15px;
    width: 30px;
    height: 30px;
    background-color: gray;
  }

  .swiper-button-prev {
    border-radius: 15px;
    width: 30px;
    height: 30px;
    background-color: gray;
  }

  .swiper-button-next::after,
  .swiper-button-prev::after {
    display: none;
  }

  .swiper-pagination-bullet-active {
    background-color: #8f8f8f;
  }
`;

const ItemImg = styled.div`
  background-image: url("https://d1unjqcospf8gs.cloudfront.net/assets/users/default_profile_80-0443429487fdc2277fc8f9dd1eca6fb8b678862f593e21222ba9f6592b99ad14.png");
  padding-bottom: 10%;
  background-size: cover;
  object-fit: cover;
  background-position: center;
  background-repeat: no-repeat;
  display: inline-block;
  width: 100%;
  height: 100%;
  /* border-radius: 10px; */
`;

const StDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;

//모달

const ModalButton = styled.div`
  background-color: transparent;
  border: none;
`;

const ButtonInModalWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
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
