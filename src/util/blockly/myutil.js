import Blockly from "node-blockly/browser";
import {
  reverseSequence,
  shuffleSequence,
  transposeSequence,
  numShiftSequence,
  wrapSequence
} from "@/util/core/musicUtilAPI";
Blockly.defineBlocksWithJsonArray([
  // Block for colour picker.
  // Block for trigonometry operators.
  {
    type: "operate_musixise_string",
    message0: "%1 %2",
    args0: [
      {
        type: "field_dropdown",
        name: "MUSIXISE_OP",
        options: [["shuffle", "shuffle"], ["reverse", "reverse"]]
      },
      {
        type: "input_value",
        name: "MUSIXISE_STR",
        check: "String"
      }
    ],
    output: "String",
    colour: "155",
    helpUrl: ""
  }
]);

Blockly.JavaScript["operate_musixise_string"] = function(block) {
  const operator = block.getFieldValue("MUSIXISE_OP");
  // const arg = Blockly.JavaScript.valueToCode(block, "MUSIXISE_STR", Blockly.JavaScript.ORDER_DIVISION) || "0";
  const arg =
    Blockly.JavaScript.valueToCode(
      block,
      "MUSIXISE_STR",
      Blockly.JavaScript.ORDER_NONE
    ) || "0";
  console.log(arg);
  if (operator == "shuffle") {
    // need to return an array
    return [`"${shuffleSequence(arg)}"`];
    // return ["'2,3,4,5'"];
  } else if (operator == "reverse") {
    return [`"${reverseSequence(arg)}"`];
  }
};
