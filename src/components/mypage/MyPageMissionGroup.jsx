import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { __getMyPageMissionGroup, saveCagegory } from '../../redux/modules/mypageSlice';

const MyPageMissionGroup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [categoryFlag, setCategoryFlag] = React.useState('onGoing');
  React.useEffect(() => {
    dispatch(__getMyPageMissionGroup());
    setCategoryFlag(saveCagegoryFlag);
  }, [])
  const { myGroupList } = useSelector((state) => state.mypage);
  const onClickCategory = (flag) => {
    setCategoryFlag(flag);
    dispatch(saveCagegory(flag));
  }

  const { saveCagegoryFlag } = useSelector((state) => state.mypage);
  console.log('선택카테고리', saveCagegoryFlag);

  return (
    <>
      <GroupWrap>
        <Container>
          <CategoryBox>
            <ItemOnGoing onClick={() => { onClickCategory('onGoing') }} active={categoryFlag} name="onGoing">진행중</ItemOnGoing>
            <ItemBefore onClick={() => { onClickCategory('before') }} active={categoryFlag} name="before">진행전</ItemBefore>
            <ItemEnd onClick={() => { onClickCategory('end') }} active={categoryFlag} name='end'>종료</ItemEnd>
          </CategoryBox>

          <CategoryInfoList>
            {myGroupList.filter((v) => v.dateStatus === saveCagegoryFlag).map((v) =>
              <ListBox key={v.communityId} onClick={() => navigate(`/community/detail/${v.communityId}`)}>
                <div>
                  <img src={v.img !== null ? v.img : "https://www.urbanbrush.net/web/wp-content/uploads/edd/2020/02/urbanbrush-20200227023608426223.jpg"} alt='GroupImg' />
                </div>
                <div>
                  <div>
                    <p>{v.title}</p>
                    <p>{v.startDate} - {v.endDate}</p>
                  </div>
                  <div><progress value='40' max='100'></progress><span>40%</span></div>
                </div>
              </ListBox>
            )}
          </CategoryInfoList>
        </Container>
      </GroupWrap>
    </>
  );
}
export default MyPageMissionGroup;

const GroupWrap = styled.div`width:100%;`;
const Container = styled.div`width:100%;`;

const CategoryBox = styled.div`
  width:100%;
  display:flex;
  justify-content:center;
  align-items:center;
  margin-bottom:10px;
  div{
    width:33.33333%;
    text-align:center;
    font:600 20px/28px 'Noto sans','Arial','sans-serif';
    padding:26px 0 16px;
    box-sizing:border-box;
  }
`;
const ItemOnGoing = styled.div`
  border-bottom:${({ active, name }) => active === name ? '6px solid #8ECF70' : '6px solid #f2f2f2'};
  color:${({ active, name }) => active === name ? '#222' : '#cbcbcb'};
`;
const ItemBefore = styled.div`
  border-bottom:${({ active, name }) => active === name ? '6px solid #8ECF70' : '6px solid #f2f2f2'};
  color:${({ active, name }) => active === name ? '#222' : '#cbcbcb'};
`;
const ItemEnd = styled.div`
  border-bottom:${({ active, name }) => active === name ? '6px solid #8ECF70' : '6px solid #f2f2f2'};
  color:${({ active, name }) => active === name ? '#222' : '#cbcbcb'};
`;




const CategoryInfoList = styled.div`width:100%;`;
const ListBox = styled.div`
  padding:23px 16px;
  box-sizing:border-box;
  display:flex;
  justify-content:space-between;
  align-items:center;
  gap:22px;
  border-bottom:1px solid #f3f3f3;
  div:nth-child(1){
    width:100px;
    height:100px;
    img{
      width:100%;
      height:100%;
    }
  }
  div:nth-child(2){
    width:60%;
    div:nth-child(1){
      width:100%;
      p:nth-child(1){
        font:600 20px/30px 'Noto Sans','Arial','sans-serif';
      }
      p:nth-child(2){
        font:300 16px/22px 'Noto Sans','Arial','sans-serif';
      }
    }
    div:nth-child(2){
      width:100%;
      display:flex;
      justify-content:center;
      align-items:center;
      gap:5px;
      progress{
        appearance: none;
        width:100%;
        height:15px;
      }
      progress::-webkit-progress-bar {
        background:#fff;
        border-radius:10px;
        box-shadow: 0px 0px 1px 0px gray;
        
      }
      progress::-webkit-progress-value {
        border-radius:10px;
        background: linear-gradient(to right, #AEDC89, #80BC28);
      }
    }
  }
`;