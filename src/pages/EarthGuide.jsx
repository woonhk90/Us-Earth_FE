import React from "react";
import styled from 'styled-components';
import Guide from "../components/guide/Guide";
import Layout from "../components/layout/Layout";
import Footer from "../components/Footer";
import Header from "../components/Header";
import GuideTop from "../components/guide/GuideTop";
import CommunityBottom from "../components/CommunityBottom";

const EarthGuide = () => {
  return (
    <>
      <Layout>
        <Header>
          <GuideTop />
        </Header>
        <GuideBox>
          <Guide />
        </GuideBox>
        <Footer>
          <CommunityBottom />
        </Footer>
      </Layout>
    </>
  )
}
export default EarthGuide;

const GuideBox = styled.div`
width: 390px;
height: 100%;
overflow: auto;
  @media (max-width: 540px) {
    width: 100%;
  }
`;