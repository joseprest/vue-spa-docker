import Blockly from "node-blockly/browser"; // import Blockly

export default function loadXmlToBlock(blocklyXmlText) {
  let workspace = Blockly.getMainWorkspace();
  workspace.clear();
  // 把xml dom放到workspace里头展示出来
  Blockly.Xml.domToWorkspace(Blockly.Xml.textToDom(blocklyXmlText), workspace);
}
