import React from "react";
import Community from "../components/Community";
import Layout from "../components/layout/Layout";
import styled from 'styled-components';
const EarthCommunity = () => {
  return (
    <>
      <Layout>
        <CommunityBox>
          <Community />
        </CommunityBox>
      </Layout>
    </>
  )
}
export default EarthCommunity;

const CommunityBox = styled.div`
  height:100%;
  overflow:auto;
  position:absolute;
  top:48px;
  left:0;
`;