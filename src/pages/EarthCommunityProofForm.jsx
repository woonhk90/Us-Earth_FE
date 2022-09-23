import React from "react";
import Layout from "../components/layout/Layout";
import styled from "styled-components";
import Footer from "../components/Footer";
import Header from "../components/Header";
import CommunityBottom from "../components/CommunityBottom";
import CommunityProofForm from "../components/proof/CommunityProofForm";

const EarthCommunityProofForm = () => {
  return (
    <Layout>
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
width: 390px;
overflow: auto;
  @media (max-width: 540px) {
    width: 100%;
  }
`;

