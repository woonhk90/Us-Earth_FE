import React from 'react';
import styled from 'styled-components';
import Seed from "../../assets/Seed.svg";
import { useDispatch, useSelector } from "react-redux";
import { __getMyInfo } from '../../redux/modules/mypageSlice';
import MyPageTodayMission from './MyPageTodayMission';

const MyPage = () => {
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
              <div>개인 미션 통계</div>
              <div>그룹 미션</div>
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





const MyPageMission = styled.div`
  width:100%;
  height:50vh;
  display:flex;
  flex-direction:column;
  align-items:center;
  justify-content:space-between;
  padding:20px 15px 0;
  box-sizing:border-box;
`;
const MissionTop = styled.div`
  width:100%;
  background-color:#fff;
  border-radius:12px;
  display:flex;
  justify-content:space-between;
  align-items:center;
  padding:25px 26px;
  box-sizing:border-box;
  p:nth-child(1){font:600 24px/1 'Noto Sans','Arial','sans-serif';}
  p:nth-child(2){font:500 20px/1 'Noto Sans','Arial','sans-serif';color: #9b9b9b;}
`;
const MissionBottom = styled.div`
  width:100%;
  padding:0 35px 8px;
  box-sizing:border-box;
  div{
    width:100%;
    img{
      display:block;
      width:50%;
      margin:0 auto;
      /* background-image: url('${Seed}'); */
    }
  }
  progress{
    appearance: none;
    width:100%;
    height:15px;
  }
  progress::-webkit-progress-bar {
    background:#e2e2e2;
    border-radius:10px;
  }
  progress::-webkit-progress-value {
    border-radius:10px;
    background:#818181;
  }
`;

const TodayMission = styled.div`
  width:100%;
  background-color:#fff;
  border-radius:12px;
  padding:25px 26px 15px;
  box-sizing:border-box;
  `;
const TodayMissionBox = styled.div`
    display:flex;
    justify-content:space-between;
    align-items:center;
    padding:0 0 20px 0;
    box-sizing:border-box;
    p:nth-child(1){font:600 24px/1 'Noto Sans','Arial','sans-serif';}
    p:nth-child(2){font:500 20px/1 'Noto Sans','Arial','sans-serif';color: #9b9b9b;}
`;
const MissionBox = styled.div`
  display:flex;
  flex-direction: column;
  justify-content:center;
  align-items:center;
  gap:5px;
  text-align:center;
  span{
    border-radius:50px;
    display:inline-block;
    width:100%;
    font:500 20px/1 'Noto Sans','Arial','sans-serif';
    color:#2c2c2c;
    padding:18px 0;
    box-sizing:border-box;
    background-color:#e2e2e2;
  }
`;





const MyPageMissionList = styled.div`
  background-color:#fff;
  padding:25px 26px;
`;
const MyPageMissionListBox = styled.div`
  display:flex;
  flex-direction:column;
  gap:45px;
`;
