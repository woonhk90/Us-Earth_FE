import React from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { __getPopularGroupItemList } from "../../redux/modules/communitySlice";
// import { getPopularGroupItemList } from "../../api/communityApi";
// import { instance } from "../../api/axios";

const PopularGroupItemList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { popularGroupList } = useSelector((state) => state.community);
  React.useEffect(() => {
    dispatch(__getPopularGroupItemList());
  }, [])

  /*
  const [list, setList] = React.useState([]);
  const getPopularGroupItemList = async () => {
    const response = await instance.get("/community/active");
    setList(response.data);
  }
  React.useEffect(() => {
    getPopularGroupItemList();
  }, [])
  */

  return (
    <>
      {popularGroupList.map((v) => (
        <PopularGroupItem onClick={() => { navigate(`/community/detail/${v.communityId}`) }} key={v.communityId}>
          <PopularGroupItemImg bgImg={v.img === null ? 'https://www.urbanbrush.net/web/wp-content/uploads/edd/2020/02/urbanbrush-20200227023608426223.jpg' : v.img} >
            <ItemFlag>
              <span>진행중</span>
            </ItemFlag>
          </PopularGroupItemImg>
          <PopularGroupItemTitle>{v.title}</PopularGroupItemTitle>
        </PopularGroupItem>
      ))}
    </>
  )
}
export default PopularGroupItemList;

const PopularGroupItem = styled.div`
  margin: 0 4.5px;
`;
const PopularGroupItemImg = styled.div`
  width: 143px;
  height: 175px;
  border-radius: 6px;
  position: relative;

  background-image: linear-gradient(to top, rgba(0, 0, 0, 0.5) 25%, transparent 50%), url(${(props) => props.bgImg});
  background-repeat: no-repeat;
  background-size: cover;
`;
const ItemFlag = styled.div`
  position: absolute;
  bottom: 0;
  right: 0;
  margin: 10px;
  color: #fff;
`;
const PopularGroupItemTitle = styled.p`
  padding:5px 0;
  font-weight:bold;
  font-size:20px;
  line-height:25px;
  letter-spacing:-0.1em;
  text-align:center;
`;