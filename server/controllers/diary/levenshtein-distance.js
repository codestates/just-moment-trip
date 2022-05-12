exports.levenshteinDistance = (str, search) => {
  if (search === undefined) return 0;
  if (str === search) return 0;
  let aLen = str.length;
  let bLen = search.length;
  if (aLen === 0) return bLen;
  if (bLen === 0) return aLen;
  //배열 생성
  let matrix = new Array(aLen + 1).fill(0).map(() => new Array(bLen + 1).fill(0));
  //첫 행과 열 초기화 0,1,2,3,4,5... 왜냐하면 공집합인경우와 비교하는거라서
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
      console.log("문자열 : ", aCh, bCh, i, j);
      if (aCh === bCh) cost = 0;
      else cost = 1;
      matrix[i][j] = Math.min(
        matrix[i - 1][j] + 1, //문자 제거
        matrix[i][j - 1] + 1, //문자 삽입
        matrix[i - 1][j - 1] + cost //문자 변경
      );
    }
  }
  console.log(matrix);
  return matrix[aLen][bLen];
};

//!

// console.log(this.levenshteinDistance("가나다라", "가나다라마"));
// console.log(this.levenshteinDistance("가나다라", "가나다"));
// console.log(this.levenshteinDistance("나는", "너"));
// console.log(this.levenshteinDistance("나는 너를 좋아해!", "너는 나 좋아하니?"));
// console.log(this.levenshteinDistance("얼마나 분석이 될까요", "유사도나 분석 할까요"));
// console.log(this.levenshteinDistance("가나다라마바", "가사다"));
console.log(this.levenshteinDistance2("얼마나 분석이 될까요", "유사도나 분석 할까요"));
