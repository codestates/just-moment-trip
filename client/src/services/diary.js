import axios from 'axios';
import tokenHeader from './headers';
let endpoint = 'https://www.just-moment-trip.tk';

export function diaryGet(trip_id, search) {
  let url = `${endpoint}/diary?trip_id=${trip_id}`;
  if (search) url += `&search=${search}`;
  return axios.get(url, {
    headers: tokenHeader(),
    'Content-Type': 'application/json',
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
      headers: tokenHeader(),
      'Content-Type': 'application/json',
    },
  );
}

export function diaryRemove(targetId) {
  let url = `${endpoint}/diary/${targetId}`;
  return axios.delete(url, {
    headers: tokenHeader(),
    'Content-Type': 'application/json',
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
      headers: tokenHeader(),
      'Content-Type': 'application/json',
    },
  );
}
