import React from "react";
import styled from "styled-components";

const ImageModal = (props) => {
  const { image, modalOnOff } = props;

  return (
    <>
      <Modal onClick={modalOnOff}>
        <ModalWrap>
          <ModalWrap2>
            <Img src={image} />
          </ModalWrap2>
        </ModalWrap>
      </Modal>
    </>
  );
};
export default ImageModal;
const Modal = styled.div`
  position: absolute; 
  z-index: 1; 
  left: 0;
  top: 0;
  width: 100%; 
  height: 100vh; 
  overflow: auto; 
  box-sizing: border-box;
  background-color: rgba(0, 0, 0, 0.4);
`;

const ModalWrap = styled.div`
  box-sizing: border-box;
  display: flex;
  height: 100%;
  align-items: center;
  justify-content: center;
  `;

const ModalWrap2 = styled.div`
width: 100%;
  border-radius: 10px;
  box-sizing: border-box;
  height: auto;
  max-height: 70%;
  margin: 0 15px;
  overflow: auto;
    background-color: #ffffff;
  ::-webkit-scrollbar {
    display: block !important;
    width: 15px;
    height: 15px;
  }
  ::-webkit-scrollbar-thumb {
    background-color: #3d3d3dea;
    box-shadow: inset 0px 0px 5px white;
    border-radius: 10px;
  }
  ::-webkit-scrollbar-corner {
    background-color: transparent;
  }
  ::-webkit-scrollbar-track {
    background-color: #808080cf;
    box-shadow: inset 0px 0px 5px white;
    border-radius: 10px;
  }
`;


const Img = styled.img`
  /* width: 100%; */
`