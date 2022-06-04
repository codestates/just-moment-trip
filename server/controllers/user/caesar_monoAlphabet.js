exports.monoAlphabeticDecrypt = (str) => {
  const lowerAlphabet = "abcdefghijklmnopqrstuvwxyz";
  const lowerMonoAlphabet = process.env.LOWERMONOALPHABET;
  const upperAlphabet = "ABCDEFGHIGKLMNOPQRSTUVWXYZ";
  const upperMonoAlphabet = process.env.UPPERMONOALPHABET;
  let resultArr = [];
  for (let i = 0; i < str.length; i++) {
    if (/[a-z]/.test(str[i])) resultArr.push(lowerAlphabet[lowerMonoAlphabet.indexOf(str[i])]);
    else if (/[A-Z]/.test(str[i])) resultArr.push(upperAlphabet[upperMonoAlphabet.indexOf(str[i])]);
    else resultArr.push(str[i]);
  }
  return resultArr.join("");
};

exports.caesarDecrypt = (unicode) => {
  let shift = process.env.REACT_APP_SHIFTNUMBER % 26;
  let a = 0;
  if (65 <= unicode && unicode <= 90) {
    if (unicode - shift < 65) a = 26;
    return unicode - shift + a;
  } else if (97 <= unicode && unicode <= 122) {
    if (unicode - shift < 97) a = 26;
    return unicode - shift + a;
  } else return unicode;
};
