import styled from "styled-components";
import CommunityBottom from "../components/CommunityBottom";
import CommunityDetail from "../components/CommunityDetail";
import CommunityDetailTop from "../components/CommunityDetailTop";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Layout from "../components/layout/Layout";

const EarthCommunityDetail = () => {
  return (
    <>
      <Layout>
        <Header>
          <CommunityDetailTop />
        </Header>
        <CommunityBox>
          <CommunityDetail />
        </CommunityBox>
        <Footer>
          <CommunityBottom />
        </Footer>
      </Layout>
    </>
  )
}
export default EarthCommunityDetail;

const CommunityBox = styled.div`
height: 100%;
width: 390px;
overflow: auto;
  @media (max-width: 540px) {
    width: 100%;
  }
`;
