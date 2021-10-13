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
    type: "ez_create_track",
    message0: "乐轨 音色 %1 速度 %2 音量 %3 节拍 %4",
    args0: [
      {
        type: "field_dropdown",
        name: "TIMBRE",
        options: [
          [
            {
              src: "/static/instruments/piano.png",
              width: 30,
              height: 30,
              alt: "piano"
            },
            "piano"
          ],
          [
            {
              src: "/static/instruments/harp.png",
              width: 30,
              height: 30,
              alt: "harp"
            },
            "harp"
          ],
          [
            {
              src: "/static/instruments/acoustic-guitar.png",
              width: 30,
              height: 30,
              alt: "acoustic-guitar"
            },
            "guitar"
          ]
        ]
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
    message1: "小节/音符 %1",
    args1: [{ type: "input_statement", name: "measures" }],
    inputsInline: false,
    // previousStatement: null,
    // nextStatement: null,
    colour: 155,
    tooltip: "",
    helpUrl: ""
  }
]);

Blockly.JavaScript["ez_create_track"] = function(block) {
  // Do while/until loop.
  const [measure, volumn, metre] = ["TEMPO", "VOLUMN", "METRE"].map(item =>
    Blockly.JavaScript.valueToCode(block, item, Blockly.JavaScript.ORDER_NONE)
  );
  const timbre = block.getFieldValue("TIMBRE");
  var branch = Blockly.JavaScript.statementToCode(block, "measures");
  return `
  createTrack('${timbre}',${measure},${volumn},${metre});
  ${branch};
  `;
};

Blockly.defineBlocksWithJsonArray([
  // Block for colour picker.
  {
    type: "ez_create_measure_match_zero_new",
    message0: "音符对0 音序 %1 拍子%2",
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

Blockly.JavaScript["ez_create_measure_match_zero_new"] = function(block) {
  const [sequence, beat] = ["SEQUENCE", "BEAT"].map(item =>
    Blockly.JavaScript.valueToCode(block, item, Blockly.JavaScript.ORDER_NONE)
  );
  const norm_sequence = eval(sequence);
  const sequenceArray = JSON.parse(
    `[${norm_sequence}]`.replace(/([ABCDEFG]#*b*[1-9])/g, '"$1"')
  );
  return `createMeasureNew(${JSON.stringify(sequenceArray)},${beat},true,'${
    block.id
  }',1);\n`;
};

Blockly.defineBlocksWithJsonArray([
  // Block for colour picker.
  {
    type: "ez_create_measure_on_scale_match_zero_new",
    message0: "音级对0 音序 %1 拍子%2 根音%3",
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
        name: "BASENOTE",
        check: "String"
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

Blockly.JavaScript["ez_create_measure_on_scale_match_zero_new"] = function(
  block
) {
  const [sequence, beat, scale, basenote, part] = [
    "SEQUENCE",
    "BEAT",
    "BASENOTE"
  ].map(item =>
    Blockly.JavaScript.valueToCode(block, item, Blockly.JavaScript.ORDER_NONE)
  );
  const norm_sequence = eval(sequence);
  const sequenceArray = JSON.parse(
    `[${norm_sequence}]`.replace(/('*[0-9]+#*b*'*)/g, '"$1"')
  ); // only integer
  return `createMeasureOnScaleNew(${JSON.stringify(
    sequenceArray
  )},${beat},'',${basenote},true,'${block.id}',1);\n`;
};

// from blockly games appengine/js/js-blocks
