import React, { useCallback, useEffect, useReducer, useRef } from 'react';
import DiaryList from './DiaryList';
import dummydata from './dummydata';
import axios from 'axios';

const INIT = 'INIT';
const CREATE = 'CREATE';
const REMOVE = 'REMOVE';
const EDIT = 'EDIT';
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
  const [search, setSearch] = React.useState('');

  const changeInput = e => {
    if (e.key === 'Enter') {
      setSearch(e.target.value);
    }
  };

  function getData() {
    let accessToken =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJtYW5zZW9uQG5hdmVyLmNvbSIsImlhdCI6MTY1MjA3OTM2MywiZXhwIjoxNjUyMTg3MzYzfQ.xbjdPPuQNiFpNQuVShyQbC302BMuLlMAQJOMu3Vtk40';
    let url = 'http://localhost:8080/diary?trip_id=1';

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
    // dispatch({ type: INIT, data: dummydata });
  }

  useEffect(() => {
    getData();
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

  return (
    <div className="DiaryStore">
      <div>전체 일기 : {data.length}</div>
      <DiaryList
        changeInput={changeInput}
        diaryList={data}
        onCreate={onCreate}
        onRemove={onRemove}
        onEdit={onEdit}
        search={search}
      />
    </div>
  );
}

export default DiaryStore;
