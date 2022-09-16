import React from 'react';
import styled from 'styled-components';
import Layout from '../components/layout/Layout';
import Header from '../components/Header';
import Footer from '../components/Footer';
import InfoTop from '../components/info/InfoTop';
import Info from '../components/info/Info';
import CommunityBottom from '../components/CommunityBottom';
const EarthInfo = () => {
  return (
    <>
      <Layout>
        <Header>
          <InfoTop />
        </Header>
        <MypageBox>
          <Info />
        </MypageBox>
        <Footer>
          <CommunityBottom />
        </Footer>
      </Layout>
    </>
  )
}
export default EarthInfo;

const MypageBox = styled.div`
  width:100%;
  height:100%;
  overflow:auto;
  position:absolute;
  top:48px;
  left:0;
`;