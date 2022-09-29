import React from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { __getNewGroupItemList } from "../../redux/modules/communitySlice";


import 'swiper/css';
import { Swiper, SwiperSlide } from 'swiper/react';


const NewGroupItemList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { newGroupList } = useSelector((state) => state.community);
  React.useEffect(() => {
    dispatch(__getNewGroupItemList());
  }, [])
  return (
    <>
      <Swiper
        slidesPerView={1}
        spaceBetween={0}
        breakpoints={{
          0: {
            slidesPerView: 1.8,
          },
          280: {
            slidesPerView: 2,
          },
          310: {
            slidesPerView: 2.2,
          },
          350: {
            slidesPerView: 2.4,
          },
          380: {
            slidesPerView: 2.6,
          },
          410: {
            slidesPerView: 2.8,
          },
          440: {
            slidesPerView: 3,
          },
          470: {
            slidesPerView: 3.2,
          },
          500: {
            slidesPerView: 3.4,
          },
          541: {
            slidesPerView: 2.8,
          },
        }}
      >
        {newGroupList.map((v) => (
          <SwiperSlide key={v.communityId} style={{ padding: '0 5px', boxSizing: 'border-box' }}>
            <NewGroupItem onClick={() => { navigate(`/community/detail/${v.communityId}`) }}>
              <NewGroupItemImg bgImg={v.img === null ? 'https://www.urbanbrush.net/web/wp-content/uploads/edd/2020/02/urbanbrush-20200227023608426223.jpg' : v.img} >
                <ItemFlag>
                  <span>모집중</span>
                </ItemFlag>
              </NewGroupItemImg>
              <NewGroupItemTitle>{v.title}</NewGroupItemTitle>
            </NewGroupItem>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  )
}
export default NewGroupItemList;


const Box = styled(SwiperSlide)``;
const NewGroupItem = styled.div``;
const NewGroupItemImg = styled.div`
  width:100%;
  max-width: 145px;
  height: 175px;
  border-radius: 6px;
  margin:0 auto;
  position:relative;

  background-image: linear-gradient(to top, rgba(0, 0, 0, 0.5) 25%, transparent 50%), url(${(props) => props.bgImg});
  background-repeat: no-repeat;
  background-position:center;
  background-size: cover;
`;
const ItemFlag = styled.div`
  position: absolute;
  bottom: 0;
  right: 0;
  margin: 10px;
  color: #fff;
`;
const NewGroupItemTitle = styled.div`
  padding:5px 0;
  font-weight:bold;
  font-size:17px;
  line-height:25px;
  letter-spacing:-0.1em;

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