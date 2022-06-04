const primeData = require("./primeData");
// 두 소수 p , q 를 준비한다
// p - 1, q - 1 각각 서로소인 정수 e를 준비한다
// ed를 (p - 1)(q - 1)으로 나눈 나머지가 1이 되도록 하는 d를 찾는다.
// N = pq를 계산한 후, N과 e를 공개한다. 이들이 바로 공개키. d는 개인키이다.
// 이제 p, q, (p-1)(q-1)는 필요 없거니와 있어 봐야 보안에 오히려 문제를 일으킬 수 있으니, 파기한다
exports.createKey = () => {
  let p = 0n;
  let q = 0n;
  let d = -1n;
  // p - 1, q - 1 각각 서로소인 정수 e를 준비한다
  const e = BigInt(primeData.eArr[Math.floor(Math.random() * primeData.eArr.length)]);
  console.time("d구하기");
  while (d < 0n) {
    // 두 소수 p , q 를 준비한다
    const index = Math.floor(Math.random() * primeData.primeArr.length);
    p = BigInt(primeData.primeArr[index]);
    primeData.primeArr.splice(index, 1);
    q = BigInt(primeData.primeArr[Math.floor(Math.random() * primeData.primeArr.length)]);
    // ed를 (p - 1)(q - 1)으로 나눈 나머지가 1이 되도록 하는 d를 찾는다.
    d = EEA((p - 1n) * (q - 1n), e);
  }
  console.timeEnd("d구하기");
  //   console.log("d", d);
  // N = pq를 계산한 후, N과 e를 공개한다. 이들이 바로 공개키. d는 개인키이다.
  const N = p * q;
  // 암호화
  //   let encrypted = a ** e % N;
  // 복호화
  //   let decrypted = encrypted ** d % N;
  p = null;
  q = null;
  return [e, N, d];
};

function EEA(a, b) {
  let [r1, r2, s1, s2, t1, t2, q, r, s, t] = [a, b, 1n, 0n, 0n, 1n, 0n, 0n, 0n, 0n];
  while (true) {
    q = r1 / r2;
    r = r1 - q * r2;
    s = s1 - q * s2;
    t = t1 - q * t2;
    if (r === 0n) {
      //   console.log(`최대공약수 : ${r2}, x : ${s2}, y : ${t2}`);
      return t2;
    }
    r1 = r2;
    r2 = r;
    s1 = s2;
    s2 = s;
    t1 = t2;
    t2 = t;
  }
}
