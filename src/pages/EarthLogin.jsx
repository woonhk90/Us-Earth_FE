import React from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import LoginTop from '../components/LoginTop';
import Layout from '../components/layout/Layout';
import Login from '../components/Login';
import CommunityBottom from '../components/CommunityBottom';
import styled from 'styled-components';

const EarthLogin = () => {
    return (
        <Layout>
            <Header>
                <LoginTop />
            </Header>
            <LoginBox>
                <Login />
            </LoginBox>
            <Footer>
                <CommunityBottom />
            </Footer>
        </Layout>
    )
}
export default EarthLogin;

const LoginBox = styled.div`
  height:100%;
  overflow:auto;
  position:absolute;
  top:48px;
  left:0;
`;