import axios from 'axios';

export const signCustomApi = axios.create({
  baseURL: 'http://localhost:8080/sign/',
  // baseURL: 'https://www.just-moment-trip.tk/sign/',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

export const signUpApi = async (email, nickname, password) => {
  const res = await signCustomApi.post('up', {
    createKey: true,
    nickname,
    email,
  });
  let encrypted = [];
  const e = BigInt(Number(JSON.parse(res.data.data.e)));
  const N = BigInt(Number(JSON.parse(res.data.data.N)));
  BigInt.prototype.toJSON = function () {
    return this.toString();
  };
  for (let i = 0; i < password.length; i++) {
    let a = BigInt(password[i].charCodeAt(0));
    let total = 1n;
    // 리액트에서는 **이 자동으로 Math.pow로 변해서 BigInt에서 못 읽어버림 그래서 for문으로 함
    for (let j = 0n; j < e; j++) {
      total *= a;
    }
    encrypted[i] = JSON.stringify(total % N);
  }

  const res2 = await signCustomApi.post('up', {
    email,
    nickname,
    password: encrypted,
  });
  return res2;
};

export const signInApi = async (email, password) => {
  const result = await signCustomApi.post('in', {
    email,
    password,
  });
  try {
    if (result.data.accessToken) {
      sessionStorage.setItem('user', JSON.stringify(result.data));
    }
    return result.data;
  } catch (err) {
    console.log(err);
  }
};

export const signOutApi = () => {
  sessionStorage.removeItem('user');
  sessionStorage.removeItem('trip_id');
  sessionStorage.removeItem('total_price');
  sessionStorage.removeItem('title');
};

export const kakaoSign = async code => {
  const result = await axios({
    method: 'GET',
    url: `https://www.just-moment-trip.tk/oauth/callback/kakao?code=${code}`,
  });
  try {
    sessionStorage.setItem('user', JSON.stringify(result.data));
    return result.data;
  } catch (err) {
    console.log(err);
  }
};
