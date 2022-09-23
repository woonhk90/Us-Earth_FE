import React from 'react';
import styled from 'styled-components';
import Layout from '../components/layout/Layout';
import Header from '../components/Header';
import Footer from '../components/Footer';
import CommunityBottom from '../components/CommunityBottom';
import MyPageSettingTop from '../components/mypage/MyPageSettingTop';
import MyPageSetting from '../components/mypage/MyPageSetting';
const EarthMyPage = () => {
  return (
    <>
      <Layout>
        <Header>
          <MyPageSettingTop />
        </Header>
        <MypageBox>
          <MyPageSetting />
        </MypageBox>
        <Footer>
          <CommunityBottom />
        </Footer>
      </Layout>
    </>
  )
}
export default EarthMyPage;

const MypageBox = styled.div`
height: 100%;
width: 390px;
overflow: auto;
  @media (max-width: 540px) {
    width: 100%;
  }
`;
