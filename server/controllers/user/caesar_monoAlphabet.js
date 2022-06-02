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
  let shiftNumber = process.env.SHIFTNUMBER;
  if (
    (unicode + shiftNumber < 65 && 65 <= unicode && unicode <= 90) ||
    (unicode + shiftNumber < 97 && 97 <= unicode && unicode <= 122)
  ) {
    return unicode - shiftNumber + 26;
  } else return unicode - shiftNumber;
};
