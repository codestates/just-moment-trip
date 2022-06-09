import axios from 'axios';
const caesar_monoAlphabet = require('./caesar_monoAlphabet');

export const signCustomApi = axios.create({
  baseURL: 'http://localhost:8080/sign/',
  // baseURL: 'https://www.just-moment-trip.tk/sign/',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

export const sendEmail = async email => {
  await signCustomApi.post('emailVerification', {
    email,
  });
};

export const sendCode = async (email, code) => {
  await signCustomApi.post('codeVerification', {
    email,
    code,
  });
};

export const findPassword = async email => {
  return await signCustomApi.post('find', { email });
};

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
  console.time('암호화');
  password = caesar_monoAlphabet.monoAlphabeticEncrypt(password);
  for (let i = 0; i < password.length; i++) {
    let a = BigInt(
      caesar_monoAlphabet.caesarEncrypt(password[i].charCodeAt(0)),
    );
    encrypted[i] = JSON.stringify(power(a, e, N));
  }
  console.timeEnd('암호화');
  const res2 = await signCustomApi.post('up', {
    email,
    nickname,
    password: encrypted,
  });
  return res2;
};

export const signInApi = async (email, password) => {
  const res = await signCustomApi.post('in', {
    checkKey: true,
    email,
  });
  let encrypted = [];
  const e = BigInt(Number(JSON.parse(res.data.data.e)));
  const N = BigInt(Number(JSON.parse(res.data.data.N)));
  BigInt.prototype.toJSON = function () {
    return this.toString();
  };
  password = caesar_monoAlphabet.monoAlphabeticEncrypt(password);
  for (let i = 0; i < password.length; i++) {
    let a = BigInt(
      caesar_monoAlphabet.caesarEncrypt(password[i].charCodeAt(0)),
    );
    encrypted[i] = JSON.stringify(power(a, e, N));
  }
  const res2 = await signCustomApi.post('in', {
    email,
    password: encrypted,
  });
  try {
    if (res2.data.accessToken) {
      sessionStorage.setItem('user', JSON.stringify(res2.data));
    }
    return res2.data;
  } catch (err) {
    console.log(err);
  }
};

export const signOutApi = () => {
  sessionStorage.removeItem('user');
  sessionStorage.removeItem('trip_id');
  sessionStorage.removeItem('total_price');
  sessionStorage.removeItem('title');
  sessionStorage.removeItem('exchange_rate');
  sessionStorage.removeItem('target_currency');
  sessionStorage.removeItem('start_date');
  sessionStorage.removeItem('end_date');
  sessionStorage.removeItem('longitude');
  sessionStorage.removeItem('latitude');
};

export const kakaoSign = async code => {
  const result = await axios({
    method: 'GET',
    url: `https://www.just-moment-trip.tk/oauth/callback/kakao?code=${code}`,
  });
  try {
    if (result.data.accessToken) {
      sessionStorage.setItem('user', JSON.stringify(res2.data));
    }
    return result.data;
  } catch (err) {
    console.log(err);
  }
};
function power(base, exponent, mod) {
  base %= mod;
  let result = 1n;

  while (exponent > 0n) {
    // 1의 자리 비트가 1이면 트루 즉, 홀수면 트루
    if (exponent & 1n) {
      result = result * base;
      result = result % mod;
    }
    exponent >>= 1n; //나누기2 비트 오른쪽꺼 삭제
    base = base * base;
    base = base % mod;
  }

  return result;
}
