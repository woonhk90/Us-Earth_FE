import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { clearVal } from "../../redux/modules/communitySlice";
import { ReactComponent as Cancel } from "../../assets/Cancel.svg";

const CommunityFormTop = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  React.useEffect(() => {
    return () => {
      dispatch(clearVal());
    };
  }, [])
  return (
    <>
      <HeaderWrap>
        <IconDiv>
          <Cancel
            onClick={() => {
              navigate("/community");
            }}
          />
        </IconDiv>
      </HeaderWrap>
      <HeaderFlex>
        <P>그룹 만들기</P>
      </HeaderFlex>
    </>
  );
};
export default CommunityFormTop;

const HeaderWrap = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 48px;
  display: flex;
  justify-content: space-between;
  padding: 14px;
  box-sizing: border-box;
  z-index: 1;
`;
const HeaderFlex = styled.div`
  width: 100%;
  padding: 10px;
  margin: auto;
  text-align: center;
  border-bottom: 1px solid #f5f5f5;
`;
const P = styled.p`
  font-weight: 600;
  font-size: 20px;
`;

const IconDiv = styled.div`
  cursor: pointer;
  width: 21px;
  height: 21px;
`;
