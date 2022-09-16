import React from "react";
import Layout from "../components/layout/Layout";
import styled from "styled-components";
import Footer from "../components/Footer";
import Header from "../components/Header";
import CommunityBottom from "../components/CommunityBottom";
import CommunityProofEdit from "../components/proof/CommunityProofEdit";
import CommunityProofFormTop from "../components/proof/CommunityProofFormTop";

const EarthCommunityProofEdit = () => {
  return (
    <Layout>
      {/* <Header>
        <CommunityProofFormTop />
      </Header> */}
      <CommunityBox>
        <CommunityProofEdit />
      </CommunityBox>
      <Footer>
        <CommunityBottom />
      </Footer>
    </Layout>
  );
};

export default EarthCommunityProofEdit;

const CommunityBox = styled.div`
  height: 100%;
  overflow: auto;
  position: absolute;
  top: 48px;
  left: 0;
`;
