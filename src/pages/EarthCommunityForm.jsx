import React from "react";
import styled from "styled-components";
import CommunityForm from "../components/community/CommunityForm";
import CommunityBottom from "../components/CommunityBottom";
import CommunityFormTop from "../components/community/CommunityFormTop";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Layout from "../components/layout/Layout";

const EarthCommunityForm = () => {
  return (
    <>
      <Layout>
        <Header>
          <CommunityFormTop />
        </Header>
        <CommunityBox>
          <CommunityForm />
        </CommunityBox>
        <Footer>
          <CommunityBottom />
        </Footer>
      </Layout>
    </>
  );
};

export default EarthCommunityForm;

const CommunityBox = styled.div`
  height: 100%;
  overflow: auto;
  position: absolute;
  top: 48px;
  left: 0;
`;
