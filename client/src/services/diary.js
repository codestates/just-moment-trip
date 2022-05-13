import axios from 'axios';
import tokenHeader from './headers';
let endpoint = 'http://localhost:8080';

export function diaryGet(trip_id, search, searchType) {
  let url = `${endpoint}/diary?trip_id=${trip_id}`;
  if (search) url += `&search=${search}`;
  if (searchType) url += `&searchType=${searchType}`;
  return axios.get(url, {
    headers: tokenHeader(),
    'Content-Type': 'application/json',
  });
}

export function diaryPost(trip_id, title, content, write_date, hashtags) {
  let url = `${endpoint}/diary`;
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
