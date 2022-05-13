const ngram = (str, num) => {
  let arr = [];
  const repeat = str.length - num + 1;
  for (let i = 0; i < repeat; i++) {
    const split = str.slice(i, i + num);
    arr.push(split);
  }
  //   console.log("arr");
  //   console.log(arr);
  return arr;
};

exports.diff_ngram = (data, search, num) => {
  //   console.log("data", data);
  //   console.log("search", search);
  //   console.log("num", num);
  //   console.log("-------");
  if (search === undefined) return 0;
  let splitArrA = ngram(data, num);
  let splitArrB = ngram(search, num);
  //   console.log(splitArrA);
  //   console.log(splitArrB);
  arr = [];
  let count = 0;
  for (let i = 0; i < splitArrA.length; i++) {
    for (let j = 0; j < splitArrB.length; j++) {
      if (splitArrA[i] === splitArrB[j]) {
        // console.log(console.log(splitArrA[i]));
        count++;
        arr.push(splitArrA[i]);
        break;
      }
    }
  }
  //   console.log(splitArrA.length);
  //   console.log(splitArrB.length);
  //   console.log(count);
  //   console.log(splitArrA.lengh);
  //   return count / (splitArrA.length + splitArrB.length);
  //   return count / splitArrA.length;

  return count / (splitArrA.length + splitArrB.length - count);
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
// 서울에서 맛있는 요리를 먹었다
