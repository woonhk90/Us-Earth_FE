import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import Sceleton from "../elements/Sceleton";
import Header from "../Header";
import "react-datepicker/dist/react-datepicker.css";
import { ReactComponent as Back } from "../../assets/back.svg";
import { ReactComponent as CameraWh } from "../../assets/cameraWh.svg";
import { colors } from "../../styles/color";

const SceletonProofEdit = () => {
  const navigate = useNavigate();
  const param = useParams();
  
  return (
    <>
      <Header>
        <HeaderWrap>
          <IconDiv>
            <Back
              onClick={() => {
                navigate(`/community/detail/${param.communityId}`);
              }}
            />
          </IconDiv>
          <HeaderP>수정</HeaderP>
        </HeaderWrap>
      </Header>
      <CommunityFormWrap>
        <AddPhotoWrap>
          <Stform>
            <Container>
              <div>
                <StIcon>
                  <CameraIcon>
                    <CameraWh />
                  </CameraIcon>
                </StIcon>
                <ImageLength>(0/5)</ImageLength>
              </div>
            </Container>
          </Stform>
          <Container>
            <Sceleton margin="0" height="100px" width="100px" />
          </Container>
        </AddPhotoWrap>
        <BottomWrap>
          <Bottom>
            <Sceleton margin="0" height="35px" width="50%" />
          </Bottom>
          <Sceleton margin="15px 30px 0 30px" height="25px" width="80%" />
          <Sceleton margin="15px 30px 0 30px" height="25px" width="60%" />
        </BottomWrap>
      </CommunityFormWrap>
    </>
  );
};

export default SceletonProofEdit;

const CommunityFormWrap = styled.div`
  width: 100%;
  position: relative;
`;

const AddPhotoWrap = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  @media (max-width: 389px) {
    grid-template-columns: 1fr 1fr;
  }
  flex-wrap: wrap;
  padding: 20px 15px 13px 15px;
  justify-items: center;
  border-bottom: 2px solid rgba(217, 217, 217, 0.3);
`;

const Container = styled.div`
  position: relative;
  width: 100px;
  height: 100px;
  margin: 9px;
`;

const Stform = styled.form`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const BottomWrap = styled.div`
  width: 100%;
  box-sizing: border-box;
`;

const Bottom = styled.div`
  border-bottom: 2px solid rgba(217, 217, 217, 0.3);
  box-sizing: border-box;
  margin: 0;
  padding: 14px 30px;
  font-size: 24px;
  height: 64px;
  font-weight: 600;
`;

const ImageLength = styled.div`
  position: absolute;
  color: white;
  letter-spacing: -0.03em;
  font-weight: 400;
  font-size: 18px;
  top: 70%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const CameraIcon = styled.div`
  width: 37px;
  height: 30px;
  position: absolute;
  top: 41%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const StIcon = styled.div`
  cursor: pointer;
  width: 100px;
  height: 100px;
  background-color: #d9d9d9;
  border-radius: 10px;
`;

const HeaderWrap = styled.div`
  top: 0;
  left: 0;
  width: 100%;
  height: 48px;
  display: flex;
  justify-content: space-between;
  padding: 13px 13px 13px 16px;
  box-sizing: border-box;
  z-index: 1;
  border-bottom: 1px solid ${colors.grayF5};
`;

const IconDiv = styled.div`
  cursor: pointer;
  width: 12px;
  height: 21px;
`;

const HeaderP = styled.button`
  display: flex;
  align-items: center;
  cursor: pointer;
  border: none;
  background-color: transparent;
  font-weight: 600;
  font-size: 20px;
  letter-spacing: -0.03em;
  color: ${colors.grayCB};
`;
