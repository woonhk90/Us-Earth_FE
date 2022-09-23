import React from "react";
import Layout from "../components/layout/Layout";
import styled from "styled-components";
import Footer from "../components/Footer";
import Header from "../components/Header";
import CommunityBottom from "../components/CommunityBottom";
import UserMissionMonth from "../components/userMission/UserMissionMonth";
import UserMissionTop from "../components/userMission/UserMissionTop";

const EarthMyPageMissonMonth = () => {
  return (
    <>
      <Layout>
        <Header>
          <UserMissionTop />
        </Header>
        <CommunityBox>
          <UserMissionMonth />
        </CommunityBox>
        <Footer>
          <CommunityBottom />
        </Footer>
      </Layout>
    </>
  );
};
export default EarthMyPageMissonMonth;

const CommunityBox = styled.div`
height: 100%;
width: 390px;
overflow: auto;
  @media (max-width: 540px) {
    width: 100%;
  }
`;
