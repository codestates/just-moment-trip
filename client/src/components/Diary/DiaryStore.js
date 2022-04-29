import React, {
  useCallback,
  useEffect,
  useReducer,
  useRef,
  useState,
} from 'react';
import DiaryList from './DiaryList';
import test from './test';

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
  const [testData, setTestData] = useState([]);
  const [data, dispatch] = useReducer(reducer, []);
  const dataId = useRef(0);

  const getData = async () => {
    const res = await fetch(
      'https://jsonplaceholder.typicode.com/comments',
    ).then(res => res.json());

    const initData = res.slice(0, 20).map(it => {
      return {
        title: it.email,
        content: it.body,
        hashtags: [it.name],
        // emotion: Math.floor(Math.random() * 5) + 1,
        writeDate: new Date().getTime() + 1,
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

  const onCreate = useCallback((title, content, writeDate, hashtags) => {
    dispatch({
      type: CREATE,
      data: { title, content, writeDate, hashtags, id: dataId.current },
    });
    console.log('--------🚨 Store의 data-------- :', data);
    console.log('--------🦭 Store의 Content-------- :', content);
    console.log('--------🦭 Store의 Hashtags-------- :', hashtags);
    dataId.current += 1;
    console.log('DiaryStore dataId 확인 :', dataId.current);
  });

  const onRemove = useCallback(targetId => {
    dispatch({ type: REMOVE, targetId });
    const newDiaryList = data.filter(it => it.id !== targetId);
    setDiaryData(newDiaryList);
    console.log('--------🐘 Store의 diaryData-------- :', diarytData);
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

      console.log('--------🐘 Store의 diaryData-------- :', diarytData);
      console.log('Store의 new_content :', new_content);
      console.log('Store의 new_hashtags :', new_hashtags);
    },
    [],
  );

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
