import axios from 'axios';
import changeToken from './changeToken';
let endpoint = 'http://localhost:8080';
// let endpoint = 'https://just-moment-trip.tk';

//tk : 서버배포
//ml : 클라배포
// 서로 따로 실행하니 당연히 주소도 다르겠지 후후

export async function commentPost(post_id, content) {
  let url = `${endpoint}/comment`;
  const res = await axios.post(
    url,
    {
      post_id,
      content,
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

export async function commentRemove(targetId) {
  let url = `${endpoint}/comment/${targetId}`;
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

export async function commentPatch(targetId, new_content) {
  let url = `${endpoint}/comment/${targetId}`;
  const res = await axios.patch(
    url,
    {
      new_content,
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
