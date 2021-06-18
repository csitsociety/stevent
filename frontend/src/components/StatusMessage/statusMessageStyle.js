import styled from '@emotion/styled'

export const StyledMessage = styled.div`
  margin: 10px 0;
  padding: 12px 50px 12px 18px;
  background-color: ${(props) => props.color};
  color: #fff;
  position: relative;
  border-radius: 5px;
  font-size: 15px;
  font-weight: 500;

  > button {
    position: absolute;
    height: 30px;
    width: 30px;
    border-radius: 100px;
    background: none;
    border: 0;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    top: 50%;
    right: 10px;
    transform: translateY(-50%);

    > img {
      height: 30px;
      width: 30px;
    }
  }
`
