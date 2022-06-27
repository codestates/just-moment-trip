require("dotenv").config();
const RSA = require("./RSA");
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
monoAlphabeticEncrypt = (str) => {
  const lowerAlphabet = "abcdefghijklmnopqrstuvwxyz";
  const lowerMonoAlphabet = process.env.LOWERMONOALPHABET;
  const upperAlphabet = "ABCDEFGHIGKLMNOPQRSTUVWXYZ";
  const upperMonoAlphabet = process.env.UPPERMONOALPHABET;
  let resultArr = [];
  for (let i = 0; i < str.length; i++) {
    if (/[a-z]/.test(str[i])) resultArr.push(lowerMonoAlphabet[lowerAlphabet.indexOf(str[i])]);
    else if (/[A-Z]/.test(str[i])) resultArr.push(upperMonoAlphabet[upperAlphabet.indexOf(str[i])]);
    else resultArr.push(str[i]);
  }
  return resultArr.join("");
};

caesarEncrypt = (unicode) => {
  let shift = process.env.SHIFTNUMBER % 26;
  let a = 0;
  if (65 <= unicode && unicode <= 90) {
    if (unicode + shift > 90) a = 26;
    return unicode + shift - a;
  } else if (97 <= unicode && unicode <= 122) {
    if (unicode + shift > 122) a = 26;
    return unicode + shift - a;
  } else return unicode;
};

monoAlphabeticDecrypt = (str) => {
  const lowerAlphabet = "abcdefghijklmnopqrstuvwxyz";
  const lowerMonoAlphabet = process.env.LOWERMONOALPHABET;
  const upperAlphabet = "ABCDEFGHIGKLMNOPQRSTUVWXYZ";
  const upperMonoAlphabet = process.env.UPPERMONOALPHABET;
  let resultArr = [];
  for (let i = 0; i < str.length; i++) {
    if (/[a-z]/.test(str[i])) resultArr.push(lowerAlphabet[lowerMonoAlphabet.indexOf(str[i])]);
    else if (/[A-Z]/.test(str[i])) resultArr.push(upperAlphabet[upperMonoAlphabet.indexOf(str[i])]);
    else resultArr.push(str[i]);
  }
  return resultArr.join("");
};

caesarDecrypt = (unicode) => {
  let shift = process.env.SHIFTNUMBER % 26;
  let a = 0;
  if (65 <= unicode && unicode <= 90) {
    if (unicode - shift < 65) a = 26;
    return unicode - shift + a;
  } else if (97 <= unicode && unicode <= 122) {
    if (unicode - shift < 97) a = 26;
    return unicode - shift + a;
  } else return unicode;
};

let password = "asdf1234";
let [e, N, d] = RSA.createKey();
console.log("1");
console.log(password);
password = monoAlphabeticEncrypt(password);
console.log(2);
console.log(password);
let encrypted = [];
for (let i = 0; i < password.length; i++) {
  let a = BigInt(caesarEncrypt(password[i].charCodeAt(0)));

  encrypted[i] = power(a, e, N);
}
console.log(3);
console.log(encrypted);
//!
password = encrypted;
let passwordBigIntArr = [];
for (let i = 0; i < password.length; i++) {
  passwordBigIntArr[i] = BigInt(Number(password[i]));
}
console.log(4);
console.log(passwordBigIntArr);
const passwordDecryptedArr = passwordBigIntArr.map((ele) => {
  return String.fromCharCode(caesarDecrypt(Number(power(ele, d, N))));
});
console.log(5);
console.log(passwordDecryptedArr);
password = passwordDecryptedArr.join("");
password = monoAlphabeticDecrypt(password);
console.log(6);
console.log(password);
