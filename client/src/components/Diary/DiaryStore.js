const axios = require('../../services/diary');
import React, { useCallback, useEffect, useReducer } from 'react';
import DiaryList from './DiaryList';

const INIT = 'INIT';
const REMOVE = 'REMOVE';
const EDIT = 'EDIT';

const reducer = (state, action) => {
  switch (action.type) {
    case INIT: {
      return action.data;
    }
    case REMOVE: {
      return state.filter(it => it.id !== action.targetId);
    }
    case EDIT: {
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
  const [search, setSearch] = React.useState('');
  const [searchType, setSearchType] = React.useState('');
  const trip_id = JSON.parse(sessionStorage.getItem('trip_id'));

  const changeInput = e => {
    if (e.key === 'Enter') {
      setSearch(e.target.value);
    }
  };
  const getSearchType = e => {
    setSearchType(e.target.value);
  };

  useEffect(() => {
    axios.diaryGet(trip_id, search, searchType).then(data => {
      const initData = data.data.data;
      dispatch({ type: INIT, data: initData });
    });
  }, [search, searchType]);

  const onCreate = (title, content, write_date, hashtags) => {
    axios
      .diaryPost(trip_id, title, content, write_date, hashtags)
      .then(res => {
        axios.diaryGet(trip_id).then(data => {
          const initData = data.data.data;
          dispatch({ type: INIT, data: initData });
        });
      })
      .catch(err => {
        console.log(err);
      });
  };

  const onRemove = useCallback(targetId => {
    dispatch({ type: REMOVE, targetId });
    axios.diaryRemove(targetId).catch(err => {
      console.log(err);
    });
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

      axios
        .diaryPatch(targetId, new_content, new_title, new_hashtags)
        .catch(err => {
          console.log(err);
        });
    },
    [],
  );

  return (
    <div
      className="DiaryStore"
      style={{
        width: '93%',
        height: '100%',
        padding: '90px 0 70px 0',
      }}
    >
      <DiaryList
        changeInput={changeInput}
        diaryList={data}
        onCreate={onCreate}
        onRemove={onRemove}
        onEdit={onEdit}
        search={search}
        getSearchType={getSearchType}
        searchType={searchType}
      />
    </div>
  );
}

export default DiaryStore;
