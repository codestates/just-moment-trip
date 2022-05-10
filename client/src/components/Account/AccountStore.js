import React, {
  useState,
  useCallback,
  useEffect,
  useMemo,
  useReducer,
  useRef,
} from 'react';

import AccountList from './AccountList';
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
  const initData = dummydata;
  function getData() {
    dispatch({ type: 'INIT', data: initData });
  }

  const dataId = useRef(0);

  useEffect(() => {
    setTimeout(() => {
      getData();
      console.log('setTimeout 확인용');
    }, 1500);
  }, []);

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
      dataId.current += 1;
      console.log('AccountStore dataId 확인 :', dataId.current);
    },
    [],
  );
  // let newDate = new Date();
  // let nowTime =
  //   newDate.getFullYear() +
  //   '-' +
  //   newDate.getMonth() +
  //   '-' +
  //   newDate.getDate() +
  //   ' ' +
  //   newDate.getHours() +
  //   ':' +
  //   newDate.getMinutes() +
  //   ':' +
  //   newDate.getSeconds();

  const onRemove = useCallback(targetId => {
    dispatch({ type: REMOVE, targetId });
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
        AccountList={data}
        totalSpentString={totalSpentString}
        remainingString={remainingString}
        PercentageOfAmountUsed={PercentageOfAmountUsed}
      />
    </div>
  );
}
export default AccountStore;
