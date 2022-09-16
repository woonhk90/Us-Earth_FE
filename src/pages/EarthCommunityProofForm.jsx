import React from "react";
import Layout from "../components/layout/Layout";
import styled from "styled-components";
import Footer from "../components/Footer";
import Header from "../components/Header";
import CommunityBottom from "../components/CommunityBottom";
import CommunityProofForm from "../components/proof/CommunityProofForm";
import CommunityProofFormTop from "../components/proof/CommunityProofFormTop";

const EarthCommunityProofForm = () => {
  return (
    <Layout>
      {/* <Header>
        <CommunityProofFormTop />
      </Header> */}
      <CommunityBox>
        <CommunityProofForm />
      </CommunityBox>
      <Footer>
        <CommunityBottom />
      </Footer>
    </Layout>
  );
};

export default EarthCommunityProofForm;

const CommunityBox = styled.div`
  height: 100%;
  width: 100%;
  overflow: auto;
  position: absolute;
  top: 48px;
  left: 0;
`;
