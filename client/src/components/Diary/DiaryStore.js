import React, { useCallback, useReducer, useRef } from 'react';
import DiaryList from './DiaryList';

const reducer = (state, action) => {
  switch (action.type) {
    case 'CREATE': {
      const newItem = {
        ...action.data,
      };
      return [newItem, ...state];
    }
    case 'REMOVE': {
      return state.filter(it => it.id !== action.targetId);
    }
    case 'EDIT': {
      return state.map(it =>
        it.id === action.targetId
          ? {
              ...it,
              content: action.newContent,
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

  const onCreate = useCallback((location, content) => {
    dispatch({
      type: 'CREATE',
      data: { location, content, id: dataId.current },
    });
    dataId.current += 1;
  }, []);

  const onRemove = useCallback(targetId => {
    dispatch({ type: 'REMOVE', targetId });
  }, []);

  const onEdit = useCallback((targetId, newContent) => {
    dispatch({
      type: 'EDIT',
      targetId,
      newContent,
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
