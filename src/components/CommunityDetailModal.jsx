import React from 'react';
import { useNavigate, useLocation, Redirect, Routes, Route, Navigate } from 'react-router-dom';
import styled from 'styled-components';
import { getCookie } from '../shared/cookie';
import { useDispatch, useSelector } from "react-redux";
import { __updateCommunityJoin } from '../redux/modules/communitySlice';

const CommunityModal = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const closeModal = () => {
    props.closeModal();
  }
  const [viewFlag, setViewFlag] = React.useState(false);
  const onViewFlagHandler = (id) => {
    dispatch(__updateCommunityJoin({ communityId: props.communityId }));

    setViewFlag(!viewFlag);
  }
  /* --------------------- 로그인 되어있는지 우선 확인(안되어있으면 로그인페이지) --------------------- */
  const usercookie = getCookie('mycookie');
  const { pathname } = useLocation();
  if (usercookie === undefined) {
    localStorage.setItem('pathname', pathname);
    navigate('/login');
  }

  return (
    <>
      <ModalWrap onClick={closeModal}>
        <ModalBody onClick={(e) => { e.stopPropagation() }}>
          <ConfirmWrap viewFlag={viewFlag}>
            <ConfirmTitle><ConfirmTitleSpan>드룹투두제목</ConfirmTitleSpan>에<br /> 가입하시겠습니까?</ConfirmTitle>
            <ConfirmBox>
              <ConfirmItem borderRight={'1px solid #d9d9d9'} onClick={closeModal}>취소</ConfirmItem>
              <ConfirmItem borderLeft={'1px solid #d9d9d9'} onClick={() => { onViewFlagHandler(props.communityId) }} >가입</ConfirmItem>
            </ConfirmBox>
          </ConfirmWrap>
          <AttendWrap viewFlag={viewFlag}>
            <AttendTitle><AttendTitleSpan>드룹투두제목</AttendTitleSpan>에<br /> 가입이 완료되었습니다</AttendTitle>
            <AttendBox>
              <AttendItem onClick={closeModal}>확인</AttendItem>
            </AttendBox>
          </AttendWrap>
        </ModalBody>
      </ModalWrap>
    </>
  )
}
export default CommunityModal;

const ModalWrap = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height:100%;
  background-color: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index:10;
  padding:0 15px;
  box-sizing:border-box;
  `;
const ModalBody = styled.div`
  width: 100%;
  
  background-color: #fff;
  border-radius: 12px;
`;





const ConfirmWrap = styled.div`
  display:${(props) => !props.viewFlag ? 'block' : 'none'};
`;
const ConfirmTitle = styled.p`
  font:22px/30px 'arial','sans-serif';
  text-align:center;
  padding:50px 0;
`;
const ConfirmTitleSpan = styled.span`
  font:700 22px/30px 'arial','sans-serif';
`;
const ConfirmBox = styled.div`
  width:100%;
  display:flex;
  justify-content:center;
  text-align:center;
  border-top:1px solid #d9d9d9;
`;
const ConfirmItem = styled.div`
  width:50%;
  border-right:${(props) => props.borderRight};
  border-left:${(props) => props.borderLeft};
  font:600 22px/30px 'arial','sans-serif';
  padding:19px 0;
`;


const AttendWrap = styled.div`
  display:${(props) => !props.viewFlag ? 'none' : 'block'};
`;
const AttendTitle = styled.p`
  font:22px/30px 'arial','sans-serif';
  text-align:center;
  padding:50px 0;
`;
const AttendTitleSpan = styled.span`
  font:700 22px/30px 'arial','sans-serif';
`;
const AttendBox = styled.div`
  width:100%;
  display:flex;
  justify-content:center;
  text-align:center;
  border-top:1px solid #d9d9d9;
`;
const AttendItem = styled.div`
  width:50%;
  font:600 22px/30px 'arial','sans-serif';
  padding:19px 0;
`;