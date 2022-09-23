import React from "react";
import Community from "../components/Community";
import Layout from "../components/layout/Layout";
import styled from "styled-components";
import Footer from "../components/Footer";
import Header from "../components/Header";
import CommunityBottom from "../components/CommunityBottom";
import UserMissionTop from "../components/userMission/UserMissionTop";
import UserMissionWeek from "../components/userMission/UserMissionWeek";

const EarthMyPageMissonWeek = () => {
  return (
    <>
      <Layout>
        <Header>
          <UserMissionTop />
        </Header>
        <CommunityBox>
          <UserMissionWeek />
        </CommunityBox>
        <Footer>
          <CommunityBottom />
        </Footer>
      </Layout>
    </>
  );
};
export default EarthMyPageMissonWeek;

const CommunityBox = styled.div`
height: 100%;
width: 390px;
overflow: auto;
  @media (max-width: 540px) {
    width: 100%;
  }
`;
