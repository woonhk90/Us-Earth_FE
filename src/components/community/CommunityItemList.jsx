import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useInView } from "react-intersection-observer";
import { __getCommunity, certifyReset } from "../../redux/modules/communitySlice";
import Loading from '../etc/Loading';
import HashMore from '../etc/HasMore';
import icons from '../../assets/index'


const PopularGroupItemList = () => {
  const { Lock } = icons;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { community, isLoading, hasMore } = useSelector((state) => state.community);
  console.log("community=>", community);

  /* ------------------------------- 무한스크롤 기본셋팅 ------------------------------- */
  const [page, setPage] = useState(0);
  const { ref, inView, entry } = useInView({
    threshold: 0,
  });

  /* ----------------------------- 커뮤니티 전체목록 가져오기 ----------------------------- */
  useEffect(() => {
    console.log("커뮤니티 호출");
    dispatch(__getCommunity({ page }));
  }, [page]);

  useEffect(() => {
    if (inView) {
      setPage((page) => page + 1);
    }
  }, [inView]);


  /* ------------------------------- 전체 그룹 상태정보 ------------------------------- */
  const states = (flag) => {
    if (flag === 'before') {
      return '모집중';
    } else if (flag === 'ongoing') {
      return '진행중';
    } else {
      return '종료';
    }
  }

  return (
    <>

      <CommunityGroup>
        <CommunityGroupTop>
          <CommunityGroupTitle>전체 그룹</CommunityGroupTitle>
        </CommunityGroupTop>
        <CommunityBox>

          {community?.map((v) => (
            <CommunityItem key={v.communityId} onClick={() => { dispatch(certifyReset()); navigate(`/community/detail/${v.communityId}`); }}>
              <ItemImg bgImg={v.img !== null ? v.img : "https://www.urbanbrush.net/web/wp-content/uploads/edd/2020/02/urbanbrush-20200227023608426223.jpg"}>
                {v.secret ? <Lock /> : null}
                <div>
                  <p>{states(v.dateStatus)}</p>
                  <p>{Math.ceil(v.dateStatus === 'before' ? v.currentPercent : v.successPercent)}%</p>
                  <progress value={v.dateStatus === 'before' ? v.currentPercent : v.successPercent} max="100"></progress>
                </div>
              </ItemImg>
              <ItemTitle>{v.title}</ItemTitle>
            </CommunityItem>
          ))}
        </CommunityBox>
      </CommunityGroup>

      {hasMore ? (isLoading ? null : <div ref={ref} style={{ border: "1px solid white" }}></div>) : <HashMore txt={'맨 하단 페이지 입니다.'} />}
    </>
  )
}
export default PopularGroupItemList;

const CommunityGroup = styled.div`
  box-sizing: border-box;
`;
const CommunityGroupTop = styled.div`
  padding: 0 15px;
`;
const CommunityGroupTitle = styled.span`
  font: bold 26px/50px "Noto Sans KR", "sans-serif";
`;
const CommunityBox = styled.div`
  display: grid;
  justify-items: center;
  grid-template-columns: repeat(auto-fill, minmax(50%, auto));
`;





const CommunityItem = styled.div`
  width:100%;
  padding:2px;
  box-sizing:border-box;
  margin-bottom:25px;
`;
const ItemImg = styled.div`
  width: 100%;
  height: 215px;
  @media (max-width: 370px) {
    height: 175px;
  }

  position: relative;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.5) 25%, transparent 50%), url(${(props) => props.bgImg}) no-repeat center center;
  background-size: cover;
  color: #fff;
  margin-bottom: 10px;
  svg {
    display: inline-block;
    position: absolute;
    top: 5px;
    right: 5px;
  }
  div {
    position: absolute;
    width: 100%;
    bottom: 0;
    padding: 6px;
    box-sizing: border-box;

    text-align: center;
    p {
      text-align: right;
    }

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
`;
const ItemTitle = styled.div`
  font: bold 20px/1 "Noto Sans KR", "sans-serif";
  /* 말줄임 */
  /* white-space:nowrap; */
  overflow: hidden;
  text-overflow: ellipsis;

  /* 두줄 */
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  /* color:black; */
`;
