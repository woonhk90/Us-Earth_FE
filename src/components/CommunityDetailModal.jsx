import React from 'react';
import styled from 'styled-components';

const CommunityModal = (props) => {
  const closeModal = () => {
    props.closeModal();
  }
  return (
    <>
      <ModalWrap onClick={closeModal}>
        <ModalBody onClick={(e) => { e.stopPropagation() }}>
          <ConfirmWrap>
            <ConfirmTitle><ConfirmTitleSpan>드룹투두제목</ConfirmTitleSpan>에<br/> 가입하시겠습니까?</ConfirmTitle>
            <ConfirmBox>
              <ConfirmItem borderRight={'1px solid #d9d9d9'} onClick={closeModal}>취소</ConfirmItem>
              <ConfirmItem borderLeft={'1px solid #d9d9d9'} >가입</ConfirmItem>
            </ConfirmBox>
          </ConfirmWrap>
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
