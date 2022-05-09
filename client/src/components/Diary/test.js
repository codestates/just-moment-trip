const cityNames = [
  {
    순위: 1,
    행정구역: '서울특별시',
    지역: '수도권',
    행정구분: '광역단체',
    인구: 9741383,
    남자: 4757643,
    여자: 4984230,
    성비: '95.5 : 100',
  },
  {
    순위: 2,
    행정구역: '부산광역시',
    지역: '영남권',
    행정구분: '광역단체',
    인구: 3416918,
    남자: 1680933,
    여자: 1735985,
    성비: '96.8 : 100',
  },
];
const str = '부광';
const regex = /(부).*?(광)/;
const resultData = cityNames
  .filter(row => {
    console.log(regex.test(row['행정구역']));
    return regex.test(row['행정구역']);
  })
  .map(row => {
    return row['행정구역'].replace(regex, (match, ...groups) => {
      console.log('match', match);
      console.log('groups', groups);
      const letters = groups.slice(0, str.length);
      console.log('letters', letters);
      let lastIndex = 0;
      let highlighted = [];

      for (let i = 0, l = letters.length; i < l; i++) {
        const idx = match.indexOf(letters[i], lastIndex);
        console.log('idx', idx);
        highlighted.push(match.substring(lastIndex, idx));
        highlighted.push(`<mark>${letters[i]}</mark>`);
        lastIndex = idx + 1;
      }
      console.log(highlighted.join(''));
      return highlighted.join('');
    });
  });

