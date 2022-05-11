const _ = require('lodash');

function chageUnicode(ch) {
  const offset = 44032; /* '가'의 코드 */
  // 초성 + 중성 + (종성) 완전한 문자일 경우
  if (/[가-힣]/.test(ch)) {
    const chCode = ch.charCodeAt(0) - offset;
    // 종성이 있으면 문자 그대로를 찾는다.
    if (chCode % 28 > 0) {
      return ch;
    }
    const begin = Math.floor(chCode / 28) * 28 + offset;
    const end = begin + 27;
    return `[\\u${begin.toString(16)}-\\u${end.toString(16)}]`;
  }
  // 초성만 있을 경우
  if (/[ㄱ-ㅎ]/.test(ch)) {
    const choArr = {
      ㄱ: '가'.charCodeAt(0),
      ㄲ: '까'.charCodeAt(0),
      ㄴ: '나'.charCodeAt(0),
      ㄷ: '다'.charCodeAt(0),
      ㄸ: '따'.charCodeAt(0),
      ㄹ: '라'.charCodeAt(0),
      ㅁ: '마'.charCodeAt(0),
      ㅂ: '바'.charCodeAt(0),
      ㅃ: '빠'.charCodeAt(0),
      ㅅ: '사'.charCodeAt(0),
    };
    const begin =
      choArr[ch] ||
      (ch.charCodeAt(0) - 12613) /* 'ㅅ'의 코드 */ * 588 + choArr['ㅅ'];
    const end = begin + 587;
    return `[${ch}\\u${begin.toString(16)}-\\u${end.toString(16)}]`;
  }
  // 그 외엔 그대로 내보냄
  return _.escapeRegExp(ch); // 정규식에서 의미있는 와일드카드들을 문자열로 바꿔주는거
}
createFuzzyMatcher = input => {
  if (input === undefined) return '.';
  const pattern = input
    .split('')
    .map(chageUnicode)
    .map(pattern => '(' + pattern + ')')
    .join('.*?');
  return new RegExp(pattern);
};

exports.chageRed = (data, search) => {
  // 정규식 이용한 fuzzy검색결과 색 바꿈
  const regex = createFuzzyMatcher(search);
  const resultData = data.replace(regex, (match, ...groups) => {
    const letters = groups.slice(0, search.length);
    let lastIndex = 0;
    let redColor = [];
    for (let i = 0, l = letters.length; i < l; i++) {
      const idx = match.indexOf(letters[i], lastIndex);
      redColor.push(match.substring(lastIndex, idx));
      redColor.push(`<span style="color: red">${letters[i]}</span>`);
      lastIndex = idx + 1;
    }
    return redColor.join('');
  });
  if (resultData !== data) return resultData;
  // 리벤슈타인거리 이용한 검색 결과 색 바꿈
  else {
    let redColor = [];
    let index = 0;
    if (search === undefined) return;
    for (let i = 0; i < data.length; i++) {
      if (search.indexOf(data[i], index) === -1) {
        redColor.push(data[i]);
        // data = data.slice(i);
      } else {
        redColor.push(`<span style="color: red">${data[i]}</span>`);
        index++;
      }
    }
    return redColor.join('');
  }
};

exports.sort = (data, search) => {
  const regex = createFuzzyMatcher(search);
  const resultData = data.map(ele => {
    let totalDistance = 0;
    const title = ele.title.replace(regex, (match, ...groups) => {
      const letters = groups.slice(0, search.length);
      let lastIndex = 0;
      let redColor = [];
      for (let i = 0, l = letters.length; i < l; i++) {
        const idx = match.indexOf(letters[i], lastIndex);
        redColor.push(match.substring(lastIndex, idx));
        redColor.push(`${letters[i]}`);
        if (lastIndex > 0) {
          totalDistance += idx - lastIndex;
        }
        lastIndex = idx + 1;
      }
      return redColor.join('');
    });
    return { title, totalDistance };
  });
  resultData.sort((a, b) => {
    return a.totalDistance - b.totalDistance;
  });
  for (let i = 0; i < data.length; i++) {
    data[i].title = resultData[i].title;
  }
};
