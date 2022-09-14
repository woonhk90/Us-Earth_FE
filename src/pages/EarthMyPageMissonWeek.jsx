import React from "react";
import Community from "../components/Community";
import Layout from "../components/layout/Layout";
import styled from "styled-components";
import Footer from "../components/Footer";
import Header from "../components/Header";
import CommunityBottom from "../components/CommunityBottom";
import UserMissionWeekTop from "../components/userMission/UserMissionWeekTop";
import UserMissionWeek from "../components/userMission/UserMissionWeek";

const EarthMyPageMissonWeek = () => {
  return (
    <>
      <Layout>
        <Header>
          <UserMissionWeekTop />
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
  width: 100%;
  overflow: auto;
  position: absolute;
  top: 48px;
  left: 0;
`;
