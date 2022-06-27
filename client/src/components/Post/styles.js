import styled, { keyframes } from 'styled-components';

export const Box = styled.div`
  display: flex;
  justify-content: center;
  background-color: transparent;
  /* background-color: cornflowerblue; */
  height: auto;
  overflow: hidden;
  font-family: SsurroundFont;
`;

export const PostListHeaderBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding-bottom: 10px;
`;

export const Label = styled.label`
  font-family: ManfuMedium;
  font-size: 30px;
`;

const fadeIn = keyframes`
from {
    opacity: 0;
}
to {
    opacity: 1;
}
`;

export const Input = styled.input`
  float: right;
  width: ${props => props.width}vw;
  border-top: none;
  border-right: none;
  border-left: none;
  margin-top: ${props => props.marginTop}vh;
  margin-bottom: ${props => props.marginBottom}vh;
  outline: none;
  border-bottom: 1px solid rgb(71, 56, 136);
  animation-name: ${fadeIn};
  animation-fill-mode: forwards;
  animation-iteration-count: infinite;
  :focus {
    border-color: blue;
  }
`;

export const Iconbox = styled.div`
  font-size: ${props => props.fontSize}px;
  :hover {
    cursor: pointer;
    color: rgb(139, 139, 185);
    transition: all 0.5s linear;
  }
`;

export const SearchIcon = styled.div`
  width: 420px;
  padding-top: 10px;
  font-size: 20px;
`;

export const PostListBox = styled.div`
  width: 90vw;
  height: 76vh;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border-top: 2px solid rgb(86, 66, 137);
  border-left: none;
  border-right: none;
  border-bottom: 2px solid rgb(86, 66, 137);
  background-color: transparent;
  font-size: 1em;
`;

export const PostTitleBox = styled.div`
  font-family: ManfuMedium;
  font-size: 20px;
  background-color: white;
  margin: 14px 65px 0px 65px;
  display: flex;
  background-color: transparent;
  flex-direction: row;
  justify-content: space-between;
  box-sizing: border-box;
`;

export const PostItemBox = styled.div`
  border-radius: 5px;
  background-color: transparent;
  margin: 14px 20px;
  padding: 13px 10px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  box-sizing: border-box;
  :hover {
    cursor: pointer;
    outline: 2px solid rgb(139, 139, 185);
  }
`;

export const DataTablesBox = styled.div`
  height: 95%;
  overflow: auto;
  &::-webkit-scrollbar {
    overflow: none;
    width: 4px;
  }
  :hover {
    &::-webkit-scrollbar {
      display: block;
      width: 4px;
    }
    &::-webkit-scrollbar-thumb {
      border-radius: 2px;
      background: #ccc;
    }
    &::-webkit-scrollbar-track {
      background-color: none;
    }
  }
`;

export const PaginationBox = styled.div`
  bottom: 0;
`;

export const ListTable = styled.div`
  text-align: center;
  width: ${props => props.width}%;
  font-weight: ${props => props.fontweight};
  margin-right: ${props => props.marginRight}px;
  background-color: transparent;
`;

export const PageUl = styled.ul`
  /* float: inline-end; */
  list-style: none;
  text-align: center;
  bottom: 0;
  justify-content: center;
  border-radius: 3px;
  color: rgb(86, 66, 137);
  background-color: transparent;
`;

export const PageLi = styled.li`
  display: inline-block;
  font-size: 1em;
  font-family: ManfuMedium;
  padding: 5px;
  border-radius: 5px;
  color: rgb(86, 66, 137);

  /* &:hover {
    cursor: pointer;
    color: rgb(86, 66, 137);
  }
  &:focus::after {
    color: rgb(86, 66, 137);
    background-color: rgb(86, 66, 137);
  } */
`;

export const PageSpan = styled.span`
  border: none;
  color: rgb(86, 66, 137);
  &:hover {
    cursor: pointer;
    color: rgb(86, 66, 137);
  }
  /* &:hover::after,
  &:focus::after {
    border-radius: 100%;
    color: rgb(86, 66, 137);
    background-color: rgb(86, 66, 137);
  } */
`;

export const PostWriteUpDetailBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  min-height: 400px;
`;

export const TitleInput = styled.input`
  width: 30vw;
`;

export const Warning = styled.p`
  font-family: NexonFont;
`;

export const Error = styled.p`
  font-family: NexonFont;
  color: ${props => props.color};
`;

export const PostViewDetailBox = styled.div`
  display: flex;
  flex-direction: column;
  border-top: 1px solid rgb(139, 139, 185);
  border-right: none;
  border-left: none;
  padding: 20px;
  margin: 60px;
`;

export const HeaderBox = styled.div``;

export const Header = styled.p`
  text-align: center;
  font-family: ManfuMedium;
  font-size: 1.7rem;
`;

export const MiddleBox = styled.div`
  text-align: right;
`;

export const MiddelSentence = styled.p`
  font-family: SBFontLight;
  font-size: 1em;
`;

export const BtnBox = styled.div`
  padding-top: 10px;
  text-align: right;
`;

export const Btn = styled.button`
  font-family: ManfuMedium;
  outline: none;
  background-color: transparent;
  border: none;
  border-color: transparent;
  :hover {
    color: rgb(139, 139, 185);
    transition: all 0.2s linear;
  }
`;

export const ContentBox = styled.div`
  border: 1px solid rgb(168, 168, 191);
  padding: 20px;
  /* min-height: 30vh; */
  /* height: 100%; */
`;

export const ContentListBox = styled.div`
  /* min-height: 10vh; */
  padding-top: 10px;
  padding-bottom: 10px;
`;

export const Content = styled.div``;

export const PostEditBox = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
`;

export const EditedSentence = styled.h6`
  font-family: SBFontLight;
  color: rgb(226, 155, 61);
`;
