import axios from 'axios';

export const signCustomApi = axios.create({
  baseURL: 'http://localhost:8080/sign/',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const signUpApi = (email, nickname, password) => {
  signCustomApi.post('up', {
    email,
    nickname,
    password,
  });
};

export const signInApi = (email, password) => {
  signCustomApi
    .post('in', {
      email,
      password,
    })
    .then(res => {
      console.log(res);
      if (res.data.accessToken) {
        localStorage.setItem('user', JSON.stringify(res.data));
      }
      return res.data;
    })
    .catch(err => {
      console.log(err);
    });
};

export const signOutApi = () => {
  localStorage.removeItem('user');
};

export const kakaoSign = code => {
  axios
    .get(`http://localhost:8080/oauth/callback/kakao?code=${code}`)
    .then(res => {
      console.log(res);
      const ACCESS_TOKEN = res.data.accessToken;
      localStorage.setItem('KakaoToken', ACCESS_TOKEN);
      alert('success');
    })
    .catch(err => {
      console.log(err);
    });
};
