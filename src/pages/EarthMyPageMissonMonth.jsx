import React from "react";
import Community from "../components/Community";
import Layout from "../components/layout/Layout";
import styled from "styled-components";
import Footer from "../components/Footer";
import Header from "../components/Header";
import CommunityTop from "../components/CommunityTop";
import CommunityBottom from "../components/CommunityBottom";
import MissionCalendar from "../components/userMission/MissionCalendar";
import SubCalendar from "../components/userMission/SubCalendar";

const EarthMyPageMissonMonth = () => {
  return (
    <>
      <Layout>
        <Header>
          <CommunityTop />
        </Header>
        <CommunityBox>
          <MissionCalendar />
          <SubCalendar />
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
  width: 100%;
  overflow: auto;
  position: absolute;
  top: 48px;
  left: 0;
`;
