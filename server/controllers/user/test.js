const RSA = require("./RSA");

let password = "a123456789";
let [e, N, d] = RSA.createKey();
console.log(e, N, d);
let encrypted = [];
console.time("암호화");
for (let i = 0; i < password.length; i++) {
  let a = BigInt(password[i].charCodeAt(0));
  let total = 1n;
  //   리액트에서는 **이 자동으로 Math.pow로 변해서 BigInt에서 못 읽어버림 그래서 for문으로 함
  //   for (let j = 0n; j < e; j++) {
  //     total *= a;
  //   }
  //   encrypted[i] = total % N;
  encrypted[i] = power(a, e, N);
}

console.timeEnd("암호화");
//!
console.log(encrypted);
let passwordBigIntArr = [];
for (let i = 0; i < password.length; i++) {
  passwordBigIntArr[i] = encrypted[i];
}
console.time("복호화");
const passwordDecryptedArr = passwordBigIntArr.map((ele) => {
  return String.fromCharCode(Number(power(ele, d, N)));
});
console.timeEnd("복호화");
console.log(passwordDecryptedArr);

function power(base, exponent, mod) {
  base %= mod;
  let result = 1n;
  while (exponent > 0n) {
    // 1의 자리 비트가 1이면 트루 즉, 홀수면 트루
    if (exponent & 1n) {
      result = (result * base) % mod;
    }
    exponent >>= 1n; //나누기2. 비트 오른쪽꺼 삭제
    base = (base * base) % mod;
  }
  return result;
}

function pow(base, exponent) {
  let mul = 1n;
  while (exponent > 1n) {
    if (exponent % 2n === 0n) {
      base *= base;
      exponent /= 2n;
    } else {
      mul *= base;
      base *= base;
      exponent /= 2n;
    }
  }
  return base * mul;
}
