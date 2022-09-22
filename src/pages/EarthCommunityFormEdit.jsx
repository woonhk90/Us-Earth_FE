import React from "react";
import styled from "styled-components";
import CommunityFormEdit from "../components/community/CommunityFormEdit";
import CommunityFormTop from "../components/community/CommunityFormTop";
import Header from "../components/Header";
import Layout from "../components/layout/Layout";

const EarthCommunityFormEdit = () => {
  return (
    <>
      <Layout>
        <Header>
          <CommunityFormTop />
        </Header>
        <CommunityBox>
          <CommunityFormEdit />
        </CommunityBox>
      </Layout>
    </>
  );
};

export default EarthCommunityFormEdit;

const CommunityBox = styled.div`
height: 100%;
width: 390px;
overflow: auto;
  @media (max-width: 540px) {
    width: 100%;
  }
`;
