import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import guide5 from "../../assets/jpg/guide5.jpg";
import { ReactComponent as Cancel } from "../../assets/Cancel.svg";
import Button from "../elements/Button";

const GuideSingleModal = (props) => {
  const { closeModal,page } = props;

  return (
    <>
      <ModalWrap onClick={closeModal}>
        <ModalBody
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <ConfirmWrap>
            <ConfirmTitle>
              <IconDiv onClick={closeModal}>
                <Button btnType="svg" svgType="cancel"/>
              </IconDiv>
              <Image src={require(`../../assets/jpg/guide${page}.jpg`)} alt={`guide${page}`}></Image>
            </ConfirmTitle>
              <Button btnType="modal" onClick={closeModal}>
               확인
              </Button>
          </ConfirmWrap>
        </ModalBody>
      </ModalWrap>
    </>
  );
};
export default GuideSingleModal;

const ModalWrap = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
  padding: 0 16px;
  box-sizing: border-box;
  @media (max-height: 720px) and (min-width:389px){
  padding: 0 55px;
    }
`;
const ModalBody = styled.div`
  width: 100%;
  background-color: #fff;
  border-radius: 12px;
`;

const IconDiv = styled.div`
  position: absolute;
  right: 19px;
  top: -4px;
`;

const ConfirmWrap = styled.div`
  display: ${(props) => (!props.viewFlag ? "block" : "none")};
`;

const ConfirmTitle = styled.div`
  position: relative;
  margin-top: 20px;
  width: 100%;
  height: 100%;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
`;
