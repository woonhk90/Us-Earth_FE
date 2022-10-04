import React, { useEffect, useState } from "react";
import styled, { css, keyframes } from "styled-components";
import Button from "../elements/Button"

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
          e.stopPropagation();
        }}
      >
        <StHeader></StHeader>
        <ButtonInModalWrap>{props.children}</ButtonInModalWrap>
        <Button btnType="modal" onClick={close}>취소</Button>
      </Stsection>
    </StModal>
  );
};

export default EditModal;

const StModal = styled.div`
  transition: opacity 0.3s ease-out;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 99; 
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
    button{
      font-size:18px !important;
    }
`;

const StHeader = styled.header``;

const ButtonInModalWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  align-items: flex-start;
  padding: 21px 31px 14px 31px;
`;
