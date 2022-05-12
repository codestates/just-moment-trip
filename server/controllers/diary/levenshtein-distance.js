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
      //   console.log("문자열 : ", aCh, bCh, i, j);
      if (aCh === bCh) cost = 0;
      else cost = 1;
      matrix[i][j] = Math.min(
        matrix[i - 1][j] + 1, //문자 제거
        matrix[i][j - 1] + 1, //문자 삽입
        matrix[i - 1][j - 1] + cost //문자 변경
      );
    }
  }
  //   console.log(matrix);
  return matrix[aLen][bLen];
};

//!

exports.levenshteinDistance2 = (str, search, target) => {
  if (search === undefined) return 0;
  if (str === search) return 0;
  let aLen = str.length;
  let bLen = search.length;
  if (aLen === 0) return bLen;
  if (bLen === 0) return aLen;

  let matrix = [[0]];

  const createAndInsert = (countA, countB, target) => {
    // 탈출 조건
    if (
      (countA > str.length && countB > search.length) ||
      matrix[matrix.length - 1][matrix[0].length - 1] > target
    ) {
      return matrix[matrix.length - 1][matrix[0].length - 1];
    }
    // matrix 확장
    if (countA <= str.length) matrix.push([countA]);
    if (countB <= search.length) matrix[0][countB] = countB;

    // 값생성
    for (let i = 1; i < matrix.length; i++) {
      const aCh = str[i - 1];
      if (i !== matrix.length - 1) {
        const colLength = matrix[0].length - 1;
        const bCh = search[colLength - 1];
        aCh === bCh ? (cost = 0) : (cost = 1);
        matrix[i][colLength] = selectMin(matrix, i, colLength, cost);
      } else {
        for (let j = 1; j < matrix[0].length; j++) {
          const bCh = search[j - 1];
          aCh === bCh ? (cost = 0) : (cost = 1);
          matrix[i][j] = selectMin(matrix, i, j, cost);
        }
      }
    }
    if (matrix.length >= 3 || matrix[0].length >= 3) {
      for (let i = 0; i < matrix.length - 2; i++) {
        if (i !== matrix.length - 3) {
          matrix[i][matrix[0].length - 3] = null;
        } else {
          for (let j = 0; j < matrix[0].length - 2; j++) {
            matrix[i][j] = null;
          }
        }
      }
    }
    return createAndInsert(countA + 1, countB + 1, target);
  };
  const selectMin = (matrix, row, col, cost) => {
    return Math.min(
      matrix[row - 1][col] + 1, //문자 제거
      matrix[row][col - 1] + 1, //문자 삽입
      matrix[row - 1][col - 1] + cost //문자 변경
    );
  };
  return createAndInsert(1, 1, target);
};

// console.log(this.levenshteinDistance("얼마나 분석이 될까요", "유사도나 분석 할까요"));
// console.log(this.levenshteinDistance2("얼마나 분석이 될까요", "유사도나 분석 할까요"));
