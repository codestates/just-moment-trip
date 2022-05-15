const chSplit = (ch) => {
  const rCho = [
    "ㄱ",
    "ㄲ",
    "ㄴ",
    "ㄷ",
    "ㄸ",
    "ㄹ",
    "ㅁ",
    "ㅂ",
    "ㅃ",
    "ㅅ",
    "ㅆ",
    "ㅇ",
    "ㅈ",
    "ㅉ",
    "ㅊ",
    "ㅋ",
    "ㅌ",
    "ㅍ",
    "ㅎ",
  ];
  const rJung = [
    "ㅏ",
    "ㅐ",
    "ㅑ",
    "ㅒ",
    "ㅓ",
    "ㅔ",
    "ㅕ",
    "ㅖ",
    "ㅗ",
    "ㅘ",
    "ㅙ",
    "ㅚ",
    "ㅛ",
    "ㅜ",
    "ㅝ",
    "ㅞ",
    "ㅟ",
    "ㅠ",
    "ㅡ",
    "ㅢ",
    "ㅣ",
  ];
  const rJong = [
    "",
    "ㄱ",
    "ㄲ",
    "ㄳ",
    "ㄴ",
    "ㄵ",
    "ㄶ",
    "ㄷ",
    "ㄹ",
    "ㄺ",
    "ㄻ",
    "ㄼ",
    "ㄽ",
    "ㄾ",
    "ㄿ",
    "ㅀ",
    "ㅁ",
    "ㅂ",
    "ㅄ",
    "ㅅ",
    "ㅆ",
    "ㅇ",
    "ㅈ",
    "ㅊ",
    "ㅋ",
    "ㅌ",
    "ㅍ",
    "ㅎ",
  ];
  let resultStr = "";
  for (let i = 0; i < ch.length; i++) {
    if (/[가-힣]/.test(ch[i])) {
      const nTmp = ch[i].charCodeAt(0) - 0xac00;
      const jong = nTmp % 28; // 종성
      const jung = ((nTmp - jong) / 28) % 21; // 중성
      const cho = ((nTmp - jong) / 28 - jung) / 21; // 초성

      resultStr += rCho[cho] + rJung[jung];
      if (rJong[jong] !== "") resultStr += rJong[jong];
    } else resultStr += ch[i];
  }
  //만약 ch가 자음이 아닌 한글 문자일때만 이거 해당
  return resultStr;
};

const ngram = (str, num) => {
  let arr = [];
  const repeat = str.length - num + 1;
  for (let i = 0; i < repeat; i++) {
    const split = str.slice(i, i + num);
    arr.push(split);
  }
  return arr;
};

exports.diff_ngram = (data, search, num) => {
  if (search === undefined) return 0;
  data = chSplit(data);
  search = chSplit(search);
  let splitArrA = ngram(data, num);
  let splitArrB = ngram(search, num);
  const splitArrBLength = splitArrB.length;
  let count = 0;
  //   if (splitArrA.length > splitArrB.length) {
  //     const tempArr = splitArrB.slice();
  //     splitArrB = splitArrA.slice();
  //     splitArrA = tempArr.slice();
  //   }
  //   console.log("splitArrA", splitArrA);
  //   console.log("splitArrB", splitArrB);
  for (let i = 0; i < splitArrA.length; i++) {
    for (let j = 0; j < splitArrB.length; j++) {
      if (splitArrA[i] === splitArrB[j]) {
        // console.log("i : ", i);
        // console.log("splitArrA[i] : ", splitArrA[i]);
        // console.log("splitArrB[j] : ", splitArrB[j]);
        count++;
        splitArrB.splice(j, 1);

        // console.log("splitArrB : ", splitArrB);
        // console.log("-----------");
        break;
      }
    }
  }
  return count / (splitArrA.length + splitArrBLength - count);
};

let a = "오늘 강남에서 맛있는 스파게티를 먹었다.";
let b = "강남에서 먹었던 오늘의 스파게티는 맛있었다.";
let a2 = "과자는 새우깡이지";
let b2 = "새우깡은 과자지";
let a3 = "과자중에 제일 맛있는건 새우깡";
let b3 = "제일 맛있는 과자는 무엇일까";
let a4 = "새우깡";
let b4 = "깡우새";
let a5 = "새우깡임";
let b5 = "새우깡은 과자다";
console.log("___________________1");
console.log(this.diff_ngram(a, b, 1));
console.log(this.diff_ngram(a, b, 2));
console.log(this.diff_ngram(a, b, 3));
console.log("___________________2");
console.log(this.diff_ngram(a2, b2, 1));
console.log(this.diff_ngram(a2, b2, 2));
console.log(this.diff_ngram(a2, b2, 3));
console.log("___________________3");

console.log(this.diff_ngram(a3, b3, 1));
console.log(this.diff_ngram(a3, b3, 2));
console.log(this.diff_ngram(a3, b3, 3));
console.log("___________________4");
console.log(this.diff_ngram(a4, b4, 1));
console.log(this.diff_ngram(a4, b4, 2));
console.log(this.diff_ngram(a4, b4, 3));
console.log("___________________5");
console.log(this.diff_ngram(a5, b5, 1));
console.log(this.diff_ngram(a5, b5, 2));
console.log(this.diff_ngram(a5, b5, 3));
console.log("___________________6");
console.log(this.diff_ngram(b5, a5, 1)); //새우깡은 과자다    새우깡
console.log(this.diff_ngram(b5, a5, 2));
console.log(this.diff_ngram(b5, a5, 3));
console.log("------------------");
console.log(this.diff_ngram("고구마깡은 맛있나?", "저녁 뭐먹지?", 1));
console.log(this.diff_ngram("고구마깡은 맛있나?", "저녁 뭐먹지?", 2));
console.log(this.diff_ngram("고구마깡은 맛있나?", "저녁 뭐먹지?", 3));
console.log("------------------");
console.log(
  this.diff_ngram(
    "나는 새우깡을 먹고 있는데 너는 어떤 과자를 좋아하니?",
    "나는 새우깡은 안좋아하고 다른 과자가 좋아",
    1
  )
);
console.log(
  this.diff_ngram(
    "나는 새우깡을 먹고 있는데 너는 어떤 과자를 좋아하니?",
    "나는 새우깡은 안좋아하고 다른 과자가 좋아",
    2
  )
);
console.log(
  this.diff_ngram(
    "나는 새우깡을 먹고 있는데 너는 어떤 과자를 좋아하니?",
    "나는 새우깡은 안좋아하고 다른 과자가 좋아",
    3
  )
);
// 서울에서 맛있는 요리를 먹었다
// console.log(this.diff_ngram("가나가나가나가나가나가나가나", "가나가마라라라라라라라라", 2));
