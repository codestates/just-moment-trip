import styled from 'styled-components';

export const CommentContainer = styled.div`
  border: 3px solid lightblue;
  padding-left: 10px;
  padding-right: 10px;
  width: 90vw;

  > h1 {
    width: 100px;
    text-align: center;
    margin-top: -15px;
    margin-left: 10px;
    margin-bottom: 5px;
    background: white;
  }
`;

export const CommentBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  text-align: left;
  width: 80vw;
  border: 2px solid black;
  margin-bottom: 20px;

  > div {
    display: flex;
    justify-content: space-between;
    padding-bottom: 10px;
  }
`;
