import styled from 'styled-components';

export const CommentContainer = styled.div`
  border: 3px solid lightblue;
  border-radius: 20px;
  padding-left: 4vw;
  width: 90vw;
  margin-top: 20px;
  > h1 {
    width: 100px;
    text-align: center;
    margin-top: -19px;
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
  border-bottom: 1px black dotted;
  /* border: 1px solid black;
  border-radius: 10px; */
  padding: 10px;
  margin-bottom: 20px;

  > div {
    display: flex;
    justify-content: space-between;
    padding-bottom: 10px;
  }
`;

export const CommentDiv = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const CommentWriteTextareaBox = styled.textarea`
  text-align: left;
  align-items: center;
  background-color: transparent;
  outline: none;
  border: 1px solid black;
  resize: none;
  width: 70vw;
  font-size: 1em;
`;

export const CommentEditTextareaBox = styled.textarea`
  text-align: left;
  align-items: center;
  background-color: transparent;
  outline: none;
  border-bottom: 2px solid black;
  resize: none;
  width: 70vw;
  font-size: 1em;
`;

export const Btn = styled.button`
  font-size: 1rem;
  color: black;
  background-color: transparent;
  border: none;
  outline: 0;
  :hover {
    transition: all 0.2s linear;
    transform: scale(1.1);
    border-bottom: 2px solid grey;
  }
`;

export const BtnBox = styled.div`
  display: flex;
  flex-direction: column;
`;

export const LoginPlz = styled.div`
  margin: 10px auto;
  text-align: center;
  font-size: 2rem;
`;
