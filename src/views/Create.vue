<template>
<div class="main">
  <header style="height:100px;">
    <global-header />
    <div style="background-color:#00bdd4;height: 40px;line-height:40px;padding-left:20px;padding-right:20px;display: flex;justify-content: space-between;">
      <div style="display:flex;align-items:center;justify-content:center;">
        <div class="">
          <el-input-number v-model="startMeasure" size="mini" :min="1"></el-input-number>
        </div>
        <i id="play" class="iconfont icon-icon--13" style="font-size:26px;cursor: pointer;" @click="handlePlay"></i>
        <i id="stop" class="iconfont icon-icon--17" style="font-size:26px;cursor: pointer;padding-left:10px;" @click="handleStop"></i>
        <!-- <i id="load" class="iconfont icon-icon--" style="font-size:26px;cursor: pointer;padding-left:10px;" @click="handleLoad"></i> -->
        <i id="export-midi" class="iconfont icon-geshi_yinpinmidi" style="font-size:24px;cursor: pointer;padding-left:10px;" @click="handleExportMidi"></i>
        <i id="clear" class="iconfont icon-icon--5" style="font-size:26px;cursor: pointer;padding-left:10px;" @click="handleClear"></i>
        <i id="teach" class="iconfont icon-icon--34" style="font-size:26px;cursor: pointer;padding-left:10px;" @click="handleToggleTutorial"></i>
        <i id="save" class="iconfont icon-icon--1" style="font-size:26px;cursor: pointer;padding-left:10px;" @click="handleSave"></i>
      </div>
      <div class="">
        <!-- <span>切视图</span> -->
        <work-loader />
      </div>
    </div>
  </header>
  <block-helper />
  <transition name="slide">
    <div class="tutorial" :style="{height:`${tutorialHeight}px`}" v-show="showTutorial">
      <tutorial />
    </div>
  </transition>
  <user-forms />
</div>
</template>

<script>
import Blockly from "node-blockly/browser"; // import Blockly
import Tutorial from "@/components/tutorial/Tutorial.vue";
import BlockHelper from "@/components/blockhelper/index.vue";
import WorkLoader from "@/components/workloader/index.vue";
import Avatar from "@/components/avatar.vue";
import UserForms from "@/components/UserFormView";
import GlobalHeader from "@/components/GlobalHeader";
import scopeEval from "scope-eval";
import {
  createTrack,
  cleanTrack,
  createMeasureNew,
  createMeasureOnScaleNew,
  createEffect,
  makeSound,
  prepareProject,
  highlightBlock
} from "../util/core/audioAPI";
require("../util/blockly/musixise"); // import Structure of Musixise Blocks
const FileSaver = require("file-saver"); // For Midi file export

let clock;
export default {
  name: "workspace",
  components: {
    Tutorial,
    BlockHelper,
    WorkLoader,
    Avatar,
    UserForms,
    GlobalHeader
  },
  data() {
    return {
      showTutorial: false,
      tutorialHeight: 0,
      startMeasure: 1
    };
  },
  computed: {
    userInfo() {
      return this.$store.state.user.userInfo;
    }
  },
  methods: {
    handlePlay() {
      Blockly.JavaScript.addReservedWords("code");
      Tone.Transport.stop();
      cleanTrack();
      var code = Blockly.JavaScript.workspaceToCode(Blockly.getMainWorkspace()); //把workspace转换为代码
      code += `prepareProject();makeSound(${this.startMeasure});`;
      // Eval can be dangerous. For more controlled execution, check
      // https://github.com/NeilFraser/JS-Interpreter.
      console.log(code);
      try {
        scopeEval(code, {
          createTrack,
          cleanTrack,
          createMeasureNew,
          createMeasureOnScaleNew,
          createEffect,
          makeSound,
          prepareProject,
          highlightBlock
        });
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
    handleLoad() {
      let workspace = Blockly.getMainWorkspace();
      workspace.clear();
      if (blocklyXmlText) {
        Blockly.Xml.domToWorkspace(
          Blockly.Xml.textToDom(blocklyXmlText),
          workspace
        ); // 把xml dom放到workspace里头展示出来
      }
    },
    handleExportMidi() {
      var midi = MidiConvert.create();
      MidiTracks = {}; //erase MidiTracks in createMeasure, might put into store
      var code = Blockly.JavaScript.workspaceToCode(Blockly.getMainWorkspace()); //把workspace转换为代码
      code += "prepareProject();cleanTrack()";
      eval(code);
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

      // 单音色导出DEMO
      // // flatten MidiTracks
      // let flatten = MidiTracks.square.reduce((acc, cur) => acc.concat(cur), []);
      // flatten = flatten.reduce((acc, cur) => acc.concat(cur), []); //flatten再一次，以搞定poly音[D3,G3]这种
      // // flatten.sort((a, b) => (a.startTime - b.startTime));
      // console.log(flatten);
      // // chain problem!
      // flatten.reduce((acc, cur) => {
      //   return acc.note(cur.midiNo, cur.startTime, cur.duration, cur.velocity);
      // }, midi.track("2").patch(32));

      // OFFICIAL DEMO
      // midi
      //   .track()
      //   // select an instrument by its MIDI patch number
      //   .patch(32)
      //   // chain note events: note, time, duration
      //   .note(76, 0, 0.66666)
      //   .note(46, 0, 0.66666)
      //   .note(50, 0, 2)
      //   .note(76, 0.66666, 0.66666)
      //   .note(76, 1.33333, 0.66666);

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

    demoWorkspace.addChangeListener(e => console.log(e));
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
