<template>
  <div id="sheet-container">
    <div ref="sheet" id="sheetcanvas"></div>
  </div>
</template>

<script>
// import loadXmlToBlock from "../tutorial/loadXmlToBlock";
import Vex from "vexflow";
import { isMeasureBeamable } from "@/util/core/scoreAPI";
// import { tutorialMixin } from "../tutorialMixin";
export default {
  name: "sheetscore",
  props: {
    scoreNotes: Array, // this.scoreNotes[A][B][C] Ath track, Bth part, Cth measure
    scoreCurves: Array, // 格式和上同
    metres: Array, // ['3/4','4/4','4/4'] 针对每个track。TODO:其实也可以考虑弄成跟上面一样，因为metre可以变？
    scoreWidth: Number,
    scoreHeight: Number
  },
  watch: {
    //prop listen => rerender (这是个dom的东西，没法数据驱动)
    scoreNotes: function(newVal, oldVal) {
      // watch it
      // alert(1)
      this.generateScore();
    },
    scoreCurves:function(newVal, oldVal) {
      // watch it
      // alert(2)
      // this.generateScore();
    },
    metres: function(newVal, oldVal) {
      // watch it
      // alert(3)
      // this.generateScore();
    }
  },
  methods: {
    generateScore() {
      if (!this.scoreNotes || !this.scoreNotes.length) {
        return;
      }
      if (document.querySelector("#sheetcanvas").lastChild)
        document
          .querySelector("#sheetcanvas")
          .removeChild(document.querySelector("#sheetcanvas").lastChild);
      const VF = Vex.Flow;
      const registry = new VF.Registry();
      VF.Registry.enableDefaultRegistry(registry);
      const id = id => registry.getElementById(id);
      const instrumentNumber = this.scoreNotes.length;
      const maxMeasureNumber = this.scoreNotes
        .flat()
        .reduce((a, b) => (a.length > b.length ? a : b), []).length;

      const canvasHeight =
        Math.ceil(maxMeasureNumber / 4) * instrumentNumber * 120;
      const vf = new VF.Factory({
        renderer: {
          elementId: "sheetcanvas",
          width: this.scoreWidth || 500,
          height: canvasHeight //...what to do here
        }
      });
      const score = vf.EasyScore();
      console.log("========= score notes =========");
      console.log(this.scoreNotes);
      /* 
       * this.scoreNotes[0] is first instrument
       * this.scoreNotes[0][0] is first part(声部) of the first instrument 
       */

      //TODO 目前只能44拍
      for (let i = 0; i <= maxMeasureNumber - 1; i++) {
        let system = vf.System({
          x: (i % 4) * 200 + 50, //TODO: WIDTH should be based on how many notes
          y: Math.floor(i / 4) * 120 * instrumentNumber,
          width: 200,
          spaceBetweenStaves: 10
        });
        for (let j = 0; j <= instrumentNumber - 1; j++) {
          // j => instrument index
          console.log("@@@@@@@@");
          console.log("measure is", this.scoreNotes[j][0][i]);
          console.log("curve is", this.scoreCurves[j][0][i]);
          if (!this.scoreNotes[j][0][i]) this.scoreNotes[j][0][i] = ["b4/w/r"]; //补上个 todo:根据节拍来
          let feedinNotes = [];

          // try auto beam first, might give vue warn error
          if (isMeasureBeamable(this.scoreNotes[j][0][i])) {
            // console.log("beamable", this.scoreNotes[j][0][i]);
            feedinNotes = [
              score.beam(
                score.notes(this.scoreNotes[j][0][i].join(","), {
                  clef: "treble" //can be bass
                }),
                {
                  autoStem: true
                }
              )
            ];
          } else {
            // if cannot auto beam, just use plain notes
            feedinNotes = [
              score.notes(this.scoreNotes[j][0][i].join(","), {
                clef: "treble" // can be bass
              })
            ];
          }

          if (i === 0) {
            // score.set({ time: '4/4' }); //todo: use real metre
            score.set({ time: this.metres[j] }); //todo: use real metre
          }
          const stave = system.addStave({
            voices: [
              score.voice(
                feedinNotes.reduce((a, b) => {
                  return a.concat(b);
                })
              )
            ]
          });
          if (i === 0) {
            // 首个小节加谱号
            // TODO 自动给高音或低音谱号
            stave
              .addClef("treble") //bass
              .addKeySignature("C")
              .addTimeSignature(this.metres[j]);
            // .addTimeSignature("4/4"); // todo: use real metre
          }
        }
        if (instrumentNumber >= 2) {
          // 多个乐器需要制作谱表
          if (i % 4 === 0) {
            system.addConnector("brace");
          }
          system.addConnector("singleRight");
          system.addConnector("singleLeft");
        }
      }
      // 处理连音
      // id format 't${trackIndex}p${partIndex}m${index}n0' or 't${trackIndex}p${partIndex}m${index}end'
      // 重新走一遍循环
      for (let i = 0; i <= maxMeasureNumber - 1; i++) {
        for (let j = 0; j <= instrumentNumber - 1; j++) {
          if (this.scoreCurves[j][0][i]) {
            vf.Curve({
              from: id(this.scoreCurves[j][0][i][1]),
              to: id(this.scoreCurves[j][0][i][0])
            });
          }
        }
      }
      // vf.Curve({
      //   from: id("t0p0m1end"),
      //   to: id("t0p0m2end")
      // });
      vf.draw();
      VF.Registry.disableDefaultRegistry();
    }
  },
  mounted() { // 从无到有
    // alert(4)
    this.generateScore();
  },
  
};
</script>

<style scoped lang="scss">
#sheet-container {
  margin-top: 40px;
  height: 100px;
  overflow: scroll;
  background-color: white;
}
</style>
