import React, {
  useState,
  useCallback,
  useEffect,
  useMemo,
  useReducer,
  useRef,
} from 'react';

import AccountList from './AccountList';
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
      const create_date = new Date().getTime();
      const newItem = {
        ...action.data,
        create_date,
      };
      console.log('--------🚨 Store의 state-------- :', state);

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
              price: action.new_price,
              memo: action.new_memo,
              spent_person: action.new_spent_person,
              item_name: action.new_item_name,
              target_currency: action.new_target_currency,
              category: action.new_category,
            }
          : it,
      );
    }
    default:
      return state;
  }
};

function AccountStore() {
  const [data, dispatch] = useReducer(reducer, []);
  const [isTrue, setIsTrue] = useState(true); // 이 스테이트가 변경될때마다 useEffect를 실행

  const getData = () => {
    let accessToken =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiZW1haWwiOiJhZG1pbkBnbWFpbC5jb20iLCJpYXQiOjE2NTIxNjA5MDQsImV4cCI6MTY1MjI2ODkwNH0.5sQondqGTQ5OdOhfxyEZfL8rZz06cDC6z8Iuxt-6Wlk';
    let url = 'https://www.just-moment-trip.tk/account?trip_id=2';
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
  };

  const dataId = useRef(0);

  useEffect(() => {
    getData();
    console.log('setTimeout 확인용');
    console.log('--------------- useEffect', isTrue);
  }, [isTrue]);

  const onCreate = useCallback(
    (
      item_name,
      price,
      category,
      target_currency,
      spent_person,
      memo,
      write_date,
    ) => {
      dispatch({
        type: CREATE,
        data: {
          item_name,
          price,
          category,
          target_currency,
          spent_person,
          memo,
          write_date,
          id: dataId.current,
        },
      });
      // console.log()
      dataId.current += 1;
      console.log('AccountStore dataId 확인 :', dataId.current);

      let accessToken =
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiZW1haWwiOiJhZG1pbkBnbWFpbC5jb20iLCJpYXQiOjE2NTIxNjA5MDQsImV4cCI6MTY1MjI2ODkwNH0.5sQondqGTQ5OdOhfxyEZfL8rZz06cDC6z8Iuxt-6Wlk';
      let url = 'https://www.just-moment-trip.tk/account';

      axios
        .post(
          url,
          {
            trip_id: 2,
            item_name,
            price,
            category,
            target_currency,
            spent_person,
            memo,
            write_date,
          },
          {
            headers: {
              authorization: `Bearer ${accessToken}`,
              'Content-Type': 'application/json',
            },
          },
        )
        .then(res => {
          setIsTrue(currentIsTrue => !currentIsTrue);
          console.log('--------------- onCreate', isTrue);
          console.log(res.data);
          console.log(res.status);
        })
        .catch(err => {
          console.log(err);
          console.log('루저ㅋ', err.status);
        });
    },
    [],
  );

  const onRemove = useCallback(targetId => {
    dispatch({ type: REMOVE, targetId });

    let accessToken =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiZW1haWwiOiJhZG1pbkBnbWFpbC5jb20iLCJpYXQiOjE2NTIxNjA5MDQsImV4cCI6MTY1MjI2ODkwNH0.5sQondqGTQ5OdOhfxyEZfL8rZz06cDC6z8Iuxt-6Wlk';
    let url = `https://www.just-moment-trip.tk/account/${targetId}`;

    axios
      .delete(url, {
        headers: {
          authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        data: {
          id: targetId,
        },
      })
      .then(res => {
        console.log('--------------- 삭제시', isTrue);
        console.log(res.data);
        console.log(res.status);
      })
      .catch(err => {
        console.log(err);
        console.log('루저ㅋ', err.status);
      });
  }, []);

  const onEdit = (
    targetId,
    new_price,
    new_memo,
    new_spent_person,
    new_item_name,
    new_target_currency,
    new_category,
  ) => {
    dispatch({
      type: EDIT,
      targetId,
      new_price,
      new_memo,
      new_spent_person,
      new_item_name,
      new_target_currency,
      new_category,
    });

    let accessToken =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiZW1haWwiOiJhZG1pbkBnbWFpbC5jb20iLCJpYXQiOjE2NTIxNjA5MDQsImV4cCI6MTY1MjI2ODkwNH0.5sQondqGTQ5OdOhfxyEZfL8rZz06cDC6z8Iuxt-6Wlk';
    let url = `https://www.just-moment-trip.tk/account/${targetId}`;

    axios
      .patch(
        url,
        {
          new_price,
          new_memo,
          new_spent_person,
          new_item_name,
          new_target_currency,
          new_category,
        },
        {
          headers: {
            authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          },
        },
      )
      .then(res => {
        console.log(res.data);
        console.log(res.status);
      })
      .catch(err => {
        console.log(err);
        console.log('루저ㅋ', err.status);
      }),
      [];
  };

  let totalPrice = 10000000; // 총금액 (서버에서 요청받아함)
  let totalPriceString = 0; // 총금액
  let totalSpentString = 0; // 사용금액
  let remainingString = 0; // 남은금액
  let PercentageOfAmountUsed = 0; // 사용금액백분율

  totalPriceString = `${totalPrice.toLocaleString()}원`;
  let totalSpent = 0;
  if (data.length > 0) {
    totalSpent = data
      .map(el => el.price)
      .reduce((prev, next) => Number(prev) + Number(next), 0);
  } // list에서 거르고 거르는 작업 !

  totalSpentString = `${totalSpent.toLocaleString()}원`;
  remainingString = `${(totalPrice - totalSpent).toLocaleString()}원`;
  PercentageOfAmountUsed = `${((totalSpent / totalPrice) * 100).toFixed(2)}%`;

  return (
    <div
      className="Account"
      style={{
        padding: '70px 0',
      }}
    >
      <div className="AccountHead">
        <div className="AccountHeadSpan">
          <div className="AccountHeadTotalMoney">
            {/* {`${getName(context.state.tripList[0].country)}에`} */}
            미국에
            <br />
            {`총 ${totalPriceString}을 들고갔어요`}
          </div>
          <div className="AccountHeadpaidMoney">
            {`✅ 사용한돈${totalSpentString}/남은돈${remainingString}`}
          </div>
        </div>
      </div>
      <AccountList
        onCreate={onCreate}
        onEdit={onEdit}
        onRemove={onRemove}
        data={data}
        totalSpentString={totalSpentString}
        remainingString={remainingString}
        PercentageOfAmountUsed={PercentageOfAmountUsed}
      />
    </div>
  );
}
export default AccountStore;
