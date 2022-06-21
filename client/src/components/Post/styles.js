import styled from 'styled-components';
import { keyframes } from 'styled-components';

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

export const SearchInput = styled.input`
  border-top: none;
  border-right: none;
  border-left: none;
  outline: none;
  border-bottom: 1px solid rgb(71, 56, 136);
  animation-name: ${fadeIn};
  animation-fill-mode: forwards;
  animation-duration: 1s;
  animation-timing-function: ease-out;
`;

export const SearchIcon = styled.div`
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
