import axios from 'axios';
let endpoint = 'http://localhost:8080';
let accessToken =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJtYW5zZW9uQG5hdmVyLmNvbSIsImlhdCI6MTY1MjE4NzY0NywiZXhwIjoxNjUyMjk1NjQ3fQ.v7GPuSUN4QesK_ZX5Na0Kl1Rju_geXQAS7E17ILlHss';

//! --------------------account--------------------------
export function accountGet(trip_id) {
  let url = `${endpoint}/account?trip_id=${trip_id}`;
  return axios.get(url, {
    headers: {
      authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
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
      headers: {
        authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
    },
  );
}

export function accountRemove(targetId) {
  let url = `${endpoint}/account/${targetId}`;
  return axios.delete(url, {
    headers: {
      authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
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
      headers: {
        authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
    },
  );
}
//! --------------------diary--------------------------
export function diaryGet(trip_id, search) {
  let url = `${endpoint}/diary?trip_id=${trip_id}`;
  if (search) url += `&search=${search}`;
  return axios.get(url, {
    headers: {
      authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
  });
}

export function diaryPost(trip_id, title, content, write_date, hashtags) {
  let url = `${endpoint}/diary`;
  console.log('확인하자', trip_id, title, content, write_date, hashtags);
  //   write_date = '2022. 5. 11.';
  return axios.post(
    url,
    {
      trip_id,
      title,
      content,
      write_date,
      hashtags,
    },
    {
      headers: {
        authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
    },
  );
}

export function diaryRemove(targetId) {
  let url = `${endpoint}/diary/${targetId}`;
  return axios.delete(url, {
    headers: {
      authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    data: {
      id: targetId,
    },
  });
}

export function diaryPatch(targetId, new_content, new_title, new_hashtags) {
  let url = `${endpoint}/diary/${targetId}`;
  return axios.patch(
    url,
    {
      new_content,
      new_title,
      new_hashtags,
    },
    {
      headers: {
        authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
    },
  );
}
