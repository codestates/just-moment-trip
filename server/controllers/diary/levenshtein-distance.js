exports.levenshteinDistance = (str, search) => {
  //   console.log("str : ", str);
  //   console.log("search : ", search);
  if (search === undefined) return 0;
  if (str === search) return 0;
  let aLen = str.length;
  let bLen = search.length;
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
    let aCh = str[i - 1];
    for (j = 1; j < bLen + 1; j++) {
      let bCh = search[j - 1];
      if (aCh === bCh) cost = 0;
      else cost = 1;
      matrix[i][j] = Math.min(
        matrix[i - 1][j] + 1, //문자 삽임
        matrix[i][j - 1] + 1, //문자 변경
        matrix[i - 1][j - 1] + cost //문자 삭제
      );
    }
  }
  return matrix[aLen][bLen];
};

console.log(this.levenshteinDistance("가나다라", "가나다라마"));
console.log(this.levenshteinDistance("가나다라", "가나다"));
