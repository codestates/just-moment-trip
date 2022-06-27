import axios from 'axios';
import changeToken from './changeToken';
// let endpoint = 'https://www.just-moment-trip.tk';
let endpoint = 'http://localhost:8080';

export async function diaryGet(trip_id, search, searchType) {
  let url = `${endpoint}/diary?trip_id=${trip_id}`;
  if (search) url += `&search=${search}`;
  if (searchType) url += `&searchType=${searchType}`;
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

export async function diaryPost(trip_id, title, content, write_date, hashtags) {
  let url = `${endpoint}/diary`;
  const res = await axios.post(
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

export async function diaryRemove(targetId) {
  let url = `${endpoint}/diary/${targetId}`;
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

export async function diaryPatch(
  targetId,
  new_content,
  new_title,
  new_hashtags,
) {
  let url = `${endpoint}/diary/${targetId}`;
  const res = await axios.patch(
    url,
    {
      new_content,
      new_title,
      new_hashtags,
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
