import React from 'react';
import styled from 'styled-components';
import Layout from '../components/layout/Layout';
import Header from '../components/Header';
import Footer from '../components/Footer';
import CommunityBottom from '../components/CommunityBottom';
import MyPageMissionGroupTop from '../components/mypage/MyPageMissionGroupTop';
import MyPageMissionGroup from '../components/mypage/MyPageMissionGroup';
const EarthMyPageMissionGroup = () => {
  return (
    <>
      <Layout>
        <Header>
          <MyPageMissionGroupTop />
        </Header>
        <MypageBox>
          <MyPageMissionGroup />
        </MypageBox>
        <Footer>
          <CommunityBottom />
        </Footer>
      </Layout>
    </>
  )
}
export default EarthMyPageMissionGroup;

const MypageBox = styled.div`
height: 100%;
width: 390px;
overflow: auto;
  @media (max-width: 540px) {
    width: 100%;
  }
`;
