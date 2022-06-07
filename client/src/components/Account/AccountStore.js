const axios = require('../../services/account');

import React, { useCallback, useEffect, useReducer, useRef } from 'react';

import AccountList from './AccountList';

const INIT = 'INIT';
const REMOVE = 'REMOVE';
const EDIT = 'EDIT';

function getLocation() {
  if (navigator.geolocation) {
    // GPS를 지원하면
    navigator.geolocation.getCurrentPosition(
      function (position) {
        sessionStorage.setItem('latitude', position.coords.latitude);
        sessionStorage.setItem('longitude', position.coords.longitude);
      },
      function (error) {
        console.error(error);
      },
      {
        enableHighAccuracy: false,
        maximumAge: 0,
        timeout: Infinity,
      },
    );
  } else {
    alert('GPS를 지원하지 않습니다');
  }
}

const reducer = (state, action) => {
  switch (action.type) {
    case INIT: {
      return action.data.reverse();
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
  // const [isTrue, setIsTrue] = useState(true); // 이 스테이트가 변경될때마다 useEffect를 실행
  const trip_id = JSON.parse(sessionStorage.getItem('trip_id'));
  // const newTotalPrice = JSON.parse(sessionStorage.getItem('total_price'));
  const newTotalPrice = sessionStorage.getItem('total_price') // 아무 데이터 없을때 에러 피하기 위함
    ? JSON.parse(sessionStorage.getItem('total_price'))
    : 0;
  const title = JSON.parse(sessionStorage.getItem('title'));
  const exchange_rate = JSON.parse(sessionStorage.getItem('exchange_rate'));
  const target_currency = JSON.parse(sessionStorage.getItem('target_currency'));

  useEffect(() => {
    setTimeout(() => {
      axios.accountGet(trip_id).then(res => {
        const initData = res.data.data;

        dispatch({ type: INIT, data: initData });
      });
    }, 1000);
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
      gps,
    ) => {
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
          gps,
        )
        .then(() => {
          axios.accountGet(trip_id).then(res => {
            // console.log(res);
            const initData = res.data.data;

            dispatch({ type: INIT, data: initData });
          });
        })
        .catch(err => {
          console.log(err);
          // console.log('루저ㅋ', err.status);
        });
    },
    [],
  );

  const onRemove = useCallback(targetId => {
    dispatch({ type: REMOVE, targetId });

    axios.accountRemove(targetId).catch(err => {
      console.log(err);
      // console.log('루저ㅋ', err.status);
    });
  }, []);

  const onEdit = useCallback(
    (
      targetId,
      new_price,
      new_memo,
      new_spent_person,
      new_item_name,
      new_category,
    ) => {
      dispatch({
        type: EDIT,
        targetId,
        new_price,
        new_memo,
        new_spent_person,
        new_item_name,
        new_category,
      });

      axios
        .accountPatch(
          targetId,
          new_price,
          new_memo,
          new_spent_person,
          new_item_name,
          new_category,
        )
        .catch(err => {
          console.log(err);
          // console.log('루저ㅋ', err.status);
        });
    },
    [],
  );

  let totalPriceString = 0; // 총금액
  let totalSpentString = 0; // 사용금액
  let remainingString = 0; // 남은금액
  let PercentageOfAmountUsed = 0; // 사용금액백분율

  totalPriceString = `${newTotalPrice.toLocaleString()}${target_currency}`;
  let totalSpent = 0;

  if (data.length > 0) {
    totalSpent = data
      .map(el => el.price)
      .reduce((prev, next) => Number(prev) + Number(next), 0);
  } // list에서 거르고 거르는 작업 !

  totalSpentString = totalSpent;
  remainingString = newTotalPrice - totalSpent;
  PercentageOfAmountUsed = Number((totalSpent / newTotalPrice) * 100);

  return (
    <>
      {getLocation()}
      <div
        className="Account"
        style={{
          width: '93%',
          height: '100%',
          padding: '90px 0 70px 0',
        }}
      >
        <div>
          <div
            className="AccountHeadpaidMoney"
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              textAlign: 'center',
            }}
          >
            <div className="AccountHeadTotalMoney">
              <span style={{ fontSize: '2em' }}>{`${title}`}</span>
              에
              <br />총
              <span style={{ fontSize: '3em', fontWeight: 'bold' }}>
                {`${totalPriceString}`}
              </span>
              을 들고갔어요
            </div>
            <span style={{ fontSize: '1.2em', fontWeight: 'bold' }}>
              {`💸 사용한돈 ${totalSpentString.toLocaleString()}${target_currency}/💰 남은돈 ${remainingString.toLocaleString()}${target_currency}`}
            </span>
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
          target_currency={target_currency}
          exchange_rate={exchange_rate}
        />
      </div>
    </>
  );
}
export default AccountStore;
