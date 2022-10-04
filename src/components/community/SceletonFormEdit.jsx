import React from "react";
import styled from "styled-components";
import { flexBetween, flexColumn } from "../../styles/Flex";
import Sceleton from "../elements/Sceleton";

const SeceletonFormEdit = () => {
  return (
    <>
      <CommunityFormWrap>
        <ImageBoxWrap>
          <ImageForm>
            <ImageIcon>
              <Sceleton height="206px" width="100%" />
            </ImageIcon>
          </ImageForm>
          <TextWrap>
            <Sceleton margin="5px 0 10px 0" height="20px" width="40%" />
          </TextWrap>
        </ImageBoxWrap>
        <TopTextWrap>
          <Sceleton margin="35px 0 10px 0" height="30px" width="30%" />
        </TopTextWrap>
        <Sceleton margin="5px 0 35px 0" height="30px" width="80%" />
        <Sceleton margin="25px 0 10px 0" height="30px" width="30%" />
        <Sceleton margin="15px 0 35px 0" height="30px" width="100%" />
        <Sceleton margin="25px 0 10px 0" height="30px" width="30%" />
        <Sceleton margin="15px 0 35px 0" height="30px" width="70%" />
        <Sceleton margin="25px 0 10px 0" height="30px" width="30%" />
        <Sceleton margin="15px 0 35px 0" height="30px" width="30%" />
        <Sceleton margin="25px 0 10px 0" height="30px" width="30%" />
        <Sceleton margin="15px 0 120px 0" height="100px" width="100%" />
      </CommunityFormWrap>
      <BottomWrap>
        <BottomButton>그룹 등록</BottomButton>
      </BottomWrap>
    </>
  );
};

export default SeceletonFormEdit;

const CommunityFormWrap = styled.div`
  margin: 53px 16px 60px 16px;
`;

const ImageBoxWrap = styled.div`
  ${flexColumn}
`;

const TextWrap = styled.div`
  position: relative;
  width: 100%;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const ImageForm = styled.div`
  width: 206px;
  height: 206px;
  justify-content: center;
  align-items: center;
  display: flex;
  margin-bottom: 12px;
`;

const ImageIcon = styled.div`
  cursor: pointer;
  width: 206px;
  height: 206px;
  border: none;
  background-color: #f1f1f1;
  border-radius: 14px;
  position: relative;
`;

const BottomWrap = styled.div`
  position: absolute;
  bottom: 0;
  height: 56px;
  width: 100%;
  display: flex;
  text-align: center;
`;

const BottomButton = styled.button`
  width: 100%;
  border: none;
  line-height: 56px;
  font-weight: 600;
  font-size: 20px;
`;

const TopTextWrap = styled.div`
  ${flexBetween}
`;
