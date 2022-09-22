import styled from 'styled-components'

const HasMore = (props) => {
  return <HashMoreWrap><p>{props.txt}</p></HashMoreWrap>
}
export default HasMore;
const HashMoreWrap = styled.div`
  width:100%;
  display:flex;
  justify-content:center;
  align-items:center;
  border:1px solid red;
  p{
    border:1px solid purple;
    font-size:20px;
    line-height:50px;
  }
`;
