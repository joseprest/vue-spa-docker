<template>
<div class="main">
  <div class="question-head">
    <h3>{{quiz.question}}<span v-if="quiz.questionRepresentation=='audio'" @click="playBlocklyQuestion" style="color:gray">题目播放</span></h3>
    
    <div v-if="quiz.questionRepresentation=='score'">
      题目五线谱
      <sheet :scoreWidth="1000" :scoreHeight="100" :scoreNotes="scoreNotes" :scoreCurves="scoreCurves" :metres="metres"/>
    </div>
    <div @click="playBlocklyAnswer">作答播放</div>
    <div @click="_reloadBlocklyContext">初始化作答</div>
  </div>
  <block-helper />
</div>
</template>

<script>
import Blockly from "node-blockly/browser"; // import Blockly
import BlockHelper from "@/components/blockhelper/ez-index.vue";
import Sheet from "@/components/sheet/smallone.vue";
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
} from "@/util/core/audioAPI";
require("@/util/blockly/ez-musixise"); // import Structure of Musixise Blocks
require("@/util/blockly/mystave"); // import Structure of Musixise Blocks

let clock;
export default {
  name: "quiz",
  props: {
    answer: {
      type: String // question text in xml format
    },
    quiz: {
      type: Object
      // default() {
      //   return {
      //     help: "this is question help", // 一进入该题就给个弹框描述一下子
      //     question: "this is question description", //question text added to questionRepresentation
      //     questionRepresentation: "text", // can be 'text'/'score'/'sound'
      //     blocklyQuestionGeneratorXml:
      //       '<xml xmlns="http://www.w3.org/1999/xhtml"><block type="ez_create_track" id="})A[D_a4Bh~|U}FR47K." x="-191" y="-56"><field name="TIMBRE">piano</field><value name="TEMPO"><block type="math_number" id="BGt8ApSK{8eEbl:lIKOa"><field name="NUM">120</field></block></value><value name="VOLUMN"><block type="math_number" id="8Dg![{LA}JvvT-Adi/74"><field name="NUM">100</field></block></value><value name="METRE"><block type="text" id="+slJ_z:/sUOjRYtUqUy!"><field name="TEXT">4/4</field></block></value><statement name="measures"><block type="procedures_callnoreturn" id="kN#{E/c.VI$$as`E*LcF"><mutation name="A"></mutation></block></statement></block><block type="procedures_defnoreturn" id="V:a3h~h$iW*]asV%[Dmf" x="113" y="-59"><field name="NAME">A_M1</field><comment pinned="false" h="80" w="160">Describe this function...</comment><statement name="STACK"><block type="create_note" id=":SrrBM!h;^%f}_g+B_EI"><field name="NOTE_LEN">4</field><value name="NOTE_PITCH"><block type="text" id="6PV_9#4OEKVmU5Z0`f.n"><field name="TEXT">E4</field></block></value><next><block type="create_note" id="c0)dVJMb,c!=dmRLIiVq"><field name="NOTE_LEN">4</field><value name="NOTE_PITCH"><block type="text" id="HLCr0qdC)m9%p4-~l=7p"><field name="TEXT">E4</field></block></value><next><block type="create_note" id=".-[!cPJ!cNKK1x2Yn_F:"><field name="NOTE_LEN">4</field><value name="NOTE_PITCH"><block type="text" id="~)ZDxujjzG}OM?RSOmDR"><field name="TEXT">F4</field></block></value><next><block type="create_note" id="-4%w%dj7.{]CqQAs5y--"><field name="NOTE_LEN">4</field><value name="NOTE_PITCH"><block type="text" id="(FXBJiP}AJyw6zQqzEyb"><field name="TEXT">G4</field></block></value></block></next></block></next></block></next></block></statement></block><block type="procedures_defnoreturn" id="M=8tymgXl^dGczC@3Q1(" x="385" y="-58"><field name="NAME">A_M2</field><comment pinned="false" h="80" w="160">Describe this function...</comment><statement name="STACK"><block type="create_note" id="wZHK#gs01v;KJ(_cw1$}"><field name="NOTE_LEN">4</field><value name="NOTE_PITCH"><block type="text" id="%uJ6bnwzq}t[|RvJNx_D"><field name="TEXT">G4</field></block></value><next><block type="create_note" id="p9e2wqCU,2O%(9naacB["><field name="NOTE_LEN">4</field><value name="NOTE_PITCH"><block type="text" id="n[(yJ;rCB(L/t3faZwnH"><field name="TEXT">F4</field></block></value><next><block type="create_note" id="EQ#7P8),eSqKi}vJB^C?"><field name="NOTE_LEN">4</field><value name="NOTE_PITCH"><block type="text" id="$`j#3q+JBI]}?kE;c*uv"><field name="TEXT">E4</field></block></value><next><block type="create_note" id="`-q;c`eI3wLn%K$}jWF;"><field name="NOTE_LEN">4</field><value name="NOTE_PITCH"><block type="text" id="rH3pUqC@+FVPzH(XAVFM"><field name="TEXT">D4</field></block></value></block></next></block></next></block></next></block></statement></block><block type="procedures_defnoreturn" id="O8,,%?3J3eF3Y8%Afyv2" x="658" y="-62"><field name="NAME">A_M3</field><comment pinned="false" h="80" w="160">Describe this function...</comment><statement name="STACK"><block type="create_note" id="84lEK5(B~cLuaCL78#U."><field name="NOTE_LEN">4</field><value name="NOTE_PITCH"><block type="text" id="T!-v9,Qj#/m|yEp[rp)S"><field name="TEXT">C4</field></block></value><next><block type="create_note" id="xWk|lV2%m^),@q_l)[|8"><field name="NOTE_LEN">4</field><value name="NOTE_PITCH"><block type="text" id="MRHp~uA*[_k1C}l0O.9^"><field name="TEXT">C4</field></block></value><next><block type="create_note" id=":RpM%0jERO`qB|hB|Wpx"><field name="NOTE_LEN">4</field><value name="NOTE_PITCH"><block type="text" id="M|X/,|PS_;w0A%d{aT={"><field name="TEXT">D4</field></block></value><next><block type="create_note" id="=`J2D6Kur`S*Wf2zX{Y7"><field name="NOTE_LEN">4</field><value name="NOTE_PITCH"><block type="text" id="72~YO9^/kLxn=T()A+iF"><field name="TEXT">E4</field></block></value></block></next></block></next></block></next></block></statement></block><block type="procedures_defnoreturn" id="gvBoPwLzRsesFi)E6Ccm" x="926" y="-64"><field name="NAME">A_M4</field><comment pinned="false" h="80" w="160">Describe this function...</comment><statement name="STACK"><block type="create_note" id="OdIE{Q}mcnv+HNHIte)8"><field name="NOTE_LEN">4d</field><value name="NOTE_PITCH"><block type="text" id=",MfQ4%k8f]7{qvflOk0p"><field name="TEXT">E4</field></block></value><next><block type="create_note" id="`1am_*fQ|OWCD.V)Bk0("><field name="NOTE_LEN">8</field><value name="NOTE_PITCH"><block type="text" id="T-Vqv`HK|=]P01v8{F+)"><field name="TEXT">D4</field></block></value><next><block type="create_note" id="WD:RjOqdwVWk;u_0ZM04"><field name="NOTE_LEN">2</field><value name="NOTE_PITCH"><block type="text" id="NXoB)jL77!!z8:`1:l3T"><field name="TEXT">D4</field></block></value></block></next></block></next></block></statement></block><block type="procedures_defnoreturn" id="Ih(|S*:4;:YzjO6/pZ(`" x="1216" y="-72"><field name="NAME">A</field><comment pinned="false" h="80" w="160">Describe this function...</comment><statement name="STACK"><block type="procedures_callnoreturn" id="!r/w!.Fm2;0!`-g8ut?W"><mutation name="A_M1"></mutation><next><block type="procedures_callnoreturn" id="kJ*]3g}P/pF%=Jj%tWf_"><mutation name="A_M2"></mutation><next><block type="procedures_callnoreturn" id="]@2Qs%ABK-u?1BooGhVo"><mutation name="A_M3"></mutation><next><block type="procedures_callnoreturn" id="ZBK293A-(ejrh${3JHN("><mutation name="A_M4"></mutation></block></next></block></next></block></next></block></statement></block></xml>',
      //     // 是问题 也是答案
      //     blocklyContext:
      //       '<xml xmlns="http://www.w3.org/1999/xhtml"><block type="ez_create_track" id="})A[D_a4Bh~|U}FR47K." x="-191" y="-56"><field name="TIMBRE">piano</field><value name="TEMPO"><block type="math_number" id="BGt8ApSK{8eEbl:lIKOa"><field name="NUM">120</field></block></value><value name="VOLUMN"><block type="math_number" id="8Dg![{LA}JvvT-Adi/74"><field name="NUM">100</field></block></value><value name="METRE"><block type="text" id="+slJ_z:/sUOjRYtUqUy!"><field name="TEXT">4/4</field></block></value><statement name="measures"><block type="procedures_callnoreturn" id="kN#{E/c.VI$$as`E*LcF"><mutation name="A"></mutation></block></statement></block><block type="procedures_defnoreturn" id="V:a3h~h$iW*]asV%[Dmf" x="113" y="-59"><field name="NAME">A_M1</field><comment pinned="false" h="80" w="160">Describe this function...</comment><statement name="STACK"><block type="create_note" id=":SrrBM!h;^%f}_g+B_EI"><field name="NOTE_LEN">4</field><value name="NOTE_PITCH"><block type="text" id="6PV_9#4OEKVmU5Z0`f.n"><field name="TEXT">E4</field></block></value><next><block type="create_note" id="c0)dVJMb,c!=dmRLIiVq"><field name="NOTE_LEN">4</field><value name="NOTE_PITCH"><block type="text" id="HLCr0qdC)m9%p4-~l=7p"><field name="TEXT">E4</field></block></value><next><block type="create_note" id=".-[!cPJ!cNKK1x2Yn_F:"><field name="NOTE_LEN">4</field><value name="NOTE_PITCH"><block type="text" id="~)ZDxujjzG}OM?RSOmDR"><field name="TEXT">F4</field></block></value><next><block type="create_note" id="-4%w%dj7.{]CqQAs5y--"><field name="NOTE_LEN">4</field><value name="NOTE_PITCH"><block type="text" id="(FXBJiP}AJyw6zQqzEyb"><field name="TEXT">G4</field></block></value></block></next></block></next></block></next></block></statement></block><block type="procedures_defnoreturn" id="M=8tymgXl^dGczC@3Q1(" x="385" y="-58"><field name="NAME">A_M2</field><comment pinned="false" h="80" w="160">Describe this function...</comment><statement name="STACK"><block type="create_note" id="wZHK#gs01v;KJ(_cw1$}"><field name="NOTE_LEN">4</field><value name="NOTE_PITCH"><block type="text" id="%uJ6bnwzq}t[|RvJNx_D"><field name="TEXT">G4</field></block></value><next><block type="create_note" id="p9e2wqCU,2O%(9naacB["><field name="NOTE_LEN">4</field><value name="NOTE_PITCH"><block type="text" id="n[(yJ;rCB(L/t3faZwnH"><field name="TEXT">F4</field></block></value><next><block type="create_note" id="EQ#7P8),eSqKi}vJB^C?"><field name="NOTE_LEN">4</field><value name="NOTE_PITCH"><block type="text" id="$`j#3q+JBI]}?kE;c*uv"><field name="TEXT">E4</field></block></value><next><block type="create_note" id="`-q;c`eI3wLn%K$}jWF;"><field name="NOTE_LEN">4</field><value name="NOTE_PITCH"><block type="text" id="rH3pUqC@+FVPzH(XAVFM"><field name="TEXT">D4</field></block></value></block></next></block></next></block></next></block></statement></block><block type="procedures_defnoreturn" id="O8,,%?3J3eF3Y8%Afyv2" x="658" y="-62"><field name="NAME">A_M3</field><comment pinned="false" h="80" w="160">Describe this function...</comment><statement name="STACK"><block type="create_note" id="84lEK5(B~cLuaCL78#U."><field name="NOTE_LEN">4</field><value name="NOTE_PITCH"><block type="text" id="T!-v9,Qj#/m|yEp[rp)S"><field name="TEXT">C4</field></block></value><next><block type="create_note" id="xWk|lV2%m^),@q_l)[|8"><field name="NOTE_LEN">4</field><value name="NOTE_PITCH"><block type="text" id="MRHp~uA*[_k1C}l0O.9^"><field name="TEXT">C4</field></block></value><next><block type="create_note" id=":RpM%0jERO`qB|hB|Wpx"><field name="NOTE_LEN">4</field><value name="NOTE_PITCH"><block type="text" id="M|X/,|PS_;w0A%d{aT={"><field name="TEXT">D4</field></block></value><next><block type="create_note" id="=`J2D6Kur`S*Wf2zX{Y7"><field name="NOTE_LEN">4</field><value name="NOTE_PITCH"><block type="text" id="72~YO9^/kLxn=T()A+iF"><field name="TEXT">E4</field></block></value></block></next></block></next></block></next></block></statement></block><block type="procedures_defnoreturn" id="gvBoPwLzRsesFi)E6Ccm" x="926" y="-64"><field name="NAME">A_M4</field><comment pinned="false" h="80" w="160">Describe this function...</comment><statement name="STACK"><block type="create_note" id="OdIE{Q}mcnv+HNHIte)8"><field name="NOTE_LEN">4d</field><value name="NOTE_PITCH"><block type="text" id=",MfQ4%k8f]7{qvflOk0p"><field name="TEXT">E4</field></block></value><next><block type="create_note" id="`1am_*fQ|OWCD.V)Bk0("><field name="NOTE_LEN">8</field><value name="NOTE_PITCH"><block type="text" id="T-Vqv`HK|=]P01v8{F+)"><field name="TEXT">D4</field></block></value><next><block type="create_note" id="WD:RjOqdwVWk;u_0ZM04"><field name="NOTE_LEN">2</field><value name="NOTE_PITCH"><block type="text" id="NXoB)jL77!!z8:`1:l3T"><field name="TEXT">D4</field></block></value></block></next></block></next></block></statement></block><block type="procedures_defnoreturn" id="Ih(|S*:4;:YzjO6/pZ(`" x="1216" y="-72"><field name="NAME">A</field><comment pinned="false" h="80" w="160">Describe this function...</comment></block><block type="procedures_callnoreturn" id="wzCZxK[2mB}7!23RX7Tj" disabled="true" x="-92" y="317"><mutation name="A_M1"></mutation></block><block type="procedures_callnoreturn" id="s.a;meYF]V?}=0B}k]:p" disabled="true" x="-6" y="320"><mutation name="A_M2"></mutation></block><block type="procedures_callnoreturn" id="O/)Hr1_0%g9%`Tb3!HYW" disabled="true" x="78" y="316"><mutation name="A_M3"></mutation></block><block type="procedures_callnoreturn" id="UR*ArxnD.u/Q[zwOkRn2" disabled="true" x="155" y="314"><mutation name="A_M4"></mutation></block></xml>'
      //   };
      // }
    },
    onCorrect: {
      type: Function
    },
    onError: {
      type: Function
    }
    //做题区域，可能会给一些上下文降低难度
  },
  components: {
    BlockHelper,
    Sheet
  },
  watch: {
    quiz: function() {
      this._clearWorkSpace();
      this._loadBlocklyContext();
      this._scorelizeBlocklyQuestion();
    }
  },
  data() {
    return {
      scoreNotes: [],
      scoreCurves: [],
      metres: []
    };
  },
  computed: {},
  methods: {
    _clearWorkSpace() {
      this.scoreNotes = [];
      this.scoreCurves = [];
      this.metres = [];
      let workspace = Blockly.getMainWorkspace();
      workspace.clear();
    },
    _reloadBlocklyContext() {
      let workspace = Blockly.getMainWorkspace();
      workspace.clear();
      Blockly.Xml.domToWorkspace(
        Blockly.Xml.textToDom(this.quiz.blocklyContext),
        workspace
      ); // 把xml dom放到workspace里头展示出来
    },
    _loadBlocklyContext() {
      let workspace = Blockly.getMainWorkspace();
      workspace.clear();
      if (this.answer)
        Blockly.Xml.domToWorkspace(
          Blockly.Xml.textToDom(this.answer),
          workspace
        );
      // 把xml dom放到workspace里头展示出来
      else this._reloadBlocklyContext();
    },
    stopSound() {
      if (clock) {
        clock.stop();
        clock.dispose();
        clock = undefined;
      }
      Tone.Transport.stop();
      cleanTrack();
    },
    playBlockly(code) {
      this.stopSound();
      code += `prepareProject();makeSound(${this.startMeasure});`;
      console.log(code);
      try {
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
          highlightBlock
        });
        clock = new Tone.Clock(() => {
          highlightBlock(Tone.Transport.seconds);
        }, 4);
        clock.start();
      } catch (error) {
        console.log(error);
      }
    },
    playBlocklyQuestion() {
      // Create a headless workspace.
      var demoWorkspace = new Blockly.Workspace();
      Blockly.Xml.domToWorkspace(
        Blockly.Xml.textToDom(this.quiz.blocklyQuestionGeneratorXml),
        demoWorkspace
      );
      var code = Blockly.JavaScript.workspaceToCode(demoWorkspace);
      this.playBlockly(code);
    },
    playBlocklyAnswer() {
      var code = Blockly.JavaScript.workspaceToCode(Blockly.getMainWorkspace());
      this.playBlockly(code);
      this.checkAnswer(1); // enable handle error
    },
    scorelizeBlockly(code) {
      Score = { score: [], curves: [], metres:[] }; //global variable for now
      code += "generateScore();cleanTrack()";
      scopeEval(code, {
        createTrack,
        cleanTrack,
        createMeasureNew,
        createMeasureOnScaleNew,
        createNote,
        createRest,
        createEffect,
        generateScore
      });
      console.log("final score,", Score.score);
      this.scoreNotes = Score.score;
      this.scoreCurves = Score.curves;
      this.metres = Score.metres;
    },
    _scorelizeBlocklyQuestion() {
      // Create a headless workspace.
      var demoWorkspace = new Blockly.Workspace();
      console.log("wellwellwell", this.quiz.blocklyQuestionGeneratorXml);
      Blockly.Xml.domToWorkspace(
        Blockly.Xml.textToDom(this.quiz.blocklyQuestionGeneratorXml),
        demoWorkspace
      );
      var code = Blockly.JavaScript.workspaceToCode(demoWorkspace);
      this.scorelizeBlockly(code);
    },
    scorelizeBlocklyAnswer() {
      var code = Blockly.JavaScript.workspaceToCode(Blockly.getMainWorkspace());
      this.scorelizeBlockly(code);
    },
    checkAnswer(isActiveCheck) {
      let xml = Blockly.Xml.workspaceToDom(Blockly.getMainWorkspace()); // 当前workspace的block转成xml dom
      let xmlText = Blockly.Xml.domToText(xml);
      // console.log(xmlText);
      // console.log(this.quiz.blocklyQuestionGeneratorXml);
      // 把xml里面的id=“。。。”去掉
      const result =
        xmlText.replace(/( id=".*?")|( x=".*?")|( y=".*?")/g, "") ===
        this.quiz.blocklyQuestionGeneratorXml.replace(
          /( id=".*?")|( x=".*?")|( y=".*?")/g,
          ""
        );
      if (result) {
        this.onCorrect(xmlText, isActiveCheck);
      } else {
        this.onError(xmlText, isActiveCheck);
      }
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
        startScale: 0.5,
        maxScale: 3,
        minScale: 0.3,
        scaleSpeed: 1.2
      },
      media: "https://cdn.cnbj1.fds.api.mi-img.com/blockly-media/"
    });

    demoWorkspace.addChangeListener(e => {
      // console.log(e);
      this.checkAnswer();
      Blockly.Events.disableOrphans(e);
    });
    this.onresize = function(e) {
      // Compute the absolute coordinates and dimensions of blocklyArea.
      var element = blocklyArea;
      var x = 0;
      var y = 0;
      // TODO: figure out why official demo has this
      do {
        x += element.offsetLeft;
        y += element.offsetTop;
        element = element.offsetParent;
      } while (element);
      // Position blocklyDiv over blocklyArea.
      blocklyDiv.style.left = x + "px";
      // blocklyDiv.style.top = y + "px";
      // blocklyDiv.style.top = y -30+ "px";
      blocklyDiv.style.width = blocklyArea.offsetWidth + "px";
      blocklyDiv.style.height = blocklyArea.offsetHeight + "px";
      console.log(blocklyArea.offsetWidth, blocklyArea.offsetHeight);
      Blockly.svgResize(demoWorkspace);
      self.tutorialHeight = blocklyArea.offsetHeight - 50;
      console.log(self.tutorialHeight);
    };
    window.addEventListener("resize", this.onresize, false);
    this.onresize();
    Blockly.svgResize(demoWorkspace);

    this._clearWorkSpace();
    this._loadBlocklyContext();
    this._scorelizeBlocklyQuestion();
  },
  updated() {
    this.onresize();
  }
};
</script>
<style lang="scss" scoped>
.main {
  position: relative;
  display: flex;
  flex-direction: column;
  height: 100%;
  .question-head {
    position: relative;
  }
}
.tutorial {
  position: absolute;
  left: 0;
  width: 40%;
  min-width: 460px;
  top: 400px;
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
