import React from "react";
import Layout from "../components/layout/Layout";
import styled from 'styled-components';
import Footer from "../components/Footer";
import Header from "../components/Header";
import LogoSingleTop from "../components/LogoSingleTop";
import CommunityBottom from "../components/CommunityBottom";
import NotFound from "../components/NotFound";

const EarthNotFound = () => {
  return (
    <>
      <Layout>
        <Header>
          <LogoSingleTop />
        </Header>
        <CommunityBox>
          <NotFound />
        </CommunityBox>
        <Footer>
          <CommunityBottom />
        </Footer>
      </Layout>
    </>
  )
}
export default EarthNotFound;

const CommunityBox = styled.div`
height: 100%;
width: 390px;
overflow: auto;
  @media (max-width: 540px) {
    width: 100%;
  }
`;