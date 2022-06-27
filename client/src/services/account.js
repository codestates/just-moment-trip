import axios from 'axios';
import changeToken from './changeToken';
let endpoint = 'http://localhost:8080';
// let endpoint = 'https://just-moment-trip.tk';

//tk : 서버배포
//ml : 클라배포
// 서로 따로 실행하니 당연히 주소도 다르겠지 후후

export async function accountGet(trip_id) {
  let url = `${endpoint}/account?trip_id=${trip_id}`;
  const res = await axios.get(url, {
    headers: {
      authorization:
        'Bearer ' + JSON.parse(sessionStorage.getItem('user')).accessToken,
      'Content-Type': 'application/json',
    },
    withCredentials: true,
  });
  changeToken(res);
  res.data.data.sort((a, b) => {
    return new Date(a.write_date) - new Date(b.write_date);
  });
  return res;
}

export async function accountPost(
  trip_id,
  item_name,
  price,
  category,
  spent_person,
  memo,
  write_date,
  gps,
) {
  let url = `${endpoint}/account`;
  const res = await axios.post(
    url,
    {
      trip_id,
      item_name,
      price,
      category,
      spent_person,
      memo,
      write_date,
      gps,
    },
    {
      headers: {
        authorization:
          'Bearer ' + JSON.parse(sessionStorage.getItem('user')).accessToken,
        'Content-Type': 'application/json',
      },
      withCredentials: true,
    },
  );
  changeToken(res);
  return res;
}

export async function accountRemove(targetId) {
  let url = `${endpoint}/account/${targetId}`;
  const res = await axios.delete(url, {
    headers: {
      authorization:
        'Bearer ' + JSON.parse(sessionStorage.getItem('user')).accessToken,
      'Content-Type': 'application/json',
    },
    withCredentials: true,
  });
  changeToken(res);
  return res;
}

export async function accountPatch(
  targetId,
  new_price,
  new_memo,
  new_spent_person,
  new_item_name,
  new_category,
  new_write_date,
) {
  let url = `${endpoint}/account/${targetId}`;
  const res = await axios.patch(
    url,
    {
      new_price,
      new_memo,
      new_spent_person,
      new_item_name,
      new_category,
      new_write_date,
    },
    {
      headers: {
        authorization:
          'Bearer ' + JSON.parse(sessionStorage.getItem('user')).accessToken,
        'Content-Type': 'application/json',
      },
      withCredentials: true,
    },
  );
  changeToken(res);
  return res;
}
