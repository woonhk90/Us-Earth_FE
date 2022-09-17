import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useInView } from "react-intersection-observer";
import { __getCommunity, certifyReset } from "../../redux/modules/communitySlice";


const PopularGroupItemList = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { community, isLoading } = useSelector((state) => state.community);
  const searchVal = useSelector((state) => state);
  console.log("community=>", community);
  console.log("검색단어=>", searchVal.community.search);

  /* ------------------------------- 무한스크롤 기본셋팅 ------------------------------- */
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(0);
  const { ref, inView, entry } = useInView({
    threshold: 0,
  });

  /* ----------------------------- 커뮤니티 전체목록 가져오기 ----------------------------- */
  useEffect(() => {
    console.log("커뮤니티 호출");
    dispatch(__getCommunity({ page, search }));
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
      {community?.map((v) => (
        <CommunityItem key={v.communityId} onClick={() => { dispatch(certifyReset()); navigate(`/community/detail/${v.communityId}`); }}>
          <ItemImg bgImg={v.img !== null ? v.img : "https://www.urbanbrush.net/web/wp-content/uploads/edd/2020/02/urbanbrush-20200227023608426223.jpg"}>
            <div>
              <p>{states(v.dateStatus)}</p>
              <p>{Math.ceil(v.dateStatus === 'before' ? v.currentPercent : v.successPercent)}%</p>
              <progress value={v.dateStatus === 'before' ? v.currentPercent : v.successPercent} max="100"></progress>
            </div>
          </ItemImg>
          <ItemTitle>{v.title}</ItemTitle>
        </CommunityItem>
      ))}
      {isLoading ? null : <div ref={ref}></div>}
    </>
  )
}
export default PopularGroupItemList;

const CommunityItem = styled.div``;
const ItemImg = styled.div`
  width: 176px;
  height: 215px;

  position: relative;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.5) 25%, transparent 50%), url(${(props) => props.bgImg}) no-repeat center center;
  background-size: cover;
  color: #fff;
  div{
    position:absolute;
    width:100%;
    bottom:0;
    padding:6px;
    box-sizing:border-box;

    text-align:center;
    p{
      text-align:right;
    }

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
`;
const ItemTitle = styled.div`
  font: bold 20px/40px "Arial", "sans-serif";
  /* color:black; */
`;