import React, { useCallback, useEffect, useReducer, useRef } from 'react';
import DiaryList from './DiaryList';

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
      return [newItem, ...state];
    }
    case REMOVE: {
      return state.filter(it => it.id !== action.targetId);
    }
    case EDIT: {
      return state.map(it =>
        it.id === action.targetId
          ? {
              ...it,
              content: action.newContent,
              location: action.newLocation,
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

  useEffect(() => {
    setTimeout(() => {
      console.log('울부짖어라 도토잠보여 🐘');
    }, 1500);
  }, []);

  const onCreate = useCallback((location, content, writeDate) => {
    dispatch({
      type: CREATE,
      data: { location, content, writeDate, id: dataId.current },
    });

    dataId.current += 1;
  });

  const onRemove = useCallback(targetId => {
    dispatch({ type: REMOVE, targetId });
  }, []);

  const onEdit = useCallback((targetId, newContent, newLocation) => {
    dispatch({
      type: EDIT,
      targetId,
      newContent,
      newLocation,
    });
  }, []);

  return (
    <div className="DiaryStore">
      <div>전체 일기 : {data.length}</div>
      <DiaryList
        diaryList={data}
        onCreate={onCreate}
        onRemove={onRemove}
        onEdit={onEdit}
      />
    </div>
  );
}

export default DiaryStore;
