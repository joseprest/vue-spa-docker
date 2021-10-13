<template>
  <div class="main">
    <header style="height:100px;">
      <global-header/>
      <div
        style="background-color:#00bdd4;height: 40px;line-height:40px;padding-left:20px;padding-right:20px;display: flex;justify-content: space-between;"
      >
        <div style="display:flex;align-items:center;justify-content:center;">
          <div class>
            <el-input-number v-model="startMeasure" size="mini" :min="1"></el-input-number>
          </div>
          <i
            id="play"
            class="iconfont icon-icon--13"
            style="font-size:26px;cursor: pointer;"
            @click="handlePlay"
          ></i>
          <i
            id="stop"
            class="iconfont icon-icon--17"
            style="font-size:26px;cursor: pointer;padding-left:10px;"
            @click="handleStop"
          ></i>
          <i
            id="export-midi"
            class="iconfont icon-geshi_yinpinmidi"
            style="font-size:24px;cursor: pointer;padding-left:10px;"
            @click="handleExportMidi"
          ></i>
          <i
            id="clear"
            class="iconfont icon-icon--5"
            style="font-size:26px;cursor: pointer;padding-left:10px;"
            @click="handleClear"
          ></i>
          <i
            id="teach"
            class="iconfont icon-icon--34"
            style="font-size:26px;cursor: pointer;padding-left:10px;"
            @click="handleToggleTutorial"
          ></i>
          <i
            id="save"
            class="iconfont icon-icon--1"
            style="font-size:26px;cursor: pointer;padding-left:10px;"
            @click="handleSave"
          ></i>
          <i
            id="sheeticon"
            class="iconfont icon-icon--34"
            style="font-size:26px;cursor: pointer;padding-left:10px;"
            @click="handleToggleSheet"
          ></i>
          <i
            id="sheeticon"
            class="iconfont icon-icon--27"
            style="font-size:26px;cursor: pointer;padding-left:10px;"
            @click="handleToggleCodeMode"
          ></i>
        </div>
        <div class>
          <!-- <span>切视图</span> -->
          <work-loader/>
        </div>
      </div>
    </header>
    <block-helper v-show="codemode==1"/>
    <code-editor :onCodeChange="onCodeEditorChange" v-show="codemode==2"/>
    <transition name="slide">
      <div class="tutorial" :style="{height:`${tutorialHeight}px`}" v-show="showTutorial">
        <tutorial/>
      </div>
    </transition>
    <!-- <transition name="slide"> -->
    <div class="sheet" :style="{height:`${tutorialHeight}px`}" v-show="showSheet">
      <sheet :scoreNotes="scoreNotes" :scoreCurves="scoreCurves" :metres="metres"/>
    </div>
    <!-- </transition> -->
    <user-forms/>
  </div>
</template>

<script>
import Blockly from "node-blockly/browser"; // import Blockly
import Tutorial from "@/components/tutorial/Tutorial.vue";
import BlockHelper from "@/components/blockhelper/ez-index.vue";
import CodeEditor from "@/components/CodeEditor/index.vue";
import WorkLoader from "@/components/workloader/index.vue";
import Avatar from "@/components/avatar.vue";
import UserForms from "@/components/UserFormView";
import GlobalHeader from "@/components/GlobalHeader";
import Sheet from "@/components/sheet/index.vue";
import scopeEval from "scope-eval";
import {
  createTrack,
  cleanTrack,
  createMeasureNew,
  createMeasureOnScaleNew,
  createEffect,
  createNote,
  createRest,
  makeSound,
  prepareProject,
  generateScore,
  highlightBlock
} from "../util/core/audioAPI";
import { reverseSequence, shuffleSequence } from "../util/core/musicUtilAPI";
require("../util/blockly/ez-musixise"); // import Structure of Musixise Blocks
require("../util/blockly/mystave"); // import Structure of Musixise Blocks
require("../util/blockly/myutil"); // import Structire of Musixise Blocks
const FileSaver = require("file-saver"); // For Midi file export

let clock;
export default {
  name: "workspace",
  components: {
    Tutorial,
    BlockHelper,
    CodeEditor,
    WorkLoader,
    Avatar,
    UserForms,
    GlobalHeader,
    Sheet
  },
  data() {
    return {
      showTutorial: false,
      showSheet: false,
      tutorialHeight: 0,
      startMeasure: 1,
      scoreNotes: [],
      scoreCurves: [],
      metres: [],
      codemode: 1,
      codeEditorCode: ""
    };
  },
  computed: {
    userInfo() {
      return this.$store.state.user.userInfo;
    }
  },
  methods: {
    evalRunCode(code) {
      scopeEval(code, {
        createTrack,
        cleanTrack,
        createMeasureNew,
        createMeasureOnScaleNew,
        createNote,
        createRest,
        createEffect,
        makeSound,
        prepareProject,
        highlightBlock,
        generateScore,
        // below is util
        reverseSequence,
        shuffleSequence
      });
    },
    handlePlay() {
      if (this.codemode == 1) {
        Blockly.JavaScript.addReservedWords("code");
        Tone.Transport.stop();
        cleanTrack();
        console.log("here");
        var code = Blockly.JavaScript.workspaceToCode(
          Blockly.getMainWorkspace()
        ); //把workspace转换为代码
        code += `prepareProject();makeSound(${this.startMeasure});`;
        // Eval can be dangerous. For more controlled execution, check
        // https://github.com/NeilFraser/JS-Interpreter.
        console.log(code);
        try {
          this.evalRunCode(code);
          if (clock) {
            clock.stop();
            clock.dispose();
          }
          clock = new Tone.Clock(() => {
            // console.log(Tone.Transport.seconds);
            highlightBlock(Tone.Transport.seconds);
          }, 4);
          clock.start();
          //TODO: auto stop...
          // Tone.Transport.on('stop',()=>{
          //   // if (clock) {clock.stop(); clock.dispose()}
          //   console.log('jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj')
          // })
        } catch (error) {
          console.log(error);
        }
      } else {
        Tone.Transport.stop();
        cleanTrack();
        let code = this.codeEditorCode;
        code += `prepareProject();makeSound(${this.startMeasure});`;
        // Eval can be dangerous. For more controlled execution, check
        // https://github.com/NeilFraser/JS-Interpreter.
        console.log(code);
        try {
          this.evalRunCode(code);
          if (clock) {
            clock.stop();
            clock.dispose();
          }
          clock = new Tone.Clock(() => {
            // console.log(Tone.Transport.seconds);
            highlightBlock(Tone.Transport.seconds);
          }, 4);
          clock.start();
        } catch (error) {
          console.log(error);
        }
      }
    },
    handleStop() {
      if (clock) {
        clock.stop();
        clock.dispose();
        clock = undefined;
      }
      Tone.Transport.stop();
      cleanTrack();
    },
    handleSave() {
      let xml = Blockly.Xml.workspaceToDom(Blockly.getMainWorkspace()); // 当前workspace的block转成xml dom
      let xmlText = Blockly.Xml.domToText(xml);
      console.log(xmlText);
      this.$store.commit("SHOW_DIALOG", {
        type: "uploadrecord"
      });
    },
    handleExportMidi() {
      var midi = MidiConvert.create();
      MidiTracks = {}; //erase MidiTracks in createMeasure, might put into store, now is global variable
      var code = Blockly.JavaScript.workspaceToCode(Blockly.getMainWorkspace()); //把workspace转换为代码
      code += "prepareProject();cleanTrack()";
      // eval(code);
      this.evalRunCode(code);
      if (Object.entries(MidiTracks).length === 0) {
        alert("nothing to export");
        return;
      }
      console.log(MidiTracks);
      Object.keys(MidiTracks).forEach((timbre, index) => {
        let flatten = MidiTracks[timbre].reduce(
          (acc, cur) => acc.concat(cur),
          []
        );
        flatten = flatten.reduce((acc, cur) => acc.concat(cur), []); //flatten再一次，以搞定poly音[D3,G3]这种
        flatten.reduce((acc, cur) => {
          return acc.note(
            cur.midiNo,
            cur.startTime,
            cur.duration,
            cur.velocity
          );
        }, midi.track(`${index}`).patch(32));
      });

      const binaryString = midi.encode();
      // write the output
      const bytes = new Uint8Array(binaryString.length);
      for (let i = 0; i < binaryString.length; i++) {
        bytes[i] = binaryString.charCodeAt(i);
      }
      var blob = new Blob([bytes], {
        type: "audio/midi;charset=binary"
      });
      FileSaver.saveAs(blob, "output.mid");
    },
    handleClear() {
      let workspace = Blockly.getMainWorkspace();
      workspace.clear();
    },
    handleToggleTutorial() {
      this.showTutorial = !this.showTutorial;
    },
    handleToggleCodeMode() {
      this.codemode == 1 ? (this.codemode = 2) : (this.codemode = 1);
    },
    handleToggleSheet() {
      this.showSheet = !this.showSheet;
      if (this.showSheet) {
        Score = { score: [], curves: [], metres: [] }; //global variable for now
        console.log(Blockly.getMainWorkspace());
        var code = Blockly.JavaScript.workspaceToCode(
          Blockly.getMainWorkspace()
        ); //把workspace转换为代码
        code += "generateScore();cleanTrack()";
        this.evalRunCode(code);
        this.scoreNotes = Score.score;
        this.scoreCurves = Score.curves;
        this.metres = Score.metres;
      }
    },
    onCodeEditorChange(code) {
      this.codeEditorCode = code;
    }
  },
  created() {},
  mounted() {
    const self = this;
    var blocklyArea = window.document.getElementById("blockly-area");
    var blocklyDiv = window.document.getElementById("blockly-div");
    console.log(blocklyArea);
    console.log(blocklyDiv);
    var demoWorkspace = Blockly.inject("blockly-div", {
      toolbox: window.document.getElementById("toolbox"),
      toolboxPosition: "end",
      horizontalLayout: true,
      scrollbars: true,
      zoom: {
        controls: true,
        wheel: true,
        startScale: 1.0,
        maxScale: 3,
        minScale: 0.3,
        scaleSpeed: 1.2
      },
      media: "https://cdn.cnbj1.fds.api.mi-img.com/blockly-media/"
    });

    demoWorkspace.addChangeListener(e => {
      console.log(e);
      Blockly.Events.disableOrphans(e);
    });
    var onresize = function(e) {
      // Compute the absolute coordinates and dimensions of blocklyArea.
      var element = blocklyArea;
      var x = 0;
      var y = 0;
      do {
        x += element.offsetLeft;
        y += element.offsetTop;
        element = element.offsetParent;
      } while (element);
      // Position blocklyDiv over blocklyArea.
      blocklyDiv.style.left = x + "px";
      blocklyDiv.style.top = y + "px";
      blocklyDiv.style.width = blocklyArea.offsetWidth + "px";
      blocklyDiv.style.height = blocklyArea.offsetHeight + "px";
      console.log(blocklyArea.offsetWidth, blocklyArea.offsetHeight);
      Blockly.svgResize(demoWorkspace);

      self.tutorialHeight = blocklyArea.offsetHeight - 50;
      console.log(self.tutorialHeight);
    };
    window.addEventListener("resize", onresize, false);
    onresize();
    Blockly.svgResize(demoWorkspace);
  },
  updated() {}
};
</script>
<style lang="scss" scoped>
.main {
  position: relative;
  display: flex;
  flex-direction: column;
  height: 100%;
}
.tutorial {
  position: absolute;
  left: 0;
  width: 40%;
  min-width: 460px;
  top: 100px;
  overflow-y: scroll;
}
.sheet {
  position: absolute;
  display: flex;
  justify-content: center;
  left: 0;
  background-color: rgba(0, 0, 0, 0.7);
  width: 100%;
  top: 100px;
  overflow-y: scroll;
  // pointer-events: none;
}
.slide-enter-active {
  transition: all 0.6s ease-out;
}
.slide-leave-active {
  transition: all 0.6s ease-out;
}
/* .slide-fade-leave-active below version 2.1.8 */
.slide-enter,
.slide-leave-to {
  opacity: 0;
  left: -40%;
}
.global-header {
  display: flex;
  justify-content: space-between;
  background-color: white;
  height: 60px;
  line-height: 60px;
  margin: 0;
  padding-left: 28px;
  background-color: #ffcc33;
  .menu-btns {
    flex: 2;
    padding-left: 30%;
  }
  .avatar {
    padding-right: 10px;
    // padding-top: 5px;
    display: flex;
    align-items: center;
  }
}
</style>
