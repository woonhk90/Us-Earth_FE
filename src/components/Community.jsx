import React from 'react';
import styled from 'styled-components';
import { ReactComponent as Lock } from "../assets/Lock.svg";
import SampleImg01 from '../assets/poster01.jpg';
import SampleImg02 from '../assets/poster02.jpg';

const Community = () => {
  return (
    <>
      <CommunityWrap>
        <Container>
          <Banner>메인배너</Banner>

          <PopularGroup>
            <PopularGroupTop><PopularGroupTitle>인기 그룹</PopularGroupTitle></PopularGroupTop>
            <PopularGroupBox>
              <PopularGroupItem>
                <PopularGroupItemImg bgImg={SampleImg01}>
                  <ItemIcon><Lock /></ItemIcon>
                  <ItemFlag><span>모집중</span></ItemFlag>
                </PopularGroupItemImg>
                <PopularGroupItemTitle>재활용 합시다</PopularGroupItemTitle>
              </PopularGroupItem>
              <PopularGroupItem>
                <PopularGroupItemImg bgImg={SampleImg02}>
                  <ItemIcon><Lock /></ItemIcon>
                  <ItemFlag><span>모집중</span></ItemFlag>
                </PopularGroupItemImg>
                <PopularGroupItemTitle>재활용 합시다</PopularGroupItemTitle>
              </PopularGroupItem>
              <PopularGroupItem>
                <PopularGroupItemImg><Lock /></PopularGroupItemImg>
                <PopularGroupItemTitle>재활용 합시다</PopularGroupItemTitle>
              </PopularGroupItem>
            </PopularGroupBox>
          </PopularGroup>

          <NewGroup>
            <NewGroupTop><NewGroupTitle>신상 그룹</NewGroupTitle></NewGroupTop>
            <NewGroupBox>
              <NewGroupItem>
                <NewGroupItemImg><Lock /></NewGroupItemImg>
                <NewGroupItemTitle>재활용 합시다</NewGroupItemTitle>
              </NewGroupItem>
              <NewGroupItem>
                <NewGroupItemImg><Lock /></NewGroupItemImg>
                <NewGroupItemTitle>재활용 합시다</NewGroupItemTitle>
              </NewGroupItem>
              <NewGroupItem>
                <NewGroupItemImg><Lock /></NewGroupItemImg>
                <NewGroupItemTitle>재활용 합시다</NewGroupItemTitle>
              </NewGroupItem>
            </NewGroupBox>
          </NewGroup>

          <CommunityGroup>
          <CommunityGroupTop><CommunityGroupTitle>전체 그룹</CommunityGroupTitle></CommunityGroupTop>
            <CommunityBox>
              <CommunityItem>
                <ItemImg bgImg={SampleImg01}>
                  {/* <div> */}
                  <ItemCount>40%</ItemCount>
                  <ItemProgress><IP value='40' max='100'></IP></ItemProgress>
                  {/* </div> */}
                </ItemImg>
                <ItemTitle>재활용 합시다</ItemTitle>
              </CommunityItem>
              <CommunityItem>
                <ItemImg><img src='' alt='' /></ItemImg>
                <ItemTitle>재활용 합시다</ItemTitle>
              </CommunityItem>
              <CommunityItem>
                <ItemImg bgImg={SampleImg02}></ItemImg>
                <ItemTitle>재활용 합시다</ItemTitle>
              </CommunityItem>
            </CommunityBox>
          </CommunityGroup>

        </Container>
      </CommunityWrap>
    </>
  )
}
export default Community;



// transition: all ease 1s;
// .jb {
// width: 100px;
// height: 100px;
// margin: 60px auto;
// background-color: orange;
// transition: all ease 1s;
// }
// .jb:hover {
// transform: rotate( 45deg );
// }





const CommunityWrap = styled.div``;
const Container = styled.div``;

const Banner = styled.div`
  width:100%;
  height:204px;
  border:1px solid red;
  box-sizing:border-box;
`;





const PopularGroup = styled.div`
  width:100vw;
  overflow:hidden;
  padding:0 4.5px;
  box-sizing:border-box;
`;
const PopularGroupTop = styled.div``;
const PopularGroupTitle = styled.span`
  font:bold 26px/50px 'Arial','sans-serif';
`;
const PopularGroupBox = styled.div`
  display:flex;
  overflow-x:scroll;
  &::-webkit-scrollbar {
    display:none;
  }
`;
const PopularGroupItem = styled.div`
  margin:0 4.5px;
`;
const PopularGroupItemImg = styled.div`
  width:143px;
  height:175px;
  border-radius:14px;
  position:relative;

  background-image: linear-gradient(to top, rgba(0,0,0,0.5) 25%, transparent 50%), url(${(props) => props.bgImg});
  background-repeat:no-repeat;
  background-size:cover;
`;
const ItemIcon = styled.div`
  position:absolute;
  top:0;
  right:0;
  margin:10px;
  color:#fff;
`;
const ItemFlag = styled.div`
  position:absolute;
  bottom:0;
  right:0;
  margin:10px;
  color:#fff;
`;
const PopularGroupItemTitle = styled.div`
  font:bold 20px/40px 'Arial','sans-serif';
`;





const NewGroup = styled.div`
  width:100vw;
  overflow:hidden;
  padding:0 4.5px;
  box-sizing:border-box;
`;
const NewGroupTop = styled.div``;
const NewGroupTitle = styled.span`
  font:bold 26px/50px 'Arial','sans-serif';
`;
const NewGroupBox = styled.div`
  display:flex;
  overflow-x:scroll;
  &::-webkit-scrollbar {
    display:none;
  }
`;
const NewGroupItem = styled.div`
  margin:0 4.5px;
`;
const NewGroupItemImg = styled.div`
  width:143px;
  height:175px;
  border:1px solid black;
  box-sizing:border-box;
  border-radius:14px;

  background: linear-gradient(to top, rgba(0,0,0,0.5) 25%, transparent 50%);
`;
const NewGroupItemTitle = styled.div`
  font:bold 20px/40px 'Arial','sans-serif';
`;





const CommunityGroup = styled.div`
  padding:0 4.5px;
  box-sizing:border-box;
`;
const CommunityGroupTop = styled.div``;
const CommunityGroupTitle = styled.span`
  font:bold 26px/50px 'Arial','sans-serif';
`;
const CommunityBox = styled.div`
  /* display:flex;
  justify-content:center;
  flex-wrap: wrap; */

  display:grid;
  justify-items:center;
  grid-template-columns: repeat(auto-fill, minmax(50%, auto));

  
`;
const CommunityItem = styled.div``;
const ItemImg = styled.div`
width:176px;
height:215px;
border:1px solid black;
box-sizing:border-box;
border-radius:14px;

position:relative;
`;
const ItemCount = styled.div`
  position:absolute;
  bottom:35px;
  right:10px;
`;
const ItemProgress = styled.div`
  position:absolute;
  bottom:15px;
  left:50%;
  margin-left:-80px;
`;
const IP = styled.progress``;
const ItemTitle = styled.div`
  font:bold 20px/40px 'Arial','sans-serif';
`;