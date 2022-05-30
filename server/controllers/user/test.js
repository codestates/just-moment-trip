// const RSA = require("./RSA");

// let password = "a123456789";
// let [e, N, d] = RSA.createKey();
// console.log(e, N, d);
// let encrypted = [];
// console.time("암호화");
// for (let i = 0; i < password.length; i++) {
//   let a = BigInt(password[i].charCodeAt(0));
//   //   let total = 1n;
//   //   //   리액트에서는 **이 자동으로 Math.pow로 변해서 BigInt에서 못 읽어버림 그래서 for문으로 함
//   //   for (let j = 0n; j < e; j++) {
//   //     total *= a;
//   //   }
//   encrypted[i] = pow(a, e) % N;
// }

// console.timeEnd("암호화");
// //!
// console.log(encrypted);
// let passwordBigIntArr = [];
// for (let i = 0; i < password.length; i++) {
//   passwordBigIntArr[i] = encrypted[i];
// }
// console.time("복호화");
// const passwordDecryptedArr = passwordBigIntArr.map((ele) => {
//   return String.fromCharCode(Number(power(ele, d, N)));
// });
// console.timeEnd("복호화");
// console.log(passwordDecryptedArr);

// function pow(n, m) {
//   let mul = 1n;
//   let count = 0;
//   while (m > 1n) {
//     count++;
//     if (m % 2n === 0n) {
//       n = n * n;
//       m = m / 2n;
//     } else {
//       mul *= n;
//       n = n * n;
//       m = m / 2n;
//     }
//   }
//   return n * mul;
// }

// // console.time("aa");
// // let cc = pow(16008001n, 10473473n);
// // console.timeEnd("aa");
// function power(base, exponent, mod) {
//   base %= mod;
//   let result = 1n;

//   while (exponent > 0n) {
//     // 1의 자리 비트가 1이면 트루 즉, 홀수면 트루
//     if (exponent & 1n) {
//       result = (result * base) % mod;
//     }
//     exponent >>= 1n; //나누기2. 비트 오른쪽꺼 삭제
//     base = (base * base) % mod;
//   }
//   return result;
// }
console.time();
let a = 20n ** 100000000n;
// console.log(2n ** 1000000n);
console.timeEnd();
