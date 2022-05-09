import React, { useCallback, useEffect, useReducer, useRef } from 'react';
import DiaryList from './DiaryList';
import dummydata from './dummydata';
import axios from 'axios';

const INIT = 'INIT';
const CREATE = 'CREATE';
const REMOVE = 'REMOVE';
const EDIT = 'EDIT';
const SEARCH = 'SEARCH';
const reducer = (state, action) => {
  switch (action.type) {
    case INIT: {
      return action.data;
    }

    case CREATE: {
      const createDate = new Date().getTime();
      const newItem = {
        ...action.data,
        createDate,
      };
      console.log('--------🚨 CREATE시 reducer의 state-------- :', state);
      return [newItem, ...state];
    }
    case REMOVE: {
      return state.filter(it => it.id !== action.targetId);
    }
    case EDIT: {
      console.log('--------🚨 EDIT시 reducer의 state-------- :', state);
      return state.map(it =>
        it.id === action.targetId
          ? {
              ...it,
              content: action.new_content,
              title: action.new_title,
              hashtags: action.new_hashtags,
            }
          : it,
      );
    }
    default:
      return state;
  }
};

function DiaryStore() {
  const [data, dispatch] = useReducer(reducer, []);
  const dataId = useRef(0);
  //!
  const [search, setSearch] = React.useState('');
  const changeInput = e => {
    setSearch(e.target.value);
  };
  //!
  // const onKeyPress = e => {
  //   if (e.key == 'Enter') {
  //     console.log('엔터를 누르면 실행이 됩니까 ? => YES !');
  //   }
  // };

  function getData() {
    let accessToken =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJtYW5zZW9uQG5hdmVyLmNvbSIsImlhdCI6MTY1MjA3OTM2MywiZXhwIjoxNjUyMTg3MzYzfQ.xbjdPPuQNiFpNQuVShyQbC302BMuLlMAQJOMu3Vtk40';
    let url = 'http://localhost:8080/diary?trip_id=1';
    console.log('SEARCH', search);

    if (search) url += `&search=${search}`;
    axios
      .get(url, {
        headers: {
          authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      })
      .then(data => {
        if (data.data.accessToken) accessToken = data.data.accessToken;
        const initData = data.data.data;
        dispatch({ type: INIT, data: initData });
      });
  }

  useEffect(() => {
    // setTimeout(() => {
    getData();
    // }, 1500);
  }, [search]);

  const onCreate = useCallback((title, content, write_date, hashtags) => {
    dispatch({
      type: CREATE,
      data: { title, content, write_date, hashtags, id: dataId.current },
    });
    console.log('--------🚨 Store의 data-------- :', data);
    // console.log('--------🦭 Store의 Content-------- :', content);
    // console.log('--------🦭 Store의 Hashtags-------- :', hashtags);
    dataId.current += 1;
    console.log('DiaryStore dataId 확인 :', dataId.current);
  });

  const onRemove = useCallback(targetId => {
    dispatch({ type: REMOVE, targetId });

    console.log('--------🚨 Store의 data-------- :', data);
    console.log('DiaryStore onRemove 확인 :', targetId);
  }, []);

  const onEdit = useCallback(
    (targetId, new_content, new_title, new_hashtags) => {
      dispatch({
        type: EDIT,
        targetId,
        new_content,
        new_title,
        new_hashtags,
      });

      console.log('Store의 new_content :', new_content);
      console.log('Store의 new_hashtags :', new_hashtags);
    },
    [],
  );

  // const onClicked = useCallback(selectHashtags => {
  //   dispatch({ type: ONCKLICKED, selectHashtags });
  //   console.log('-------- Store의 selectHashtags :', selectHashtags);
  // }, []);

  return (
    <div className="DiaryStore">
      <div>전체 일기 : {data.length}</div>
      {/* <diaryList =changeInput={changeInput}/> */}
      <DiaryList
        changeInput={changeInput}
        diaryList={data}
        onCreate={onCreate}
        onRemove={onRemove}
        onEdit={onEdit}
        // onClicked={onClicked}
        // onFilter={onFilter}
      />
    </div>
  );
}

export default DiaryStore;
