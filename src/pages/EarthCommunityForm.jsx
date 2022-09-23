import React from "react";
import styled from "styled-components";
import CommunityForm from "../components/community/CommunityForm";
import CommunityFormTop from "../components/community/CommunityFormTop";
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
      </Layout>
    </>
  );
};

export default EarthCommunityForm;

const CommunityBox = styled.div`
height: 100%;
width: 390px;
overflow: auto;
  @media (max-width: 540px) {
    width: 100%;
  }
`;
