import React from "react";
import Layout from "../components/layout/Layout";
import styled from "styled-components";
import Footer from "../components/Footer";
import Header from "../components/Header";
import CommunityBottom from "../components/CommunityBottom";
import CommunityCertifyForm from "../components/community/CommunityCertifyForm";
import CommunityCertifyFormTop from "../components/community/CommunityCertifyFormTop";

const EarthCommunityCertifyForm = () => {
  return (
    <Layout>
      <Header>
        <CommunityCertifyFormTop />
      </Header>
      <CommunityBox>
        <CommunityCertifyForm />
      </CommunityBox>
      <Footer>
        <CommunityBottom />
      </Footer>
    </Layout>
  );
};

export default EarthCommunityCertifyForm;

const CommunityBox = styled.div`
  height: 100%;
  /* overflow: auto; */
  position: absolute;
  top: 48px;
  left: 0;
`;
