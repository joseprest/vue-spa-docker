// const BPM = 120;
// const note32 = BPM / 60 / 32;
window.MidiTracks = {}; // will eventually be something like: {sin:[toneNote,toneNote,toneNote,...],piano:[toneNote,toneNote]}
window.Score = { score: [], curves: [], metres: [] };
let lastActiveBlockIds = [];
let currentActiveBlockIds = [];
AudioParam.prototype.cancelAndHoldAtTime = false;

let musixiseParts = [];
import { instrumentMap } from "./instrumentConfig";
import { FXMap } from "./FXConfig";
import { toEzScore } from "./scoreAPI";

let tracks = [];
let currentTrackId = 0;
let lastTrackId = 1;

export function createTrack(timbre, tempo, volumn, metre, mute) {
  _playLeftNotesInMeasureWhenUsingNote();
  const metreString = metre || "4/4";
  metre = metre ? eval(metre) : 1;
  // if (mute) volumn = 0;
  tracks.push({
    timbre,
    tempo,
    volumn,
    metre, // math num, like 1, 0.75, 0.5 etc
    metreString, // this is the real metre string, need this to render score
    parts: [],
    effects: {}
  });
  currentTrackId += 1;
}

export function cleanTrack() {
  tracks = [];
  currentTrackId = 0;
  musixiseParts.forEach(musixisePart => {
    musixisePart.dispose();
  });
  musixiseParts = [];
}
const Util = {
  lcm: function() {
    //求最大公约数
    //辗转相除法
    function gcd(a, b) {
      if (a == 0) return b;
      return gcd(b % a, a);
    }
    //Reduce的思路
    //依次求最小公倍数
    return Array.prototype.slice.apply(arguments).reduce(function(a, b) {
      if (!a) a = 1;
      if (!b) b = 1;
      return (a * b) / gcd(a, b);
    }, 1);
  },
  createUnderScores: function(n) {
    let a = "";
    for (let i = 0; i <= n - 1; i++) {
      a += "_";
    }
    return a;
  },
  createScores: function(n) {
    let a = "";
    for (let i = 0; i <= n - 1; i++) {
      a += "-";
    }
    return a;
  },
  getNoteAndOctave: function(noteStr) {
    //receives a note string, like 1 or 1' or ''1,even ''1b, 3#''
    //1,1#,2,2#,3,4,4#,5,5#,6,7b,7,1'
    // const note = noteStr.match(/[0-9]+/g)[0]; // string
    // const octaveUp = noteStr.match(/[0-9]+'+/g)
    //   ? noteStr.match(/[0-9]+'+/g)[0].length - note.length
    //   : 0;
    // const octaveDown = noteStr.match(/'+[0-9]+/g)
    //   ? noteStr.match(/'+[0-9]+/g)[0].length - note.length
    //   : 0;
    const note = noteStr.match(/[0-9]+/g)[0];
    const octaveArray = noteStr
      .split(/\d+/)
      .map(item => item.split(`'`).length - 1);
    const octaveUp = octaveArray[1];
    const octaveDown = octaveArray[0];
    const sharp =
      noteStr.split("").filter(item => item == "#").length -
      noteStr.split("").filter(item => item == "b").length;

    return {
      note,
      octave: octaveUp - octaveDown,
      sharp
    };
  },
  getToneNotes: function(sequence, beat, tempo, volumn, metre, measureCount) {
    //都是针对‘对0’
    //sequence is 'E4,E2,E3,E4' or '[E1,E2],E3,E4'
    if (!sequence || !beat) {
      return;
    }
    console.log(".....", sequence);
    console.log(".....", beat);
    // const sequenceArray = JSON.parse(
    //   `[${sequence}]`.replace(/([ABCDEFG]#*b*[1-9])/g, '"$1"')
    // ); //不对就报错
    const noteLen = measureCount * ((metre * 240) / tempo / beat.length); //should replace 120 with BPM
    const toneNotes = [];

    let toneNote = {};
    let zeroCounter = 0;
    beat.split("").forEach((digit, index) => {
      if (digit.match(/\d/g)) {
        //digit shows velocity
        if (toneNote.duration) {
          toneNotes.push(toneNote);
          toneNote = {};
        }

        toneNote = {
          time: index * noteLen,
          note: sequence[zeroCounter],
          duration: noteLen,
          velocity: digit === "0" ? volumn / 100 : (volumn * digit) / 1000
        };
        zeroCounter += 1;

        if (index === beat.length - 1) {
          //push current
          toneNotes.push(toneNote);
        }
      } else if (digit === "-") {
        if (toneNote.duration) {
          // alert("1");
          toneNote.duration += noteLen;
        }
        if (index === beat.length - 1 && toneNote.duration) {
          //push current
          toneNotes.push(toneNote);
        }
      } else if (digit === "_") {
        if (toneNote.duration) {
          // push current
          toneNotes.push(toneNote);
          toneNote = {};
        }
      }
    });
    console.log(JSON.stringify(toneNotes));
    return toneNotes;
  }
};

//when creating new measures, accumulate measure one by one
// a song has many tracks. one track can have many parts, one part can have many measures
export function createMeasureNew(sequence, beat, matchZero, blockId, part) {
  if (part == undefined) part = 1;
  if (!beat && sequence.length == 0) {
    beat = "_";
    sequence = [];
  } else if (!beat && sequence.length != 0) {
    beat = "0".repeat(sequence.length); //平均节拍的0000
  }
  console.log(sequence);
  if (!tracks[currentTrackId - 1].parts[part - 1]) {
    tracks[currentTrackId - 1].parts[part - 1] = {};
    tracks[currentTrackId - 1].parts[part - 1].measures = [];
    tracks[currentTrackId - 1].parts[part - 1].measures.push({
      sequence,
      beat,
      matchZero,
      blockId
    });
  } else {
    tracks[currentTrackId - 1].parts[part - 1].measures.push({
      sequence,
      beat,
      matchZero,
      blockId
    });
  }
}

export function createMeasureOnScaleNew( // this would finally call createMeasureNew
  sequence,
  beat,
  scale,
  basenote,
  matchZero,
  blockId,
  part
) {
  // Ionian 1 2 3 4 5 6 7 1 [1,3,5,6,8,10,12]
  // Dorian 1 2 b3 4 5 6 b7 1 [1,3,4,6,8,10,11]
  // Phrygian 1 b2 b3 4 5 b6 b7 1 [1,2,4,6,8,9,11]
  // Lydian 1 2 3 #4 5 6 7 1 [1,3,5,7,8,10,12]
  // Mixolydian 1 2 3 4 5 6 b7 1 [1,3,5,6,8,10,11]
  // Aeolian 1 2 b3 4 5 b6 b7 1 [1,3,4,6,8,9,11]
  // Locrian 1 b2 b3 4 b5 b6 b7 1 [1,2,4,6,7,9,11]
  // harmonic major
  // melodic major
  // harmonic minor
  // melodic minor
  let scaleInterval = [1, 3, 5, 6, 8, 10, 12];
  const scales = {
    Ionian: [1, 3, 5, 6, 8, 10, 12],
    Dorian: [1, 3, 4, 6, 8, 10, 11],
    Phrygian: [1, 2, 4, 6, 8, 9, 11],
    Lydian: [1, 3, 5, 7, 8, 10, 12],
    Mixolydian: [1, 3, 5, 6, 8, 10, 11],
    Aeolian: [1, 3, 4, 6, 8, 9, 11],
    Locrian: [1, 2, 4, 6, 7, 9, 11],
    Chinese: [1, 3, 5, 8, 10],
    Japanese: [1, 5, 6, 10, 12],
    Equal: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
  };
  if (scale) {
    scaleInterval = scales[scale];
  }
  if (!basenote) {
    basenote = 60;
  }
  // const sequenceArray = JSON.parse(
  //   `[${sequence}]`.replace(/('*[0-9]+#*b*'*)/g, '"$1"')
  // ); // only integer
  const notesFromNumbers = sequence.map(sequenceNumber => {
    if (typeof sequenceNumber === "object") {
      //["1''","1"]
      return sequenceNumber.map(noteStr => {
        const { note, octave, sharp } = Util.getNoteAndOctave(noteStr);
        // basenote is 'C4' or 'B4'
        if (!parseInt(basenote))
          return Tone.Frequency(basenote)
            .transpose(
              12 * (octave + Math.floor((note - 1) / scaleInterval.length)) +
                scaleInterval[(note - 1) % scaleInterval.length] +
                sharp -
                1
            )
            .toNote();
        //base note is 60 or 64
        return Tone.Midi(basenote)
          .transpose(
            12 * (octave + Math.floor((note - 1) / scaleInterval.length)) +
              scaleInterval[(note - 1) % scaleInterval.length] +
              sharp -
              1
          )
          .toNote();
      });
    } else {
      // "1''"
      // Tone.transpose receives an integer to transpose
      const { note, octave, sharp } = Util.getNoteAndOctave(sequenceNumber);
      if (!parseInt(basenote))
        return Tone.Frequency(basenote)
          .transpose(
            12 * (octave + Math.floor((note - 1) / scaleInterval.length)) +
              scaleInterval[(note - 1) % scaleInterval.length] +
              sharp -
              1
          )
          .toNote();
      //base note is 60 or 64
      return Tone.Midi(basenote)
        .transpose(
          12 * (octave + Math.floor((note - 1) / scaleInterval.length)) +
            scaleInterval[(note - 1) % scaleInterval.length] +
            sharp -
            1
        )
        .toNote();
    }
  });
  // console.log("notesFromNumbers", notesFromNumbers); //["C3","D3",["C3","D4"]]
  //[["C3","E3"],"G3"] => "[[C3,E3],G3]"
  // const fedNotes = notesFromNumbers.reduce((a, b) => {
  //   let pre = a;
  //   let post = b;
  //   if (typeof a == "object") {
  //     pre = `[${a}]`;
  //   }
  //   if (typeof b == "object") {
  //     post = `[${b}]`;
  //   }
  //   if (pre) return `${pre},${post}`;
  //   else return `${post}`;
  // }, "");
  // console.log("fedNotes", fedNotes);
  createMeasureNew(notesFromNumbers, beat, matchZero, blockId, part);
}

// by far, we have got a track's all measures, need to process,normalize
function normalizeMeasures(part) {
  const measuresLengths = part.measures.map(a => a.beat.length);
  console.log("12121212121212122", measuresLengths);
  const lcmOfBeatLength = Util.lcm(...measuresLengths);
  // 1.转换成对0 2.把track内所有小节beat统一长度

  // 不能用foreach，foreach会直接bypass掉empty的（稀疏数组遍历）
  // part.measures.forEach((measure, measureIndex) => {});
  for (
    let measureIndex = 0;
    measureIndex <= part.measures.length - 1;
    measureIndex += 1
  ) {
    // console.log("measure::::::::::", part.measures[measureIndex]);
    if (!part.measures[measureIndex]) {
      //建一个空小节
      //potential bug here
      part.measures[measureIndex] = {
        measure: measureIndex + 1,
        sequence: "",
        beat: Util.createUnderScores(lcmOfBeatLength),
        matchZero: true
      };
    } else {
      // 对位处理成对0
      if (!part.measures[measureIndex].matchZero) {
        // 对位转成对0，抽出对应的音//potential bug here, super mario....seemingly solved
        // const sequenceArray = JSON.parse(
        //   `[${part.measures[measureIndex].sequence}]`.replace(
        //     /([ABCDEFG]#*b*[1-9])/g,
        //     '"$1"'
        //   )
        // );
        let newSeqArray = part.measures[measureIndex].beat
          .split("")
          .map((beatDigit, index) => {
            if (beatDigit.match(/\d/g)) {
              return part.measures[measureIndex].sequence[index];
            } else {
              return "";
            }
          });
        newSeqArray = newSeqArray.filter(seq => !!seq); // 排掉空的
        console.log("bbbbbbbbbbb", newSeqArray);

        // TO FIX HERE!!!
        // let s = JSON.stringify(newSeqArray.filter(note => note != "")).replace(
        //   /"/g,
        //   ""
        // );
        // s = s.substring(1, s.length - 1); // 去掉数组的前后方括号
        // part.measures[measureIndex].sequence = s;
        part.measures[measureIndex].sequence = newSeqArray;
        part.measures[measureIndex].matchZero = true;
      }
      // console.log("jjjjjjjjjjjjjj", part.measures[measureIndex].sequence);
      //对0的，beat延展就行了，原来000的可能变成0--0--0-- (根据最小公倍数)
      if (part.measures[measureIndex].beat.length < lcmOfBeatLength) {
        const ratio = lcmOfBeatLength / part.measures[measureIndex].beat.length;
        // console.log("[][][]");
        // console.log(lcmOfBeatLength);
        // console.log(part.measures[measureIndex].beat.length);
        const append = Util.createScores(ratio - 1);
        part.measures[measureIndex].beat = part.measures[measureIndex].beat
          .split("")
          .join(append);
        part.measures[measureIndex].beat += append;
      }
    }
  }

  console.log("=== measure after normalization===");
  console.log(part.measures);

  //把所有measure合成一大段 应了老话「不要看小节线」
  part.tonepart = part.measures.reduce((a, b) => {
    // console.log("?", a.sequence);
    return {
      // potential bug: if a/b is empty string, no comma here, seemingly solved
      // sequence: `${a.sequence}${a.sequence && b.sequence ? "," : ""}${
      //   b.sequence
      // }`,
      sequence: a.sequence.concat(b.sequence),
      beat: `${a.beat}${b.beat}`
    };
  });
  console.log("=== final part in this part ===");
  console.log(part.tonepart);
}

export function generateScore() {
  _playLeftNotesInMeasureWhenUsingNote();
  Score.score = [];
  Score.curves = [];
  Score.metres = [];
  tracks.forEach((track, trackIndex) => {
    //音轨
    Score.score[trackIndex] = [];
    Score.curves[trackIndex] = [];
    Score.metres.push(track.metreString);
    track.parts.forEach((part, partIndex) => {
      //声部，声部通常就1个
      normalizeMeasures(part);
      const EzScore = toEzScore(
        part.measures,
        trackIndex,
        partIndex,
        track.metre
      );
      console.log("wefwefwe", EzScore);
      Score.score[trackIndex][partIndex] = EzScore.score;
      Score.curves[trackIndex][partIndex] = EzScore.curves;
    });
  });
}
function prepareTrackNotes(part, track) {
  // measure: int (1)
  // timbre: string ('square')
  // sequence: array
  // beat: string
  // IMPORTANT...use an array of objects as long as the object has a "time" attribute
  // build notes
  const {
    measures,
    tonepart: { sequence, beat }
  } = part; // instead of being param, read from create part
  const { timbre, tempo, volumn, metre, effects } = track;
  console.log("!!!", part);

  let notes = Util.getToneNotes(
    sequence,
    beat,
    tempo ? tempo : 120,
    volumn,
    metre,
    measures.length
  );

  // for midi export
  let midinotes = notes.map(item => {
    if (typeof item.note === "string") {
      return {
        // ...item,
        midiNo: Tone.Frequency(item.note).toMidi(),
        velocity: item.velocity,
        startTime: item.time,
        duration: item.duration
      };
    } else if (typeof item.note === "object") {
      return item.note.map(note => {
        return {
          // ...item,
          midiNo: Tone.Frequency(note).toMidi(),
          velocity: item.velocity,
          startTime: item.time,
          duration: item.duration
        };
      });
    }
  });
  if (!MidiTracks[`${timbre}${currentTrackId}`]) {
    MidiTracks[`${timbre}${currentTrackId}`] = [midinotes]; //还有小节呢
  } else {
    MidiTracks[`${timbre}${currentTrackId}`].push(midinotes);
  }
  // for playback //musixiseParts is currently reset in about.vue
  //playback connect effect chain
  console.log("hehehehe FX:", effects);

  // let dist = Object.keys(effects).reduce((a, b) => {
  //   new FXMap(a)().connect(new FXMap(b)());
  // });
  // dist.toMaster();
  const effectNodes = Object.keys(effects).map(effectName => {
    const effect = new FXMap[effectName]();
    if (
      //对于这种要特殊操作，已经问过tone作者
      effectName == "panner" ||
      effectName == "tremolo" ||
      effectName == "vibrato"
    ) {
      effect.start();
    }
    // effect.wet.value = 0.5;
    // effect.wet.rampTo(0, 2, Tone.now() + 2);
    // effect.wet.rampTo(1, 2, Tone.now() + 3);
    // effect.wet.rampTo(0, 2, Tone.now() + 4);
    // either loop through，either use preset param keys
    console.log(Object.entries(effects[effectName]));
    if (
      Object.entries(effects[effectName]) &&
      Object.entries(effects[effectName]).length
    ) {
      Object.entries(effects[effectName]).forEach(paramOA => {
        // paramOA ['delay',{value:[0.1,0.5,0.3],timepoint:[1,2,3]}]
        // effect['wet'] = 0.5, wet default: 1
        const paramName = paramOA[0];
        const paramObj = paramOA[1];
        // 把value的重复时间加0.01
        paramObj.timepoint.forEach((point, index, self) => {
          if (index > 0 && point === self[index - 1]) {
            self[index] = point + 0.01;
          }
        });
        console.log(paramObj);
        paramObj.value.forEach((paramvalue, index) => {
          // 没curve，硬set
          if (paramvalue) {
            // effect[paramName].setValueAtTime(
            //   paramvalue,
            //   Tone.now() + (paramObj.timepoint[index] - 1) * metre * 240 / tempo
            // );
            effect[paramName].linearRampToValueAtTime(
              paramvalue,
              Tone.now() +
                ((paramObj.timepoint[index] - 1) * metre * 240) / tempo
            );

            // if (paramObj.timepoint[index + 1]) {
            //   effect[paramName].rampTo(
            //     paramObj.value[index + 1],
            //     (paramObj.timepoint[index + 1] - paramObj.timepoint[index]) *
            //       metre *
            //       240 /
            //       tempo,
            //     Tone.now() +
            //       (paramObj.timepoint[index] - 1) * metre * 240 / tempo
            //   );
            // }
          } else {
            console.log("空的时候");
          }
        });
      });
    }
    return effect;
  });
  // if (effectNodes[0]) {
  //   console.log(effectNodes[0]);
  //   console.log(effectNodes[0].wet);
  // }
  console.log("==========================");
  console.log(instrumentMap);
  const instrument = instrumentMap[timbre];
  console.log(instrument);
  // var autoPanner = new Tone.AutoPanner("4n").start();
  // instrument.chain(...effectNodes, autoPanner, Tone.Master);
  instrument.chain(...effectNodes, Tone.Master);
  // instrument.toMaster();
  console.log(notes);
  // playback notes
  musixiseParts.push(
    new Tone.Part(function(time, value) {
      // arrange trigger notes
      if (timbre !== "noise") {
        instrument.triggerAttackRelease(
          value.note,
          value.duration,
          time,
          value.velocity
        );
      } else {
        instrument.triggerAttackRelease(value.duration, time, value.velocity);
      }
    }, notes).start("0.1")
  );
}

// just store effect structure
export function createEffect(
  effect,
  parameter,
  effectStartValue,
  effectStartMeasure,
  effectEndValue,
  effectEndMeasure
) {
  //the structure of effect on a track is
  // effects = {
  //   reverb: {
  //     roomSize: {
  //       value: [3, 2, 1],
  //       timepoint: [1, 2, 3]
  //     }
  //   },
  //   delay: {
  //     delayTime: {
  //         value: [3, 2, 1],
  //         timepoint: [1, 2, 3]
  //     },
  //     feedback: {
  //         value: [3, 2, 1],
  //         timepoint: [1, 2, 3]
  //     }
  //   }
  // }
  if (!tracks[currentTrackId - 1].effects[effect])
    tracks[currentTrackId - 1].effects[effect] = {};
  if (parameter && !tracks[currentTrackId - 1].effects[effect][parameter])
    tracks[currentTrackId - 1].effects[effect][parameter] = {};
  if (
    parameter &&
    !tracks[currentTrackId - 1].effects[effect][parameter].value
  ) {
    tracks[currentTrackId - 1].effects[effect][parameter].value = [
      effectStartValue,
      effectEndValue
    ];
    tracks[currentTrackId - 1].effects[effect][parameter].timepoint = [
      effectStartMeasure ? effectStartMeasure : 1,
      effectEndMeasure
    ];
  } else if (parameter) {
    tracks[currentTrackId - 1].effects[effect][parameter].value.push(
      effectStartValue,
      effectEndValue
    );
    tracks[currentTrackId - 1].effects[effect][parameter].timepoint.push(
      effectStartMeasure,
      effectEndMeasure
    );
  }
}

export function makeSound(startMeasure) {
  if (!startMeasure) startMeasure = 1;
  Tone.Transport.start(
    "+0.1",
    ((startMeasure - 1) * tracks[0].metre * 240) / tracks[0].tempo
  );
}

export function prepareProject() {
  _playLeftNotesInMeasureWhenUsingNote();
  tracks.forEach(track => {
    track.parts.forEach(part => {
      normalizeMeasures(part);
      prepareTrackNotes(part, track);
    });
  });
  // tracks.forEach(track => {
  //   normalizeMeasures(track);
  //   prepareTrackNotes(track);
  // });
}

export function highlightBlock(time) {
  // console.log(tracks);
  currentActiveBlockIds = [];
  tracks.forEach(track => {
    track.parts.forEach(part => {
      const activeMeasure = parseInt(
        time / ((track.metre * 240) / track.tempo)
      );
      if (
        part.measures[activeMeasure] &&
        part.measures[activeMeasure].blockId
      ) {
        currentActiveBlockIds.push(part.measures[activeMeasure].blockId);
      }
    });
  });

  lastActiveBlockIds.forEach(activeBlockId => {
    Blockly.getMainWorkspace().highlightBlock(activeBlockId, false);
  });
  currentActiveBlockIds.forEach(activeBlockId => {
    Blockly.getMainWorkspace().highlightBlock(activeBlockId, true);
  });
  lastActiveBlockIds = currentActiveBlockIds;
}

// notes related:
// block call this directly

// TODO：分析每个track的所有note，每到16个长度，也就是到了一个小节，就调用已有的函数一次。
// const notes = []
let currentBeat = "";
let currentSequence = [];
export function createNote(noteLen, notePitch) {
  //noteLen:1,2,4,8,16
  // notePitch: 'E3' or 'E3,C4,D4'
  const noteToBeatStrMap = {
    "1": "0---------------",
    "2": "0-------",
    "4": "0---",
    "8": "0-",
    "16": "0",
    "2d": "0-----------",
    "4d": "0-----",
    "8d": "0--"
  };
  // notes.push([noteLen,notePitch])
  //其实可以不push，直接来
  currentBeat += noteToBeatStrMap[noteLen];
  if (notePitch.indexOf(",") >= 0) {
    notePitch = notePitch.split(",");
  }
  currentSequence.push(notePitch);
  const measureBeatLength = 16 * tracks[currentTrackId - 1].metre; //如果是44拍，那么默认一个小节的长度应该是16

  if (currentBeat.length > measureBeatLength) {
    createMeasureNew(
      currentSequence.slice(0, measureBeatLength),
      currentBeat.slice(0, measureBeatLength), //前面的
      true,
      "",
      1
    );
    currentBeat = currentBeat.slice(measureBeatLength); //后面的
    currentSequence = currentSequence.slice(measureBeatLength);
  } else if (currentBeat.length == measureBeatLength) {
    //call original functions
    createMeasureNew(currentSequence, currentBeat, true, "", 1);
    // clear data
    currentBeat = "";
    currentSequence = [];
  }
}
function _playLeftNotesInMeasureWhenUsingNote() {
  if (currentBeat) {
    console.log("playLeftNotesInMeasure", JSON.stringify(currentBeat));
    //这条createMeasureNew完全是给createNote模块准备的，在换track前，把遗留的currentBeat处理了
    const measureBeatLength = 16 * tracks[currentTrackId - 1].metre;
    const currentLeftBeatLength = currentBeat.length;
    const restPaddingBeat = "_".repeat(
      measureBeatLength - currentLeftBeatLength
    );
    createMeasureNew(
      currentSequence,
      currentBeat + restPaddingBeat, //前面的和补充的后面的=>攒全小节长度
      true,
      "",
      1
    );
    currentBeat = "";
    currentSequence = [];
  }
}
export function createRest(restLen) {
  const noteToBeatStrMap = {
    "1": "________________",
    "2": "________",
    "4": "____",
    "8": "__",
    "16": "_"
  };
  // notes.push([noteLen,notePitch])
  //其实可以不push，直接来
  const measureBeatLength = 16 * tracks[currentTrackId - 1].metre;
  currentBeat += noteToBeatStrMap[restLen];
  if (currentBeat.length == measureBeatLength) {
    //call original functions
    createMeasureNew(currentSequence, currentBeat, true, "", 1);
    // clear data
    currentBeat = "";
    currentSequence = [];
  }
}
// function generatePartWithNotes() {
//   // generate 「part」 where function prepareTrackNotes(part, track) could utilize
//   for (let i = 0; i <= notes.length - 1; i++) {}
// }
const _eraseEZ = () => {
  currentBeat = "";
  currentSequence = [];
  window.MidiTracks = {}; // will eventually be something like: {sin:[toneNote,toneNote,toneNote,...],piano:[toneNote,toneNote]}
  window.Score = { score: [], curves: [], metres: [] };
  lastActiveBlockIds = [];
  currentActiveBlockIds = [];
  musixiseParts = [];
  tracks = [];
  currentTrackId = 0;
};
export function fetchMidi() {
  return MidiTracks;
}
export function fetchScore() {
  return Score;
}
