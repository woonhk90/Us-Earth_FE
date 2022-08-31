import React from 'react';
import styled from 'styled-components';
const Community = () => {
  return (
    <>
      <CommunityWrap>
        <Container>
          <CommunityBox>
          <CommunityItem>
            <ItemImg><img src='' alt='' /></ItemImg>
            <ItemTitle>재활용 합시다</ItemTitle>
          </CommunityItem>
          <CommunityItem>
            <ItemImg><img src='' alt='' /></ItemImg>
            <ItemTitle>재활용 합시다</ItemTitle>
          </CommunityItem>
          <CommunityItem>
            <ItemImg><img src='' alt='' /></ItemImg>
            <ItemTitle>재활용 합시다</ItemTitle>
          </CommunityItem>
          <CommunityItem>
            <ItemImg><img src='' alt='' /></ItemImg>
            <ItemTitle>재활용 합시다</ItemTitle>
          </CommunityItem>
          <CommunityItem>
            <ItemImg><img src='' alt='' /></ItemImg>
            <ItemTitle>재활용 합시다</ItemTitle>
          </CommunityItem>
          <CommunityItem>
            <ItemImg><img src='' alt='' /></ItemImg>
            <ItemTitle>재활용 합시다</ItemTitle>
          </CommunityItem>
          <CommunityItem>
            <ItemImg><img src='' alt='' /></ItemImg>
            <ItemTitle>재활용 합시다</ItemTitle>
          </CommunityItem>
          <CommunityItem>
            <ItemImg><img src='' alt='' /></ItemImg>
            <ItemTitle>재활용 합시다</ItemTitle>
          </CommunityItem>
          <CommunityItem>
            <ItemImg><img src='' alt='' /></ItemImg>
            <ItemTitle>재활용 합시다</ItemTitle>
          </CommunityItem>
          </CommunityBox>
        </Container>
      </CommunityWrap>
    </>
  )
}
export default Community;

const CommunityWrap = styled.div`
`;
const Container = styled.div`
`;
const CommunityBox = styled.div`
  display:flex;
  justify-content:center;
  flex-wrap: wrap;
`;
const CommunityItem = styled.div`
  border:1px solid black;
  margin:0 4.75px;
`;
const ItemImg = styled.div`
width:176px;
height:215px;
`;
const ItemTitle = styled.div``;