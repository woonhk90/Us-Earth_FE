import React from "react";
import CommunityCertify from "../components/community/CommunityCertify";
import Layout from "../components/layout/Layout";
import styled from "styled-components";
import Footer from "../components/Footer";
import Header from "../components/Header";
import CommunityBottom from "../components/CommunityBottom";
import CommunityCertifyTop from "../components/community/CommunityCertifyTop";

const EarthCommunityCertify = () => {
  return (
    <Layout>
      <Header>
        <CommunityCertifyTop />
      </Header>
      <CommunityBox>
        <CommunityCertify />
      </CommunityBox>
      <Footer>
        <CommunityBottom />
      </Footer>
    </Layout>
  );
};
export default EarthCommunityCertify;

const CommunityBox = styled.div`
  height: 100%;
  width: 100%;
  /* overflow: auto; */
  position: absolute;
  top: 48px;
  left: 0;
`;
