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

export const signInApi = async (email, password) => {
  const result = await signCustomApi.post('in', {
    email,
    password,
  });
  try {
    if (result.data.accessToken) {
      localStorage.setItem('user', JSON.stringify(result.data));
    }
    return result.data;
  } catch (err) {
    console.log(err);
  }
};

export const signOutApi = () => {
  localStorage.removeItem('user');
};

export const kakaoSign = async code => {
  const result = await axios({
    method: 'GET',
    url: `https://www.just-moment-trip.tk/oauth/callback/kakao?code=${code}`,
  });
  try {
    localStorage.setItem('user', JSON.stringify(result.data));
    return result.data;
  } catch (err) {
    console.log(err);
  }
};
