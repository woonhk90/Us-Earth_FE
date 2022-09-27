import styled from 'styled-components'
import logoBottom from '../../assets/logo_bottom.png';
import { colors } from '../../styles/color';

const HasMore = (props) => {
  return (
    <HashMoreWrap>
      <p>{props.txt}</p>
      <div><img src={logoBottom} alt='logoBottom' /></div>
    </HashMoreWrap>
  )
}
export default HasMore;
const HashMoreWrap = styled.div`
  width:100%;
  display:flex;
  padding:15px 0;
  box-sizing:border-box;
  border-top:1px solid ${colors.grayF5};
  flex-direction: column;
  justify-content:center;
  align-items:center;
  p{
    font-size:20px;
    line-height:50px;
    color:${colors.grayCB};
    letter-spacing: -0.05em;
  }
  > div > img{
    width:100%;
  }
`;
