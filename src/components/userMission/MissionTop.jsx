import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Button from "../elements/Button"
import { userMissionCleanUp } from "../../redux/modules/userMissionSlice";
import ErrorModal from "../Modals/ErrorModal";
import topLogo from "../../assets/logo/topLogo.png";

const MissionTop = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    return () => dispatch(userMissionCleanUp());
  }, []);

  const { error } = useSelector((state) => state.userMission);

  if (error) {
    return <ErrorModal error={error} />;
  }

  return (
    <>
      <HeaderWrap>
        <HeaderLeft
          onClick={() => {
            navigate("/mypage");
          }}
        >
          <Button
        btnType="svg"
        svgType="back"/>
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
export default MissionTop;

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
