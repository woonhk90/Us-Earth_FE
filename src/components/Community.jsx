import React from "react";
import styled from "styled-components";
import banner01 from '../assets/banner_01.jpg';

import PopularGroupItemList from './community/PopularGroupItemList';
import NewGroupItemList from './community/NewGroupItemList';
import CommunityItemList from './community/CommunityItemList';

import icons from "../assets";
import Modal from "./CommunityModal";
import { useNavigate } from "react-router-dom"

const Community = () => {
  const { CommunityNewGroup } = icons;
  const navigate = useNavigate();
  return (
    <>
      <CommunityWrap>
        <Container>
          <Banner onClick={() => { navigate('/guide') }}><img src={banner01} alt='bannerImg' /></Banner>

          <PopularGroup>
            <PopularGroupTop>
              <PopularGroupTitle>인기 그룹</PopularGroupTitle>
            </PopularGroupTop>
            <PopularGroupBox>
              <PopularGroupItemList />
            </PopularGroupBox>
          </PopularGroup>

          <Line />

          <NewGroup>
            <NewGroupTop>
              <NewGroupTitle>마감임박 그룹</NewGroupTitle>
            </NewGroupTop>
            <NewGroupBox>
              <NewGroupItemList />
            </NewGroupBox>
          </NewGroup>

          <Line />

          {/* 전체그룹 */}
          <CommunityItemList />

          <IconCommunityWriteBtn onClick={() => { navigate('/community/form') }}>
            <CommunityNewGroup />
          </IconCommunityWriteBtn>
        </Container>
      </CommunityWrap>
    </>
  );
};
export default Community;

const CommunityWrap = styled.div`
width:100%;
`;
const Container = styled.div`
  width:100%;
`;

const Banner = styled.div`
  width: 100%;
  img{
    width:100%;
  }
`;

const Line = styled.div`
  width:100%;
  height:1px;
  background-color:rgba(0,0,0,0.14);
  margin:10px 0;
`;

const PopularGroup = styled.div`
  width: 100%;
  overflow: hidden;
  box-sizing: border-box;
`;
const PopularGroupTop = styled.div`
  padding: 0 15px;
`;
const PopularGroupTitle = styled.span`
  font: bold 26px/50px "Noto Sans KR", "sans-serif";
`;
const PopularGroupBox = styled.div`
  /* padding: 0 4.5px; */
  display: flex;
  overflow-x: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
`;





const NewGroup = styled.div`
  overflow: hidden;
  box-sizing: border-box;
`;
const NewGroupTop = styled.div`
  padding: 0 15px;
`;
const NewGroupTitle = styled.span`
  font: bold 26px/50px "Noto Sans KR", "sans-serif";
  
  /* font-family: 'Noto Sans KR', sans-serif; */
`;
const NewGroupBox = styled.div`
  /* padding: 0 4.5px; */
  display: flex;
  overflow-x: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
`;





const IconCommunityWriteBtn = styled.div`
  position:absolute;
  bottom:70px;right:10px;
  z-index:5;

  display:flex;
  justify-content:center;
  align-items:center;
`;