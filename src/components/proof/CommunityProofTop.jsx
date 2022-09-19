import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { ReactComponent as LeftArrow } from "../../assets/LeftArrow.svg";
import { useDispatch } from "react-redux";
import { certifyReset } from "../../redux/modules/communitySlice";
import { ReactComponent as Back } from "../../assets/back.svg";
import { ReactComponent as Write } from "../../assets/write.svg";

const CommunityProofTop = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const param = useParams();
  return (
    <>
      <HeaderWrap>
        <IconDiv>
          <Back
            onClick={() => {
              dispatch(certifyReset());
              navigate(`/community/detail/${param.communityId}`);
            }}
          />
        </IconDiv>
        <WriteIcon>
          <Write />
        </WriteIcon>
        <PTag>그룹 투두 제목</PTag>
      </HeaderWrap>
    </>
  );
};
export default CommunityProofTop;

const HeaderWrap = styled.div`
  position: relative;
  top: 0;
  left: 0;
  width: 100vw;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  /* padding: 13px 19px 0px 16px; */
  padding: 16px;
  box-sizing: border-box;
  z-index: 1;
`;

const PTag = styled.p`
font-size: 20px;
font-weight: 600;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const IconDiv = styled.div`
  cursor: pointer;
  width: 12px;
  height: 21px;
`;
const WriteIcon = styled.div`
  width: 29px;
  height: 33px;
`;
