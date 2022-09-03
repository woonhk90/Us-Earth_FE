import React from 'react';
import styled from 'styled-components';
import Modal from "./CommunityDetailModal";
import { ReactComponent as Edit } from "../assets/Edit.svg";

const CommunityDetail = () => {
  const [modal, setModal] = React.useState(false);
  return (
    <>
      <CommunityDetailWrap>
        <Container>
          <Forest></Forest>
          <Content>
            <ContentItem font={"400 16px/22px 'Arial','sans-serif'"} marginBottom={'10px'}>2022.08.01 - 2022.08.31</ContentItem>
            <ContentItem font={"700 26px/35px 'Arial','sans-serif'"} marginBottom={'9px'}>제목제목근데두줄이될것같다요요요요요</ContentItem>
            <ContentItem font={"400 22px/30px 'Arial','sans-serif'"} marginBottom={'35px'}>내용내용근데두줄이될것같다요요요요요</ContentItem>
          </Content>
          <StateBox>
            <State>
              <StateTop>
                <StateItem font={"600 30px/40px 'Arial','sans-serif'"}>모집중</StateItem>
                <StateItem font={"600 60px/82px 'Arial','sans-serif'"}> 5 </StateItem>
                <StateItem font={"400 24px/32px 'Arial','sans-serif'"} color={'#9E9E9E'}>/ 10명</StateItem>
              </StateTop>
              <StateBottom onClick={() => { setModal(!modal) }}>참여하기</StateBottom>
              {modal && (<Modal closeModal={() => setModal(!modal)}></Modal>)}
            </State>
          </StateBox>
          <CertifyContentBox>
            <CertifyContent>
              <CertifyItem></CertifyItem>
              <CertifyItem></CertifyItem>
              <CertifyItem></CertifyItem>
              <CertifyItem></CertifyItem>
              <CertifyItem></CertifyItem>
              <CertifyItem></CertifyItem>
              <CertifyItem></CertifyItem>
              <CertifyItem></CertifyItem>
              <CertifyItem></CertifyItem>
              <CertifyItem></CertifyItem>
              <CertifyItem></CertifyItem>
            </CertifyContent>
            <CertifyContentIcon><Edit/></CertifyContentIcon>
          </CertifyContentBox>
        </Container>
      </CommunityDetailWrap>
    </>
  )
}
export default CommunityDetail;

const CommunityDetailWrap = styled.div`width:100%;`;
const Container = styled.div`width:100%;`;
const Forest = styled.div`
  width:100%;
  height:466px;
  background-color:purple;
  border-bottom-left-radius:26px;
  border-bottom-right-radius:26px;
  margin-bottom:41px;
`;





const Content = styled.div`
  padding:0 17px;
  box-sizing:border-box;
  margin-bottom:35px;
`;
const ContentItem = styled.div`
  font:${(props) => props.font};
  margin-bottom:10px;
`;





const StateBox = styled.div`
  width:100%;
  padding:0 16px;
  box-sizing:border-box;
  margin-bottom:27px;
`;
const State = styled.div`
  display:flex;
  flex-direction:column;
  border:1px solid #ECECEC;
  border-radius: 15px;
`;
const StateTop = styled.div`
  text-align:center;
`;
const StateItem = styled.span`
  font:${(props) => props.font};
  color:${(props) => props.color};
`;
const StateBottom = styled.div`
  width:100%;
  font:18px/27px 'Arial','sana-serif';
  text-align:center;
  padding:11px 0;
  background-color:#424242;
  color:#fff;
  border-bottom-left-radius: 15px;
  border-bottom-right-radius: 15px;
`;





const CertifyContentBox = styled.div`
  position:relative;
`;
const CertifyContent = styled.div`
  display:grid;
  justify-items:center;
  grid-template-columns: repeat(auto-fill, minmax(33%, auto));
  gap:1px;
`;
const CertifyContentIcon = styled.div`
  position:absolute;
  bottom:43px;right:17px;
  width:71px;
  height:71px;
  background-color:#515151;
  border-radius:50%;
  
  display:flex;
  justify-content:center;
  align-items:center;
`;
const CertifyItem = styled.div`
  width:128px;
  height:141px;
  background-color:#d9d9d9;
`;