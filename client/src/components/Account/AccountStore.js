import React, {
  useState,
  useCallback,
  useEffect,
  useMemo,
  useReducer,
  useRef,
} from 'react';

import AccountList from './AccountList';

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
      return [newItem, ...state];
    }
    case REMOVE: {
      return state.filter(it => it.id !== action.targetId);
    }
    case EDIT: {
      return state.map(it =>
        it.id === action.targetId
          ? { ...it, price: action.newPrice, memo: action.newMemo }
          : it,
      );
    }
    default:
      return state;
  }
};

function AccountStore() {
  const [accountData, accountSetData] = useState([]);
  const [data, dispatch] = useReducer(reducer, []);

  const dataId = useRef(0);

  useEffect(() => {
    setTimeout(() => {
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
    },
    [data],
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

  const onRemove = targetId => {
    dispatch({ type: REMOVE, targetId });

    const newAccountList = data.filter(it => it.id !== targetId);
    accountSetData(newAccountList);
  };

  const onEdit = (targetId, newPrice, newMemo) => {
    dispatch({ type: EDIT, targetId, newPrice, newMemo });

    accountSetData(
      data.map(it =>
        it.id === targetId ? { ...it, price: newPrice, memo: newMemo } : it,
      ),
    );
  };

  const memoizedDispatches = useMemo(() => {
    return { onCreate, onRemove, onEdit };
  }, []);

  // let totalPrice = context.state.tripList[0].totalPrice;
  // let totalPriceString = '';
  // let totalSpentString = '';
  // let remainingString = '';
  // if (totalPrice < 10000) {
  //   totalPriceString = `${totalPrice}원`;
  // } else {
  //   totalPriceString = `${totalPrice / 10000}만원`;
  // }
  // let totalSpent = 0;
  // if (accountData.length > 0) {
  //   totalSpent = accountData
  //     .map(el => el.price)
  //     .reduce((prev, next) => prev + next, 0);
  // }

  // if (totalSpent < 10000) {
  //   totalSpentString = `${totalSpent}원`;
  // } else {
  //   totalSpentString = `${totalSpent / 10000}만원`;
  // }

  // if (totalPrice - totalSpent < 10000) {
  //   remainingString = `${totalPrice - totalSpent}원`;
  // } else {
  //   remainingString = `${(totalPrice - totalSpent) / 10000}만원`;
  // }

  return (
    <div className="Account">
      <div className="AccountHead">
        <div className="AccountHeadSpan">
          <div className="AccountHeadTotalMoney">
            {/* {`${getName(context.state.tripList[0].country)}에`} */}
            <br />
            {/* {`총 ${totalPriceString}을 들고갔어요`} */}총 10억원 들고갔어요
          </div>
          <div className="AccountHeadpaidMoney">
            {/* {`✅ 사용한돈${totalSpentString}/남은돈${remainingString}`} */}
            사용한돈 20000원 / 남은돈 9억 9998만원
          </div>
        </div>
      </div>
      <AccountList
        onCreate={onCreate}
        onEdit={onEdit}
        onRemove={onRemove}
        AccountList={data}
      />
    </div>
  );
}
export default AccountStore;
