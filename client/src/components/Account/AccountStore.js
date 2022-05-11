const axios = require('../../services/accout');
let trip_id = 4;
import React, {
  useState,
  useCallback,
  useEffect,
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
  const dataId = useRef(0);

  useEffect(() => {
    axios.accountGet(trip_id).then(data => {
      if (data.data.accessToken) accessToken = data.data.accessToken;
      const initData = data.data.data;
      dispatch({ type: INIT, data: initData });
    });

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

      axios
        .accountPost(
          trip_id,
          item_name,
          price,
          category,
          target_currency,
          spent_person,
          memo,
          write_date,
        )
        .then(res => {
          setIsTrue(currentIsTrue => {
            return !currentIsTrue;
          });
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

    axios
      .accountRemove(targetId)
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

  const onEdit = useCallback(
    (
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

      axios
        .accountPatch(
          targetId,
          new_price,
          new_memo,
          new_spent_person,
          new_item_name,
          new_target_currency,
          new_category,
        )
        .then(res => {
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
        width: '93%',
        height: '100%',
        padding: '70px 0 0 0',
        backgroundColor: 'red',
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
