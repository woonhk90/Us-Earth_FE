import React, { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate, useParams } from "react-router-dom";
import { Navigation, Pagination, Scrollbar } from "swiper";
import EditModal from "../Modals/EditModal";
import { useDispatch, useSelector } from "react-redux";
import { Swiper, SwiperSlide } from "swiper/react";
import { flexColumn, flexRow, flexBetween, Text } from "../../styles/Flex";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { deleteProof, getProofs } from "../../redux/modules/proofsSlice";
import ConfirmModal from "../Modals/ConfirmModal";
import { ReactComponent as VerticalDot } from "../../assets/verticalDot.svg";
import icons from "../../assets";

const CommunityProof = () => {
  const { VerticalDot, Delete, Report, Edit } = icons;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // const dispatch = useDispatch();
  const param = useParams();
  const [modalOpen, setModalOpen] = useState(false);
  const { proofs } = useSelector((state) => state.proofs);
  console.log(proofs);

  useEffect(() => {
    dispatch(getProofs(param.proofId));
  }, []);

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const onClickDelete = () => {
    if (window.confirm("삭제하시겠습니까?")) {
    } else {
      return;
    }
  };

  const onClickEdit = () => {
    navigate(`/community/${param.communityId}/proof/edit/${param.proofId}`);
  };
  /* -------------------------------- edit modal ------------------------------- */
  const [modal, setModal] = useState(false);

  // modal text data
  const confirmModalData = {
    title: "삭제하시겠습니까?",
    cancel: "아니오",
    submit: "예",
  };

  // editMode cancel function
  const clickSubmit = () => {
    dispatch(deleteProof(param.proofId));
    navigate(`/community/detail/${param.communityId}`);
  };

  const modalOnOff = () => {
    setModal(!modal);
  };

  return (
    <>
      <FirstWrap>
        <Swiper modules={[Navigation, Pagination, Scrollbar]} spaceBetween={50} slidesPerView={1} navigation pagination={{ clickable: true }}>
          {proofs.img?.map((img) => {
            console.log(img.imgUrl);
            return (
              <SwiperSlide key={img.id}>
                <StDiv>
                  <ItemImg imgUrl={img.imgUrl}></ItemImg>
                </StDiv>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </FirstWrap>
      <UserInfoFirstWrap>
        <UserInfoWrap>
          <UserInfoImg imgUrl={proofs.profileImage}/>
          <UerInpo>
            <Username>{proofs.nickname}</Username>
            <CreatAt>{proofs.creatAt}</CreatAt>
          </UerInpo>
        </UserInfoWrap>
        {proofs.writer ? (
          <>
            <ModalButton onClick={openModal}>
              <IconDiv>
                <VerticalDot />
              </IconDiv>
            </ModalButton>
            <EditModal open={modalOpen} close={closeModal}>
              <ButtonInModal onClick={onClickEdit}>
                <ModalIcon>
                  <Edit />
                </ModalIcon>
                수정하기
              </ButtonInModal>
              <ButtonInModal onClick={modalOnOff}>
                <ModalIcon>
                  <Delete />
                </ModalIcon>
                삭제하기
              </ButtonInModal>
              <ButtonInModal>
                <ModalIcon>
                  <Report />
                </ModalIcon>
                신고하기
              </ButtonInModal>
            </EditModal>
          </>
        ) : null}
      </UserInfoFirstWrap>
      <TextContainer>
        <ContentTitle>{proofs.title}</ContentTitle>
        <ContentContent>{proofs.content}</ContentContent>
      </TextContainer>
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
  margin-left: 20px;
  gap: 10px;
  box-sizing: border-box;
`;

const UerInpo = styled.div`
  margin: 0;
  padding: 0;
`;

const UserInfoImg = styled.div`
 background-image: url(${(props) => props.imgUrl});
  width: 37px;
  height: 37px;
  background-position: center;
  background-size: cover;
  border-radius: 50%;
`;

const CreatAt = styled.div`
  font-size: 14px;
  letter-spacing: -0.02em;
  font-weight: 400;
  color: #212529;
`;

const Username = styled.div`
  font-size: 16px;
  font-weight: 600;
  letter-spacing: -0.03em;
  line-height: 22px;
  color: #212121;
`;

//내용
const TextContainer = styled.div`
  padding: 20px;
  border-bottom: 1px solid #e9ecef;
`;
const ContentTitle = styled.h1`
  font-size: 24px;
  font-weight: 600;
  line-height: 1.5;
  letter-spacing: -0.03em;
`;

const ContentContent = styled.div`
  font-size: 18px;
  font-weight: 400;
  letter-spacing: -0.03em;
  margin: 10px 0;
  word-break: break-all;
  white-space: pre-line;
`;

//스와이퍼

const FirstWrap = styled.div`
  width: 100%;
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
  /* swiper-pagination-bullet 
  swiper-pagination-bullet-active */
  .swiper-button-next::after,
  .swiper-button-prev::after {
    display: none;
  }
  .swiper-pagination-bullet,
  .swiper-pagination-bullet-active {
    background-color: #ffffff;
  }
`;

const ItemImg = styled.div`
  background: url(${(props) => props.imgUrl});
  padding-bottom: 10%;
  background-size: cover;
  object-fit: cover;
  background-position: center;
  background-repeat: no-repeat;
  display: inline-block;
  width: 100%;
  height: 100%;
`;

const StDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;

//모달
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
