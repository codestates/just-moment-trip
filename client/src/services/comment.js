import axios from 'axios';
import changeToken from './changeToken';
let endpoint = `${process.env.REACT_APP_URL}/comment`;

//tk : 서버배포
//ml : 클라배포
// 서로 따로 실행하니 당연히 주소도 다르겠지 후후

export async function commentGet(post_id) {
  const res = await axios.get(
    `${process.env.REACT_APP_URL}/post/${post_id}/comment`,
  );
  return res;
}

export async function commentPost(post_id, content) {
  const res = await axios.post(
    `${endpoint}`,
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
  const res = await axios.delete(`${endpoint}/${targetId}`, {
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
  const res = await axios.patch(
    `${endpoint}/${targetId}`,
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
