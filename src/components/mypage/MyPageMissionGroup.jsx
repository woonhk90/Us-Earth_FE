import React from 'react';
import { useState } from 'react';
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
const [writer, setWriter]= useState(false)
const writerCheck = ()=>{
setWriter(!writer)
}

  return (
    <>
      <GroupWrap>
        <Container>
          <CategoryBox>
            <ItemOnGoing onClick={() => { onClickCategory('ongoing') }} active={categoryFlag} name="ongoing">진행중</ItemOnGoing>
            <ItemBefore onClick={() => { onClickCategory('before') }} active={categoryFlag} name="before">진행전</ItemBefore>
            <ItemEnd onClick={() => { onClickCategory('end') }} active={categoryFlag} name='end'>종료</ItemEnd>
          </CategoryBox>

          <CategoryInfoList>
          <WriterButton >
          <StyledLabel htmlFor="내가 쓴 글 보기">
      <StyledInput onClick={writerCheck}  type="checkbox" name="내가 쓴 글 보기" />
      <StyledP> 내가 쓴 글 보기</StyledP>
    </StyledLabel></WriterButton>
            {writer ?
            <>  
            {myGroupList.filter((v) => v.dateStatus === saveCagegoryFlag && v.writer ===true).map((v) => (
    <ListBox key={v.communityId} onClick={() => navigate(`/community/detail/${v.communityId}`)}>
      <ItemImg bgImg={v.img !== null ? v.img : "https://www.urbanbrush.net/web/wp-content/uploads/edd/2020/02/urbanbrush-20200227023608426223.jpg"}>
        {/* <img src={v.img !== null ? v.img : "https://www.urbanbrush.net/web/wp-content/uploads/edd/2020/02/urbanbrush-20200227023608426223.jpg"} alt='GroupImg' /> */}
      </ItemImg>
      <div>
        <div>
          <p>{v.title}</p>
          <p>{v.startDate} - {v.endDate}</p>
        </div>
        <div>
          <progress value={v.dateStatus === "before" ? v.currentPercent : v.successPercent} max='100'></progress>
          <span>{Math.ceil(v.dateStatus === "before" ? v.currentPercent : v.successPercent)}%</span>
        </div>
      </div>
    </ListBox>
  )
  )}
  </> : 
            <>
  {myGroupList.filter((v) => v.dateStatus === saveCagegoryFlag).map((v) => (
              <ListBox key={v.communityId} onClick={() => navigate(`/community/detail/${v.communityId}`)}>
                <ItemImg bgImg={v.img !== null ? v.img : "https://www.urbanbrush.net/web/wp-content/uploads/edd/2020/02/urbanbrush-20200227023608426223.jpg"}>
                  {/* <img src={v.img !== null ? v.img : "https://www.urbanbrush.net/web/wp-content/uploads/edd/2020/02/urbanbrush-20200227023608426223.jpg"} alt='GroupImg' /> */}
                </ItemImg>
                <div>
                  <div>
                    <p>{v.title}</p>
                    <p>{v.startDate} - {v.endDate}</p>
                  </div>
                  <div>
                    <progress value={v.dateStatus === "before" ? v.currentPercent : v.successPercent} max='100'></progress>
                    <span>{Math.ceil(v.dateStatus === "before" ? v.currentPercent : v.successPercent)}%</span>
                  </div>
                </div>
              </ListBox>
            )
            )}
            </>
            }
          
          </CategoryInfoList>
        </Container>
      </GroupWrap>
    </>
  );
};
export default MyPageMissionGroup;

const GroupWrap = styled.div`
  width: 100%;
`;
const Container = styled.div`
  width: 100%;
`;

const CategoryBox = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 10px;
  div {
    width: 33.33333%;
    text-align: center;
    padding: 26px 0 16px;
    box-sizing: border-box;
    font-weight: 600;
    font-size:20px;
    line-height:28px;
    font-family: 'Noto Sans KR','sans-serif';
  }
`;
const ItemOnGoing = styled.div`
  border-bottom: ${({ active, name }) => (active === name ? "6px solid #8ECF70" : "6px solid #f2f2f2")};
  color: ${({ active, name }) => (active === name ? "#222" : "#cbcbcb")};
`;
const ItemBefore = styled.div`
  border-bottom: ${({ active, name }) => (active === name ? "6px solid #8ECF70" : "6px solid #f2f2f2")};
  color: ${({ active, name }) => (active === name ? "#222" : "#cbcbcb")};
`;
const ItemEnd = styled.div`
  border-bottom: ${({ active, name }) => (active === name ? "6px solid #8ECF70" : "6px solid #f2f2f2")};
  color: ${({ active, name }) => (active === name ? "#222" : "#cbcbcb")};
`;

const CategoryInfoList = styled.div`
  width: 100%;
`;

const ItemImg = styled.div`
  background:url(${(props) => props.bgImg}) no-repeat center center;
  background-size:cover;
  width: 150px;
  height: 200px;
  @media (max-width: 375px) {
    width: 125px;
    height: 150px;
  }
  @media (max-width: 299px) {
    width: 100px;
    height: 125px;
  }
`;

const ListBox = styled.div`
  padding: 23px 16px;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 22px;
  border-bottom: 1px solid #f3f3f3;
  div:nth-child(2) {
    width: 60%;
    div:nth-child(1) {
      width: 100%;
      
      p:nth-child(1) {
        font-weight:600;
        font-size:20px;
        line-height:30px;
        /* 말줄임 */
        /* white-space:nowrap; */
        overflow: hidden;
        text-overflow: ellipsis;

        /* 두줄 */
        /* display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical; */
        /* color:black; */
      }
      p:nth-child(2) {
        font-weight:300;
        font-size:16px;
        line-height:22px;
      }
      @media (max-width: 374px) {
        p:nth-child(1) {
          font-size:16px;
        }
        p:nth-child(2) {
          font-size:12px;
        }
      }
      p{
        font-family: 'Noto Sans KR','sans-serif';
      }
    }
    div:nth-child(2) {
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 5px;
      progress {
        appearance: none;
        width: 100%;
        height: 15px;
      }
      progress::-webkit-progress-bar {
        background: #fff;
        border-radius: 10px;
        box-shadow: 0px 0px 1px 0px gray;
      }
      progress::-webkit-progress-value {
        border-radius: 10px;
        background: linear-gradient(to right, #aedc89, #80bc28);
      }
    }
  }
`;


const WriterButton = styled.div`
text-align: end;
box-sizing: border-box;
padding: 6px 16px 0 16px;
display: flex;
align-items: flex-end;
align-content: flex-end;
width: 100%;
`

const StyledLabel = styled.label`
  display: flex;
  align-items: center;
  user-select: none;
`;

const StyledP = styled.p`
  margin-left: 0.25rem;
`;
const StyledInput = styled.input`
  appearance: none;
  border: 1.5px solid gainsboro;
  border-radius: 0.35rem;
  width: 1.5rem;
  height: 1.5rem;
  cursor: pointer;

  &:checked {
    border-color: transparent;
    background-image: url("data:image/svg+xml,%3csvg viewBox='0 0 16 16' fill='white' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M5.707 7.293a1 1 0 0 0-1.414 1.414l2 2a1 1 0 0 0 1.414 0l4-4a1 1 0 0 0-1.414-1.414L7 8.586 5.707 7.293z'/%3e%3c/svg%3e");
    background-size: 100% 100%;
    background-position: 50%;
    background-repeat: no-repeat;
    background-color: rgb(148, 218, 118);
  }
`;