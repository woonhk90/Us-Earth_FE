import React from 'react';
import styled from 'styled-components';
import Seed from "../../assets/Seed.svg";
import { useDispatch, useSelector } from "react-redux";
import { __getTodayMission, __updateMissionFlag } from '../../redux/modules/mypageSlice';


const MyPageTodayMission = () => {
  /* --------------------------- 나무 성장모습 & 미션 리스트 토글 -------------------------- */
  const [missionFlag, setMissionFlag] = React.useState(false);
  const dispatch = useDispatch();

  const { todayMission } = useSelector((state) => state.mypage);
  console.log(todayMission);

  const onClickTodayMission = () => {
    dispatch(__getTodayMission());
    setMissionFlag(!missionFlag);
  }
  const missionFlagChange = (key) => {
    dispatch(__updateMissionFlag({ missionName: key }));
  }
  return (
    <>
      <MyPageMission>
        {
          missionFlag ?
            (<TodayMission>
              <TodayMissionBox>
                <p>오늘의 미션</p>
                <p onClick={() => setMissionFlag(!missionFlag)}>미션 닫기(0/5)</p>
              </TodayMissionBox>
              <MissionBox>
                {
                  todayMission.map((v) => <MissionItem key={v.missionName} onClick={() => missionFlagChange(v.missionName)}><ItemTitle background={v.complete}>{v.missionName}</ItemTitle>{/* <span>`${v.complete}`</span> */}</MissionItem>)
                }
              </MissionBox>
            </TodayMission>)
            : (<>
              <MissionTop>
                <p>오늘의 미션</p>
                <p onClick={() => onClickTodayMission()}>미션 보기(0/5)</p>
              </MissionTop>
              <MissionBottom>
                <div><img src={Seed} alt='seed-icon' /></div>
                <progress value='1' max="7" />
              </MissionBottom></>)
        }
      </MyPageMission>
    </>
  )
}
export default MyPageTodayMission;

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
  `;

const MissionItem = styled.span`
  border-radius:50px;
  display:inline-block;
  width:100%;
  font:500 18px/1 'Noto Sans','Arial','sans-serif';
  color:#2c2c2c;
  padding:18px 0;
  box-sizing:border-box;
  background-color:#e2e2e2;
`;
const ItemTitle = styled.span`
  display:block;
  text-decoration:${(props) => props.background ? 'line-through' : 'blue'};
`;