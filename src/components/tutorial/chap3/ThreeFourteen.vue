<template>
  <el-collapse-item title="谱表" name="3.14">
    <div id="3-14-1" @click="loadBlocks('example_3_14_1')"></div>
  </el-collapse-item>
</template>

<script>
import Vex from "vexflow";
import { tutorialMixin } from "../tutorialMixin";
export default {
  name: "three-14",
  props: {
    xmlArrayObj: Object
  },
  mixins: [tutorialMixin],
  mounted() {
    const VF = Vex.Flow;
    var vf1 = new VF.Factory({
      renderer: {
        elementId: "3-14-1",
        width: 500,
        height: 240
      }
    });
    var score = vf1.EasyScore();
    var system = vf1.System({ width: 220, spaceBetweenStaves: 10 });

    score.set({ time: "3/4" });
    system
      .addStave({
        voices: [
          score.voice(
            [
              score.notes('D5/q[id="m1a"]'),
              score.beam(score.notes("G4/8, A4, B4, C5", { stem: "up" }))
            ].reduce((a, b) => {
              return a.concat(b);
            })
          )
        ]
      })
      .addClef("treble")
      .addKeySignature("G")
      .addTimeSignature("3/4");

    system
      .addStave({
        voices: [
          score.voice(score.notes("(G3 B3 D4)/h, A3/q", { clef: "bass" }))
        ]
      })
      .addClef("bass")
      .addKeySignature("G")
      .addTimeSignature("3/4");
    system.addConnector("brace");
    system.addConnector("singleRight");
    system.addConnector("singleLeft");

    system = vf1.System({ x: 230, width: 180, spaceBetweenStaves: 10 });
    system.addStave({
      voices: [
        score.voice(
          [score.notes("D5/q,G4,G4")].reduce((a, b) => {
            return a.concat(b);
          })
        )
      ]
    });
    system.addStave({
      voices: [score.voice(score.notes("B3/2.", { clef: "bass" }))]
    });
    system.addConnector("singleRight");
    system.addConnector("singleLeft");

    vf1.draw();
  }
};
</script>

<style scoped lang="scss">
</style>
