import React from 'react';
import styled from 'styled-components';
import Seed from "../../assets/Seed.svg";
import { useDispatch, useSelector } from "react-redux";
import { __getMyInfo } from '../../redux/modules/mypageSlice';
import MyPageTodayMission from './MyPageTodayMission';
import { useNavigate } from "react-router-dom";
import icons from '../../assets';

const MyPage = () => {
  const { Chart, Group, RightThinArrow, MoveNext } = icons;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.mypage);
  console.log('userInfo=>', userInfo);
  React.useEffect(() => {
    dispatch(__getMyInfo());
  }, [dispatch])


  return (
    <>
      <MyPageWrap>
        <Container>
          <MyPageInfo>
            <MyPageInfoBox>
              <div>{userInfo?.nickname}</div>
              <div>LV.{userInfo?.level}</div>
            </MyPageInfoBox>
            <MyPageProFile><img src={userInfo?.profileImage} alt='profileImage' /></MyPageProFile>
          </MyPageInfo>


          <MyPageTodayMission />


          <MyPageMissionList>
            <MyPageMissionListBox>
              <div>나의 미션 목록</div>
              <div onClick={() => navigate('/mypage/mission/week')}><span><Chart /><span>개인 미션 통계</span></span><span><MoveNext /></span></div>
              <div onClick={() => navigate('/mypage/mission/group')}><span><Group /><span>그룹 미션</span></span><span><MoveNext /></span></div>
            </MyPageMissionListBox>
          </MyPageMissionList>
        </Container>
      </MyPageWrap>
    </>
  )
}
export default MyPage;

const MyPageWrap = styled.div`width:100%;height:100%;`;
const Container = styled.div`
  width:100%;
  display:flex;
  flex-direction:column;
  justify-content:center;
  align-content:center;
  background-color:rgb(245,245,245);
`;
const MyPageInfo = styled.div`
  background-color:#fff;
  width:100%;
  padding:0 25px;
  box-sizing:border-box;
  display:flex;
  justify-content:space-between;
  align-items:center;
`;
const MyPageInfoBox = styled.div`
  display:flex;
  flex-direction:column;
  div:nth-child(1){
    font:600 24px/32px 'Noto Sans','Arial','sans-serif';
  }
  div:nth-child(2){
    font:500 20px/28px 'Noto Sans','Arial','sans-serif';
    color:#9B9B9B;
  }
`;
const MyPageProFile = styled.div`
  width:74px;height:74px;
  padding:27px 0;
  border-radius:50%;
  img{
    border-radius:50%;
    width:100%;
    height:100%;
  }
`;





const MyPageMissionList = styled.div`
  background-color:#fff;
  padding:25px 26px;
`;
const MyPageMissionListBox = styled.div`
  display:flex;
  flex-direction:column;
  gap:25px;
  div:nth-child(1){
    font:600 24px/35px 'Noto sans','Arial','sans-serif';
  }
  div:nth-child(2), div:nth-child(3){
    width:100%;
    display:flex;
    justify-content:space-between;
    align-items:center;
    font:18px/25px 'Noto sans','Arial','sans-serif';
    span > span{
      display: inline-block;
      padding:0 15px;
    }
  }
`;
