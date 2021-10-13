// const NUM_WHOLE = 1;
// const NUM_HALF = 1 / 2;
// const NUM_QUARTER = 1 / 4;
// const NUM_8 = 1 / 8;
// const NUM_16 = 1 / 16;
// const NUM_32 = 1 / 32;
// const NUM_DOT_WHOLE = 1.5 * NUM_WHOLE;
// const NUM_DOT_HALF = 1.5 * NUM_HALF;
// const NUM_DOT_QUARTER = 1.5 * NUM_DOT_QUARTER;
// const NUM_DOT_8 = 1.5 * NUM_DOT_8;
// const NUM_DOT_16 = 1.5 * NUM_DOT_16;
// const NUM_DOT_32 = 1.5 * NUM_DOT_32;

// const noteLenValue = [
//   NUM_WHOLE,
//   NUM_HALF,
//   NUM_QUARTER,
//   NUM_8,
//   NUM_16,
//   NUM_32,
//   NUM_DOT_WHOLE,
//   NUM_DOT_HALF,
//   NUM_DOT_QUARTER,
//   NUM_DOT_8,
//   NUM_DOT_16,
//   NUM_DOT_32
// ];
// const noteLenSymbol = [
//   "w",
//   "h",
//   "q",
//   "8",
//   "16",
//   "32",
//   "wd",
//   "hd",
//   "qd",
//   "8d",
//   "16d",
//   "32d"
// ];

// const noteLenMap = {
//   1: "w",
//   0.5: "h",
//   0.25: "q",
//   0.125: "8",
//   0.0625: "16",
//   0.03125: "32",
//   1.5: "wd",
//   0.75: "hd",
//   0.375: "qd",
//   0.1875: "8d",
//   0.09375: "16d",
//   0.046875: "32d"
// };
const example = [
  {
    beat: "0--0--_--0--",
    matchZero: true,
    sequence: [["D3", "D5"], "D3", "D3"]
  },
  {
    beat: "0--0--_--0--",
    matchZero: true,
    sequence: ["D3", "D3", "D3"]
  }
];
// =>score.notes("C#5/q, g5/8, (e4 g4 b4)/16, e5/16/r, d5/8, e5/8, g5/8, a2/32, a6, a6, g4/64, g4")
const toEzScore = (measures, trackIndex, partIndex, trackMetre) => {
  const curves = []; //[['m1a','m2a']] to store all the curve pairs
  /* 先读这个。。。每小节的最后一个音加个标记位，用来和之后的小节联系
  音是这些['d3','d#3','a3','(d3,d5)']
  节奏是这些["q/sustain","q","q/r","q.",'8'] /sustain是自己加的，需要和他前面的音相连
  （前面的音可能在上一个小节，也可能同小节），绘制的时候要删掉
  */

  // vf.Curve({
  //   from: id('m1a'),
  //   to: id('m2a'),
  //   options: { cps: [{ x: 0, y: 40 }, { x: 0, y: 40 }] },
  // });
  let lastNoteInLastMeasure = "";
  const score = measures.map((measure, index) => {
    const noteKeys = toEZVexFlowNoteKey(measure.sequence); //['d3','d#3','a3','(d3,d5)']
    const noteLens = toEZVexFlowNoteLen(measure.beat, trackMetre); //["q","q","q/r","q.",'8']
    // 小节首音为延长位，该音继承上个小节的最后一个音
    if (noteLens[0].indexOf("/sustain") >= 0) {
      noteKeys.unshift(lastNoteInLastMeasure); //连音线得补上得补上上一个小节的内容
      noteLens[0] = noteLens[0].replace(
        "/sustain",
        `[id="t${trackIndex}p${partIndex}m${index}n0"]`
      );
      /* 连音线的作用：1.跨小节 2.浮点解决不了 3.表达大致乐句意图 */
      if (index > 0) {
        curves.push([
          `t${trackIndex}p${partIndex}m${index}n0`,
          `t${trackIndex}p${partIndex}m${index - 1}end`
        ]); // 跨小节
      }
      // noteLens[0] = noteLens[0].slice(0, noteLens[0].indexOf("/sustain")); //just to test without 延长线
    }
    // lastNoteInLastMeasure = noteKeys[noteKeys.length - 1];
    lastNoteInLastMeasure =
      noteLens[noteLens.length - 1].indexOf("/r") >= 0
        ? "" // 最后一个音是休止,先特么这么处理吧，在渲染那边做特别处理
        : noteKeys[noteKeys.length - 1]; // 正常的最后一个音
    console.log("in score API, note keys:", noteKeys);
    console.log("in score API, note lens:", noteLens);
    let counter = 0;
    const result = noteLens.map(noteLen => {
      if (noteLen.indexOf("/r") === -1) {
        // a note, 但如果连音线开始接着休止符也可能是休止符
        counter += 1;
        return noteKeys[counter - 1]
          ? `${noteKeys[counter - 1]}/${noteLen}`
          : `e4/${noteLen.split("[").join("/r[")}`;
      } else {
        // a rest
        return `e4/${noteLen}`;
      }
    });
    // 每小节最后一个音标记一下，以备延长线
    result[result.length - 1] = `${
      result[result.length - 1]
    }[id="t${trackIndex}p${partIndex}m${index}end"]`;
    return result;
  });
  return { score, curves };
};
// ["D3", "D#3","A3",["D3","D5"]] => ['d3','d#3','a3','(d3,d5)']
const toEZVexFlowNoteKey = notes => {
  return notes.map(note => {
    if (typeof note === "string") {
      return note.toLowerCase();
    } else {
      return `(${note.join(" ").toLowerCase()})`;
    }
  });
};

// https://github.com/0xfe/vexflow/wiki/The-VexFlow-Tutorial
// ["D3", "D#3"] => ["d/3",'d#/3']
const toVexFlowNoteKey = notes => {
  return notes.map(note => {
    if (typeof note === "string") {
      return note.replace(/([1-9]+)/g, "/$1").toLowerCase();
    } else {
      return note.map(c => c.replace(/([1-9]+)/g, "/$1").toLowerCase());
    }
  });
};

// '0--0--_--0--' => ["q","q","qr","qd"]
//TODO: ____ should be automatically replaced to _---, why not
const toVexFlowNoteLen = (beatStr, noteLenMap, restSymbol, beat) => {
  // TODO: 这里面会有不能识别的长度, 比如三连音等
  //0--0--_--0--
  console.log("little bitch");
  if (noteLenMap == undefined)
    noteLenMap = {
      1: "w",
      0.5: "h",
      0.25: "q",
      0.125: "8",
      0.0625: "16",
      0.03125: "32",
      1.5: "wd",
      0.75: "hd",
      0.375: "qd",
      0.1875: "8d",
      0.09375: "16d",
      0.046875: "32d"
    };
  if (restSymbol == undefined) restSymbol = "r";
  if (beat == undefined) beat = 1;
  const noteLen = [];
  const beatStrLen = beatStr.length;
  let cursor1 = 0;
  let cursor2 = 1;
  while (cursor1 < beatStrLen) {
    while (cursor2 < beatStrLen && beatStr[cursor2] === "-") {
      cursor2 += 1;
    }
    // noteLen.push((cursor2 - cursor1) / beatStrLen);
    if (beatStr[cursor1] === "_") {
      noteLen.push(
        `${noteLenMap[(beat * (cursor2 - cursor1)) / beatStrLen]}${restSymbol}`
      );
    } else {
      noteLen.push(noteLenMap[(beat * (cursor2 - cursor1)) / beatStrLen]);
    }
    cursor1 = cursor2;
    cursor2 += 1;
  }
  if (beatStr[0] == "-") {
    noteLen[0] = `${noteLen[0]}/sustain`;
  }
  return noteLen;
};

// '0--0--_--0--' => ["q","q","q/r","q."]
const toEZVexFlowNoteLen = (beatStr, beat) => {
  console.log("jb", beatStr);
  return toVexFlowNoteLen(
    beatStr,
    {
      1: "w",
      0.5: "h",
      0.25: "q",
      0.125: "8",
      0.0625: "16",
      0.03125: "32",
      1.5: "w.",
      0.75: "h.",
      0.375: "q.",
      0.1875: "8.",
      0.09375: "16.",
      0.046875: "32."
    },
    "/r",
    beat
  );
};
//["c3/8", "e3/q", "g3/q", "b3/q", "b3/8"]=>true
const isMeasureBeamable = noteArray => _isShorterThanQuarterNote(noteArray[0]); //真tm服气了vexflow的判断方法
// noteArray.filter(a => _isShorterThanQuarterNote(a)).length >= 2; //目前仅要求为：至少有两个小于四分音符的音符

// "c3/8" => true; "c3/q"=> false
const _isShorterThanQuarterNote = noteStr => {
  console.log("ss");
  return (
    noteStr.indexOf("/8") >= 0 ||
    noteStr.indexOf("/16") >= 0 ||
    noteStr.indexOf("/32") >= 0 ||
    // noteStr.indexOf("/8.") >= 0 ||
    noteStr.indexOf("/16.") >= 0 ||
    noteStr.indexOf("/32.") >= 0
  );
};

export { toEzScore, isMeasureBeamable };
