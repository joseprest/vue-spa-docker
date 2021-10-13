const _parseLetterMusixiseStrToArray = sequence => {
  const norm_sequence = eval(sequence);
  const sequenceArray = JSON.parse(
    `[${norm_sequence}]`.replace(/([ABCDEFG]#*b*[1-9])/g, '"$1"')
  );
  return sequenceArray;
};
const _parseDigitMusixiseStrToArray = sequence => {
  const norm_sequence = eval(sequence);
  const sequenceArray = JSON.parse(
    `[${norm_sequence}]`.replace(/('*[0-9]+#*b*'*)/g, '"$1"')
  );
  return sequenceArray;
};
const reverseSequence = arrayLikeStr => {
  // arrayLikeStr is like "1,3,4,5";
  // or "[1,3],4,5,5"
  // or [bA4,B4],C5,C4
  // or 0---0---

  //TODO:
  // 1. if ',' inside string, need to parse it first, reverse, then parse back
  // 2. if no ',' inside string, just reverse

  return arrayLikeStr.match(/[ABCDEFG]+/)
    ? _parseLetterMusixiseStrToArray(arrayLikeStr)
        .reverse()
        .join(",")
    : _parseDigitMusixiseStrToArray(arrayLikeStr)
        .reverse()
        .join(",");
  // return arrayLikeStr
  //   .split(",")
  //   .reverse()
  //   .join(",");
};
const shuffleSequence = arrayLikeStr => {
  return arrayLikeStr.match(/[ABCDEFG]+/)
    ? _parseLetterMusixiseStrToArray(arrayLikeStr)
        .sort(() => 0.5 - Math.random())
        .join(",")
    : _parseDigitMusixiseStrToArray(arrayLikeStr)
        .sort(() => 0.5 - Math.random())
        .join(",");
  // return arrayLikeStr
  //   .split(",")
  //   .sort(() => 0.5 - Math.random())
  //   .join(",");
};
const transposeSequence = (array, num) => {
  if (num == 0) {
    return array;
  } else if (num > 0) {
    //padding #
    const padding = "#".repeat(num);
    array.map(item => item + padding);
  } else {
    // padding b
    const padding = "b".repeat(Math.abs(num));
    array.map(item => item + padding);
  }
};
const numShiftSequence = (array, num) => {
  if (num == 0) {
    return array;
  } else if (num > 0) {
    // add num
  } else {
    // minus abs num
  }
};
const wrapSequence = (array, num) => {
  if (num > array.length) {
    return array;
  } else {
    return array.slice(num).concat(array.slice(0, num));
  }
};

export {
  reverseSequence,
  shuffleSequence,
  transposeSequence,
  numShiftSequence,
  wrapSequence
};
