import React, { useEffect, useState } from "react";
import styled, { css, keyframes } from "styled-components";
import { useDispatch, useSelector } from "react-redux";
// import "./Modal.css";

const EditModal = (props) => {
  const { open, close } = props;
  const [isOpen, setIsOpen] = useState(false);
  const { comments, commentEdit,writeMode } = useSelector((state) => state.comments);
  
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
        
        <WriteHeight height={writeMode}></WriteHeight>
        <div>{props.children}</div>
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
  position: absolute;
  width: 100%;
  height: auto;
  bottom: 0px;
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

const StMain = styled.main``;

const WriteHeight = styled.div`
height: ${(props)=>`${props.height-65}px`};
/* display:${(props)=> props.height ? null : 'none'}; */
background-color:transparent;
`;
