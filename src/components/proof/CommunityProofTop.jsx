import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { ReactComponent as LeftArrow } from "../../assets/LeftArrow.svg";
import { useDispatch } from "react-redux";
import { certifyReset } from "../../redux/modules/communitySlice";
import { ReactComponent as Back } from "../../assets/back.svg";
import topLogo from "../../assets/logo/topLogo.png";

const CommunityProofTop = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const param = useParams();
  return (
    <>
      <HeaderWrap>
        <HeaderLeft
          onClick={() => {
            dispatch(certifyReset());
            navigate(`/community/detail/${param.communityId}`, { replace: true });
          }}
        >
          <IconLeft>
            <Back />
          </IconLeft>
        </HeaderLeft>
        <HeaderCenter
          onClick={() => {
            navigate("/");
          }}
        >
          <Image src={topLogo} alt="topLogo"></Image>
        </HeaderCenter>
      </HeaderWrap>
    </>
  );
};
export default CommunityProofTop;

const HeaderWrap = styled.div`
  position: relative;
  top: 0;
  left: 0;
  width: 100%;
  height: 48px;
  box-sizing: border-box;
  margin: auto;
  text-align: center;
  border-bottom: 1px solid #f5f5f5;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const HeaderLeft = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  padding: 10px 16px;
  box-sizing: border-box;
`;

const IconLeft = styled.div`
  width: 12px;
  height: 21px;
`;
const HeaderCenter = styled.div`
  cursor: pointer;
  display: flex;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;
const Image = styled.img`
  width: 132px;
  @media (max-width: 325px) {
    width: 100px;
  }
`;
