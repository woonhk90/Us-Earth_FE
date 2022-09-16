import React, { useEffect, useState } from "react";
import styled, { css, keyframes } from "styled-components";
// import "./Modal.css";

const EditModal = (props) => {
  const { open, close } = props;
  const [isOpen, setIsOpen] = useState(false);

  let timeoutId;
  useEffect(() => {
    if (open) {
      setIsOpen(true);
    } else {
      timeoutId = setTimeout(() => setIsOpen(false), 270);
    }

    return () => {
      if (timeoutId !== undefined) {
        clearTimeout(timeoutId);
      }
    };
  }, [open, isOpen]);

  if (!isOpen) {
    return null;
  }

  return (
    <StModal modalHide={!open} modalShow={open} onClick={close} className="openModal">
      <Stsection
        buttonShow={open}
        buttonHide={!open}
        onClick={(e) => {
          // do not close modal if anything inside modal content is clicked
          e.stopPropagation();
        }}
      >
        <StHeader></StHeader>
        <ButtonInModalWrap>{props.children}</ButtonInModalWrap>
        <Footer>취소</Footer>
      </Stsection>
    </StModal>
  );
};

export default EditModal;

const StModal = styled.div`
  transition: opacity 0.3s ease-out;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 99; //해당 모달이 맨 앞에 위치하게 하기
  background-color: rgba(89, 89, 89, 0.6);
  &.openModal {
    display: flex;
    animation: ${(props) => (props.open ? bgShow : bgHide)} 0.3s ease-out;

    ${(props) =>
      props.modalShow &&
      css`
        animation-name: ${bgShow};
      `}
    ${(props) =>
      props.modalHide &&
      css`
        animation-name: ${bgHide};
      `}
  }
`;

const bgShow = keyframes`
   from {
    opacity: 0;
  }
  to {
    opacity: 1;
  } 
`;
const bgHide = keyframes`
   from {
    opacity: 1;
  }
  to {
    opacity: 0;
  } 
`;

const slideShow = keyframes`
    from {
    opacity: 0;
    transform: translate(0px, 50px);
  }
  to {
    opacity: 1;
    transform: translate(0px, 0px);
  }
`;

const slideHide = keyframes`
    from {
      opacity: 1;
      transform: translate(0px, 0px);
    }
    to {
      opacity: 0;
    transform: translate(0px, 50px);
  }
`;

const Stsection = styled.section`
  background-color: white;
  position: absolute;
  width: 100%;
  bottom: 0px;
  border-radius: 20px 20px 0 0;
  transition: transform 0.3s ease-out;
  animation: ${(props) => (props.open ? slideShow : slideHide)} 0.3s ease-out;
  ${(props) =>
    props.buttonShow &&
    css`
      animation-name: ${slideShow};
    `}
  ${(props) =>
    props.buttonHide &&
    css`
      animation-name: ${slideHide};
    `}
`;

const StHeader = styled.header``;

const Footer = styled.p`
cursor: pointer;
  text-align: center;
  padding: 17.5px 0;
  font-size: 18px;
  font-weight: 600;
  border-top: 2px solid #d9d9d9;
`;

const ButtonInModalWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  align-items: flex-start;
  padding: 21px 31px 14px 31px;
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
