import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { ReactComponent as Question } from "../assets/question.svg";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clearVal } from "../redux/modules/communitySlice";
import topLogo from "../assets/jpg/topLogo.png";
import { colors } from "../styles/color";
import icons from "../assets";
import GuideModal from "./Modals/GuideModal";
import CustomSelect from "./comment/CustomSelect";
import ConfirmSingleModal from "./Modals/ConfirmSingleModal";
import { deleteCommunityDetail } from "../redux/modules/communityFormSlice";
import CommunityTop from "./LogoSingleTop";

const CommunityDetailTop = () => {
  const { Back } = icons;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const param = useParams();
  const { communityDetail } = useSelector((state) => state.community);

  const [guideModal, setGuideModal] = useState(false);

  // close Modal
  const closeGuideModal = () => {
    setGuideModal(!guideModal);
  };

  const onClickHandler = () => {
    const url = localStorage.getItem("pathname");
    localStorage.removeItem("pathname");
    if (url) {
      navigate("/");
    } else {
      navigate(-1);
    }
  };

  /* --------------------------- 수정, 삭제, 신고하기 셀렉트 박스 -------------------------- */

  // dispatch function
  const clickDispatch = (payload) => {
    if (payload.selectName === "수정하기") {
      /* ------------------------- detail수정페이지로 navigate시킴 ------------------------ */
      navigate(`/community/edit/${payload.contentId}`);
    } else if (payload.selectName === "삭제하기") {
      /* ------------------------------- Detail를 삭제함 ------------------------------ */
      setDelModal(!delModal);
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
  ];

  /* ---------------------------------- 삭제 모달 --------------------------------- */
  const [delModal, setDelModal] = useState(false);

  // modal text data
  const confirmModalData = {
    title: "해당 글을 삭제하시겠습니까?",
    cancel: "아니오",
    submit: "예",
  };

  // editMode cancel function
  const clickSubmit = async () => {
    await dispatch(deleteCommunityDetail({ communityId: param.id }));
    navigate("/", { replace: true });
  };

  // close Modal
  const closeModal = () => {
    setDelModal(!delModal);
  };

  useEffect(() => {
    return () => {
      dispatch(clearVal());
    };
  }, []);
  return (
    <>
      {delModal && <ConfirmSingleModal clickSubmit={clickSubmit} confirmModalData={confirmModalData} closeModal={closeModal}></ConfirmSingleModal>}
      {guideModal && <GuideModal totalPage={4} closeModal={closeGuideModal}></GuideModal>}
      <HeaderWrap>
        <HeaderLeft onClick={onClickHandler}>
          <IconLeft>
            <Back />
          </IconLeft>
        </HeaderLeft>
        <HeaderCenter
          onClick={() => {
            navigate("/");
          }}
        >
          <Image src={topLogo} alt="topLogo"></Image>
        </HeaderCenter>
        <HeaderRight>
          <IconRight
            onClick={() => {
              setGuideModal(!guideModal);
            }}
          >
            <Question />
          </IconRight>
          {communityDetail.dateStatus === "before" ? (
            communityDetail.writer ? (
              <CustomSelect optionIcon={true} clickDispatch={clickDispatch} contentId={param.id} selectBoxData={selectBoxData} />
            ) : null
          ) : null}
        </HeaderRight>
      </HeaderWrap>
    </>
  );
};
export default CommunityDetailTop;

const HeaderWrap = styled.div`
  position: relative;
  top: 0;
  left: 0;
  width: 100%;
  height: 48px;
  box-sizing: border-box;
  margin: auto;
  text-align: center;
  border-bottom: 1px solid #f5f5f5;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const HeaderLeft = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  padding: 10px 16px;
  box-sizing: border-box;
`;

const IconLeft = styled.div`
  width: 12px;
  height: 21px;
`;
const HeaderRight = styled.div`
  gap: 12px;
  display: flex;
  justify-content: right;
  padding: 10px 17px;
  box-sizing: border-box;
`;
const HeaderCenter = styled.div`
  cursor: pointer;
  display: flex;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;
const IconRight = styled.div`
  cursor: pointer;
  width: 28px;
  height: 29px;
`;

const Image = styled.img`
  width: 132px;

  @media (max-width: 325px) {
    width: 100px;
  }
`;

/* -------------------------------- selectBox ------------------------------- */

const ModalIcon = styled.div`
  width: 18px;
  margin-right: 18px;
`;
