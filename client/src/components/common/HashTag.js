import React from 'react';
import styled from 'styled-components';

const TagsInput = styled.div`
  /* margin: 8rem auto; */
  display: ${props => props.display};
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  height: 10vh;
  width: 98%;
  border: none;
  border-radius: 6px;
  > ul {
    display: flex;
    flex-wrap: wrap;
    padding: 0;
    margin: 8px 0 0 0;

    > .tag {
      width: auto;
      height: 32px;
      display: flex;
      align-items: center;
      text-align: center;
      justify-content: center;
      color: #efefef;
      padding: 0 8px;
      font-size: 0.8em;
      list-style: none;
      border-radius: 6px;
      margin: 2px 2px;
      background: rgb(70, 125, 196);
      :hover {
        cursor: pointer;
        transition: all 0.5s linear;
        transform: scale(1.1);
      }
      > .tag-close-icon {
        display: block;
        width: 16px;
        height: 16px;
        line-height: 16px;
        text-align: center;
        font-size: 14px;
        margin-left: 8px;
        color: red;
        border-radius: 50%;
        background: #efefef;
        cursor: pointer;
      }
    }
  }

  > input {
    flex: 1;
    border-radius: none;
    text-align: center;
    background-color: transparent;
    border: none;
    padding: 5vh 0;
    /* width: 20vw; */
    font-size: 0.8em;
    :focus {
      outline: transparent;
    }
  }
`;

function Hashtag() {
  return (
    <>
      {' '}
      <ul id="tags" style={{ justifyContent: 'center', textAlign: 'center' }}>
        {tags.map((tag, index) => (
          <li
            style={{ justifyContent: 'center', textAlign: 'center' }}
            key={index}
            className="tag"
          >
            <span className="tag-title">{tag}</span>
            <span
              className="tag-close-icon"
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                textAlign: 'center',
              }}
              onClick={() => removeTags(index)}
            >
              &times;
            </span>
          </li>
        ))}
      </ul>
      <input
        style={{ width: '50vw', marginBottom: '10vh' }}
        className="tag-input"
        type="text"
        onKeyUp={event => (event.key === 'Enter' ? addTags(event) : null)}
        maxLength="12"
        placeholder="태그를 입력하세요🪐"
      />
    </>
  );
}

export default Hashtag;
