import styled from "styled-components";
import LoadingBackground from '../../assets/loading-background.jpg';
import LoadingMain from '../../assets/loading-main.gif';

const Loading = () => {
  return (
    <>
      <LoadingWrap imgUrl={LoadingBackground}>
        <MainLoading imgUrl={LoadingMain}></MainLoading>
      </LoadingWrap>
    </>
  )
}

export default Loading;

const LoadingWrap = styled.div`
    position:absolute;
    top:0;left:0;
    z-index:900;
    width:100%;
    height:100vh;
    padding:0;
    box-sizing:border-box;
    background-image:url(${(props) => props.imgUrl});
    background-position:center;
    background-size:cover;
    display:flex;
    justify-content:center;
    align-items:center;
    
`;
const MainLoading = styled.div`
    width:50%;
    height:200px;
    background-image:url(${(props) => props.imgUrl});
    background-repeat:no-repeat;
    background-position:center;
    background-size:contain;
`;
