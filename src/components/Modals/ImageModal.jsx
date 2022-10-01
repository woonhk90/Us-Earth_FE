import React from "react";
import styled from "styled-components";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";

const ImageModal = (props) => {
  const { image, modalOnOff } = props;

  return (
    <>
      <Modal onClick={modalOnOff}>
        <ModalWrap
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <TransformWrapper 
                // initialPositionX={0}
                // initialPositionY={0}
        // initialPositionX={50}
        // initialPositionY={100}
        initialScale={0.8} minScale={0.2} maxScale={3}>
            <TransformComponent>
              <figure>
                <img src={image} />
              </figure>
            </TransformComponent>
          </TransformWrapper>
          {/* <ModalWrap2>
            <Img src={image} />
          </ModalWrap2> */}
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
  > div {
    /* margin: 0;
    padding: 0; */
    width: 100%;
    height: 100%;
    /* transform: translate(0%, 35%) ; */
    /* width: 500px; */
    /* height: 500px; */
  }
  > div > div {
    /* width: 100%;
    height: 100%; */
    /* transform: translate3d(0px, 0px, 0px) scale(0.5) !important; */
  }
  figure{
  }
  img{
  }
  
    
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  position: absolute;
    width: 100%;
    height: 500px;
  background-color: rgba(0, 0, 0, 0.7);
  /* background-color: green; */
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
`;