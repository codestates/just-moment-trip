const ngram = (str, num) => {
  let arr = [];
  let repeat = str.length - num + 1;
  for (let i = 0; i < repeat; i++) {
    let a = str.slice(i, i + num);
    arr.push(a);
  }
  return arr;
};
console.log(ngram("안녕하세요", 3));
