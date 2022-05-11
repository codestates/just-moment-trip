import axios from 'axios';
import tokenHeader from './headers';
let endpoint = 'https://www.just-moment-trip.tk';
//tk : 서버배포
//ml : 클라배포
// 서로 따로 실행하니 당연히 주소도 다르겠지 후후

export function accountGet(trip_id) {
  console.log('어카운트 겟요청 됨');
  let url = `${endpoint}/account?trip_id=${trip_id}`;
  return axios.get(url, {
    headers: tokenHeader(),
    'Content-Type': 'application/json',
  });
}

export function accountPost(
  trip_id,
  item_name,
  price,
  category,
  target_currency,
  spent_person,
  memo,
  write_date,
) {
  let url = `${endpoint}/account`;
  return axios.post(
    url,
    {
      trip_id,
      item_name,
      price,
      category,
      target_currency,
      spent_person,
      memo,
      write_date,
    },
    {
      headers: tokenHeader(),
      'Content-Type': 'application/json',
    },
  );
}

export function accountRemove(targetId) {
  let url = `${endpoint}/account/${targetId}`;
  return axios.delete(url, {
    headers: tokenHeader(),
    'Content-Type': 'application/json',
    data: {
      id: targetId,
    },
  });
}

export function accountPatch(
  targetId,
  new_price,
  new_memo,
  new_spent_person,
  new_item_name,
  new_target_currency,
  new_category,
) {
  let url = `${endpoint}/account/${targetId}`;
  return axios.patch(
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
      headers: tokenHeader(),
      'Content-Type': 'application/json',
    },
  );
}
