import React from "react";
import styled from "styled-components";
import banner01 from '../assets/banner.png';

import PopularGroupItemList from './community/PopularGroupItemList';
import NewGroupItemList from './community/NewGroupItemList';
import CommunityItemList from './community/CommunityItemList';

const Community = () => {
  return (
    <>
      <CommunityWrap>
        <Container>
          <Banner><img src={banner01} alt='bannerImg' /></Banner>

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

          <CommunityGroup>
            <CommunityGroupTop>
              <CommunityGroupTitle>전체 그룹</CommunityGroupTitle>
            </CommunityGroupTop>
            <CommunityBox>
              <CommunityItemList />
            </CommunityBox>
          </CommunityGroup>
        </Container>
      </CommunityWrap>
    </>
  );
};
export default Community;

const CommunityWrap = styled.div``;
const Container = styled.div``;

const Banner = styled.div`
  width: 100%;
  height: 100%;
`;

const Line = styled.div`
  width:100%;
  height:1px;
  background-color:rgba(0,0,0,0.14);
  margin:10px 0;
`;

const PopularGroup = styled.div`
  width: 100vw;
  overflow: hidden;
  box-sizing: border-box;
`;
const PopularGroupTop = styled.div`
  padding: 0 15px;
`;
const PopularGroupTitle = styled.span`
  font: bold 26px/50px "Arial", "sans-serif";
`;
const PopularGroupBox = styled.div`
  padding: 0 4.5px;
  display: flex;
  overflow-x: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
`;





const NewGroup = styled.div`
  width: 100vw;
  overflow: hidden;
  box-sizing: border-box;
`;
const NewGroupTop = styled.div`
  padding: 0 15px;
`;
const NewGroupTitle = styled.span`
  font: bold 26px/50px "Arial", "sans-serif";
`;
const NewGroupBox = styled.div`
  padding: 0 4.5px;
  display: flex;
  overflow-x: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
`;





const CommunityGroup = styled.div`
  box-sizing: border-box;
`;
const CommunityGroupTop = styled.div`
  padding: 0 15px;
`;
const CommunityGroupTitle = styled.span`
  font: bold 26px/50px "Arial", "sans-serif";
`;
const CommunityBox = styled.div`
  /* display:flex;
  justify-content:center;
  flex-wrap: wrap; */

  display: grid;
  justify-items: center;
  grid-template-columns: repeat(auto-fill, minmax(50%, auto));
`;