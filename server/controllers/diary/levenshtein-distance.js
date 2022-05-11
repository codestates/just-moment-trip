exports.levenshteinDistance = (a, b) => {
  console.log("a : ", a);
  console.log("b : ", b);
  console.log(b);
  if (a === b) return 0;
  let aLen = a.length;
  let bLen = b.length;
  if (aLen === 0) return bLen;
  if (bLen === 0) return aLen;

  let matrix = new Array(aLen + 1).fill(0).map(() => new Array(bLen + 1).fill(0));

  for (let i = 0; i < aLen + 1; i++) {
    matrix[i][0] = i;
  }
  for (let i = 0; i < bLen + 1; i++) {
    matrix[0][i] = i;
  }

  for (let i = 1; i < aLen + 1; i++) {
    let aCh = a[i - 1];
    for (j = 1; j < bLen + 1; j++) {
      let bCh = b[j - 1];
      if (aCh === bCh) cost = 0;
      else cost = 1;
      matrix[i][j] = Math.min(
        matrix[i - 1][j] + 1, //문자 삽임
        matrix[i][j - 1] + 1, //문자 변경
        matrix[i - 1][j - 1] + cost //문자 삭제
      );
    }
  }
  console.log(matrix);
  return matrix[aLen][bLen];
};
// console.log(this.levenshteinDistance("왈나다라", "가마바라"));
