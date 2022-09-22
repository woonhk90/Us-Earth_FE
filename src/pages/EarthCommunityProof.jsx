import React from "react";
import CommunityProof from "../components/proof/CommunityProof";
import Layout from "../components/layout/Layout";
import styled from "styled-components";
import Footer from "../components/Footer";
import Header from "../components/Header";
import CommentBox from "../components/comment/CommentBox";
import CommunityBottom from "../components/CommunityBottom";
import CommunityProofTop from "../components/proof/CommunityProofTop";

const EarthCommunityProof = () => {
  return (
    <Layout>
      <Header>
        <CommunityProofTop />
      </Header>
      <CommunityBox>
        <CommunityProof />
        <CommentBox />
      </CommunityBox>
      <Footer>
        <CommunityBottom />
      </Footer>
    </Layout>
  );
};
export default EarthCommunityProof;


const CommunityBox = styled.div`
height: 100%;
width: 390px;
overflow: auto;
  @media (max-width: 540px) {
    width: 100%;
  }
`;
