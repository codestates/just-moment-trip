import React, { useCallback, useEffect, useReducer, useRef } from 'react';
import DiaryList from './DiaryList';

const INIT = 'INIT';
const CREATE = 'CREATE';
const REMOVE = 'REMOVE';
const EDIT = 'EDIT';
const FILTER = 'FILTER';

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
    case FILTER: {
      return state.filter(it => {
        let test = false;
        it.hashtags.forEach(element => {
          if (element === action.selectHashtags) test = true;
        });
        return test;
      });
    }
    default:
      return state;
  }
};

function DiaryStore() {
  const [data, dispatch] = useReducer(reducer, []);
  const dataId = useRef(0);

  const getData = async () => {
    const res = await fetch(
      'https://jsonplaceholder.typicode.com/comments',
    ).then(res => res.json());

    const initData = res.slice(0, 5).map(it => {
      return {
        title: it.email,
        content: it.body,
        hashtags: [it.name],
        // emotion: Math.floor(Math.random() * 5) + 1,
        write_date: new Date().getTime() + 1,
        id: dataId.current++,
      };
    });

    dispatch({ type: 'INIT', data: initData });
  };

  useEffect(() => {
    setTimeout(() => {
      getData();
    }, 1500);
  }, []);

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

  const onFilter = useCallback(selectHashtags => {
    dispatch({ type: FILTER, selectHashtags });
    console.log('-------- Store의 selectHashtags :', selectHashtags);
  }, []);

  return (
    <div className="DiaryStore">
      <div>전체 일기 : {data.length}</div>
      <DiaryList
        diaryList={data}
        onCreate={onCreate}
        onRemove={onRemove}
        onEdit={onEdit}
        onFilter={onFilter}
      />
    </div>
  );
}

export default DiaryStore;
