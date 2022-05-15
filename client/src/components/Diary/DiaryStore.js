const axios = require('../../services/diary');

import React, {
  useCallback,
  useEffect,
  useReducer,
  useRef,
  useState,
} from 'react';
import { useSelector } from 'react-redux';
import DiaryList from './DiaryList';
import dummydata from './dummydata';

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
  const [isTrue, setIsTrue] = useState(true);
  const dataId = useRef(0);
  const [search, setSearch] = React.useState('');
  const trip_id = JSON.parse(localStorage.getItem('trip_id'));

  const changeInput = e => {
    if (e.key === 'Enter') {
      setSearch(e.target.value);
    }
  };

  useEffect(() => {
    axios.diaryGet(trip_id, search).then(data => {
      if (data.data.accessToken) accessToken = data.data.accessToken;
      const initData = data.data.data;
      dispatch({ type: INIT, data: initData });
    });
  }, [search, isTrue]);

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
    axios
      .diaryPost(trip_id, title, content, write_date, hashtags)
      .then(res => {
        console.log(res);
        console.log('312114');
        setIsTrue(currentIsTrue => !currentIsTrue);
        console.log('--------------- onCreate', isTrue);
        console.log(res.data);
        console.log(res.status);
      })
      .catch(err => {
        console.log(err);
        console.log('루저ㅋ ㅋ ㅋ ㅋ ㅋ ㅋ ㅋ ㅋ ㅋ ㅋ', err.status);
      });
  });

  const onRemove = useCallback(targetId => {
    dispatch({ type: REMOVE, targetId });
    axios
      .diaryRemove(targetId)
      .then(res => {
        console.log('--------------- 삭제시', isTrue);
        console.log(res.data);
        console.log(res.status);
      })
      .catch(err => {
        console.log(err);
        console.log('루저ㅋ', err.status);
      })
      .console.log('--------🚨 Store의 data-------- :', data);
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

      axios
        .diaryPatch(targetId, new_content, new_title, new_hashtags)
        .then(res => {
          console.log(res.data);
          console.log(res.status);
        })
        .catch(err => {
          console.log(err);
          console.log('루저ㅋ', err.status);
        });
      console.log('Store의 new_content :', new_content);
      console.log('Store의 new_hashtags :', new_hashtags);
    },
    [],
  );

  return (
    <div className="DiaryStore">
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
