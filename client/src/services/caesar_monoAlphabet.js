exports.monoAlphabeticEncrypt = str => {
  const lowerAlphabet = 'abcdefghijklmnopqrstuvwxyz';
  const lowerMonoAlphabet = process.env.REACT_APP_LOWERMONOALPHABET;
  const upperAlphabet = 'ABCDEFGHIGKLMNOPQRSTUVWXYZ';
  const upperMonoAlphabet = process.env.REACT_APP_UPPERMONOALPHABET;
  let resultArr = [];
  for (let i = 0; i < str.length; i++) {
    if (/[a-z]/.test(str[i]))
      resultArr.push(lowerMonoAlphabet[lowerAlphabet.indexOf(str[i])]);
    else if (/[A-Z]/.test(str[i]))
      resultArr.push(upperMonoAlphabet[upperAlphabet.indexOf(str[i])]);
    else resultArr.push(str[i]);
  }
  return resultArr.join('');
};
exports.caesarEncrypt = unicode => {
  let shiftNumber = process.env.REACT_APP_SHIFTNUMBER;
  if (
    (unicode + shiftNumber > 90 && 65 <= unicode && unicode <= 90) ||
    (unicode + shiftNumber > 122 && 97 <= unicode && unicode <= 122)
  ) {
    return unicode + shiftNumber - 26;
  } else return unicode + shiftNumber;
};
