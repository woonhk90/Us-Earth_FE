import React, { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate, useParams } from "react-router-dom";
import { Navigation, Pagination, Scrollbar } from "swiper";
import EditModal from "../Modals/EditModal";
import { useDispatch, useSelector } from "react-redux";
import { Swiper, SwiperSlide } from "swiper/react";
import rightWh from "../../assets/rightWh.svg";
import leftWh from "../../assets/leftWh.svg";
import { flexColumn, flexRow, flexBetween, Text } from "../../styles/Flex";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { deleteProof, getProofs, proofsCleanUp } from "../../redux/modules/proofsSlice";
import icons from "../../assets";
import ConfirmModal from "../Modals/ConfirmModal";
import Loading from "../etc/Loading";
import ErrorModal from "../Modals/ErrorModal";
import { __getCommunityDetail } from "../../redux/modules/communitySlice";
import ConfirmSingleModal from "../Modals/ConfirmSingleModal";

const CommunityProof = () => {
  const { VerticalDot, Delete, Report, Edit } = icons;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const param = useParams();
  const [modalOpen, setModalOpen] = useState(false);
  const { proofs, isLoading, error } = useSelector((state) => state.proofs);

  useEffect(() => {
    dispatch(getProofs(param.proofId));
    return ()=> {
      dispatch(proofsCleanUp());
    }
  }, []);

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const onClickEdit = () => {
    navigate(`/community/${param.communityId}/proof/edit/${param.proofId}`,{replace:true});
  };
  /* -------------------------------- edit modal ------------------------------- */
  const [modal, setModal] = useState(false);

  // modal text data
  const confirmModalData = {
    title: "삭제하시겠습니까?",
    cancel: "아니오",
    submit: "예",
  };

  console.log(param.proofId)
  console.log(param)
  // editMode cancel function
  const clickSubmit = () => {
    console.log(param.proofId)
    dispatch(deleteProof(param.proofId)).then((response) => {
      if (!response.error) {
        navigate(`/community/detail/${param.communityId}`,{replace:true});
      }
    });
  };

  const modalOnOff = () => {
    setModal(!modal);
  };
console.log(isLoading)
  if (isLoading) {
    return (
      <>
        <Loading />
      </>
    );
  }

  if (error) {
    return <ErrorModal error={error} />;
  }

  return (
    <>
      {modal && <ConfirmSingleModal confirmModalData={confirmModalData} clickSubmit={clickSubmit} closeModal={modalOnOff} />}
      <FirstWrap>
        <Swiper modules={[Navigation, Pagination, Scrollbar]} spaceBetween={50} slidesPerView={1} navigation pagination={{ clickable: true }}>
          {proofs.img?.map((img) => {
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
          <UserInfoImg referrerPolicy="no-referrer" src={proofs.profileImage} />
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
              {/* <ButtonInModal>
                <ModalIcon>
                  <Report />
                </ModalIcon>
                신고하기
              </ButtonInModal> */}
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

const UserInfoImg = styled.img`
  /* background-image: url(${(props) => props.imgUrl}); */
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
    background: rgba(0, 0, 0, 0.5);
    background-image: url("${rightWh}");
    background-repeat: no-repeat;
    background-position: 11px;
    background-size: 10px;
  }

  .swiper-button-prev {
    border-radius: 15px;
    width: 30px;
    height: 30px;
    background: rgba(0, 0, 0, 0.5);
    background-image: url("${leftWh}");
    background-repeat: no-repeat;
    background-position: 9px;
    background-size: 10px;
  }

  .swiper-button-next::after,
  .swiper-button-prev::after {
    display: none;
  }
  .swiper-pagination-bullet,
  .swiper-pagination-bullet-active {
    background-color: #ffffff;
    box-shadow: 1px 2px 4px rgba(0, 0, 0, 0.25);
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
