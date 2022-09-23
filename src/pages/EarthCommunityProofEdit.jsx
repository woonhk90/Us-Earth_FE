import React from "react";
import Layout from "../components/layout/Layout";
import styled from "styled-components";
import Footer from "../components/Footer";
import Header from "../components/Header";
import CommunityBottom from "../components/CommunityBottom";
import CommunityProofEdit from "../components/proof/CommunityProofEdit";

const EarthCommunityProofEdit = () => {
  return (
    <Layout>
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
width: 390px;
overflow: auto;
  @media (max-width: 540px) {
    width: 100%;
  }
`;
