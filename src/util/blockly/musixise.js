/**
 * Copyright 2017 Google Inc.
 * https://developers.google.com/blockly/
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import Blockly from "node-blockly/browser";
// Blockly.JavaScript.STATEMENT_PREFIX = "highlightBlock(%1);\n";
// Blockly.JavaScript.addReservedWords("highlightBlock");
// let workspace = Blockly.getMainWorkspace();
// function highlightBlock(id) {
//   workspace.highlightBlock(id);
// }
/***************** new methods (simpler)*********************/
Blockly.defineBlocksWithJsonArray([
  // Block for colour picker.
  {
    type: "create_track",
    message0: "乐轨 音色 %1 速度 %2 音量 %3 节拍 %4",
    args0: [
      {
        type: "input_value",
        name: "TIMBRE",
        check: "String"
        // type: "field_dropdown",
        // name: "TIMBRE",
        // options: [
        //   [
        //     {
        //       src: "/static/stave/note0.5.png",
        //       width: 9,
        //       height: 19,
        //       alt: "half"
        //     },
        //     "piano"
        //   ],
        //   [
        //     {
        //       src: "/static/stave/note0.25.png",
        //       width: 9,
        //       height: 19,
        //       alt: "quarter"
        //     },
        //     "guitar"
        //   ]
        // ]
      },

      {
        type: "input_value",
        name: "TEMPO",
        check: "Number"
      },
      {
        type: "input_value",
        name: "VOLUMN",
        check: "Number"
      },
      {
        type: "input_value",
        name: "METRE",
        check: "String"
      }
      // {
      //   type: "field_dropdown",
      //   name: "MUTE",
      //   options: [["N", 0], ["Y", 1]]
      // }
    ],
    message1: "效果 %1",
    args1: [{ type: "input_statement", name: "effects" }],
    message2: "小节 %1",
    args2: [{ type: "input_statement", name: "measures" }],
    inputsInline: false,
    // previousStatement: null,
    // nextStatement: null,
    colour: 155,
    tooltip: "",
    helpUrl: ""
  }
]);

Blockly.JavaScript["create_track"] = function(block) {
  // Do while/until loop.
  const [timbre, measure, volumn, metre] = [
    "TIMBRE",
    "TEMPO",
    "VOLUMN",
    "METRE"
  ].map(item =>
    Blockly.JavaScript.valueToCode(block, item, Blockly.JavaScript.ORDER_NONE)
  );
  var branch = Blockly.JavaScript.statementToCode(block, "measures");
  var effects = Blockly.JavaScript.statementToCode(block, "effects");
  return `
  createTrack(${timbre},${measure},${volumn},${metre});
  ${branch};${effects};
  `;
};

Blockly.defineBlocksWithJsonArray([
  // Block for colour picker.
  {
    type: "create_effect",
    message0: "效果 效果 %1 参数 %2 初始值%3 初始小节 %4 结束值%5 结束小节 %6",
    args0: [
      {
        type: "input_value",
        name: "EFFECT",
        check: "String"
      },
      {
        type: "input_value",
        name: "PARAMETER",
        check: "String"
      },
      {
        type: "input_value",
        name: "EFFECTSTARTVALUE",
        check: "Number"
      },
      {
        type: "input_value",
        name: "EFFECTSTARTMEASURE",
        check: "Number"
      },
      {
        type: "input_value",
        name: "EFFECTENDVALUE",
        check: "Number"
      },
      {
        type: "input_value",
        name: "EFFECTENDMEASURE",
        check: "Number"
      }
    ],
    inputsInline: true,
    previousStatement: null,
    nextStatement: null,
    colour: 355,
    tooltip: "",
    helpUrl: ""
  }
]);

Blockly.JavaScript["create_effect"] = function(block) {
  const [
    effect,
    parameter,
    effectStartValue,
    effectStartMeasure,
    effectEndValue,
    effectEndMeasure
  ] = [
    "EFFECT",
    "PARAMETER",
    "EFFECTSTARTVALUE",
    "EFFECTSTARTMEASURE",
    "EFFECTENDVALUE",
    "EFFECTENDMEASURE"
  ].map(item =>
    Blockly.JavaScript.valueToCode(block, item, Blockly.JavaScript.ORDER_NONE)
  );
  if (effectEndValue) {
    return `createEffect(${effect},${parameter},${effectStartValue},${effectStartMeasure},${effectEndValue},${effectEndMeasure});\n`;
  } else if (effectStartMeasure) {
    return `createEffect(${effect},${parameter},${effectStartValue},${effectStartMeasure})\n`;
  } else if (effectStartValue) {
    return `createEffect(${effect},${parameter},${effectStartValue});\n`;
  } else {
    return `createEffect(${effect});\n`;
  }
};

Blockly.defineBlocksWithJsonArray([
  // Block for colour picker.
  {
    type: "create_measure_new",
    message0: "音符对位 音序 %1 拍子%2 声部 %3",
    args0: [
      {
        type: "input_value",
        name: "SEQUENCE",
        check: "String" //should be array
      },
      {
        type: "input_value",
        name: "BEAT",
        check: "String"
      },
      {
        type: "input_value",
        name: "PART",
        check: "Number"
      }
    ],
    inputsInline: true,
    previousStatement: null,
    nextStatement: null,
    colour: 355,
    tooltip: "",
    helpUrl: ""
  }
]);

Blockly.JavaScript["create_measure_new"] = function(block) {
  const [sequence, beat, part] = ["SEQUENCE", "BEAT", "PART"].map(item =>
    Blockly.JavaScript.valueToCode(block, item, Blockly.JavaScript.ORDER_NONE)
  );
  console.log(sequence);
  const norm_sequence = eval(sequence);
  const sequenceArray = JSON.parse(
    `[${norm_sequence}]`.replace(/([ABCDEFG]#*b*[1-9])/g, '"$1"')
  );
  console.log(sequenceArray);
  return `createMeasureNew(${JSON.stringify(sequenceArray)},${beat},false,'${
    block.id
  }',${part});\n`;
};

Blockly.defineBlocksWithJsonArray([
  // Block for colour picker.
  {
    type: "create_measure_on_scale_new",
    message0: "音级对位 音序 %1 拍子%2 调式%3 根音%4 声部%5",
    args0: [
      {
        type: "input_value",
        name: "SEQUENCE",
        check: "String" //should be array
      },
      {
        type: "input_value",
        name: "BEAT",
        check: "String"
      },
      {
        type: "input_value",
        name: "SCALE",
        check: "String"
      },
      {
        type: "input_value",
        name: "BASENOTE",
        check: "String"
      },
      {
        type: "input_value",
        name: "PART",
        check: "Number"
      }
    ],
    inputsInline: true,
    previousStatement: null,
    nextStatement: null,
    colour: 355,
    tooltip: "",
    helpUrl: ""
  }
]);

Blockly.JavaScript["create_measure_on_scale_new"] = function(block) {
  const [sequence, beat, scale, basenote, part] = [
    "SEQUENCE",
    "BEAT",
    "SCALE",
    "BASENOTE",
    "PART"
  ].map(item =>
    Blockly.JavaScript.valueToCode(block, item, Blockly.JavaScript.ORDER_NONE)
  );

  // 取的就有问题
  console.log("in musixise, check raw sequence", sequence);
  // if (sequence.length == 1) {
  //   console.log(
  //     Blockly.JavaScript.valueToCode(
  //       block,
  //       "SEQUENCE",
  //       Blockly.JavaScript.ORDER_MODULUS
  //     )
  //   );
  //   console.log(
  //     Blockly.JavaScript.valueToCode(
  //       block,
  //       "SEQUENCE",
  //       Blockly.JavaScript.ORDER_FUNCTION_CALL
  //     )
  //   );
  // }
  const norm_sequence = eval(sequence);
  const sequenceArray = JSON.parse(
    `[${norm_sequence}]`.replace(/('*[0-9]+#*b*'*)/g, '"$1"')
  ); // only integer
  console.log("in musixise, check processed sequence", sequenceArray);
  return `createMeasureOnScaleNew(${JSON.stringify(
    sequenceArray
  )},${beat},${scale},${basenote},false,'${block.id}',${part});\n`;
};

Blockly.defineBlocksWithJsonArray([
  // Block for colour picker.
  {
    type: "create_measure_match_zero_new",
    message0: "音符对0 音序 %1 拍子%2 声部%3",
    args0: [
      {
        type: "input_value",
        name: "SEQUENCE",
        check: "String" //should be array
      },
      {
        type: "input_value",
        name: "BEAT",
        check: "String"
      },
      {
        type: "input_value",
        name: "PART",
        check: "Number"
      }
    ],
    inputsInline: true,
    previousStatement: null,
    nextStatement: null,
    colour: 355,
    tooltip: "",
    helpUrl: ""
  }
]);

Blockly.JavaScript["create_measure_match_zero_new"] = function(block) {
  const [sequence, beat, part] = ["SEQUENCE", "BEAT", "PART"].map(item =>
    Blockly.JavaScript.valueToCode(block, item, Blockly.JavaScript.ORDER_NONE)
  );
  const norm_sequence = eval(sequence);
  const sequenceArray = JSON.parse(
    `[${norm_sequence}]`.replace(/([ABCDEFG]#*b*[1-9])/g, '"$1"')
  );
  return `createMeasureNew(${JSON.stringify(sequenceArray)},${beat},true,'${
    block.id
  }',${part});\n`;
};

Blockly.defineBlocksWithJsonArray([
  // Block for colour picker.
  {
    type: "create_measure_on_scale_match_zero_new",
    message0: "音级对0 音序 %1 拍子%2 调式%3 根音%4 声部%5",
    args0: [
      {
        type: "input_value",
        name: "SEQUENCE",
        check: "String"
      },
      {
        type: "input_value",
        name: "BEAT",
        check: "String"
      },
      {
        type: "input_value",
        name: "SCALE",
        check: "String"
      },
      {
        type: "input_value",
        name: "BASENOTE",
        check: "String"
      },
      {
        type: "input_value",
        name: "PART",
        check: "Number"
      }
    ],
    inputsInline: true,
    previousStatement: null,
    nextStatement: null,
    colour: 355,
    tooltip: "",
    helpUrl: ""
  }
]);

Blockly.JavaScript["create_measure_on_scale_match_zero_new"] = function(block) {
  const [sequence, beat, scale, basenote, part] = [
    "SEQUENCE",
    "BEAT",
    "SCALE",
    "BASENOTE",
    "PART"
  ].map(item =>
    Blockly.JavaScript.valueToCode(block, item, Blockly.JavaScript.ORDER_NONE)
  );

  const norm_sequence = eval(sequence);
  const sequenceArray = JSON.parse(
    `[${norm_sequence}]`.replace(/('*[0-9]+#*b*'*)/g, '"$1"')
  ); // only integer
  return `createMeasureOnScaleNew(${JSON.stringify(
    sequenceArray
  )},${beat},${scale},${basenote},true,'${block.id}',${part});\n`;
};

// from blockly games appengine/js/js-blocks
