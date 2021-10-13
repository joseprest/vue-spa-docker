<template>
  <el-collapse-item title="音符记法" name="1.5">
    <div id="1-5-1" @click="loadBlocks('example_1_5_1')"></div>
    <div id="1-5-2" @click="loadBlocks('example_1_5_2')"></div>
    <div id="1-5-3" @click="loadBlocks('example_1_5_3')"></div>
    <div id="1-5-4" @click="loadBlocks('example_1_5_4')"></div>
    <div id="1-5-5" @click="loadBlocks('example_1_5_5')"></div>
    <div id="1-5-6" @click="loadBlocks('example_1_5_6')"></div>
    <div>one five</div>
  </el-collapse-item>
</template>

<script>
import Vex from "vexflow";
import { tutorialMixin } from "../tutorialMixin";

export default {
  name: "one-5",
  mixins: [tutorialMixin],
  props: {
    xmlArrayObj: Object
  },
  methods: {
    drawTutorial() {
      const VF = Vex.Flow;
      var vf1 = new VF.Factory({
        renderer: {
          elementId: "1-5-1",
          width: 500,
          height: 180
        }
      });
      var score = vf1.EasyScore();
      var system = vf1.System({ width: 200, spaceBetweenStaves: 10 });
      system
        .addStave({
          voices: [
            score.voice(
              score.notes("C5/1", {
                stem: "up"
              })
            )
          ]
        })
        .addClef("treble")
        .addTimeSignature("4/4");
      vf1.draw();

      var vf2 = new VF.Factory({
        renderer: {
          elementId: "1-5-2",
          width: 500,
          height: 180
        }
      });
      var score = vf2.EasyScore();
      var system = vf2.System({ width: 200, spaceBetweenStaves: 10 });
      system
        .addStave({
          voices: [
            score.voice(
              score.notes("C4/2, D4", {
                stem: "up"
              })
            )
          ]
        })
        .addClef("treble")
        .addTimeSignature("4/4");
      vf2.draw();

      var vf3 = new VF.Factory({
        renderer: {
          elementId: "1-5-3",
          width: 500,
          height: 180
        }
      });
      var score = vf3.EasyScore();
      var system = vf3.System({ width: 200, spaceBetweenStaves: 10 });
      system
        .addStave({
          voices: [
            score.voice(
              score.notes("C4/4,D4,E4,F4", {
                stem: "up"
              })
            )
          ]
        })
        .addClef("treble")
        .addTimeSignature("4/4");
      vf3.draw();

      var vf4 = new VF.Factory({
        renderer: {
          elementId: "1-5-4",
          width: 500,
          height: 180
        }
      });
      var score = vf4.EasyScore();
      var system = vf4.System({ width: 200, spaceBetweenStaves: 10 });
      score.set({ time: "4/4" }); //important
      system
        .addStave({
          voices: [
            score.voice(
              [
                score.beam(score.notes("C4/8,D4")),
                score.beam(score.notes("E4/8,F4")),
                score.beam(score.notes("C4/8,D4")),
                score.beam(score.notes("E4/8,F4"))
              ].reduce((a, b) => {
                return a.concat(b);
              })
            )
          ]
        })
        .addClef("treble")
        .addTimeSignature("4/4");
      vf4.draw();

      var vf5 = new VF.Factory({
        renderer: {
          elementId: "1-5-5",
          width: 500,
          height: 180
        }
      });
      var score = vf5.EasyScore();
      var system = vf5.System({ width: 400, spaceBetweenStaves: 10 });
      system
        .addStave({
          voices: [
            score.voice(
              [
                score.beam(score.notes("C5/16,B4,B4,B4")),
                score.beam(score.notes("C5/16,B4,B4,B4")),
                score.beam(score.notes("C5/16,B4,B4,B4")),
                score.beam(score.notes("C5/16,B4,B4,B4"))
              ].reduce((a, b) => {
                return a.concat(b);
              })
            )
          ]
        })
        .addClef("treble")
        .addTimeSignature("4/4");
      vf5.draw();

      var vf6 = new VF.Factory({
        renderer: {
          elementId: "1-5-6",
          width: 500,
          height: 180
        }
      });
      var score = vf6.EasyScore();
      var system = vf6.System({ width: 450, spaceBetweenStaves: 10 });
      system
        .addStave({
          voices: [
            score.voice(
              [
                score.beam(score.notes("C5/32,B4,B4,B4,C5,B4,B4,B4")),
                score.beam(score.notes("C5/32,B4,B4,B4,C5,B4,B4,B4")),
                score.beam(score.notes("C5/32,B4,B4,B4,C5,B4,B4,B4")),
                score.beam(score.notes("C5/32,B4,B4,B4,C5,B4,B4,B4"))
              ].reduce((a, b) => {
                return a.concat(b);
              })
            )
          ]
        })
        .addClef("treble")
        .addTimeSignature("4/4");
      vf6.draw();
    }
  },
  created() {},
  mounted() {
    this.drawTutorial();
  }
};
</script>

<style scoped lang="scss">
</style>
