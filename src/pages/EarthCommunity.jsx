import React from "react";
import Community from "../components/Community";
import Layout from "../components/layout/Layout";
import styled from 'styled-components';
import Footer from "../components/Footer";
import Header from "../components/Header";
import LogoSingleTop from "../components/LogoSingleTop";
import CommunityBottom from "../components/CommunityBottom";

const EarthCommunity = () => {
  return (
    <>
      <Layout>
        <Header>
          <LogoSingleTop />
        </Header>
        <CommunityBox>
          <Community />
        </CommunityBox>
        <Footer>
          <CommunityBottom />
        </Footer>
      </Layout>
    </>
  )
}
export default EarthCommunity;

const CommunityBox = styled.div`
height: 100%;
width: 390px;
overflow: auto;
  @media (max-width: 540px) {
    width: 100%;
  }
`;